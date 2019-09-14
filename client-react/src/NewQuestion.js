import * as React from "react";
import {connect} from "react-redux";
import "./styles/NewQuestion.css";

class NewQuestion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {title: "", body: "", tags: ""};
    }

    render() {
        return (
            <div className={"NewQuestion"}>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    let q = {...this.state};
                    q.tags = q.tags.split(",");
                    this.props.onSubmit(q);
                }}>
                    <input type={"text"} className={"new-question-title"} required={true} placeholder={"title"}
                           value={this.state.title} onChange={e => {
                        this.setState({title: e.target.value});
                    }}/>
                    <textarea className={"new-question-body"} required={true} placeholder={"body"}
                              value={this.state.body} onChange={e => {
                        this.setState({body: e.target.value});
                    }}/>
                    <input className={"new-question-tags"} type={"text"} placeholder={"Tags"}
                           value={this.state.tags.join} onChange={e => {
                        this.setState({tags: e.target.value});
                    }}
                    />
                    <button className={"submit-question"} type={"submit"}>Submit question</button>
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
