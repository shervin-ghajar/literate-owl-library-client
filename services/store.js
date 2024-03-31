import {
    createStore, applyMiddleware
} from 'redux';
import {
    persistStore,
    persistReducer
} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import thunk from 'redux-thunk';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { createBlacklistFilter } from 'redux-persist-transform-filter';

import rootReducer from '../reducers'; // the value from combineReducers

const persistConfig = {
    timeout: 0,
    key: 'root',
    storage: AsyncStorage,
    stateReconciler: autoMergeLevel2, // see "Merge Process" section for details.
    blacklist: ['navigation'],
    whitelist: [
        // 'syncReducer', 
        // 'getProfileReducer', 
        'authenticationReducer'],
    transforms: [
        createBlacklistFilter('authenticationReducer', ['rtype', 'error']),
        // createBlacklistFilter('getProfileReducer', ['rtype', 'error']),
    ]
};

const pReducer = persistReducer(persistConfig, rootReducer);

// use applyMiddleware to add the thunk middleware to the store
export const store = createStore(pReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);