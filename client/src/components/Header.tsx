import React from "react";
import logo from '@/assets/img/Logo.svg';
import {Link} from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header>
      <div>
        <Link to='/'>
          <img src={logo} alt="logo"/>
        </Link>
        <ul>
          <li>Home</li>
          <li>Blog</li>
          <li>Single Post</li>
          <li>Pages</li>
          <li>Contact</li>
        </ul>
        <input type="text"/>
      </div>
    </header>
  );
};

export default Header;