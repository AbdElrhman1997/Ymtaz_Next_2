"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../Components/NavBar";
import RegisterForm from "./Components/RegisterForm";
import axios from "axios";

const page = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const getServices = () => {
      axios
        .get("https://api.ymtaz.sa/api/client/services/main-category", {
          headers: {
            Authorization: `Bearer YOUR_TOKEN_HERE`,
          },
        })
        .then((res) => {
          setServices(res?.data?.data?.items);
        });
    };

    getServices();
  }, []);

  return (
    <section className="w-full mt-16">
      <Navbar />
      <RegisterForm services={services} />
    </section>
  );
};

export default page;
