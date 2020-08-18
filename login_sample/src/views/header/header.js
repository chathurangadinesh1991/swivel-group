import React from 'react';
import { Link } from 'react-router-dom';
import AuthService from "../../authService/auth.service";

export default function Header(props) {
    const user = AuthService.getCurrentUser();

    const { history } = props;

    const handleLogOut_OnClick = (e) => {
        AuthService.logout();
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <ul className="navbar-nav mr-auto">
                    <li><Link to={'/home'} className="nav-link"> Home</Link></li>
                </ul>
                <ul className="navbar-nav">
                    {(user === null) ?
                        <li><Link to={'/'} className="nav-link navbar-right"> Login </Link></li>
                        :
                        <li><Link onClick={(e) => handleLogOut_OnClick()} className="nav-link navbar-right"> LogOut {user.username} </Link></li>
                    }
                </ul>
            </nav>
        </div>
    );
}