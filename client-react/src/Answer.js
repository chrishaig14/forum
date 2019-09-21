import {NavLink} from "react-router-dom";
import * as React from "react";
import {connect} from "react-redux";
import Cookies from "js-cookie";
import "./styles/Answer.css";

function timeSince(timeStamp) {
    let now = new Date();
    let secondsPast = (now.getTime() - timeStamp.getTime()) / 1000;
    if (secondsPast < 60) {
        return parseInt(secondsPast) + " seconds ago";
    }
    if (secondsPast < 3600) {
        let m = parseInt(secondsPast / 60);
        return m + " " + (m > 1 ? "minutes" : "minute") + " " + "ago";
    }
    if (secondsPast <= 86400) {
        let m = parseInt(secondsPast / 3600);
        return m + " " + (m > 1 ? "hours" : "hour") + " " + "ago";
    }
    if (secondsPast > 86400) {
        let day = timeStamp.getDate();
        let month = timeStamp.toDateString().match(/ [a-zA-Z]*/)[0].replace(" ", "");
        let year = timeStamp.getFullYear() === now.getFullYear() ? "" : " " + timeStamp.getFullYear();
        return day + " " + month + year;
    }
}

function Answer(props) {
    return (
        <div className={"Answer"}>
            <div className={"answer-container"}>
                <div className={"likes"}>
                    {props.answer.likes.includes(Cookies.get("token")) ?
                        <button title={props.answer.likes.join(",")} onClick={() => props.unlikeAnswer(props.answer.id)}
                                className={"unlike-button"}/> :
                        <button title={props.answer.likes.join(",")} onClick={() => props.likeAnswer(props.answer.id)}
                                className={"like-button"}/>}
                    <div className={"likes-number"}>{props.answer.likes.length}</div>

                </div>
                <div className={"answer-main"}>
                    <p>{props.answer.body}</p>
                    <div className={"answer-footer"}>
                        <div className={"answered"}>
                            <div className={"answered-by"}>Answered by <NavLink
                                to={"/users/" + props.answer.username}>{props.answer.username}</NavLink></div>
                            <div className={"timestamp"}>{timeSince(new Date(props.answer.timestamp))}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = null;
const mapDispatchToProps = dispatch => ({
    likeAnswer: (id) => dispatch({type: "LIKE_ANSWER", data: {answerId: id}}),
    unlikeAnswer: (id) => dispatch({type: "UNLIKE_ANSWER", data: {answerId: id}})

});
export default connect(mapStateToProps, mapDispatchToProps)(Answer);
