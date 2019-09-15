import * as React from "react";
import {connect} from "react-redux";
import "./styles/QuestionList.css";
import {NavLink} from "react-router-dom";
import {parse} from "query-string";

class SearchView extends React.Component {
    componentDidMount() {
        this.props.search(this.props.location);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.location !== this.props.location) {
            this.props.search(this.props.location);
        }
    }

    render() {
        return (

            <div className={"QuestionList"}>
                <h1>{this.props.questions.length === 1 ? "1 result" : (this.props.questions.length === 0 ? "No results" : this.props.questions.length + " results")}</h1>
                {this.props.questions.map(q =>
                    <div className={"QuestionListItem"} key={q.id}>
                        <NavLink to={"/questions/" + q.id}>{q.title}</NavLink>
                        <div style={{"color": "gray"}}>{q.body}</div>
                    </div>
                )}
            </div>
        );
    }

}

const mapStateToProps = state => ({
    questions: state.main.questionList
});

const mapDispatchToProps = dispatch => ({
    search: url => {
        dispatch({type: "SEARCH", data: {url}});
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchView);
