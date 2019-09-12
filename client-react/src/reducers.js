export default function reducer(state = {}, action) {
    let newState = JSON.parse(JSON.stringify(state));
    if (action.type === "ALL_QUESTIONS_SUCCESSFUL") {
        newState.questionList = action.data.questions;
    }
    if (action.type === "LOGIN_SUCCESSFUL") {
        newState.token = action.data.token;
    }

    return newState;
}
