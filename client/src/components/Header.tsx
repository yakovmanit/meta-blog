import React, {useEffect, useState} from "react";
// import logo from '@/assets/img/Logo.svg';
import Logo from "@/assets/img/Logo.svg?react";
import closeIcon from "@/assets/img/close.svg";
// import searchIcon from "@/assets/img/search.svg";
import burgerIcon from "@/assets/img/burger.svg";
import {Link} from "react-router-dom";

const Header: React.FC = () => {
  const [closeMenu, setCloseMenu] = useState<boolean>(false);

  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check localStorage
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    }
  }, []);

  const handleToggle = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);

    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <header>
      <div className="flex justify-between items-center py-4 lg:py-8">
        {/* Logo */}
        <Link to='/'>
          {/*<img src={logo} alt="logo"/>*/}
          <Logo className="dark:text-white" />
        </Link>
        {
          closeMenu && (
            // mobile menu
            <ul className="fixed left-0 top-0 w-full bg-white h-full text-base pt-6 md:hidden">
              <button onClick={() => setCloseMenu(false)} className="max-w-6 max-h-6 absolute right-4 top-4">
                <img src={closeIcon} alt="close"/>
              </button>
              <li className="px-6 py-4"><Link to='/home'>Home</Link></li>
              <li className="px-6 py-4"><Link to='/contacts'>Contacts</Link></li>
            </ul>
          )
        }

        {/* Desktop menu */}
        <ul className="hidden md:flex gap-10">
          <li className=""><Link to='/'>Home</Link></li>
          <li className=""><Link to='/contacts'>Contacts</Link></li>
        </ul>

        {/* Search */}
        {/*<label className="flex items-center gap-12 p-2 pl-4 bg-[#F4F4F5] rounded-sm max-w-36">*/}
        {/*  <input className="w-full text-[14px] text-[#A1A1AA] outline-none placeholder:text-inherit" type="text" placeholder="Search"/>*/}
        {/*  <img className="w-4 h-4" src={searchIcon} alt="search"/>*/}
        {/*</label>*/}

        {/*  Theme switch */}
        <div className="ml-auto mr-3 md:ml-0 md:mr-0">
          <input
            id="theme-toggle"
            type="checkbox"
            className="peer hidden"
            checked={isDark}
            onChange={handleToggle}
          />
          <label
            htmlFor="theme-toggle"
            className="w-14 h-8 flex items-center bg-[#E8E8EA] dark:bg-[#4B6BFB] rounded-full p-1 cursor-pointer transition-colors duration-300"
          >
            <div
              className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                isDark ? "translate-x-6" : "translate-x-0"
              }`}
            ></div>
          </label>
        </div>

        {/* Menu burger */}
        <button className="md:hidden" onClick={() => setCloseMenu(true)}>
          <img className="w-8 h-8" src={burgerIcon} alt="menu burger"/>
        </button>

      </div>
    </header>
  );
};

export default Header;