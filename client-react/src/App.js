import React from "react";
import "./App.css";
import LoginBox from "./LoginBox";
import SignupBox from "./SignupBox";
import NewQuestion from "./NewQuestion";
import QuestionList from "./QuestionList";
import QuestionView from "./QuestionView";
import {connect} from "react-redux";

function App(props) {
    return (
        <div className="App">
            <SignupBox/>
            <LoginBox/>
            <NewQuestion/>
            <QuestionList/>
            {props.questionView ? <QuestionView/> : null}
        </div>
    );
}

const mapStateToProps = state => ({
    questionView: state.questionView
});
const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(App);
