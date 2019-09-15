import * as React from "react";
import {connect} from "react-redux";
import "./styles/LoginBox.css";
import {NavLink} from "react-router-dom";


class LoginBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {username: "", password: ""};
    }

    render() {
        return (
            <form className={"LoginBox"} onSubmit={(e) => {
                this.props.onSubmit(this.state);
                e.preventDefault();
            }}>
                <input className={"login-username"} placeholder="username" type={"text"} value={this.state.username}
                       onChange={(e) => {
                           this.setState({username: e.target.value});
                       }}/>
                <input className={"login-password"} placeholder="password" type={"text"} value={this.state.password}
                       onChange={(e) => {
                           this.setState({password: e.target.value});
                       }}/>
                <div className={"login-buttons"}>
                    <button className={"submit-login"} type={"submit"}>Login</button>
                    <NavLink to={"/signup"}>Sign up</NavLink>
                </div>
            </form>
        );
    }
}

const mapStateToProps = null;
const mapDispatchToProps = dispatch => ({
    onSubmit: data => {
        dispatch({type: "LOGIN", data});
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginBox);
