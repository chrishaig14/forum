import * as React from "react";
import {connect} from "react-redux";
import "./styles/NewQuestion.css";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

class NewQuestion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {title: "", body: "", tags: ""};
    }

    render() {
        return (
            <div className={"NewQuestion"}>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    let q = {...this.state};
                    q.tags = q.tags.split(",");
                    this.props.onSubmit(q);
                }}>
                    <input type={"text"} className={"new-question-title"} required={true} placeholder={"title"}
                           value={this.state.title} onChange={e => {
                        this.setState({title: e.target.value});
                    }}/>
                    <div className={"area"}>
                        <CKEditor
                            editor={ClassicEditor}
                            data="<p>Write your question here</p>"
                            onInit={editor => {
                                // You can store the "editor" and use when it is needed.
                                console.log("Editor is ready to use!", editor);
                            }}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                // console.log({event, editor, data});
                                this.setState({body: data});

                            }}
                            onBlur={(event, editor) => {
                                console.log("Blur.", editor);
                            }}
                            onFocus={(event, editor) => {
                                console.log("Focus.", editor);
                            }}
                        />
                    </div>

                    <input className={"new-question-tags"} type={"text"} placeholder={"Tags"}
                           value={this.state.tags.join} onChange={e => {
                        this.setState({tags: e.target.value});
                    }}
                    />
                    <button className={"submit-question"} type={"submit"}>Submit question</button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = null;
const mapDispatchToProps = dispatch => ({
    onSubmit: data => {
        dispatch({type: "NEW_QUESTION", data});
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(NewQuestion);
