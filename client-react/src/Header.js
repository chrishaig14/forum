import * as React from "react";
import {NavLink} from "react-router-dom";
import "./styles/Header.css"

class Header extends React.Component {
    render() {
        return (
            <div className={"Header"}>
                <NavLink to={"/"}>Home</NavLink>
            </div>
        );
    }
}

export default Header;
