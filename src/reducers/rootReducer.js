const initState = {
    tasks: [
        {id: 0, task: "Buy Milk", description: "Get some milk!", tags: ["housework", "errands"]}
    ],
    allTags:[
        "housework", "errands"
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
        default: 
            return state
    }
}

export default rootReducer;