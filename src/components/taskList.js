import React from 'react';
import TaskObj from './taskObj';

const TaskList = ({tasks}) => {

    const objects = tasks.length ? (
        tasks.map(tasks => {
            return(
                <TaskObj key={tasks.id} tasks={tasks} />
            )
        })
    ):(
        <p>No Tasks!</p>
    );

    return(
        <div id="taskList">
            {objects}
        </div>
    );
}

export default TaskList;