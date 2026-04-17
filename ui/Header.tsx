import Link from "next/link";

function Header() {
  return (
    <div className="flex flex-col w-full">
      <div className="bg-emerald-900 border-b-[1px] border-emerald-950 shadow-lg text-white z-20 px-[20px] w-full h-[60px] p-[10px] flex flex-row items-center justify-between">
        <div className="flex flex-row items-center ">
          {" "}
          <Link href="/" className="font-semibold">
            ЛЕСНОЙ ПАЗЗЛ
          </Link>
          <p className="text-[14px] ml-[5px]">- Держите ум в форме!</p>
        </div>

        <div className="bg-gray-300 rounded-lg hidden sm:flex flex-1 h-[30px] flex items-center mx-[20px]  max-w-[600px]">
          <input
            className="w-full text-black outline-none px-[10px]"
            placeholder="Я ищу.."
          />
        </div>
        <div className="flex flex-row items-center">
          <div className="  bg-emerald-400 mr-[20px] cursor-pointer hover:bg-emerald-300 transiton-all duration-300 text-black px-[15px] py-[5px] border-emerald-700 rounded-xl">
            Связаться
          </div>
          <div className="  bg-emerald-400 cursor-pointer hover:bg-emerald-300 transiton-all duration-300 text-black px-[15px] py-[5px] border-emerald-700 rounded-xl">
            Войти
          </div>
        </div>
      </div>
      <div className="flex w-full font-semibold h-[40px]  text-[15px] text-white px-[20px] bg-emerald-800 items-center justify-center">
        <div className="flex flex-row items-center justify-between  w-full max-w-[1000px]">
          {" "}
          <p className="hover:text-emerald-200 cursor-pointer transiton-all duration-300">
            О НАС
          </p>
          <p className="hover:text-emerald-200 cursor-pointer transiton-all duration-300">
            АУДИОКНИГИ
          </p>
          <p className="hover:text-emerald-200 cursor-pointer transiton-all duration-300">
            СПРОСИТЬ
          </p>
          <p className="hover:text-emerald-200 shadow-mda border-[1px] border-emerald-500 px-[20px] rounded-lg cursor-pointer transiton-all duration-300">
            ИГРАТЬ
          </p>
        </div>
      </div>
    </div>
  );
}

export default Header;
