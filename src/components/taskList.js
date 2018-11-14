import React from 'react';
import TaskObj from './taskObj';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

const TaskList = ({ tasks }) => {
    const objects = tasks && tasks.length ? (
        tasks.map(tasks => {
            return (
                <TaskObj key={tasks.id} tasks={tasks} />
            )
        })
    ) : (
            <p>No Tasks!</p>
        );

    return (
        <div id="taskList">
            {objects}
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        tasks: state.firestore.ordered.tasks,
        fire: state.firestore
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'tasks' }
    ])
)(TaskList);