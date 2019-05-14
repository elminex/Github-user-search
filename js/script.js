class User extends React.Component {
  render() {
    return (
      <div className="search-user">
        <img src={this.props.user.avatar_url} style={{ maxWidth: '100px' }} />
        <a href={this.props.user.html_url} target="_blank">{this.props.user.login}</a>
      </div>
    );
  }
}

class UserList extends React.Component {
  get users() {
    return this.props.users.map(user => <User key={user.id} user={user} />)
  }

  render() {
    return (
      <div className="search-result">
        {this.users}
      </div>
    );
  }
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      searchText: '',
      users: [],
    };
  }

  onChangeHandle(e) {
    this.setState({ searchText: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const { searchText } = this.state;
    const url = `https://api.github.com/search/users?q=${searchText}`;
    fetch(url)
      .then(response => response.json())
      .then(responseJson => this.setState({ users: responseJson.items }));
  }

  render() {
    return (
      <div>
        <form className="form" onSubmit={e => this.onSubmit(e)}>
          <img className="gitLogo" src="/images/GitHub-Mark/PNG/GitHub-Mark-64px.png" />
          <label htmlFor="searchText">Search by user name</label>
          <input
            type="text"
            id="searchText"
            onChange={e => this.onChangeHandle(e)}
            value={this.state.searchText}
            required
          />
          <button className="btn" type="submit">Szukaj</button>
        </form>
        <UserList users={this.state.users} />
      </div>
    );
  }
}


ReactDOM.render(<App />, document.getElementById('root'));