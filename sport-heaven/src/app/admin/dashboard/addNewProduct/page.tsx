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
type productFormData = {
  id: string;
  name: string;
  price: string;
  description: string;
  stock: string;
  image: string;
};
const dummyData: User[] = [];

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
  image: "",
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
  const rerender = React.useReducer(() => ({}), {})[1];
  const { customers } = useAppSelector((state) => state.adminDasboard);
  const { push } = useRouter();
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });
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
    dispatch(fetchCustomersAsync());
    setData(customers);
  }, []);
  const [file, setFile] = React.useState(null);

  const formData:any = new FormData();
  const handleFileChange = (event:any) => {
    console.log('event.target.files[0]',event.target.files[0]);
    setFile(event.target.files[0]);
};
  const onSubmit: SubmitHandler<productFormData> = async (data:any) => {
        formData.append('name', data.name);
        formData.append('price', data.price);
        formData.append('description', data.description);
        formData.append('image', file);
        formData.append('stock', data.stock);
    // console.log('data',formData);return;
    let res = await dispatch(productAsync(formData));
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
          />
        </div>
        <div className="my-3 w-2/3">
          <Text as="span">Image: </Text>
          <TextField.Input type="file"   onChange={handleFileChange}/>
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
