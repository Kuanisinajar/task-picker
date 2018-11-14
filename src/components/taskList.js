import React from 'react';
import TaskObj from './taskObj';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

const TaskList = ({ defaultTasks, userTasks, auth }) => {

    const defaultObjects = defaultTasks && defaultTasks.length ? (
        defaultTasks.map(tasks => {
            return (
                <TaskObj key={tasks.id} tasks={tasks} />
            )
        })
    ) : (
            <p>No Tasks!</p>
        );

    const userObjects = userTasks && userTasks.length ? (
        userTasks.map((tasks, index) => {
            return (
                <TaskObj key={index} tasks={tasks} />
            )
        })
    ) : (
            <p>No Tasks!</p>
        );

    return (
        <div id="taskList">
            { auth.uid ? userObjects : defaultObjects }
        </div>
    );
}

const mapStateToProps = (state) => {
    console.log(state);
    return {
        userTasks: state.firebase.profile.userTasks,
        defaultTasks: state.firestore.ordered.defaultTasks,
        firestore: state.firestore,
        auth: state.firebase.auth
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'defaultTasks' }, { collection: 'users' }
    ])
)(TaskList);