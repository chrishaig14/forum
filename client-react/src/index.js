import "bootstrap/dist/css/bootstrap.min.css";

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import {createStore, compose, applyMiddleware} from "redux";
import createSagaMiddleware from "redux-saga";
import {Provider} from "react-redux";

import rootSaga from "./sagas";
import createRootReducer from "./reducers";
import {createBrowserHistory} from "history";
import {ConnectedRouter, routerMiddleware} from "connected-react-router";
import SignupBox from "./SignupBox";
import LoginBox from "./LoginBox";
import NewQuestion from "./NewQuestion";
import QuestionList from "./QuestionList";
import QuestionView from "./QuestionView";
import {Redirect, Route, Switch} from "react-router-dom";
import Header from "./Header";
import Cookies from "js-cookie";
import SearchView from "./SearchView";
import UserProfileView from "./UserProfileView";

const sagaMiddleware = createSagaMiddleware();
export const history = createBrowserHistory();

const initialState = {
    main: {
        value: 0,
        questionList: [],
        questionView: {question: null, answers: []},
        token: Cookies.get("token"),
        user: {questions: []}
    }
};

const store = createStore(
    createRootReducer(history),
    initialState,
    compose(applyMiddleware(routerMiddleware(history), sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Header/>
            <div style={{"margin-top": "70px"}}>
                <Route exact path={"/login"} component={LoginBox}/>
                <Route path={"/signup"} component={SignupBox}/>
                <Route path={"/newQuestion"}
                       render={() => Cookies.get("token") ? <NewQuestion/> : <Redirect to={"/login"}/>}/>
                <Route exact path={"/"} component={QuestionList}/>
                <Route path={"/questions/:id"} component={QuestionView}/>
                <Route path={"/users/:id"} component={UserProfileView}/>
                <Route path={"/search"} component={SearchView}/>
            </div>
        </ConnectedRouter>
    </Provider>, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
