import React from 'react';
import TaskObj from './taskObj';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import CustomScroll from 'react-custom-scroll';


const TaskList = ({ tasks, auth }) => {
    // const defaultObjects = defaultTasks && defaultTasks.length ? (
    //     defaultTasks.map(task => {
    //         return (
    //             <TaskObj key={task.id} task={task} />
    //         )
    //     })
    // ) : (
    //         <p>No Tasks!</p>
    //     );

    // const userObjects = userTasks && userTasks.length ? (
    //     userTasks.map(task => {
    //         return (
    //             <TaskObj key={task.id} task={task} />
    //         )
    //     })
    // ) : (
    //         <p>No Tasks!</p>
    //     );
    const contents = tasks && tasks.length ? (
        tasks.map(task => {
            return (
                <TaskObj key={task.id} task={task} />
            )
        })
        ) : (
            <TaskObj key='noTasksRightNow' task={{task: '新增任務', description: '任務清單目前沒有任何任務，想想自己有什麼想做卻很久沒做的事吧！'}} />
        );
    return (
        <div id="taskList">
            <div className="taskWrapper">
                <CustomScroll heightRelativeToParent="100%">
                    {contents}
                </CustomScroll>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    // const userTasks = state.firestore.ordered.userTasks && state.firestore.ordered.userTasks.filter(task => task.ownerId === state.firebase.auth.uid);

    return {
        tasks: state.localStore.tasks,
        // userTasks: state.localStore.tasks,
        // userTasks: userTasks,
        //defaultTasks: state.firestore.ordered.defaultTasks,
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