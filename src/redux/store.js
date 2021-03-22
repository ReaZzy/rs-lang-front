import {applyMiddleware, createStore} from "redux";
import {persistStore, persistReducer} from "redux-persist";
import {composeWithDevTools} from "redux-devtools-extension";
import rootReducer from "./rootReducer"
import thunkMiddleware from "redux-thunk";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "root",
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(
    persistedReducer,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
)
const persistor = persistStore(store)

export {store, persistor}