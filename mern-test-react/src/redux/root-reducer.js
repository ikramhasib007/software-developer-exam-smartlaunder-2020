import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import userReducer from './user/user.reduser'
import fundrisersReducer from './fundrisers/fundrisers.reduser';


const persistConfig = {
    key: 'root',
    storage,
    whitelist: [],

}
const rootReducer = combineReducers({
    user: userReducer,
    fundriser: fundrisersReducer
})
export default persistReducer(persistConfig, rootReducer)