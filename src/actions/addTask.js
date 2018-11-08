export const addTask = (task) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        
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