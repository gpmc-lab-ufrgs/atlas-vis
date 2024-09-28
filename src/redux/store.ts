import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';
import {reducers} from './reducers';
import rootSaga from './sagas/rootSaga';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['Users'],
};

const rootReducer = combineReducers({
  ...reducers,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).prepend(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
const persistor = persistStore(store);
export default store;
export {persistor, sagaMiddleware};
