import {all, put, takeEvery, select, takeLatest} from "redux-saga/effects";

import {push, replace} from "connected-react-router";
import {parse} from "query-string";

const serverUrl = "http://localhost:8000";

export function* loginAsync(action) {
    yield put({type: "LOGIN_REQUESTED"});
    let request = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({user: action.data})
    };
    let result = yield fetch(serverUrl + "/login", request);
    if (result.ok) {
        yield put({type: "LOGIN_SUCCESSFUL", data: {token: result.headers.get("authorization")}});
        yield put(push("/"));
    }
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
    yield put(push("/"));
}

export function* newQuestionAsync(action) {
    yield put({type: "NEW_QUESTION_REQUESTED"});
    let token = yield select((state) => state.main.token);
    let request = {
        method: "POST",
        headers: {"Content-Type": "application/json", "Authorization": token},
        body: JSON.stringify({question: action.data})
    };
    let result = yield fetch(serverUrl + "/questions", request);
    let {questionId} = yield result.json();
    yield put({type: "NEW_QUESTION_SUCCESSFUL", data: {questionId}});
    console.log("NEW QUESTION:", questionId);
    yield put(push("/questions/" + questionId));
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
    let result = yield fetch(serverUrl + "/questions/" + questionId);
    result = yield result.json();
    yield put({type: "GET_QUESTION_SUCCESSFUL", data: {...result}});
    let answers = result.question.answers;
    for (let answerId of answers) {
        let result = yield fetch(serverUrl + "/answers/" + answerId);
        result = yield result.json();
        yield put({type: "GET_ANSWER_SUCCESSFUL", data: {answer: result.answer}});
    }
}

export function* newAnswerAsync(action) {
    yield put({type: "NEW_ANSWER_REQUESTED"});
    let token = yield select(state => state.main.token);
    let request = {
        method: "POST",
        headers: {"Content-Type": "application/json", "Authorization": token},
        body: JSON.stringify({answer: action.data})
    };
    let questionId = yield select(state => state.main.questionView.question.id);
    let result = yield fetch(serverUrl + "/questions/" + questionId + "/answers", request);
    let answerId = yield result.json();
    yield put({type: "NEW_ANSWER_SUCCESSFUL", data: {answerId}});
}

export function* likeAnswerAsync(action) {
    let token = yield select(state => state.main.token);
    let request = {
        method: "PUT",
        headers: {"Content-Type": "application/json", "Authorization": token}
    };
    let answerId = action.data.answerId;
    let result = yield fetch(serverUrl + "/answers/" + answerId + "/likes", request);
    yield put({type: "LIKE_ANSWER_SUCCESSFUL", data: {answerId}});
}

export function* likeQuestionAsync(action) {
    let token = yield select(state => state.main.token);
    let request = {
        method: "PUT",
        headers: {"Content-Type": "application/json", "Authorization": token}
    };
    let questionId = action.data.questionId;
    let result = yield fetch(serverUrl + "/questions/" + questionId + "/likes", request);
    yield put({type: "LIKE_QUESTION_SUCCESSFUL", data: {questionId}});
}

export function* unlikeAnswerAsync(action) {
    let token = yield select(state => state.main.token);
    let request = {
        method: "DELETE",
        headers: {"Content-Type": "application/json", "Authorization": token}
    };
    let answerId = action.data.answerId;
    let result = yield fetch(serverUrl + "/answers/" + answerId + "/likes", request);
    yield put({type: "UNLIKE_ANSWER_SUCCESSFUL", data: {answerId}});
}

export function* unlikeQuestionAsync(action) {
    let token = yield select(state => state.main.token);
    let request = {
        method: "DELETE",
        headers: {"Content-Type": "application/json", "Authorization": token}
    };
    let questionId = action.data.questionId;
    let result = yield fetch(serverUrl + "/questions/" + questionId + "/likes", request);
    yield put({type: "UNLIKE_QUESTION_SUCCESSFUL", data: {questionId}});
}

export function* searchAsync(action) {
    let request = {
        method: "GET",
        headers: {"Content-Type": "application/json"}
    };
    let url = action.data.url;
    let result = yield fetch(serverUrl + "/search" + url.search, request);
    result = yield result.json();
    yield put({type: "SEARCH_RESULTS_READY", data: {searchResults: result}});
}


export function* submitSearchAsync(action) {
    let url = "/search?terms=" + action.data.terms;
    yield put(push(url));
}


export function* watcher() {
    yield all([
        takeEvery("LIKE_ANSWER", likeAnswerAsync),
        takeEvery("SEARCH", searchAsync),
        takeEvery("SUBMIT_SEARCH", submitSearchAsync),
        takeEvery("LIKE_QUESTION", likeQuestionAsync),
        takeEvery("UNLIKE_ANSWER", unlikeAnswerAsync),
        takeEvery("UNLIKE_QUESTION", unlikeQuestionAsync),
        takeEvery("FETCH_QUESTION", selectQuestionAsync),
        takeLatest("LOGIN", loginAsync),
        takeEvery("SIGNUP", signupAsync),
        takeEvery("NEW_QUESTION", newQuestionAsync),
        takeEvery("NEW_ANSWER", newAnswerAsync),
        takeEvery("GET_ALL_QUESTIONS", getAllQuestions)
    ]);
}

export default function* rootSaga() {
    yield all([watcher()]);
}
