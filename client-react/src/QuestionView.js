import * as React from "react";
import {connect} from "react-redux";
import NewAnswer from "./NewAnswer";
import "./styles/QuestionView.css";
import Question from "./Question";
import Answer from "./Answer";

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
