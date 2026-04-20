"use client"; // 👈 Required for useState/useEffect

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Prevent flash of wrong state
  const router = useRouter();

  // Check auth status on mount + when navigating
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      setIsAuthenticated(!!token);
      setIsLoading(false);
    };

    checkAuth();

    // Optional: listen for storage events (if login/logout happens in another tab)
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    router.refresh(); // Optional: refresh server components if needed
    router.push("/"); // Redirect to home after logout
  };

  return (
    <div className="flex flex-col w-full ">
      <div className="bg-emerald-900 border-b-[1px] border-emerald-950 shadow-lg text-white z-20 px-[20px] w-full h-[60px] p-[10px] flex flex-row items-center justify-between">
        <div className="flex flex-row items-center">
          <Link href="/" className="font-semibold">
            ЛЕСНОЙ ПАЗЗЛ
          </Link>
          <p className="text-[14px] ml-[5px]">- Держите ум в форме!</p>
        </div>

        <div className="bg-gray-300 rounded-lg hidden sm:flex flex-1 h-[30px] flex items-center mx-[20px] max-w-[600px]">
          <input
            className="w-full text-black outline-none px-[10px]"
            placeholder="Я ищу.."
          />
        </div>

        <div className="flex flex-row items-center">
          <div className="bg-emerald-400 mr-[20px] cursor-pointer hover:bg-emerald-300 transition-all duration-300 text-black px-[15px] py-[5px] border-emerald-700 rounded-xl">
            Связаться
          </div>

          {/* 🔐 Auth Button - Conditional Rendering */}
          {isLoading ? (
            <div className="bg-emerald-400 cursor-wait text-black px-[15px] py-[5px] border-emerald-700 rounded-xl animate-pulse">
              ...
            </div>
          ) : isAuthenticated ? (
            <div className="flex items-center gap-3">
              <Link
                href="/dashboard"
                className="bg-emerald-400 cursor-pointer hover:bg-emerald-300 transition-all duration-300 text-black px-[15px] py-[5px] border-emerald-700 rounded-xl"
              >
                Мой профиль
              </Link>
              <button
                onClick={handleLogout}
                className="text-emerald-200 hover:text-white text-sm transition-colors"
              >
                Выйти
              </button>
            </div>
          ) : (
            <Link
              href="/signin"
              className="bg-emerald-400 cursor-pointer hover:bg-emerald-300 transition-all duration-300 text-black px-[15px] py-[5px] border-emerald-700 rounded-xl"
            >
              Войти
            </Link>
          )}
        </div>
      </div>

      <div className="flex w-full font-semibold h-[40px] text-[15px] text-white px-[20px] bg-emerald-800 items-center justify-center">
        <div className="flex flex-row items-center justify-between w-full max-w-[1000px]">
          <p className="hover:text-emerald-200 cursor-pointer transition-all duration-300">
            О НАС
          </p>
          <p className="hover:text-emerald-200 cursor-pointer transition-all duration-300">
            АУДИОКНИГИ
          </p>
          <p className="hover:text-emerald-200 cursor-pointer transition-all duration-300">
            СПРОСИТЬ
          </p>
          <Link
            href="/games"
            className="hover:text-emerald-200 shadow-mda border-[1px] border-emerald-500 px-[20px] rounded-lg cursor-pointer transition-all duration-300"
          >
            ИГРАТЬ
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
