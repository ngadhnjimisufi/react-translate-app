import React, { Component } from "react";
import "../styles/App.css";
import Output from "./Output";
import autosize from "autosize";

class Input extends Component {
  constructor() {
    super();
    this.state = {
      content: "",
      typingTime: 0,
      inputLength: 0
    };
  }

  changeContent(e) {
    const textareaValue = e.target.value;
    if (textareaValue) {
      if (this.state.typingTime)
        clearTimeout(this.state.typingTime);
      this.setState({
        typingTime: setTimeout(() => {
          this.setContent(textareaValue);
        }, 500)
      });
    }
    else {
      clearTimeout(this.state.typingTime);
      this.setState({ content: "" });
    }
  }

  setContent(textareaValue) {
    this.setState({
      content: textareaValue
    });
  }

  incrementInput(e) {
    this.setState({
      inputLength: e.target.value.length
    });
  }

  componentDidMount() {
    autosize(document.querySelector(".textareaInput"));
  }

  render() {
    return (
      <div className="container">
        <div className="row mb-2 mt-2">
          <div className="col-md-8 col-lg-6 mx-auto">
            <textarea
              spellcheck="false"
              maxLength="5000"
              className="borderAnimate textareaInput"
              onInput={this.incrementInput.bind(this)}
              onChange={this.changeContent.bind(this)}
              placeholder="Text to translate.."
            />
            <p className="countLength">
              {this.state.inputLength}/5000
            </p>
          </div>
        </div>
        <Output content={this.state.content} />
      </div>
    );
  }

}

export default Input;
