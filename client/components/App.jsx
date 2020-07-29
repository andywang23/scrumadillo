import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const axios = require('axios');

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
      userId: null,
      loggedIn: false,
    };
    this.toggleLogin = this.toggleLogin.bind(this);
    this.toggleLogout = this.toggleLogout.bind(this);
    this.registerUser = this.registerUser.bind(this);
    // this.github = this.github.bind(this);
  }

  toggleLogout() {
    this.setState({ loggedIn: false });
  }

  toggleLogin(username, password) {
    axios
      .post('/server/login', { username, password })
      // assign user to state
      .then((user) => {
        console.log('logged in -> ', user.data);
        this.setState({
          loggedIn: true,
          username: user.data.username,
          userId: user.data._id,
        });
      })
      .catch((error) => console.log(error));
  }

  registerUser(username, password, confirm) {
    if (password === confirm) {
      console.log('signup function');
      axios
        .post('/server/signup', { username: username, password: password })
        .then((user) => {
          if (user) {
            alert('account created successfully');
            window.location.href = 'http://localhost:8080/';

            this.setState({
              loggedIn: true,
              username: user.username,
              userId: user._id,
            });
          } else console.log('unsuccess');
        });
    } else console.log('passwords not matched');
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
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route
              path="/signup"
              render={() => (
                <Signup
                  registerUser={this.registerUser}
                  loggedIn={this.state.loggedIn}
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
                  toggleLogin={this.toggleLogin}
                  loggedIn={this.state.loggedIn}
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
