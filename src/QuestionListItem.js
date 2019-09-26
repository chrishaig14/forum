import * as React from "react";
import {NavLink} from "react-router-dom";
import star from "./styles/star.svg";

export default function QuestionListItem(props) {
    let q = props.question;
    return (<div className={"QuestionListItem"} key={q.id}>
        <div className={"likes"}>
            <div className={"unlike-button"}><img src={star}/></div>

            <div style={{color: "gray"}}>{q.likes.length}</div>
        </div>
        <div className={"question-item-main"}>
            <NavLink to={"/questions/" + q.id}>{q.title}</NavLink>
            {/*<div style={{"color": "gray"}}>{q.body}</div>*/}
            <div className={"tags-container"}>{props.question.tags.map(t =>
                <NavLink
                    to={"/search?tags=" + t} className={"tag"}>{t}</NavLink>)}</div>
        </div>
    </div>);
}
