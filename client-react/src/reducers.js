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
            question: {...action.data.question, liked: action.data.question.likes.includes(newState.token)},
            answers: []
        };
    } else if (action.type === "GET_ANSWER_SUCCESSFUL") {
        newState.questionView.answers.push(action.data.answer);
    } else if (action.type === "LIKE_ANSWER_SUCCESSFUL") {
        console.log("LIKING ANSWER: ", action.data.answerId);
        newState.questionView.answers = newState.questionView.answers.map(a => {
            if (a.id === action.data.answerId) {
                a.likes.push(newState.token);
                console.log("a.likes: ", a.likes);
            }
            return a;
        });
    } else if (action.type === "UNLIKE_ANSWER_SUCCESSFUL") {
        console.log("UNLIKING ANSWER: ", action.data.answerId);
        newState.questionView.answers = newState.questionView.answers.map(a => {
            if (a.id === action.data.answerId) {
                a.likes = a.likes.filter(u => u !== newState.token);
                console.log("a.likes: ", a.likes);
            }
            return a;
        });
    } else if (action.type === "LIKE_QUESTION_SUCCESSFUL") {
        console.log("LIKING QUESTION: ", action.data.answerId);
        newState.questionView.question.likes.push(newState.token);
        newState.questionView.question.liked = true;
        console.log("LIKES:", newState.questionView.question.likes)
    } else if (action.type === "UNLIKE_QUESTION_SUCCESSFUL") {
        console.log("UNLIKING QUESTION: ", action.data.answerId);
        newState.questionView.question.likes = newState.questionView.question.likes.filter(u => u !== newState.token);
        console.log("LIKES:", newState.questionView.question.likes)
        newState.questionView.question.liked = false;
    }
    return newState;
}

export default (history) => combineReducers({
    router: connectRouter(history),
    main: reducer
})
