import React from "react";
import {connect} from "react-redux";
import QuestionListItem from "./QuestionListItem";

class UserProfileView extends React.Component {
    componentDidMount() {
        this.props.onMount(this.props.match.params.id);
    }

    render() {
        return (
            <div>
                <h2>{this.props.user.username}'s profile</h2>
                <h3>Questions</h3>
                {this.props.user.questions.map(q => <QuestionListItem question={q}/>)}
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
