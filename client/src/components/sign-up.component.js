import React, { Component } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { Card, Logo, Form, Button } from './AuthForm';
import logoImg from "./logo.jpg"

export default class CreateUser extends Component {
  constructor(props) {
    super(props);

    this.handelChangeEmail = this.handelChangeEmail.bind(this);
    this.handelChangeUsername = this.handelChangeUsername.bind(this);
    this.handelChangePassword = this.handelChangePassword.bind(this);
    this.handelChangeFirstname = this.handelChangeFirstname.bind(this);
    this.handelChangeLastname = this.handelChangeLastname.bind(this);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      email: '',
      password: '',
      firstname: '',
      lastname: ''
    }
  }

  handelChangeUsername=(e) =>{
    this.setState({
      username: e.target.value
    })
  }
  handelChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }
  handelChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }
  handelChangeFirstname(e){
      this.setState({
          firstname: e.target.value
      })
  }
  handelChangeLastname(e){
    this.setState({
        lastname: e.target.value
    })
}


  onSubmit(e) {
    e.preventDefault();

    const user = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      firstname: this.state.firstname,
      lastname: this.state.lastname
    }

    console.log(user);

    axios.post('http://localhost:5000/users/add', user)
    .then(res => {
      document.getElementById('accoutCreated').innerText = "Account created Successfully! "
      setTimeout(function(){ window.location = "/login"; }, 1000);
    })
    .catch(() =>document.getElementById('accoutCreated').innerText = "The email is already exists! ")
    this.setState({
      username: '',
      email: '',
      password: '',
      firstname: '',
      lastname: ''
    })

  }

  render() {
    return (
      <Card>
        <Logo src={logoImg} />

        <Form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Username: </label>
            <input  type="text"
                required
                placeholder="username"
                className="form-control"
                name= "username"
                value={this.state.name}
                onChange={this.handelChangeUsername}
                />
               <label>First Name: </label>
            <input  type="text"
                required
                className="form-control"
                name="firstname"
                placeholder="first name"
                value={this.state.name}
                onChange={this.handelChangeFirstname}
                />
                <label>Last Name: </label>
            <input  type="text"
                required
                className="form-control"
                name="lastname"
                placeholder="last name"
                value={this.state.name}
                onChange={this.handelChangeLastname}
                />
                <label>Email: </label>
            <input  type="email"
                required
                className="form-control"
                name="email"
                placeholder="email"
                value={this.state.name}
                onChange={this.handelChangeEmail}
                />
                 <label>Password: </label>
            <input  type="Password"
                required
                className="form-control"
                name="password"
                placeholder="password"
                value={this.state.name}
                onChange={this.handelChangePassword}
                />
                <p style={{color: "red","font-size": "10px"}} >Password must have at least: 10 letters, 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character</p>


          </div>
          <div className="form-group">
            <Button onClick={this.onSubmit} type="submit" className="btn btn-primary" >
              Sign up
            </Button>
          </div>
          </Form>

          <Link to="/login"> Already have an account ! Log in </Link>
          <br/>
          <p id="accoutCreated"></p>

        </Card>

    )
  }
}
