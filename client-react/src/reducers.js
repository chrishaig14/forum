import {combineReducers} from "redux";
import {connectRouter} from "connected-react-router";

function reducer(state = {}, action) {
    let newState = JSON.parse(JSON.stringify(state));
    if (action.type === "ALL_QUESTIONS_SUCCESSFUL") {
        newState.questionList = action.data.questions;
        console.log("STATE: ", newState.questionList);
    } else if (action.type === "LOGIN_SUCCESSFUL") {
        newState.token = action.data.token;
    } else if (action.type === "GET_QUESTION_SUCCESSFUL") {
        newState.questionView = {
            question: action.data.question,
            answers: []
        };
    } else if (action.type === "GET_ANSWER_SUCCESSFUL") {
        newState.questionView.answers.push(action.data.answer);
    }
    return newState;
}

export default (history) => combineReducers({
    router: connectRouter(history),
    main: reducer
})
