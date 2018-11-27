import React, { Component } from 'react';
import TaskObj from './taskObj';
import { connect } from 'react-redux'
import { clearCurrentTask } from '../actions/manageTask'

class CurrentTask extends Component {
    state = {
        picked: false,
    }

    defaultTaskBeforePick = {
        task: "挑選任務",
        description: "無論你選擇做什麼，只要持續地做，就會變得更好。"
    }
    defaultTaskAfterPick = {
        task: "深呼吸，然後擁抱天空",
        description: "完成了一件任務，很好。感受一下現在的心情吧！"
    }

    handleFinishing = () => {
        this.props.clearCurrentTask();
        this.setState({
            picked: true
        }, () => {
            console.log(this.state);
        });
    }

    render() {
        const content = this.props.currentTask ? (
            <TaskObj task={this.props.currentTask} disableEdit={true} />
            ) : (
                this.state.picked ? <TaskObj task={this.defaultTaskAfterPick} disableEdit={true} />
                : <TaskObj task={this.defaultTaskBeforePick} disableEdit={true} /> 
            );
        return (
            <div id="currentTask">
                <div className="currentTaskWrapper">
                    {content}
                    {this.props.currentTask ?
                        <button id='finBtn' onClick={this.handleFinishing}>完成</button>
                        : null}

                </div>
            </div>
        )
    }
}


// const CurrentTask = ({ currentTask, auth, clearCurrentTask }) => {


//     const content = currentTask ? (
//         <TaskObj task={currentTask} disableEdit={true} />
//     ) : (
//             <span>No task!</span>
//         );

//     return (
//         <div id="currentTask">
//             <div className="currentTaskWrapper">
//                 {content}
//                 {currentTask ?
//                     <button id='finBtn' onClick={clearCurrentTask}>完成</button>
//                     : null}

//             </div>
//         </div>
//     )
// }

const mapStateToProps = (state) => {
    return {
        currentTask: state.localStore.currentTask,
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        clearCurrentTask: () => { dispatch(clearCurrentTask()) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentTask);