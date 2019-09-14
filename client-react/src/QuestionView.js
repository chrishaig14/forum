import * as React from "react";
import {connect} from "react-redux";
import NewAnswer from "./NewAnswer";
import "./styles/QuestionView.css";
import {NavLink} from "react-router-dom";

function Question(props) {
    console.log("tags: ", props.question.tags);
    return (
        <div className={"Question"}>
            <h1>{props.question.title}</h1>
            <p>{props.question.body}</p>
            <div className={"question-footer"}>
                <div className={"tags-container"}>Tags: {props.question.tags.map(t => <div
                    className={"tag"}>{t}</div>)}</div>
                <div className={"asked-by"}>Asked by <NavLink
                    to={"/users/" + props.question.username}>{props.question.username}</NavLink></div>
            </div>
        </div>
    );
}

function Answer(props) {
    return (
        <div className={"Answer"}>
            <p>{props.answer.body}</p>
            <div className={"answer-footer"}>
                <div className={"answered-by"}>Answered by <NavLink
                    to={"/users/" + props.answer.username}>{props.answer.username}</NavLink></div>
            </div>
        </div>
    );
}

class QuestionView extends React.Component {
    componentDidMount() {
        console.log("MOUNTED QUESTION VIEW!");
        this.props.onMount(this.props.match.params.id);
    }

    render() {
        return (
            this.props.question ?
                (<div className={"QuestionView"}>
                    <Question question={this.props.question}/>
                    <div className={"answer-container"}>

                        <h2>{this.props.answers.length} answers</h2>
                        {this.props.answers.map(a => <Answer answer={a} key={a.id}/>)}
                    </div>

                    <NewAnswer/>
                </div>) : (<div>{"loading"}</div>)

        );
    }
}

const mapStateToProps = state => ({...state.main.questionView});
const mapDispatchToProps = dispatch => ({
    onMount: (id) => dispatch({type: "FETCH_QUESTION", data: {questionId: id}})
});
export default connect(mapStateToProps, mapDispatchToProps)(QuestionView);
