import * as React from "react";
import {connect} from "react-redux";

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
                <input type={"text"} value={this.state.username} onChange={(e) => {
                    this.setState({username: e.target.value});
                }}/>
                <input type={"text"} value={this.state.password} onChange={(e) => {
                    this.setState({password: e.target.value});
                }}/>
                <button type={"submit"}>Login</button>
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
