export const addTask = (task) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {

        // async calls to database
        const firestore = getFirestore();
        firestore.collection('tasks').add({
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
        firestore.collection('tasks').doc(taskId).delete()
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

export const editTask = (task, id) => {

    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        firestore.collection('tasks').doc(id).update({
            ...task
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