import React from 'react';
import TaskObj from './taskObj';
import { connect } from 'react-redux'


const CurrentTask = ({currentTask}) => {

    const content = currentTask ? (
        <TaskObj tasks={currentTask} />
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
        currentTask: state.currentTask
    }
}

export default connect(mapStateToProps)(CurrentTask);