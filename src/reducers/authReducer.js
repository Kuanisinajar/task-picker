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
            console.log("logIn success!");
            console.log(action.data);
            return {
                authError: null,
                userTasks: action.data.userTasks,
                userTags: action.data.userTags
            }
        
        case "USER_DATA_LOADED":
            console.log('we did it');
            return state;
        case "LOGOUT_SUCCESS":
            console.log("logout success");
            return state

        case "SIGNUP_SUCCESS": 
            console.log('signup success');
            return {
                ...state,
                authError: null
            }

        case "SIGNUP_ERROR": 
            console.log('signup failed');
            return {
                ...state,
                authError: action.err.message
            }
            
        default:
            return state
    }
}

export default authReducer;