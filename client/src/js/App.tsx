import React, { Component } from 'react';

import Home from './components/Home';
import Profile from './components/Profile';
import Explore from './components/Explore';
import Login from './components/Login';
import Create from './components/Create';
import Navbar from './components/Navbar';

import { connect } from 'react-redux';

import {
  Switch,
  Route
} from 'react-router-dom';

const mapStateToProps = (state:any, props:any) => ({
  settings: state.settings
});

interface AppProps {
  settings: {
    darkMode: boolean
  }
}

class AppBind extends Component<AppProps> {
  render() {
    return(
      <div className={
        this.props.settings.darkMode ?
        "dark" : ""
      }>

        <div className="background"></div>

        <Navbar />

        <Switch>

          <Route 
            exact 
            path="/" 
            component={Home}/>

          <Route 
            exact
            path="/profile"
            component={Profile}/>
          
          <Route 
            exact
            path="/explore"
            component={Explore}/>
          
          <Route 
            exact
            path="/login"
            component={Login}/>
            
          <Route 
            exact
            path="/create"
            component={Create}/>

        </Switch>

      </div>
    )
  }
}

const App = connect(
  mapStateToProps
)(AppBind);

export default App;