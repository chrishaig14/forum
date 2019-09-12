import * as React from "react";
import {connect} from "react-redux";
import "./styles/QuestionList.css";

function QuestionList(props) {
    return (

        <div className={"QuestionList"}>
            {props.questions.map(q =>
                <div className={"QuestionListItem"} key={q.id}>
                    <div onClick={() => props.selectQuestion(q.id)}>Title: {q.title}</div>
                    <div>Body: {q.body}</div>
                    <div>Username: {q.username}</div>
                </div>
            )}
        </div>
    );
}

const mapStateToProps = state => ({
    questions: state.questionList
});

const mapDispatchToProps = dispatch => ({
    selectQuestion: questionId => {
        dispatch({type: "SELECT_QUESTION", data: {questionId}});
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionList);
