import React, { Component } from "react";
import "../styles/App.css";
import { ClimbingBoxLoader } from "react-spinners";
import autosize from "autosize";

class Output extends Component {
  constructor() {
    super();
    this.state = {
      translatedContent: "",
      translateInto: "",
      languageList: null,
      loading: false
    };
  }

  fetchmetoda() {
    this.setState({
      loading: true,
      translatedContent: ""
    });

    let data = {
      text: this.props.content,
      to: this.state.translateInto
    };

    fetch("http://192.168.0.17:4000/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
      .then((res) => res.json())
      .then(responseJson => {
        this.setState(
          {
            translatedContent: responseJson.text,
            loading: false
          } , () => {
            if (!this.props.content){
              this.setState({
                translatedContent: ""
              });
            }
          });
      })
      .then(() => autosize.update(
        document.querySelector(".textareaOutput")));
  }

  changeLanguage(languageCode) {
    this.setState(
      {
        translateInto: languageCode
      } , () => {
        if (this.props.content && this.state.translatedContent)
          this.fetchmetoda();  
      });
  }

  componentDidMount() {
    autosize(document.querySelector(".textareaOutput"));
    fetch("http://192.168.0.17:4000/getSupportedLanguages")
      .then(respond => respond.json())
      .then(arrayLanguages => {
        this.setState({
          languageList: arrayLanguages,
          translateInto: arrayLanguages[1].code
        });
      });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.content !== this.props.content) {
      if (this.props.content) {
        this.fetchmetoda();
      } 
      else {
        this.setState({ translatedContent: "" }, () => {
          autosize.update(document.querySelector(".textareaOutput"));
        });
      }
    }
  }

  render() {
    return (
        <div className="row">
          <div className="col-md-8 col-lg-6 mx-auto text-center">
            <p>to:</p>
            <button
              className="btn btn-secondary dropdown-toggle btn-outline-danger buttonStyle"
              type="button"
              data-toggle="dropdown">
              {
                this.state.translateInto ? this.state.languageList.find(e => {
                    return e.code === this.state.translateInto;
                  }).name : "Loading"
              }
            </button>
            <div className="dropdown-menu">
              {
                this.state.languageList ? this.state.languageList.map(element => {
                    return (
                      <a 
                        key={element.code}
                        onClick={this.changeLanguage.bind(this, element.code)}
                        className="dropdown-item bgremover">
                        {element.name}
                      </a>
                    );
                  }) : ""
              }
            </div>
            <div className="sweet-loading loadingAnimation">
              <ClimbingBoxLoader
                sizeUnit={"px"}
                size={14}
                color={"#DA3746;"}
                loading={this.state.loading}
              />
            </div>
            <textarea 
              className="textareaOutput mt-3"
              value={this.state.translatedContent}
              readOnly
            />
          </div>
        </div>  
    );
  }
}

export default Output;
