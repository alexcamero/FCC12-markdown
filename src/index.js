import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


import marked from "marked";

marked.setOptions({
  gfm: true,
  breaks: true
});

const defaultMarkup = "# Welcome to my React Markdown Previewer!\n## This is a sub-heading...\n### And here's some other cool stuff:\nHeres some code, `<div></div>`, between 2 backticks.\n\n```\n// this is multi-line code:\n\nfunction anotherExample(firstLine, lastLine) {\n\t\tif (firstLine == '```' && lastLine == '```') {\n\t\t\t\treturn multiLineCode;\n\t\t}\n}\n```\n\nYou can also make text **bold**...\nwhoa!\nOr _italic_.\nOr... wait for it... **_both!_**\nAnd feel free to go crazy ~~crossing stuff out~~.\n\nThere's also [links](https://www.freecodecamp.com), and\n> Block Quotes!\nAnd if you want to get really crazy, even tables:\nWild Header | Crazy Header | Another Header?\n------------ | ------------- | -------------\nYour content can | be here, and it | can be here....\nAnd here. | Okay. | I think we get it.\n- And of course there are lists.\n\t\t- Some are bulleted.\n\t\t\t\t\t- With different indentation levels.\n\t\t\t\t\t\t\t\t- That look like this.\n\n\n1. And there are numbererd lists too.\n1. Use just 1s if you want!\n1. And last but not least, let's not forget embedded images:\n![React Logo w/ Text](https://goo.gl/Umyytc)"

const Bar = (props) => {
  const styles = {
    width: '100%',
    height: 30,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#777',
    boxShadow: '0 -1px 3px 3px #333'
  }
  
  const icon = props.big ? "fa fa-soccer-ball-o" : "fa fa-arrows";
  
  return (<div style={styles}>
      <div style={{marginLeft: 5}}><i className="fa fa-free-code-camp"></i> {props.title}</div>
      <a href="#" onClick={props.resize}><i className={icon}></i></a>
      </div>);
};

const Editor = (props) => {
  let styles = {
        width: '55%',
        minHeight: 300
      };
  let big = false;
  switch(props.windowState) {
    case "Editor":
      big = true;
      styles = {
        width: '98%',
        minHeight: '90vh'
      };
      break;
    case "Previewer":
      styles = {
        display: 'none'
      };
      break;
  }
  
  const resizeEditor = () => props.resize("Editor");

  return (
    <div style={styles} className="window">
    <Bar title="Editor" resize={resizeEditor} big={big} />
    <textarea id="editor" value={props.code} onChange={props.changeHandler} />
    </div>
  );
};

const Previewer = (props) => {
  let styles = {
        width: '85%',
        minHeight: 300
      };
  let big = false;
  switch(props.windowState) {
    case "Editor":
      styles = {
        display: 'none'
      };
      break;
    case "Previewer":
      big = true;
      styles = {
        width: '98%',
        minHeight: '90vh'
      };
      break;
  }

  const resizePreviewer = () => props.resize("Previewer");
  
  return (
    <div style={styles} className="window">
    <Bar title="Previewer" resize={resizePreviewer} big={big} />
    <div id="preview" dangerouslySetInnerHTML={{__html: marked(props.code)}} />
    </div>
  );
};

class MainWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      windowState: "Normal",
      code: defaultMarkup
    }
    this.resize = this.resize.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
  }
  
  changeHandler(event) {
    this.setState({code: event.target.value});
  }
  
  resize(window) {
    this.setState(state => {
      switch(state.windowState) {
        case "Editor":
        case "Previewer":
          return {windowState: "Normal"};
          break;
        case "Normal":
        default:
          return {windowState: window};
      }
    });

  }
  
  render() {
    const styles = {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
      alignItems: 'center'
    }
    return (
      <div style={styles}>
        <Editor windowState={this.state.windowState} resize={this.resize} code={this.state.code} changeHandler={this.changeHandler} />
        <Previewer windowState={this.state.windowState} resize={this.resize} code={this.state.code} />
      </div>
    );
  }

}

ReactDOM.render(<MainWindow />, document.getElementById("root"));
