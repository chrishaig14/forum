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
                <h2>Login</h2>
                <label>
                    Username
                    <input className={"login-username"} type={"text"} value={this.state.username}
                           onChange={(e) => {
                               this.setState({username: e.target.value});
                           }}/>
                </label>
                <label>
                    Password
                    <input className={"login-password"} type={"password"} value={this.state.password}
                           onChange={(e) => {
                               this.setState({password: e.target.value});
                           }}/>
                </label>
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
