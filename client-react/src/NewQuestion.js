import * as React from "react";
import {connect} from "react-redux";
import "./styles/NewQuestion.css";

class NewQuestion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {title: "", body: ""};
    }

    render() {
        return (
            <div className={"NewQuestion"}>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    this.props.onSubmit(this.state);
                }}>
                    <input type={"text"} required={true} placeholder={"title"} value={this.state.title} onChange={e => {
                        this.setState({title: e.target.value});
                    }}/>
                    <input type={"text"} required={true} placeholder={"body"} value={this.state.body} onChange={e => {
                        this.setState({body: e.target.value});
                    }}/>
                    <button type={"submit"}>Submit question</button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = null;
const mapDispatchToProps = dispatch => ({
    onSubmit: data => {
        dispatch({type: "NEW_QUESTION", data});
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(NewQuestion);
