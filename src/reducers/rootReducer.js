const initState = {
    tasks: [
        {id: 0, task: "Buy Milk", description: "Get some milk!", tags: ["housework", "errands"]}
    ],
    allTags:[

    ],
    currentTask: null
}

const rootReducer = (state = initState, action) => {
    
    return state;
}

export default rootReducer;