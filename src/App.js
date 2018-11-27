import React, { Component } from 'react';
//import { BrowserRouter, Route } from 'react-router-dom';
import CurrentTask from './components/currentTask';
import Navigation from './components/navigation';
import TaskForm from './components/taskForm';
import TaskList from './components/taskList';
import Picker from './components/picker';
import SignIn from './components/signIn';
import SignUp from './components/signUp';
import PersonalPanel from './components/personalPanel';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { Link, NavLink } from 'react-router-dom';
import { signIn, signOut } from './actions/authAction';
import { loadTasksToCentral } from './actions/manageTask';


class App extends Component {

  componentDidMount(){
    if (this.props.firebase.auth.uid) {
     this.props.loadTasksToCentral(this.props.firebase.auth.uid);
    } else {
      this.props.loadTasksToCentral();
    }
  }

  render() {
    
    // Serve different component with login state
    const authPannel = this.props.firebase.auth.uid ? (
      <div id='authPannel'>
        <button onClick={() => { this.props.signOut() }}>登出</button>
      </div>
    ) : (
        <div id='authPannel'>
          <Link to="/signIn">登入</Link>
           ｜
          <Link to='/signUp'>註冊</Link>
        </div>
      );

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
          { authPannel }
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
    loadTasksToCentral: (ownerId) => { dispatch(loadTasksToCentral(ownerId)) },
    clearCentralTasks: () => { dispatch({ type: "CLEAR_CENTRAL_TASKS" }) }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
