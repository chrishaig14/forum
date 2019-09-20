import * as React from "react";
import {NavLink} from "react-router-dom";


export default function QuestionListItem(props) {
    let q = props.question;
    return (<div className={"QuestionListItem"} key={q.id}>
        <div className={"likes"}>
            <div className={"unlike-button"}>★</div>

            <div style={{color: "gray"}}>{q.likes.length}</div>
        </div>
        <div className={"question-item-main"}>
            <NavLink to={"/questions/" + q.id}>{q.title}</NavLink>
            <div style={{"color": "gray"}}>{q.body}</div>
        </div>
    </div>);
}
