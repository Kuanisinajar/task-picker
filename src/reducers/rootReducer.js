const initState = {
    tasks: [
        {id: 0, task: "Buy Milk", description: "Get some milk!", tags: ["housework", "errands"]},
        {id: 1, task: "Buy DVD", description: "Get some milk!", tags: ["housework", "errands"]},
        {id: 2, task: "Learn React", description: "Get some milk!", tags: ["Learning", "Practicing"]},
        {id: 3, task: "Learn Processing", description: "Get some milk!", tags: ["Learning", "Practicing"]},
        {id: 4, task: "Read", description: "Get some milk!", tags: ["Practicing", "Mind"]}
    ],
    allTags:[
        "housework", "errands", "Practicing", "Mind", "Learning"
    ],
    currentTask: null
}

const rootReducer = (state = initState, action) => {

    switch (action.type) {
        case "ADD_TASK":
            action.task.id = state.tasks[state.tasks.length-1].id + 1;
            let newTasks = [...state.tasks, action.task];
            return {
                ...state,
                tasks: newTasks
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

export default rootReducer;