import * as React from "react";
import {connect} from "react-redux";
import "./styles/QuestionList.css";
import {NavLink} from "react-router-dom";

function QuestionList(props) {
    return (

        <div className={"QuestionList"}>
            {props.questions.map(q =>
                <div className={"QuestionListItem"} key={q.id}>
                    <NavLink to={"/questions/" + q.id}>{q.title}</NavLink>
                </div>
            )}
        </div>
    );
}

const mapStateToProps = state => ({
    questions: state.main.questionList
});

const mapDispatchToProps = dispatch => ({
    selectQuestion: questionId => {
        dispatch({type: "SELECT_QUESTION", data: {questionId}});
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionList);
