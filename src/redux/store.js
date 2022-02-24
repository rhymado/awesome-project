import {createStore} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'awesomeProject',
  storage: AsyncStorage,
};

const reducer = (state = {counter: 0}, action) => {
  switch (action.type) {
    case 'UP':
      return {...state, counter: state.counter + 1};
    case 'DOWN':
      return {...state, counter: state.counter - 1};
    default:
      return state;
  }
};

const persistedReducer = persistReducer(persistConfig, reducer);
export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
