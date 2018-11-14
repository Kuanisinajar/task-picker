const initState = {
    authError: null
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
            return {
                ...state,
                authError: null
            }

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