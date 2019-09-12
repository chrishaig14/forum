import {all, put, takeEvery, select, takeLatest} from "redux-saga/effects";

const serverUrl = "http://localhost:8000";

export function* loginAsync(action) {
    yield put({type: "LOGIN_REQUESTED"});
    let request = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({user: action.data})
    };
    let result = yield fetch(serverUrl + "/login", request);
    yield put({type: "LOGIN_SUCCESSFUL", data: {token: result.headers.get("authorization")}});
}

export function* signupAsync(action) {
    yield put({type: "SIGNUP_REQUESTED"});
    let request = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({user: action.data})
    };
    let result = yield fetch(serverUrl + "/users", request);
    yield put({type: "SIGNUP_SUCCESSFUL"});
}

export function* newQuestionAsync(action) {
    yield put({type: "NEW_QUESTION_REQUESTED"});
    let token = yield select((state) => state.token);
    let request = {
        method: "POST",
        headers: {"Content-Type": "application/json", "Authorization": token},
        body: JSON.stringify({question: action.data})
    };
    let result = yield fetch(serverUrl + "/questions", request);
    let questionId = yield result.json();
    yield put({type: "NEW_QUESTION_SUCCESSFUL", data: {questionId}});
}

export function* getAllQuestions() {
    yield put({type: "ALL_QUESTIONS_REQUESTED"});
    let result = yield fetch(serverUrl + "/questions");
    result = yield result.json();
    yield put({type: "ALL_QUESTIONS_SUCCESSFUL", data: {questions: result.questions}});
}

export function* selectQuestionAsync(action) {
    let questionId = action.data.questionId;
    yield put({type: "QUESTION_SELECTED", data: {questionId}});
    let answers = yield select(state => {
        let question = state.questionList.filter(q => q.id === questionId)[0];
        return question.answers;
    });
    for (let answerId of answers) {
        let result = yield fetch(serverUrl + "/answers/" + answerId);
        result = yield result.json();
        yield put({type: "GET_ANSWER_SUCCESSFUL", data: {answer: result.answer}});
    }
}

export function* newAnswerAsync(action) {
    yield put({type: "NEW_ANSWER_REQUESTED"});
    let token = yield select(state => state.token);
    let request = {
        method: "POST",
        headers: {"Content-Type": "application/json", "Authorization": token},
        body: JSON.stringify({answer: action.data})
    };
    let questionId = yield select(state => state.questionView.question.id);
    let result = yield fetch(serverUrl + "/questions/" + questionId + "/answers", request);
    let answerId = yield result.json();
    yield put({type: "NEW_ANSWER_SUCCESSFUL", data: {answerId}});
}

export function* watcher() {
    yield all([
        takeEvery("SELECT_QUESTION", selectQuestionAsync),
        takeLatest("LOGIN", loginAsync),
        takeEvery("SIGNUP", signupAsync),
        takeEvery("NEW_QUESTION", newQuestionAsync),
        takeEvery("NEW_ANSWER", newAnswerAsync)
    ]);
}

export default function* rootSaga() {
    yield all([getAllQuestions(), watcher()]);
}
