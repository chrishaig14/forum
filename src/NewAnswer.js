import * as React from "react";
import {connect} from "react-redux";
import "./styles/NewAnswer.css";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

class NewAnswer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {body: ""};
    }

    render() {
        return (
            <div className={"NewAnswer"}>
                <h3>New answer</h3>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    // let content = tinyMCE.getContent("new-answer-body");
                    // console.log("content:", content);
                    this.props.onSubmit(this.state);
                }}>
                    <CKEditor
                        editor={ClassicEditor}
                        data="<p>Write your answer here</p>"
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
                    <button className={"submit-answer"} type={"submit"}>Submit answer</button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = null;
const mapDispatchToProps = dispatch => ({
    onSubmit: data => {
        dispatch({type: "NEW_ANSWER", data});
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(NewAnswer);
