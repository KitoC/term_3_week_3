
import React, { Component, Fragment } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';







const api = 'http://localhost:3000/api'


const Header = (props) => (
  <header className="App-header">
    <img src={logo} className="App-logo" alt="logo" />
    <h1 className="App-title">Welcome to React</h1>
    <a onClick={props.logout}>Logout</a>
  </header>
)   
  


const LoginForm = (props) => {
  return (

    <form onSubmit={props.loginSubmit}>
      <h2>Login</h2>

      <label htmlFor="email" >Email</label>
      <input type="email" id="email" onChange={props.emailChanged} />

      <label htmlFor="pass">Password</label>
      <input type="password" id="pass" onChange={props.passwordChanged} />

      <button>Submit</button>

    </form>
  )
}


class App extends Component {
  state = {
    email: '',
    password: '',
    loggedIn: false
  }

  login = (e) => {
    e.preventDefault()
    axios.post(api + '/login', {
      email: this.state.email,
      password: this.state.password
    }).then((res) => {
      if(res.status === 200) {
        this.setState({ loggedIn: true })
      } else {
        // Do some error handling
      }
    })
  }

  logout = (e) => {
    axios.get(api + '/logout')
  }

  emailChanged = (e) => {
    this.setState({ email: e.target.value })
  }

  passwordChanged = (e) => {
    this.setState({ password: e.target.value })
  }

  render() {
   
    return(
      <div className="App">
            <Header logout={this.logout} />
        { this.state.loggedIn ? <p> You are Logged in </p> : <LoginForm loginSubmit={this.login} emailChanged={this.emailChanged} passwordChanged={this.passwordChanged} /> }

        </div>
        )
      
  }
}

export default App;
