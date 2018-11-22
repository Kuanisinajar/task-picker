export const addTask = (task) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        // async calls to database
        const firestore = getFirestore();
        firestore.collection('userTasks').add({
            ...task
        }).then(() => {
            dispatch({
                type: "ADD_TASK",
                task: task
            });
        }).catch((err) => {
            dispatch({
                type: "ADD_TASK_ERROR",
                err
            });
        })
    }
}

export const deleteTask = (taskId) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {

        // async calls to database
        const firestore = getFirestore();
        firestore.collection('userTasks').doc(taskId).delete()
            .then(() => {
                dispatch({
                    type: "DELETE_TASK",
                });
            }).catch((err) => {
                dispatch({
                    type: "DELETE_TASK_ERROR",
                    err
                });
            })

    }
}

export const editTask = (task, userId) => {

    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        firestore.collection('userTasks').doc(task.id).update({
            task: task.task,
            description: task.description,
            tags: task.tags,
            id: task.id,
            ownerId: userId
        }).then(() => {
            dispatch({
                type: "UPDATE_TASK",
                task: task
            });
        }).catch((err) => {
            dispatch({
                type: "UPDATE_TASK_ERROR",
                err
            })
        })
    }
}

export const loadTasksToCentral = (ownerId) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();

        firestore.collection('userTasks').where('ownerId', '==', ownerId).get()
            .then((snapshot) => {
                const tasks = [];
                snapshot.docs.forEach(doc => {
                    tasks.push(doc.data());
                });
                dispatch({
                    type: 'LOAD_TASKS_FROM_FIRESTORE',
                    tasks: tasks
                });
            }).catch((err) => {
                dispatch({
                    type: 'LOAD_TASKS_ERROR',
                    err
                });
            });
    }
}