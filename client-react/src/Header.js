import * as React from "react";
import {NavLink} from "react-router-dom";
import "./styles/Header.css";
import {connect} from "react-redux";
import logo from "./styles/logo.svg";


class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {search: ""};
    }

    render() {
        return (
            <div className={"Header"}>

                <NavLink className={"home-link"} to={"/"}><img style={{width: "60px"}} src={logo}/></NavLink>

                <div className={"search-form"}>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        this.props.submitSearch(this.state.search);
                    }}>
                        <input type={"text"} placeholder={"Search"}
                               value={this.state.search}
                               onChange={(e) => {
                                   this.setState({search: e.target.value});
                               }
                               }/>
                    </form>
                </div>
                <NavLink className={"new-question-link"} to={"/newQuestion"}
                         style={{"min-width": "max-content", "margin-left": "2em", "margin-right": "auto"}}>
                    <button>
                        New question
                    </button>
                </NavLink>
                {this.props.username ?
                    <NavLink to={"/users/" + this.props.username} className={"user"}>{this.props.username}</NavLink> :
                    <NavLink to={"/login"}>Login</NavLink>}
                {this.props.username ? <button onClick={this.props.logout}>Logout</button> : null}
            </div>
        );
    }
}

const mapStateToProps = state => ({username: state.main.token});
const mapDispatchToProps = dispatch => ({
    logout: () => dispatch({type: "LOGOUT"}),
    submitSearch: (terms) => dispatch({type: "SUBMIT_SEARCH", data: {terms}})
});
export default connect(mapStateToProps, mapDispatchToProps)(Header);
