import * as React from "react";
import {connect} from "react-redux";
import "./styles/QuestionList.css";
import {NavLink} from "react-router-dom";
import QuestionListItem from "./QuestionListItem";

class QuestionList extends React.Component {
    componentDidMount() {
        this.props.onMount();
    }

    render() {
        return (
            <div className={"QuestionList"}>

                <h2>All questions ({this.props.questions.length})</h2>
                <div>

                    {this.props.questions.map(q =>
                        <QuestionListItem question={q}/>
                    )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    questions: state.main.questionList
});

const mapDispatchToProps = dispatch => ({
    onMount: () => dispatch({type: "GET_ALL_QUESTIONS"})
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionList);
