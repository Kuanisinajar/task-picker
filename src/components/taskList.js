import React from 'react';
import TaskObj from './taskObj';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import CustomScroll from 'react-custom-scroll';


const TaskList = ({ defaultTasks, userTasks, auth }) => {
    const defaultObjects = defaultTasks && defaultTasks.length ? (
        defaultTasks.map(task => {
            return (
                <TaskObj key={task.id} task={task} />
            )
        })
    ) : (
            <p>No Tasks!</p>
        );

    const userObjects = userTasks && userTasks.length ? (
        userTasks.map(task => {
            return (
                <TaskObj key={task.id} task={task} />
            )
        })
    ) : (
            <p>No Tasks!</p>
        );
    return (
        <div id="taskList">
            <CustomScroll heightRelativeToParent="100%">
                {auth.uid ? userObjects : defaultObjects}
            </CustomScroll>
        </div>
    );
}

const mapStateToProps = (state) => {
    const userTasks = state.firestore.ordered.userTasks && state.firestore.ordered.userTasks.filter(task => task.ownerId === state.firebase.auth.uid);

    return {
        userTasks: state.localStore.tasks,
        // userTasks: userTasks,
        defaultTasks: state.firestore.ordered.defaultTasks,
        firestore: state.firestore,
        auth: state.firebase.auth
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'defaultTasks' }, { collection: 'userTasks' }
    ])
)(TaskList);