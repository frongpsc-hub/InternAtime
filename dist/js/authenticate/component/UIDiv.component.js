class UIDiv extends React.Component {
  constructor(props) {
    super(props);
    console.info('constructor');
    this.state = {
      isLoaded: false,
      point: 0
    };
  }

  componentDidMount() {
    console.info('componentDidMount 0');
    fetch('https://api.atimeonline.com/account/user_point_cgi/181941').then(data => data.json()).then(_r => {
      console.info('componentDidMount 2', _r);
      const {
        data
      } = _r;
      console.info('componentDidMount 3', data);
      const {
        point
      } = data;
      console.info('componentDidMount 4', point);
      this.setState({
        isLoaded: true,
        point: point
      });
    });
  }

  render() {
    console.info('render');
    const {
      isLoaded
    } = this.state;
    if (!isLoaded) return React.createElement("div", null, " Loading... ");
    const {
      children
    } = this.props;
    const {
      point
    } = this.state;
    return React.createElement("div", null, children, " ", point);
  }

}
//# sourceMappingURL=UIDiv.component.js.map