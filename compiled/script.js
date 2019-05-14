class User extends React.Component {
  render() {
    return React.createElement("div", {
      className: "search-user"
    }, React.createElement("img", {
      src: this.props.user.avatar_url,
      style: {
        maxWidth: '100px'
      }
    }), React.createElement("a", {
      href: this.props.user.html_url,
      target: "_blank"
    }, this.props.user.login));
  }

}

class UserList extends React.Component {
  get users() {
    return this.props.users.map(user => React.createElement(User, {
      key: user.id,
      user: user
    }));
  }

  render() {
    return React.createElement("div", {
      className: "search-result"
    }, this.users);
  }

}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      searchText: '',
      users: []
    };
  }

  onChangeHandle(e) {
    this.setState({
      searchText: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const {
      searchText
    } = this.state;
    const url = `https://api.github.com/search/users?q=${searchText}`;
    fetch(url).then(response => response.json()).then(responseJson => this.setState({
      users: responseJson.items
    }));
  }

  render() {
    return React.createElement("div", null, React.createElement("form", {
      className: "form",
      onSubmit: e => this.onSubmit(e)
    }, React.createElement("img", {
      className: "gitLogo",
      src: "/images/GitHub-Mark/PNG/GitHub-Mark-64px.png"
    }), React.createElement("label", {
      htmlFor: "searchText"
    }, "Search by user name"), React.createElement("input", {
      type: "text",
      id: "searchText",
      onChange: e => this.onChangeHandle(e),
      value: this.state.searchText,
      required: true
    }), React.createElement("button", {
      className: "btn",
      type: "submit"
    }, "Szukaj")), React.createElement(UserList, {
      users: this.state.users
    }));
  }

}

ReactDOM.render(React.createElement(App, null), document.getElementById('root'));