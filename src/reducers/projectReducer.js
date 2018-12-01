const initState = {
    tasks: [],
    allTags: [],
    currentTask: null
}

const projectReducer = (state = initState, action) => {

    switch (action.type) {
        case "LOAD_TASKS_WHEN_LOGIN":
            return {
                ...state,
                tasks: action.tasks
            }
        case "LOAD_TASKS_WHEN_LOGOUT":
            return {
                ...state,
                tasks: action.tasks
            }
        case "LOAD_TAGS_WHEN_LOGIN":
            return {
                ...state,
                allTags: action.tags
            }
        case "LOAD_TAGS_WHEN_LOGOUT":
            return {
                ...state,
                allTags: action.tags
            }
        case "LOAD_TASKS_FROM_FIRESTORE":
            return {
                ...state,
                tasks: action.tasks
            }
        case "LOAD_TAGS_FROM_FIRESTORE":
            return {
                ...state,
                allTags: action.tags
            }
        case "CLEAR_CENTRAL_TASKS":
            return state
        case "ADD_TASK":
            let addingTask = action.task;
            addingTask.id = action.taskId;
            let addingTasks = [...state.tasks, addingTask];
            return {
                ...state,
                tasks: addingTasks
            }
        case "ADD_TASK_ERROR":
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
        case "UPDATE_DEFAULT_TASK":
            let updatingDefaultTasks = [...state.tasks];
            const index = updatingDefaultTasks.findIndex(item => item.id === action.task.id);
            updatingDefaultTasks[index] = action.task;
            return {
                ...state,
                tasks: updatingDefaultTasks
            }
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
                console.log(newAllTags);
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
        case "CLEAR_CURRENT_TASK":
            return {
                ...state,
                currentTask: null
            }
        default:
            return state
    }
}

export default projectReducer;