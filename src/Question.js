import {NavLink} from "react-router-dom";
import * as React from "react";
import {connect} from "react-redux";
import Cookies from "js-cookie";
import star from "./styles/star.svg";
import star_empty from "./styles/star_empty.svg";

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

function Question(props) {
    console.log("tags: ", props.question.tags);
    return (
        <div className={"Question"}>
            <div className={"question-container"}>
                <div className={"likes"}>

                    {props.question.likes.includes(Cookies.get("token")) ?
                        <button title={props.question.likes.join(",")}
                                onClick={() => props.unlikeQuestion(props.question.id)} className={"unlike-button"}>
                            <img src={star}/>
                        </button> :
                        <button title={props.question.likes.join(",")}
                                onClick={() => props.likeQuestion(props.question.id)}
                                className={"like-button"}><img src={star_empty}/></button>}
                    <div className={"likes-number"}>{props.question.likes.length}</div>
                </div>
                <div className={"question-main"}>
                    <h2>{props.question.title}</h2>
                    <div dangerouslySetInnerHTML={{"__html": props.question.body}}/>
                    <div className={"question-footer"}>
                        <div className={"tags-container"}>{props.question.tags.map(t =>
                            <NavLink
                                to={"/search?tags=" + t} className={"tag"}>{t}</NavLink>)}</div>
                        <div className={"asked"}>
                            <div className={"asked-by"}>Asked by <NavLink
                                to={"/users/" + props.question.username}>{props.question.username}</NavLink></div>
                            <div className={"timestamp"}>{timeSince(new Date(props.question.timestamp))}</div>
                        </div>
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
