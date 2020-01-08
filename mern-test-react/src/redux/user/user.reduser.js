const INITIAL_STATE = {
    currentUser: '',
    isLogedin: false,
    token: '',
    admin: false
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SET_CURRENT_USER':
            return {
                ...state,
                currentUser: action.payload.name,
                userID: action.payload.userID,
                isLogedin: action.payload.isLogedin,
                token: action.payload.token,
                admin: action.payload.admin
            }
        case 'LOGOUT_USER':
            return {
                ...state,
                currentUser: '',
                isLogedin: false,
                token: '',
                admin: false,
                userID: '',
            }

        default:
            return state;
    }
}
export default userReducer
