import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers/rootReducer';
import { createWrapper } from 'next-redux-wrapper';
import thunk from 'redux-thunk';

const makeConfiguredStore = reducer =>
  createStore(reducer, undefined, composeWithDevTools(applyMiddleware(thunk)));

const makeStore = () => {
  const isServer = typeof window === 'undefined';

  if (isServer) {
    return makeConfiguredStore(rootReducer);
  } else {
    // we need it only on client side
    const { persistStore, persistReducer } = require('redux-persist');
    const storage = require('redux-persist/lib/storage').default;

    const persistConfig = {
      key: 'nextjs',
      storage,
    };

    const persistedReducer = persistReducer(persistConfig, rootReducer);
    const store = makeConfiguredStore(persistedReducer);

    store.__persistor = persistStore(store); // Nasty hack

    return store;
  }
};

export const wrapper = createWrapper(makeStore);
