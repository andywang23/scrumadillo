import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
//import { useDispatch, useSelector } from 'react-redux';
// merge resolved Sunday 5:46 PM
// import { NavBar } from './NavBar';
import Canvas from './Canvas';
import Signup from './Signup';
import Login from './Login';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      password: null,
      confirm: null,
      userId: null,
      loggedIn: false,
      loginErrorMsg: '',
      registerErrorMsg: '',
    };
    this.update = this.update.bind(this);
    this.toggleLogin = this.toggleLogin.bind(this);
    this.toggleLogout = this.toggleLogout.bind(this);
    this.registerUser = this.registerUser.bind(this);
    // this.github = this.github.bind(this);
  }

  update(field) {
    return (e) => this.setState({ [field]: e.target.value });
  }

  toggleLogout() {
    this.setState({ loggedIn: false });
  }

  toggleLogin(e) {
    e.preventDefault();
    const { username, password } = this.state;
    fetch('/server/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON',
      },
      body: JSON.stringify({ username, password }),
    })
      .then((resp) => resp.json())
      // assign user to state
      .then(({ username, id, err = null }) => {
        if (!err)
          this.setState({
            loggedIn: true,
            username,
            userId: id,
            password: null,
          });
        else this.setState({ loginErrorMsg: 'Username/Password Invalid' });
      })
      .catch((error) => console.log(error));
  }

  registerUser(e) {
    e.preventDefault();
    const { username, password, confirm } = this.state;
    if (password === confirm) {
      fetch('/server/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/JSON',
        },
        body: JSON.stringify({ username, password }),
      })
        .then((resp) => resp.json())
        .then(({ username, id, err = null }) => {
          if (!err) {
            alert('account created successfully');
            this.setState({
              loggedIn: true,
              username,
              userId: id,
              password: null,
            });
          } else
            this.setState({
              registerErrorMsg:
                'User was not able to be created - possible duplicate username',
            });
        });
    } else this.setState({ registerErrorMsg: 'Passwords do not match' });
  }

  /* Didn't complete the Github authentication process.
   * The process starts on the <a href> on <Login /> or <Signup />
   * The end result is a User object returned to the web browser
   * We didn't have time, but we were gonna use cookies to show <Canvas /> when Github Auth finishes
   */
  // github() {
  //   if (true) {
  //     console.log('github');
  //     axios
  //       .post(
  //         'https://cors-anywhere.herokuapp.com/https://github.com/login/oauth/authorize',
  //         {
  //           params: { client_id: 'fade47f049a7b9f4a3dc' },
  //           headers: { 'Access-Control-Allow-Origin': '*' },
  //         }
  //       )
  //       .then((data) => console.log('dataaa', data))
  //       .catch((err) => console.log('errrr', err));
  //   }
  // }

  // componentDidMount() {
  //   fetch('/server/cards')
  //     .then((data) => data.json())
  //     .then((data) => dispatch(() => cardSlice(data)));
  // }

  render() {
    console.log(this.state);
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route
              path="/signup"
              render={() => (
                <Signup
                  update={this.update}
                  registerUser={this.registerUser}
                  loggedIn={this.state.loggedIn}
                  errorMsg={this.state.registerErrorMsg}
                />
              )}
            />
            <Route
              exact
              path="/"
              render={() => (
                <Canvas
                  logout={this.toggleLogout}
                  loggedIn={this.state.loggedIn}
                  username={this.state.username}
                />
              )}
            />
            <Route
              exact
              path="/login"
              render={() => (
                <Login
                  update={this.update}
                  toggleLogin={this.toggleLogin}
                  loggedIn={this.state.loggedIn}
                  errorMsg={this.state.loginErrorMsg}
                />
              )}
            />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
