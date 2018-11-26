import React from 'react';
import TaskObj from './taskObj';
import { connect } from 'react-redux'


const CurrentTask = ({currentTask, auth}) => {

    const content = auth.uid && currentTask ? (
        <TaskObj task={currentTask} />
    ):(
       <span>No task!</span>
    );

    return(
        <div id="currentTask">
            {content}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        currentTask: state.localStore.currentTask,
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps)(CurrentTask);