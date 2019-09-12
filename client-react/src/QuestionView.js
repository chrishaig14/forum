import * as React from "react";
import {connect} from "react-redux";
import NewAnswer from "./NewAnswer";

function Question(props) {
    return (
        <div className={"Question"}>
            <div>Title: {props.question.title}</div>
            <div>Body: {props.question.body}</div>
            <div>Username: {props.question.username}</div>
        </div>
    );
}

function Answer(props) {
    return (
        <div className={"Answer"}>
            <div>Body: {props.answer.body}</div>
            <div>Username: {props.answer.username}</div>
        </div>
    );
}

function QuestionView(props) {
    return (
        <div className={"QuestionView"}>
            <Question question={props.question}/>
            <NewAnswer/>
            {props.answers.map(a => <Answer answer={a} key={a.id}/>)}
        </div>
    );
}

const mapStateToProps = state => ({...state.questionView});
const mapDispatchToProps = null;
export default connect(mapStateToProps, mapDispatchToProps)(QuestionView);
