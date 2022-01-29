import './Navbar.css';
import Temple from '../assets/temple.svg';
import {Link} from "react-router-dom";
import {useLogout} from "../hooks/useLogout";
import {useAuthContext} from "../hooks/useAuthContext";

export default function Navbar() {
    const {logout, isPending} = useLogout();
    const {user} = useAuthContext();

    return (
        <div className='navbar'>
            <ul>
                <li className='logo'>
                    <img src={Temple} alt="logo"/>
                    <span><Link to='/'>the dojo</Link></span>
                </li>
                {!user && (
                    <>
                        <li><Link to='/login'>login</Link></li>
                        <li><Link to='/signup'>signup</Link></li>
                    </>
                )}
                {user && (
                    <>
                        <li>
                            {!isPending && <button className='btn' onClick={logout}> logout</button>}
                            {isPending && <button className='btn' disabled> login out...</button>}
                        </li>
                    </>
                )}
            </ul>
        </div>
    )
}