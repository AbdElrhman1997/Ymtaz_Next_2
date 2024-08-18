"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDropzone } from "react-dropzone";
import Select from "react-select";
import axios from "axios";
import { toast } from "react-toastify";

const RegisterForm = ({ services }) => {
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      border: "none",
      borderColor: state.isFocused ? "#DDB762" : provided.borderColor,
      boxShadow: state.isFocused ? "0 0 0 1px #DDB762" : provided.boxShadow, // Add a box shadow on focus
      "&:hover": {
        borderColor: state.isFocused ? "#DDB762" : provided.borderColor,
      },
      cursor: "pointer",
      padding: "8px 0",
      borderRaduis: "10px",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "gray", // Placeholder color
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "black", // Text color of selected item
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 9999, // Ensure the menu appears above other elements
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#f0e1c1c0"
        : state.isFocused
        ? "#f0e1c1c0"
        : "white", // Background color for selected and hovered options
      color: state.isSelected ? "black" : "black", // Text color for selected and non-selected options
      cursor: "pointer",
    }),
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      category: "",
      images: [],
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(50, "Must be 50 characters or less")
        .required("أدخل نوع الخدمة"),
      description: Yup.string()
        .max(500, "لا يمكن إدخال أكثر من 500 حرف")
        .required("أدخل محتوى الطلب"),
      category: Yup.mixed().required("أدخل مستوى الطلب"),
      images: Yup.array()
        .min(1, "أدخل صورة واحدة على الأقل")
        .required("Required"),
    }),
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("file", values.images[0]);
      formData.append("description", values.description);
      formData.append("name", values.name);
      formData.append("accept_rules", 1);
      formData.append("priority", 1);
      formData.append("service_id", Number(values.category.id));

      try {
        const response = await axios.post(
          "https://api.ymtaz.sa/api/client/services-request",
          formData,
          {
            headers: {
              Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaS55bXRhei5zYS9hcGkvY2xpZW50L2xvZ2luIiwiaWF0IjoxNzIwMzM1ODA5LCJleHAiOjIxNjAxNzIwMzM1ODA5LCJuYmYiOjE3MjAzMzU4MDksImp0aSI6IngyeTgxcG54NGdseTdYTHMiLCJzdWIiOiIxNjUxIiwicHJ2IjoiMmE4NDY2MmMzMzE1NzU0NmM0M2Y0MDM3NTQ2NDE1YmM3MGQ3OGJiYyJ9.W3Uq_o1mzr9srAYpZcDcvqcoXzd60e26yrt_vM5Hgzg`,
              "Content-Type": "multipart/form-data", // Ensure the Content-Type is set appropriately
            },
          }
        );

        toast.success("تم إضافة الطلب بنجاح");
        resetForm();
      } catch (error) {
        toast.error("هناك خطأ حاول مرة أخرى");
        console.error("Error:", error);
      }
    },
  });

  const onDrop = useCallback(
    (acceptedFiles) => {
      formik.setFieldValue("images", [
        ...formik.values.images,
        ...acceptedFiles,
      ]);
    },
    [formik]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="lg:w-3/4 md:w-3/4 w-full mx-auto p-6 space-y-4 mt-8"
      dir="rtl"
    >
      <p className="text-3xl text-[#252525] font-medium">الملكية الفكرية</p>
      <div>
        <label
          htmlFor="name"
          className="block font-medium text-[#696F79] text-xl"
        >
          نوع الخدمة
          <span className="text-red-500 mt-2">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
          className="mt-1 block w-full  rounded-lg shadow-sm py-[14px] px-4 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-[#252525]"
          placeholder="الملكية الفكرية"
        />
        {formik.touched.name && formik.errors.name ? (
          <div className="text-red-500 mt-2">{formik.errors.name}</div>
        ) : null}
      </div>
      <div>
        <label
          htmlFor="category"
          className="block text-xl font-medium text-[#696F79]"
        >
          مستوى الطلب
          <span className="text-red-500 mt-2">*</span>
        </label>
        <Select
          id="category"
          name="category"
          options={services}
          value={formik.values.category}
          onChange={(option) => formik.setFieldValue("category", option)}
          onBlur={() => formik.setFieldTouched("category", true)}
          className="mt-1 block w-full  rounded-md shadow-sm focus:outline-none cursor-pointer focus:ring-[#DDB762] focus:border-[#DDB762] text-[#9D9D9E]"
          styles={customStyles}
          placeholder={"مهم جدا"}
          getOptionLabel={(option) => option.name}
          getOptionValue={(option) => option.id}
        />
        {formik.touched.category && formik.errors.category ? (
          <div className="text-red-500 mt-2">{formik.errors.category}</div>
        ) : null}
      </div>
      <div>
        <label
          htmlFor="description"
          className="block text-xl font-medium text-[#696F79]"
        >
          محتوى الطلب
          <span className="text-red-500 mt-2">*</span>
        </label>
        <textarea
          id="description"
          name="description"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.description}
          className="mt-1 block w-full border-none rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#DDB762] text-[#252525] text-xl  focus:border-[#DDB762]"
          rows={6}
          placeholder="اكتب رسالتك هنا"
        />
        {formik.touched.description && formik.errors.description ? (
          <div className="text-red-500 mt-2">{formik.errors.description}</div>
        ) : null}
      </div>
      <div
        {...getRootProps()}
        className="border-2 border-dashed border-[#DDB762] p-6 text-center h-40 flex flex-col items-center justify-center cursor-pointer pb-8"
      >
        <div className="flex flex-col justify-center items-center">
          <svg
            width="62"
            height="61"
            viewBox="0 0 62 61"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M28.4928 50.2044H17.1968C13.3896 50.2044 10.1372 48.8866 7.4396 46.2508C4.74196 43.6151 3.3923 40.3937 3.39062 36.5865C3.39062 33.3232 4.37379 30.4156 6.34013 27.8635C8.30646 25.3115 10.8794 23.6798 14.059 22.9686C15.105 19.1196 17.1968 16.0028 20.3346 13.6181C23.4723 11.2334 27.0285 10.041 31.003 10.041C35.8979 10.041 40.0506 11.7463 43.4612 15.1568C46.8717 18.5674 48.5761 22.7193 48.5745 27.6125C51.4612 27.9472 53.8568 29.1923 55.7612 31.3477C57.6656 33.5031 58.617 36.0234 58.6153 38.9085C58.6153 42.0462 57.5175 44.7138 55.3219 46.911C53.1263 49.1083 50.4588 50.2061 47.3194 50.2044H33.5132V32.2564L37.5295 36.1472L41.0438 32.6329L31.003 22.5921L20.9621 32.6329L24.4764 36.1472L28.4928 32.2564V50.2044Z"
              fill="#B4BBC1"
            />
          </svg>
          <p className="text-[#9D9D9E]">مرفقات الطلب (اختياري)</p>
        </div>
      </div>
      {formik.values.images && (
        <ul className="mt-4">
          {formik.values.images.map((file, index) => (
            <li key={index}>{file.name}</li>
          ))}
        </ul>
      )}
      {formik.touched.images && formik.errors.images ? (
        <div className="text-red-500 text-sm mt-2">{formik.errors.images}</div>
      ) : null}
      <div className="mt-4 flex justify-center items-center">
        <button
          type="submit"
          className="bg-[#DDB762] hover:bg-[#daa430] text-white py-3 rounded lg:px-32 md:px-32 lg:w-fit md:w-fit w-full mt-3 font-semibold text-lg"
        >
          تأكيد الطلب
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
