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
                <label>
                    Username
                    <input required={true} className={"signup-username"} type={"text"}
                           value={this.state.data.username}
                           onChange={(e) => {
                               this.setState({data: {username: e.target.value, password: this.state.data.password}});
                           }}/>
                </label>
                <label>
                    Password
                    <input required={true} className={"signup-password"} type={"password"}
                           value={this.state.data.password}
                           onChange={(e) => {
                               this.setState({data: {password: e.target.value, username: this.state.data.username}});
                           }}/>
                </label>
                <label>
                    Confirm password
                    <input
                        required={true}
                        className={this.state.classes}
                        type={"password"}
                        value={this.state.confirmPassword}
                        onChange={(e) => {
                            let confirmPassword = e.target.value;
                            let passwordsMatch = this.state.data.password === confirmPassword || confirmPassword === "";
                            console.log("passwordsMatch:", passwordsMatch);
                            console.log(confirmPassword);
                            console.log(this.state.data.password);
                            this.setState({
                                confirmPassword: confirmPassword,
                                classes: ["signup-confirm-password", passwordsMatch ? "" : "passwords-dont-match"].join(" "),
                                passwordsMatch
                            }, () => {
                                console.log(this.state.classes);
                            });
                        }}/>
                </label>
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
