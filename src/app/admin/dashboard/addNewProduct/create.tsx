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
import { fetchCustomersAsync } from "@/store/thunks/adminDashboardThunks";
import { Customer } from "@/store/types/auth/adminDashboard";

type User = {
    _id: string,
    name: string,
    email: string,
    isEmailVerified: boolean,
}
const dummyData: User[] = [];

const columnHelper = createColumnHelper<Customer>()

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
    columnHelper.accessor('email', {
        header: () => 'Email',
        cell: info => info.renderValue(),
        footer: info => info.column.id,
    }),
    columnHelper.accessor('isEmailVerified', {
        header: () => <span>Visits</span>,
        footer: info => info.column.id,
    }),
]
const CustomersPage = () => {
    const [data, setData] = React.useState(() => [...dummyData])
    const rerender = React.useReducer(() => ({}), {})[1]
    const { customers } = useAppSelector(state => state.adminDasboard)
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
        dispatch(fetchCustomersAsync())
        setData(customers)
    }, [])
    return <div className="p-10">
        <h1 className="text-base font-bold mb-5">Products</h1>
        <div style={{ float:'right',marginBottom:'20px' }}>
        <a href="/add-product" style={linkStyle} >Add New Product</a>
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
            <div className="flex items-center gap-2 justify-evenly mt-2">
                <Button
                    className="cursor-pointer"
                    onClick={() => table.setPageIndex(0)}
                    disabled={!table.getCanPreviousPage()}
                >
                    {'<<'}
                </Button>
                <Button
                    className="cursor-pointer"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    {'<'}
                </Button>
                <Button
                    className="cursor-pointer"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    {'>'}
                </Button>
                <Button
                    className="cursor-pointer"
                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                    disabled={!table.getCanNextPage()}
                >
                    {'>>'}
                </Button>
                <span className="flex items-center gap-1">
                    <div className="uppercase text-base">Page</div>
                    <strong>
                        {table.getState().pagination.pageIndex + 1} of{' '}
                        {table.getPageCount()}
                    </strong>
                </span>
                <span className="flex items-center gap-1">
                    | Go to page:
                    <input
                        type="number"
                        defaultValue={table.getState().pagination.pageIndex + 1}
                        onChange={e => {
                            const page = e.target.value ? Number(e.target.value) - 1 : 0
                            table.setPageIndex(page)
                        }}
                        className="border p-1 rounded w-16"
                    />
                </span>
                <select
                    value={table.getState().pagination.pageSize}
                    onChange={e => {
                        table.setPageSize(Number(e.target.value))
                    }}
                >

                    {[10, 20, 30, 40, 50].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    </div>;
};

export default CustomersPage;
