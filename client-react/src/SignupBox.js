import * as React from "react";
import {connect} from "react-redux";
import "./styles/SignupBox.css";

class SignupBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {username: "", password: ""},
            passwordsMatch: true,
            confirmPassword: "",
            classes: "signup-password"
        };
    }

    render() {
        return (
            <form className={"SignupBox"} onSubmit={(e) => {
                if (this.state.passwordsMatch) {
                    this.props.onSubmit(this.state.data);
                }
                e.preventDefault();
            }}>
                <h2>Sign up</h2>
                <input className={"signup-username"} placeholder="username" type={"text"}
                       value={this.state.data.username}
                       onChange={(e) => {
                           this.setState({data: {username: e.target.value, password: this.state.data.password}});
                       }}/>
                <input className={"signup-password"} placeholder="password" type={"text"}
                       value={this.state.data.password}
                       onChange={(e) => {
                           this.setState({data: {password: e.target.value, username: this.state.data.username}});
                       }}/>
                <input
                    className={this.state.classes}
                    placeholder="password" type={"text"}
                    value={this.state.confirmPassword}
                    onChange={(e) => {
                        let confirmPassword = e.target.value;
                        let passwordsMatch = this.state.data.password === confirmPassword || confirmPassword === "";
                        console.log("passwordsMatch:", passwordsMatch);
                        console.log(confirmPassword);
                        console.log(this.state.data.password);
                        this.setState({
                            confirmPassword: confirmPassword,
                            classes: ["signup-password", passwordsMatch ? "" : "passwords-dont-match"].join(" "),
                            passwordsMatch
                        }, () => {
                            console.log(this.state.classes);
                        });
                    }}/>
                <button className={"submit-signup"} type={"submit"}>Sign up</button>
            </form>
        );
    }
}

const mapStateToProps = null;
const mapDispatchToProps = dispatch => ({
    onSubmit: data => {
        dispatch({type: "SIGNUP", data});
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupBox);
