import * as React from "react";
import {NavLink} from "react-router-dom";
import "./styles/Header.css";
import {connect} from "react-redux";

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {search: ""};
    }

    render() {
        return (
            <div className={"Header"}>
                <NavLink className={"home-link"} to={"/"}>Home</NavLink>
                <div className={"search-form"}>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        this.props.search(this.state.search);
                    }}>
                        <input type={"text"} placeholder={"Search"}
                               value={this.state.search}
                               onChange={(e) => {
                                   this.setState({search: e.target.value});
                               }
                               }/>
                    </form>
                </div>
                {this.props.username ?
                    <div className={"user"}>{this.props.username}</div> :
                    <NavLink to={"/login"}>Login</NavLink>}
                {this.props.username ? <button onClick={this.props.logout}>Logout</button> : null}
            </div>
        );
    }
}

const mapStateToProps = state => ({username: state.main.token});
const mapDispatchToProps = dispatch => ({
    logout: () => dispatch({type: "LOGOUT"}),
    search: (terms) => dispatch({type: "SEARCH", data: {terms}})
});
export default connect(mapStateToProps, mapDispatchToProps)(Header);
