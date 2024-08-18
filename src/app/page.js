"use client";
import { ToastContainer } from "react-toastify";
import Main from "./Main/page";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-8">
      <ToastContainer />
      <Main />
    </main>
  );
}
