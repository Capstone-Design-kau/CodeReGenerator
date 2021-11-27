import { configureStore, combineReducers } from "@reduxjs/toolkit";

//redux-persist
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import editorSlice from "./reducers/editorSlice";

const rootReducer = combineReducers({
  editorReducer: editorSlice.reducer,
});

const persistConfig = {
  key: "root",
  storage,
};

export default configureStore({
  reducer: persistReducer(persistConfig, rootReducer),
});
