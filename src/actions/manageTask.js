export const addTask = (task, userId) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        if (userId !== undefined) {
            firestore.collection('userTasks').add({
                ...task
            }).then((snapshot) => {
                dispatch({
                    type: "ADD_TASK",
                    task: task,
                    taskId: snapshot.id
                });
            }).catch((err) => {
                dispatch({
                    type: "ADD_TASK_ERROR",
                    err
                });
            })
        } else {
            const key = getState().localStore.tasks.length
            dispatch({
                type: "ADD_TASK",
                task: task,
                taskId: key
            });
        }
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
                    taskId: taskId
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
        if (userId) {
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
        } else {
            dispatch({
                type: "UPDATE_DEFAULT_TASK",
                task: task
            })
        }
    }
}

export const loadDataToCentral = (ownerId) => {
    const id = ownerId;
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        if (id !== undefined) {
            firestore.collection('userTasks').where('ownerId', '==', ownerId).get()
                .then((snapshot) => {
                    const tasks = [];
                    snapshot.docs.forEach(doc => {
                        const task = doc.data();
                        task.id = doc.id;
                        tasks.push(task);
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
            firestore.collection('userTags').where('ownerId', '==', ownerId).get()
                .then((snapshot) => {
                    const tags = [];
                    snapshot.docs.forEach(doc => {
                        const tag = doc.data();
                        tag.id = doc.id;
                        tags.push(tag);
                    });
                    dispatch({
                        type: 'LOAD_TAGS_FROM_FIRESTORE',
                        tags: tags
                    });
                }).catch((err) => {
                    dispatch({
                        type: 'LOAD_TAGS_ERROR',
                        err
                    });
                });
        } else {
            firestore.collection('defaultTasks').get()
                .then((snapshot) => {
                    const tasks = [];
                    snapshot.docs.forEach(doc => {
                        const task = doc.data();
                        task.id = doc.id;
                        tasks.push(task);
                    });
                    dispatch({
                        type: 'LOAD_TASKS_FROM_FIRESTORE',
                        tasks: tasks
                    });
                })
            firestore.collection('defaultTags').get()
                .then((snapshot) => {
                    const tags = [];
                    snapshot.docs.forEach(doc => {
                        const tag = doc.data();
                        tag.id = doc.id;
                        tags.push(tag);
                    });
                    dispatch({
                        type: 'LOAD_TAGS_FROM_FIRESTORE',
                        tags: tags
                    });
                })
        }
    }
}

export const setCurrentTask = (task) => {
    console.log(task);
    return {
        type: "SET_CURRENT_TASK",
        task: task
    }
}

export const clearCurrentTask = () => {
    return {
        type: "CLEAR_CURRENT_TASK"
    }
}