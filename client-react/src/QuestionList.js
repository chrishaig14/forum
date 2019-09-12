import * as React from "react";
import {connect} from "react-redux";

class QuestionList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {username: "", password: ""};
    }

    render() {
        console.log("questions: ", this.props.questions);
        return (

            <div className={"QuestionList"}>
                {this.props.questions.map(q =>
                    <div className={"QuestionListItem"}>
                        Title: {q.title}
                        Body: {q.body}
                        Username: {q.username}
                    </div>
                )}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    questions: state.questionList
});

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(QuestionList);
