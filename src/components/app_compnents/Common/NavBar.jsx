import { NavLink } from "react-router-dom";

const NavBar = () => {
    return (
        <div className="border p-3 flex gap-5 justify-center">
           <NavLink to='/'>Home</NavLink>
           <NavLink to='/login'>Login</NavLink>
           <NavLink to='/register'>Register</NavLink>
        </div>
    );
};

export default NavBar;