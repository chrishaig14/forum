import * as React from "react";
import {connect} from "react-redux";
import "./styles/QuestionList.css";
import {NavLink} from "react-router-dom";

class QuestionList extends React.Component {
    componentDidMount() {
        this.props.onMount();
    }

    render() {
        return (
            <div className={"QuestionList"}>
                {this.props.questions.map(q =>
                    <div className={"QuestionListItem"} key={q.id}>
                        <NavLink to={"/questions/" + q.id}>{q.title}</NavLink>
                        <div style={{"color": "gray"}}>{q.body}</div>
                    </div>
                )}
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
