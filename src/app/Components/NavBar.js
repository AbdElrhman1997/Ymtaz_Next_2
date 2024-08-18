"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import logo from "../Public/Images/logopng 2.png";
import Image from "next/image";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const links = [
    { href: "/privacy", label: "سياسة الخصوصية " },
    { href: "/phones", label: "أرقام التشغيل " },
    { href: "/contact", label: "الدعم الفني " },
    { href: "/services", label: "اتصل بنا" },
    { href: "/about", label: "من نحن" },
    { href: "/home", label: "الرئيسية" },
  ];

  return (
    <nav className="  fixed w-full z-10 top-0 left-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-around h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/">
              <Image
                src={logo}
                sizes="20"
                alt=""
                className="hidden lg:block h-12 w-auto"
              />
            </Link>
          </div>
          <div className="hidden md:ml-6 md:flex md:space-x-8 items-center">
            {links.map((link) => (
              <Link key={link.label} href={link.href}>
                <span
                  className={`${
                    router.pathname === link.href
                      ? "border-indigo-500"
                      : "border-transparent"
                  } text-[#2C4768] inline-flex items-center px-1 pt-1 border-b-2 text-sm hover:border-[#DDB762] font-medium`}
                >
                  {link.label}
                </span>
              </Link>
            ))}
          </div>
          <div className="lg:hidden flex items-center justify-between w-full">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/">
                <Image
                  src={logo}
                  sizes="20"
                  alt=""
                  className="block lg:hidden h-12 w-auto"
                />
              </Link>
            </div>
            <button
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none md:hidden"
              onClick={toggleMenu}
            >
              <span className="sr-only">Open main menu</span>
              {!menuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className={`md:hidden ${menuOpen ? "block" : "hidden"}`}>
        <div className="pt-2 pb-4 space-y-1">
          {links.map((link) => (
            <Link key={link.label} href={link.href}>
              <span
                className={`${
                  router.pathname === link.href
                    ? "bg-indigo-50 border-indigo-500"
                    : "border-transparent"
                } text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium hover:bg-gray-50`}
              >
                {link.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
