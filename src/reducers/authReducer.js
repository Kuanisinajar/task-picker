const initState = {
    authError: null,
    userTasks: [],
    userTags: []
}

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case "LOGIN_ERROR":
            return {
                ...state,
                authError: "Login failed :("
            }

        case "LOGIN_SUCCESS":
            return {
                authError: null,
                userTasks: action.data.userTasks,
                userTags: action.data.userTags
            }
        
        case "USER_DATA_LOADED":
            return state;
        case "LOGOUT_SUCCESS":
            return state

        case "SIGNUP_SUCCESS": 
            return {
                ...state,
                authError: null
            }

        case "SIGNUP_ERROR": 
            console.log(action.err.message);
            return {
                ...state,
                authError: action.err.message
            }
            
        default:
            return state
    }
}

export default authReducer;