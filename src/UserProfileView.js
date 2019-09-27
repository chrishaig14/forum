import React from "react";
import {connect} from "react-redux";
import QuestionListItem from "./QuestionListItem";
import "./styles/UserProfileView.css";
import {NavLink} from "react-router-dom";

class UserProfileView extends React.Component {
    componentDidMount() {
        console.log("this.props: ", this.props);
        // if (this.props.user == null) {
        this.props.onMount(this.props.match.params.id);
        // return <div>loading...</div>;
        // }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("USER PROFILE PROPS CHANGED: ", this.props);
        console.log("USER PROFILE PREV PROPS: ", prevProps);
        if (prevProps.match.params.id !== this.props.match.params.id) {
            console.log("CALLING.... GET USER PROFILE FOR USER: ", this.props.match.params.id);
            this.props.onMount(this.props.match.params.id);

        }
    }

    render() {
        if (this.props.user == null) {
            // this.props.onMount(this.props.match.params.id);
            return <div>loading...</div>;
        }
        console.log("THIS:PROPS:USER: ", this.props.user);
        return (
            <div className={"UserProfileView"}>
                <h2>{this.props.user.username}'s profile</h2>
                <div className={"user-profile-main"}>
                    <div className={"basic-info"}>
                        <div className={"stars-received"}>
                            <h3>Stars received</h3>
                            <div>Answers: {this.props.user.starsReceived.answers}</div>
                            <div>Questions: {this.props.user.starsReceived.questions}</div>
                        </div>
                    </div>
                    <div className={"user-questions"}>
                        <h3>Questions made</h3>
                        <div className={"questions-made"}>
                            {this.props.user.questions.map(q => <QuestionListItem question={q}/>)}
                        </div>
                    </div>

                    <div className={"starred-questions"}>
                        <h4>Starred questions ({this.props.user.starsGiven.questions.length})</h4>
                        <div className={"starred-questions-container"}>
                            {this.props.user.starsGiven.questions.map(q => <NavLink className={"starred-question-item"}
                                                                                    to={"/questions/" + q.question.id}>{q.question.title}</NavLink>)}
                        </div>
                    </div>
                    <div className={"starred-answers"}>
                        <h4>Starred answers ({this.props.user.starsGiven.answers.length})</h4>
                        <div className={"starred-answers-container"}>
                            {this.props.user.starsGiven.answers.map(a => <NavLink className={"starred-answer-item"}
                                                                                  to={"/questions/" + a.question.id}>{a.question.title}</NavLink>)}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.main.user
});
const mapDispatchToProps = dispatch => ({
    onMount: (username) => {
        dispatch({type: "GET_USER_PROFILE", data: {username}});
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileView);
