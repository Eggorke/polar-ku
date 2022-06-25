import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from '../src/reducers';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: []
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
  const store = createStore(
    persistedReducer,
    applyMiddleware(),
  )
  const persistor = persistStore(store);

  return { store, persistor }
};
