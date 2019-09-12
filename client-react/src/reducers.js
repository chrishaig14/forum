export default function reducer(state = {}, action) {
    let newState = JSON.parse(JSON.stringify(state));
    if (action.type === "ALL_QUESTIONS_SUCCESSFUL") {
        newState.questionList = action.data.questions;
    } else if (action.type === "LOGIN_SUCCESSFUL") {
        newState.token = action.data.token;
    } else if (action.type === "QUESTION_SELECTED") {
        newState.questionView = {
            question: state.questionList.filter(q => q.id === action.data.questionId)[0],
            answers: []
        };
    } else if (action.type === "GET_ANSWER_SUCCESSFUL") {
        newState.questionView.answers.push(action.data.answer);
    }
    return newState;
}
