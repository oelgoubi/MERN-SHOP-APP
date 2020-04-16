import {createStore , applyMiddleware,compose} from 'redux';
import thunk from 'redux-thunk'
import rootReducer from './reducers'

const initalState = {};

const middleware = [thunk];

// Since we're using Redux tools we wrapp the middleware in the compose function
const store = createStore(rootReducer,initalState,compose(
applyMiddleware(...middleware),
window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
);



export default store;
