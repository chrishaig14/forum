import * as React from "react";
import {connect} from "react-redux";
import "./styles/NewAnswer.css";

class NewAnswer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {body: ""};
    }

    render() {
        return (
            <div className={"NewAnswer"}>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    this.props.onSubmit(this.state);
                }}>
                    <input type={"text"} required={true} placeholder={"body"} value={this.state.body} onChange={e => {
                        this.setState({body: e.target.value});
                    }}/>
                    <button type={"submit"}>Submit answer</button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = null;
const mapDispatchToProps = dispatch => ({
    onSubmit: data => {
        dispatch({type: "NEW_ANSWER", data});
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(NewAnswer);
