import {NavLink} from "react-router-dom";
import * as React from "react";
import {connect} from "react-redux";

function Question(props) {
    console.log("tags: ", props.question.tags);
    return (
        <div className={"Question"}>
            <div className={"question-container"}>
                <div className={"likes"}>

                    {props.question.liked ?
                        <button onClick={() => props.unlikeQuestion(props.question.id)} className={"unlike-button"}/> :
                        <button onClick={() => props.likeQuestion(props.question.id)} className={"like-button"}/>}
                    <div className={"likes-number"}>{props.question.likes.length}</div>
                </div>
                <div className={"question-main"}>
                    <h1>{props.question.title}</h1>
                    <p>{props.question.body}</p>
                    <div className={"question-footer"}>
                        <div className={"tags-container"}>Tags: {props.question.tags.map(t => <div
                            className={"tag"}>{t}</div>)}</div>
                        <div className={"asked-by"}>Asked by <NavLink
                            to={"/users/" + props.question.username}>{props.question.username}</NavLink></div>
                    </div>
                </div>
            </div>


        </div>
    );
}

const mapStateToProps = null;
const mapDispatchToProps = dispatch => ({
    likeQuestion: (id) => dispatch({type: "LIKE_QUESTION", data: {questionId: id}}),
    unlikeQuestion: (id) => dispatch({type: "UNLIKE_QUESTION", data: {questionId: id}})

});
export default connect(mapStateToProps, mapDispatchToProps)(Question);
