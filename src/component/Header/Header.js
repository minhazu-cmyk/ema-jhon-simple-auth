import React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { userContext } from '../../App';
import logo from '../../images/logo.png';
import './Header.css';
const Header = () => {
    const [logInUser,setLogInUser] = useContext(userContext)
    return (
        <div className="header">
           <img src={logo} alt=""/>
       <nav>
           <Link to="/shop">shop</Link>
           <Link to="/order">oder </Link>
           <Link to="/manage">manage inventory here</Link>
           <button onClick={()=>setLogInUser({})} > sign out </button>
       </nav>
        </div>

    );
};

export default Header;