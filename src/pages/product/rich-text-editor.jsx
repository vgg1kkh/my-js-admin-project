import React, { Component } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'


export default class RichTextEditor extends Component {


  constructor(props) {
    super(props);
    const html = this.props.detail
    console.log("html=", html);
    if (html) {
      const contentBlock = htmlToDraft(html);
      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
        const editorState = EditorState.createWithContent(contentState);
        this.state = {
          editorState,
        }
      }
    } else {
      this.state = {
        editorState: EditorState.createEmpty()
      }
    }
  }

  // initialContent=()=>{
  //   // console.log("detail=",this.props.detail);
  //   // const html = this.props.detail
  //   const html = '<p>Hey this <strong>editor</strong> rocks 😀</p>'
  //   console.log("html=",html);
  //   const contentBlock = htmlToDraft(html);
  // if (contentBlock) {
  //   const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
  //   const editorState = EditorState.createWithContent(contentState);
  //   console.log("editorState=",editorState);
  //   this.state = {
  //     editorState,
  //   };
  // } 
  // }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
    //Store the html in the setEditor 
    this.props.setEditor(
      draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
    )
  }

  getDetail = () => {
    return draftToHtml(convertToRaw(this.state.draftToHtmleditorState.getCurrentContent()))
  }

  /* <textarea
      disabled
      value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
    /> */

  // componentDidMount(){
  //   this.initialContent()
  // }

  render() {
    const { editorState } = this.state;
    return <>

      <Editor
        editorState={editorState}
        editorStyle={{
          border: '1px solid black', minHeight: 200,
          paddingLeft: 5
        }}
        onEditorStateChange={this.onEditorStateChange}
      />



    </>
  }
}

