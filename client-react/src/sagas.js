import {all, call, put, takeEvery, select, takeLatest} from "redux-saga/effects";

const delay = (ms) => new Promise(res => setTimeout(res, ms));

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
    yield select(state => {
        console.log("STATE: ", state);
    });
    let token = yield select((state) => state.token);
    let request = {
        method: "POST",
        headers: {"Content-Type": "application/json", "Authorization": token},
        body: JSON.stringify({question: action.data})
    };
    let result = yield fetch(serverUrl + "/questions", request);
    let questionId = yield result.json();
    console.log("NWE QUESTION ID: ", questionId);
    yield put({type: "NEW_QUESTION_SUCCESSFUL", data: {questionId}});
}

export function* getAllQuestions() {
    yield put({type: "ALL_QUESTIONS_REQUESTED"});
    let result = yield fetch(serverUrl + "/questions");
    result = yield result.json();
    console.log("RESULT: ", result);
    yield put({type: "ALL_QUESTIONS_SUCCESSFUL", data: {questions: result.questions}});
}

export function* watcher() {
    yield all([takeLatest("LOGIN", loginAsync), takeEvery("SIGNUP", signupAsync), takeEvery("NEW_QUESTION", newQuestionAsync)]);
}

export default function* rootSaga() {
    yield all([getAllQuestions(), watcher()]);
}
