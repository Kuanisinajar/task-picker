export const addTask = (task) => {
    return (dispatch, getState) => {
        // go out and get data
        dispatch({
            type: "ADD_TASK",
            task: task
        });
    }
}