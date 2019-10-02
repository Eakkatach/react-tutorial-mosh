import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import ProtectedRoute from './components/common/protectedRoute';
import Movies from "./components/movies";
import MovieForm from "./components/movieForm";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import NavBar from "./components/navBar";
import LoginForm from './components/loginForm';
import RegisterForm from './components/registerForm';
import LogOut from "./components/logout";
import authService from "./services/authService";
import 'react-toastify/dist/ReactToastify.css'
import "./App.css";


class App extends Component {
  state = {}

  componentDidMount() {
    const user = authService.getCurrentUser()
    this.setState({ user })
  }

  render() {
    const { user } = this.state

    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={user} />
        <main className="container">
          <Switch>
            <Route path="/logout" component={LogOut} />
            <Route path="/movie/new" component={RegisterForm} />
            <Route path="/register" component={RegisterForm} />
            <Route path="/login" component={LoginForm} />
            <ProtectedRoute path="/movies/:id" component={MovieForm} />
            <Route 
              path="/movies" 
              render={props => <Movies {...props} user={this.state.user} />} />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
