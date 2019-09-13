import React from "react";
import "./App.css";
import LoginBox from "./LoginBox";
import SignupBox from "./SignupBox";
import NewQuestion from "./NewQuestion";
import QuestionList from "./QuestionList";
import QuestionView from "./QuestionView";
import {connect} from "react-redux";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";

function App() {
    return (
        <Router>
            <Route path={"/signup"} component={SignupBox}/>
            <Route path={"/login"} component={LoginBox}/>
            <Route path={"/newQuestion"} component={NewQuestion}/>
            <Route path={"/allQuestions"} component={QuestionList}/>
            <Route path={"/question"} component={QuestionView}/>
        </Router>
    );
}

export default App;
