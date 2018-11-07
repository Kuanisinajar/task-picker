import React from 'react';
import TaskObj from './taskObj';
import { connect } from 'react-redux';

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

const mapStateToProps = (state) => {
    return {
        tasks: state.tasks
    }
}

export default connect(mapStateToProps)(TaskList);