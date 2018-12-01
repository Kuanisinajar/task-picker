import React, { Component } from 'react';
//import { BrowserRouter, Route } from 'react-router-dom';
import CurrentTask from './components/currentTask';
import Navigation from './components/navigation';
import TaskForm from './components/taskForm';
import TaskList from './components/taskList';
import Picker from './components/picker';
import SignIn from './components/signIn';
import SignUp from './components/signUp';
import Header from './components/header';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { signOut } from './actions/authAction';
import { loadDataToCentral } from './actions/manageTask';


class App extends Component {

  componentDidMount(){
    if (this.props.firebase.auth.uid) {
     this.props.loadDataToCentral(this.props.firebase.auth.uid);
    } else {
      this.props.loadDataToCentral();
    }
  }

  render() {
    
    // Serve different component with login state
    
    return (
      <BrowserRouter>
        <div className="App">
          <ul id='template'>
            <li className='mainArea'><Picker /></li>
            <li className='mainArea'><CurrentTask /></li>
            <li className='mainArea'><TaskForm /></li>
            <li className='mainArea'><TaskList /></li>
          </ul>
          <Navigation />
          <Header />
          <Route path='/signIn' component={SignIn} />
          <Route path='/signUp' component={SignUp} />
          
          {/* <PersonalPanel /> */}
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => { dispatch(signOut()) },
    loadDataToCentral: (ownerId) => { dispatch(loadDataToCentral(ownerId)) },
    clearCentralTasks: () => { dispatch({ type: "CLEAR_CENTRAL_TASKS" }) }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
