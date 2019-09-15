import {combineReducers} from "redux";
import {connectRouter} from "connected-react-router";
import Cookies from "js-cookie";

function reducer(state = {}, action) {
    let newState = JSON.parse(JSON.stringify(state));
    if (action.type === "ALL_QUESTIONS_SUCCESSFUL") {
        newState.questionList = action.data.questions;
    } else if (action.type === "LOGIN_SUCCESSFUL") {
        newState.token = action.data.token;
        Cookies.set("token", newState.token);
    } else if (action.type === "LOGOUT") {
        newState.token = "";
        Cookies.remove("token");
    } else if (action.type === "GET_QUESTION_SUCCESSFUL") {
        newState.questionView = {
            question: {...action.data.question},//, liked: action.data.question.likes.includes(newState.token)},
            answers: []
        };
    } else if (action.type === "GET_ANSWER_SUCCESSFUL") {
        // action.data.answer.liked = action.data.answer.likes.includes(newState.token);
        newState.questionView.answers.push(action.data.answer);
    } else if (action.type === "LIKE_ANSWER_SUCCESSFUL") {
        newState.questionView.answers = newState.questionView.answers.map(a => {
            if (a.id === action.data.answerId) {
                a.likes.push(newState.token);
                // a.liked = true;
            }
            return a;
        });
    } else if (action.type === "UNLIKE_ANSWER_SUCCESSFUL") {
        newState.questionView.answers = newState.questionView.answers.map(a => {
            if (a.id === action.data.answerId) {
                a.likes = a.likes.filter(u => u !== newState.token);
                // a.liked = false;
            }
            return a;
        });
    } else if (action.type === "LIKE_QUESTION_SUCCESSFUL") {
        newState.questionView.question.likes.push(newState.token);
        // newState.questionView.question.liked = true;
    } else if (action.type === "UNLIKE_QUESTION_SUCCESSFUL") {
        newState.questionView.question.likes = newState.questionView.question.likes.filter(u => u !== newState.token);
        // newState.questionView.question.liked = false;
    }
    return newState;
}

export default (history) => combineReducers({
    router: connectRouter(history),
    main: reducer
})
