import React from 'react';
import TaskObj from './taskObj';

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

export default CurrentTask;