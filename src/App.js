import React, { Component } from 'react';
//import { BrowserRouter, Route } from 'react-router-dom';
import CurrentTask from './components/currentTask';
import Navigation from './components/navigation';
import TaskForm from './components/taskForm';
import TaskList from './components/taskList';
import { connect } from 'react-redux';
//import { addTask } from './actions/addTask'


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

  

  componentWillMount(){
    let tags = [...this.state.allTags];
    for (var i = 0; i < this.state.tasks.length; i++){
      this.compareTags(this.state.tasks[i].tags, tags, tags);
    }
    this.setState({
      allTags: tags
    });
  }

  compareTags = (arr1, arr2, newArr) => {
    for (let x of arr1){
      let shouldAdd = true;
      for(let y of arr2) {
        if (x === y) {
          shouldAdd = false;
        }
      }
      if (shouldAdd){
        newArr.push(x);
      }
    }
  }

  addTask = (task) => {
    task.id = this.state.tasks.length + 1;
    const newTasks = [...this.state.tasks, task];
    this.setState({
      tasks: newTasks
    });
  }
  
  pickTask = () => {
    this.setState({
      currentTask: this.state.tasks[Math.floor(Math.random() * this.state.tasks.length)]
    });
    
  }

  render() {
    return (
      <div className="App">
        <ul id='template'>
          {/* <li><div><button onClick={this.props.addTask(this.state.tasks[3])}>test</button></div></li> */}
          <li><CurrentTask currentTask={this.state.currentTask}/></li>
          <li><TaskForm /*addTask={this.addTask}*/ /*allTags={this.state.allTags}*//></li>
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

// const mapDispatchToProps = (dispatch) => {
//   return {
//     addTask: (task) => {dispatch(addTask(task))} 
//   }
// }

export default connect(mapStateToProps)(App);
