"use client";
import React from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchCustomersAsync } from "@/store/thunks/adminDashboardThunks";
import { Customer } from "@/store/types/auth/adminDashboard";
import { useForm, SubmitHandler, Form } from "react-hook-form";
import { loginAsync, productAsync } from "@/store/thunks/authThunks";
import {
  Flex,
  Text,
  Button,
  Card,
  Box,
  Avatar,
  Heading,
  Strong,
  TextField,
  TextArea,
} from "@radix-ui/themes";
import { useRouter } from "next/navigation";
// import {  productFormData, productSchema } from "./app/zodSchema/adminDashboard";

type User = {
  _id: string;
  name: string;
  email: string;
  isEmailVerified: boolean;
};
type Product = {
  _id: string;
  name: string;
  price: string;
  stock: string;
  description: string;
};
type productFormData = {
  id: string;
  name: string;
  price: string;
  description: string;
  stock: string;
  image: File | string; // Update the image property to be of type File or string
};
const dummyData: Product[] = [];

const columnHelper = createColumnHelper<Customer>();

const columns = [
  columnHelper.accessor("_id", {
    cell: (info) => info.getValue(),
    header: () => <span>ID</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor((row) => row.name, {
    id: "name",
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Name</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("email", {
    header: () => "Email",
    cell: (info) => info.renderValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("isEmailVerified", {
    header: () => <span>Visits</span>,
    footer: (info) => info.column.id,
  }),
];
const defaultValues = {
  id: "",
  name: "",
  price: "",
  description: "",
  stock: "",
  image: {},
};
const CustomersPage = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<productFormData>({
    //@ts-ignore
    defaultValues: defaultValues,
  });
  const [data, setData] = React.useState(() => [...dummyData]);
  const [productData, setProductData] = React.useState(() => [...dummyData]);
  const rerender = React.useReducer(() => ({}), {})[1];
  const { customers } = useAppSelector((state) => state.adminDasboard);
  const { push } = useRouter();
  const router = useRouter();


  

  // Check for the existence of the 'id' property in the query
  // const id = query ? query.id : undefined;
;
  console.log('router',router);


  const dispatch = useAppDispatch();
  const linkStyle = {
    textDecoration: "none",
    padding: "8px 12px",
    backgroundColor: "#3498db",
    color: "#fff",
    borderRadius: "4px",
    display: "inline-block",
    marginTop: "10px",
    cursor: "pointer",
  };

  React.useEffect(() => {
    const currentURL = window.location.href;
    // Create a URL object
    const url = new URL(currentURL);

     // Extract the value of the 'id' parameter
    const productId = url.searchParams.get('id');
    const token = localStorage.getItem('adminToken'); // Retrieve admin token from local storage
    const fetchData = async () => {
      try {
        const currentURL = window.location.href;
        const url = new URL(currentURL);
        const productId = url.searchParams.get('id');
        const token = localStorage.getItem('adminToken');

        if (productId) {
          const response = await fetch(`http://localhost:3001/api/dashboard/productEdit/${productId}`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`
            },
          });

          if (response.ok) {
            const productData = await response.json();
            console.log('productData',productData.product);
            setData({...productData.product}); // Set the fetched product data into state
          } else {
            console.error('Failed to fetch product data');
          }
        }
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };
    if(productId){
    fetchData();
    }

    // dispatch(fetchCustomersAsync());
    // setData(customers);
  }, []);
  const [file, setFile] = React.useState<File | null>(null);
  const [image, setImage] = React.useState({ preview: '', data: '' })


  const handleFileChange = (e:any) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
      }
    setImage(img)
  }
  const token = localStorage.getItem('adminToken');
  const onSubmit: SubmitHandler<productFormData> = async (data:any) => {
  const formData:any = new FormData();
        formData.append('name', data.name);
        formData.append('price', data.price);
        formData.append('description', data.description);
        formData.append('image', image.data);
        formData.append('stock', data.stock);
        console.log('image.data',image.data);
        data.image = image.data;
        // try {
        //   const response = await fetch('http://localhost:3001/api/dashboard/product/create', {
        //     method: 'POST',
        //     body: formData,
        //     headers: {
        //       'Authorization': `Bearer ${token}`,
        //       // Don't need to specify 'Content-Type': 'application/json' as you're using FormData
        //     },
        //     // Ensure you set appropriate headers for form data (not always needed)
        //   });
      
        //   if (response.ok) {
        //     // Handle successful response, e.g., redirect to a new page
        //     // push("/admin/dashboard/products");
        //   } else {
        //     // Handle errors if needed
        //   }
        // } catch (error) {
        //   // Handle fetch errors, network issues, etc.
        // }
        // const myData={...formData}
        // console.log('data.image[0]',image.data);

        // console.log("formdata",formData,"data",data)
    let res = await dispatch(productAsync(data));
    
    if (res.payload) {
        push("/admin/dashboard/products")
    }
};
  return (
    <div className="p-10">
      <h1 className="text-base font-bold mb-5">Add New Product</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="my-3 w-2/3">
          <Text as="span">Name: </Text>
          <TextField.Input
            placeholder="Enter name"
            {...register("name", { required: "Name is required" })}
            value={data?.name}
            />
          {errors.name && (
            <Text as="p" color="red">
              {errors.name.message}
            </Text>
          )}
        </div>
        <div className="my-3 w-2/3">
          <Text as="span">Price: </Text>
          <TextField.Input
            placeholder="Enter price"
            {...register("price", { required: "Price is required" })}
            value={data?.price}


          />
          {errors.price && (
            <Text as="p" color="red">
              {errors.price.message}
            </Text>
          )}
        </div>
        <div className="my-3 w-2/3">
          <Text as="span">Stock: </Text>
          <TextField.Input
            placeholder="Enter tock"
            {...register("stock", { required: "Stock is required" })}
            value={data?.stock}


          />
          {errors.stock && (
            <Text as="p" color="red">
              {errors.stock.message}
            </Text>
          )}
        </div>
        <div className="my-3 w-2/3">
          <Text as="span">Description: </Text>
          <TextArea
            placeholder="Enter description"
            {...register("description", {
              required: "Description is required",
            })}
            value={data?.description}

          />
        </div>
        <div className="my-3 w-2/3">
          <Text as="span">Image: </Text>
          {image.preview && <img src={image.preview} width='100' height='100' />}
          <input type="file" name="image" onChange={handleFileChange} />
        </div>
        <div className="my-3 w-2/3">
          <Button type="submit" radius="none">
            Save
          </Button>
        </div>
      </form>
      {/* <DataTable
            columns={columns}
            data={dummyData}
            pagination
            highlightOnHover
        />
         */}
    </div>
  );
};

export default CustomersPage;
