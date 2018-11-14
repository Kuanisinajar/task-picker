import React, { Component } from 'react';
//import { BrowserRouter, Route } from 'react-router-dom';
import CurrentTask from './components/currentTask';
import Navigation from './components/navigation';
import TaskForm from './components/taskForm';
import TaskList from './components/taskList';
import Picker from './components/picker';
import Welcome from './components/welcome';
import PersonalPanel from './components/personalPanel';
import { connect } from 'react-redux';


class App extends Component {

  render() {

    // Serve different component with login state
    const content = this.props.firebase.auth.uid ? (
      <div>
        <ul id='template'>
          <li><Picker /></li>
          <li><CurrentTask /></li>
          <li><TaskForm /></li>
          <li><TaskList /></li>
        </ul>
        <Navigation />
      </div>
    ) : (
        <Welcome />
      );

    return (
      <div className="App">
        {content}
        <PersonalPanel />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state
  }
}

export default connect(mapStateToProps)(App);
