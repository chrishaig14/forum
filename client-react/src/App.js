import React from "react";
import logo from "./logo.svg";
import "./App.css";
import LoginBox from "./LoginBox";
import SignupBox from "./SignupBox";
import NewQuestion from "./NewQuestion";
import QuestionList from "./QuestionList";

function App() {
    return (
        <div className="App">
            <SignupBox/>
            <LoginBox/>
            <NewQuestion/>
            <QuestionList/>
        </div>
    );
}

export default App;
