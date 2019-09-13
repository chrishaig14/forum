import * as React from "react";
import {connect} from "react-redux";
import "./styles/LoginBox.css";


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
                <input placeholder="username" type={"text"} value={this.state.username} onChange={(e) => {
                    this.setState({username: e.target.value});
                }}/>
                <input placeholder="password" type={"text"} value={this.state.password} onChange={(e) => {
                    this.setState({password: e.target.value});
                }}/>
                <button className={"submit-login"} type={"submit"}>Login</button>
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
