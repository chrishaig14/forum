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
                <h2>New answer</h2>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    this.props.onSubmit(this.state);
                }}>
                    <textarea className={"new-answer-body"} required={true} placeholder={"body"} value={this.state.body}
                              onChange={e => {
                                  this.setState({body: e.target.value});
                              }}/>
                    <button className={"submit-answer"} type={"submit"}>Submit answer</button>
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
