import React, { Component } from 'react';
//import { BrowserRouter, Route } from 'react-router-dom';
import CurrentTask from './components/currentTask';
import Navigation from './components/navigation';
import TaskForm from './components/taskForm';
import TaskList from './components/taskList';
import Picker from './components/picker';
import { connect } from 'react-redux';


class App extends Component {
  
  state = {
    // task object contains properties of id, task, description and tags. Tags are arrays.
    // example: {id: 0, task: "Buy Milk", description: "Buy Milk", tags: ["housework", "forMon"]}
    tasks:[
      {id: 0, task: "Buy Milk", description: "Buy Milk", tags: ["housework", "forMon"]},
      {id: 1, task: "Buy Tape", description: "Buy Tape", tags: ["housework"]},
      {id: 2, task: "Buy Candy", description: "Buy Candy", tags: ["housework"]}
    ],
    allTags:[1, 2, 3],
    currentTask: null
  }


  render() {
    return (
      <div className="App">
        <ul id='template'>
          {/* <li><div><button onClick={this.props.addTask(this.state.tasks[3])}>test</button></div></li> */}
          <li><Picker /></li>
          <li><CurrentTask currentTask={this.state.currentTask}/></li>
          <li><TaskForm /></li>
          <li><TaskList /></li>
        </ul>
        <Navigation pickTask={this.pickTask}/>
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
