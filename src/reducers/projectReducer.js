const initState = {
    tasks: [],
    allTags: [],
    currentTask: null
}

const projectReducer = (state = initState, action) => {

    switch (action.type) {
        case "LOAD_TASKS_FROM_FIRESTORE":
            console.log('Data loaded from firestore');
            return {
                ...state,
                tasks: action.tasks
            }
        case "CLEAR_CENTRAL_TASKS":
            console.log('should clear');
            return state
        case "ADD_TASK":
            let addingTask = action.task;
            addingTask.id = action.taskId;
            let addingTasks = [...state.tasks, addingTask];
            //action.task.id = state.tasks[state.tasks.length-1].id + 1;
            // console.log(action.task);
            // let newTasks = [...state.tasks, action.task];
            // return {
            //     ...state,
            //     tasks: newTasks
            // }
            return {
                ...state, 
                tasks: addingTasks
            }
        case "ADD_TASK_ERROR":
            console.log(action.err);
            return state;
        case "DELETE_TASK":
            console.log('Task deleted');
            let deletingTasks = [...state.tasks];
            deletingTasks = deletingTasks.filter(task => task.id !== action.taskId);
            return {
                ...state,
                tasks: deletingTasks
            };
        case "DELETE_TASK_ERROR":
            console.log(action.err);
            return state;
        case "UPDATE_TASK":
            console.log('update success');
            let updatingTasks = [...state.tasks];
            const itemIndex = state.tasks.findIndex(task => task.id === action.task.id);
            updatingTasks[itemIndex] = action.task;
            return {
                ...state,
                tasks: updatingTasks
            }
        case "UPDATE_TASK_ERROR":
            console.log(action.err);
            return state;
        case "ADD_TAG":
            // First, check if new tag already exsists
            let shouldAdd = true;
            for (let tag of state.allTags) {
                if (action.tag === tag) {
                    shouldAdd = false;
                }
            }
            // Add it to state
            let newAllTags = [...state.allTags];
            if (shouldAdd) {
                newAllTags.push(action.tag);
                return {
                    ...state,
                    allTags: newAllTags
                }
            } else {
                return state;
            }
        case "SET_CURRENT_TASK":

            return {
                ...state,
                currentTask: action.task
            }
        default:
            return state
    }
}

export default projectReducer;