const initState = {
    tasks: [],
    allTags: [],
    currentTask: null
}

const projectReducer = (state = initState, action) => {

    switch (action.type) {
        case "ADD_TASK":
            //action.task.id = state.tasks[state.tasks.length-1].id + 1;
            console.log(action.task);
            let newTasks = [...state.tasks, action.task];
            return {
                ...state,
                tasks: newTasks
            }
        case "ADD_TASK_ERROR":
            console.log(action.err);
            return state;
        case "DELETE_TASK":
            console.log('this is deleted');
            return state;
        case "DELETE_TASK_ERROR":
            console.log(action.err);
            return state;
        case "UPDATE_TASK":
            console.log('update success');
            return state;
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