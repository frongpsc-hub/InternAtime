class Test extends React.Component {
  render() {
    return React.createElement("div", null, "Hello", React.createElement(UIDiv, {
      test: "world 2"
    }, " World "));
  }

}

ReactDOM.render(React.createElement(Test, null), document.getElementById('root_abc'));
//# sourceMappingURL=auth.js.map