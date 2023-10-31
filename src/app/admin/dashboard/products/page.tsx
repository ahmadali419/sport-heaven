"use client"
import { Button, Table } from "@radix-ui/themes";
import React from "react";
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
} from '@tanstack/react-table'
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchProductsAsync } from "@/store/thunks/adminDashboardThunks";
import { Product } from "@/store/types/auth/adminDashboard";
import { toast } from "react-toastify";


// type Product = {
//     _id: string,
//     name: string,
//     price: string,
//     description: string,
// }
const dummyData: Product[] = [];

const columnHelper = createColumnHelper<Product>()
console.log('columnHelper',columnHelper)
const token = localStorage.getItem('adminToken'); // Retrieve admin token from local storage

const CustomersPage = () => {
    const columns = [
        columnHelper.accessor('_id', {
            cell: info => info.getValue(),
            header: () => <span>ID</span>,
            footer: info => info.column.id,
        }),
        columnHelper.accessor(row => row.name, {
            id: 'name',
            cell: info => <i>{info.getValue()}</i>,
            header: () => <span>Name</span>,
            footer: info => info.column.id,
        }),
        columnHelper.accessor('price', {
            header: () => 'Price',
            cell: info => info.renderValue(),
            footer: info => info.column.id,
        }),
        columnHelper.accessor('description', {
            header: () => 'Description',
            cell: info => info.renderValue(),
            footer: info => info.column.id,
        }),
        {
            id: 'actions',
            accessor: (row:any) => row, // Accessor function to access the row data
            cell: (info:any) => (
                <Table.Cell>
                 <Button>
        <span style={{ marginRight: '4px' }}>Edit</span>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-pencil" // Make sure Bootstrap icon classes are correctly applied
            viewBox="0 0 16 16"
        >
            <path // Add the correct path for the pencil icon
            />
        </svg>
    </Button>
    <Button onClick={() => handleDelete(info.row.original._id)}>
        <span style={{ marginRight: '4px' }}>Delete</span>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-trash" // Ensure proper Bootstrap class for the trash icon
            viewBox="0 0 16 16"
        >
            <path // Add the correct path for the trash icon
            />
        </svg>
    </Button>
    
    
                </Table.Cell>
            ),
            header: () => <span>Action</span>,
            footer: info => info.column.id,
        },
        
       
    ]
    const [data, setData] = React.useState(() => [...dummyData])
    const rerender = React.useReducer(() => ({}), {})[1]
    const { products } = useAppSelector(state => state.adminDasboard)
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })
    const dispatch = useAppDispatch();
    const linkStyle = {
        textDecoration: 'none',
        padding: '8px 12px',
        backgroundColor: '#3498db',
        color: '#fff',
        borderRadius: '4px',
        display: 'inline-block',
        marginTop: '10px',
        cursor: 'pointer',
    };
    React.useEffect(() => {
        dispatch(fetchProductsAsync())
            .then((data:any) => {
                console.log('data',data.payload.products);
                setData(data.payload.products);
            })
            .catch((error) => {
                // Handle error, if needed
            });
    }, [dispatch]);
    const handleDelete = (productId:any) => {
        fetch(`http://localhost:3001/api/dashboard/product/${productId}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}` // Include the token in the Authorization header
          },
        })
          .then((response) => {
            console.log('productId',productId)
            if (response.ok) {
                toast.success('Product deleted successfully');
                setTimeout(() => {
                  // Reload the page after a delay of 3000 milliseconds (3 seconds)
                  window.location.reload();
                }, 3000);
              // Refresh the product list after successful deletion
            //   dispatch(fetchProductsAsync());
            }
          })
          .catch((error) => {
            // Handle errors, if any
            console.error('Error deleting product:', error);
          });
      };
      
   

    return <div className="p-10">
        <h1 className="text-base font-bold mb-5">Products</h1>
        <div style={{ float:'right',marginBottom:'20px' }}>
        <a href="/admin/dashboard/addNewProduct" style={linkStyle} >Add New Product</a>
        </div>
        {/* <DataTable
            columns={columns}
            data={dummyData}
            pagination
            highlightOnHover
        />
         */}
        <div className="p-2" style={{ marginTop:'71px' }}>
            <Table.Root variant="surface">
                <Table.Header>
                    {table.getHeaderGroups().map(headerGroup => (
                        <Table.Row key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <Table.ColumnHeaderCell key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                </Table.ColumnHeaderCell>
                            ))}
                        </Table.Row>
                    ))}
                </Table.Header>
                <Table.Body>
                    {table.getRowModel().rows.map(row => (
                        <Table.Row key={row.id}>
                            {row.getVisibleCells().map(cell => (
                                <Table.RowHeaderCell key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </Table.RowHeaderCell>
                            ))}
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
          
        </div>
    </div>;
};

export default CustomersPage;
