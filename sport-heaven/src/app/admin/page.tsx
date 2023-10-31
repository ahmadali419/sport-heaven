"use client"
import React from "react";

import Image from "next/image";
import LoginForm from "../../components/LoginForm";
import { useRouter } from "next/router";
const AdminLoginPage = () => {
    return (
        <div>
            <LoginForm />
        </div>
    );

};

export default AdminLoginPage;
