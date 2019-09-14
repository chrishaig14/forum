import {NavLink} from "react-router-dom";
import * as React from "react";
import {connect} from "react-redux";

function Answer(props) {
    return (
        <div className={"Answer"}>
            <div className={"answer-container"}>
                <div className={"likes"}>
                    <button onClick={() => props.likeAnswer(props.answer.id)} className={"like-button"}/>
                    <div className={"likes-number"}>{props.answer.likes.length}</div>
                </div>
                <div className={"answer-main"}>
                    <p>{props.answer.body}</p>
                    <div className={"answer-footer"}>
                        <div className={"answered-by"}>Answered by <NavLink
                            to={"/users/" + props.answer.username}>{props.answer.username}</NavLink></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = null;
const mapDispatchToProps = dispatch => ({
    likeAnswer: (id) => dispatch({type: "LIKE_ANSWER", data: {answerId: id}})
});
export default connect(mapStateToProps, mapDispatchToProps)(Answer);
