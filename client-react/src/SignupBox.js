import * as React from "react";
import {connect} from "react-redux";
import "./styles/SignupBox.css";

class SignupBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {username: "", password: ""};
    }

    render() {
        return (
            <form className={"SignupBox"} onSubmit={(e) => {
                this.props.onSubmit(this.state);
                e.preventDefault();
            }}>
                <input placeholder="username" type={"text"} value={this.state.username} onChange={(e) => {
                    this.setState({username: e.target.value});
                }}/>
                <input placeholder="password" type={"text"} value={this.state.password} onChange={(e) => {
                    this.setState({password: e.target.value});
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
