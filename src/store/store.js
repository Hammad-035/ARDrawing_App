import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineReducers} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import {languageReducer} from './reducers/languageReduer';
import initailRouteReducer from './reducers/InitialRouteReducer';
import {configureStore} from '@reduxjs/toolkit';
import favReducer from './reducers/favReducer';
import { userReducer } from './reducers/userReducer';
import {SavePhotoReducer} from './reducers/SavePhotoReducer';
import { CustomImageReducer } from './reducers/CustomImageReducer';
const routeConfig = {
  key: 'inite_key',
  storage: AsyncStorage,
  whitelist: ['initialRouteName'],
};

const favConfig = {
  key: 'favConfigKey',
  storage: AsyncStorage,
  whitelist: ['favItems'],
};

const phtoConfig = {
  key: 'save_photokldls',
  storage: AsyncStorage,
  whitelist: ['save_photo'],
};
const persistConfig = {
  key:'root',
  storage:AsyncStorage,
  whitelist:['is_home_screen']
};
const customConfig = {
  key:'custom_save',
  storage:AsyncStorage,
  whitelist:['customImages']
}
const rootReducer = combineReducers({
  initailRouteReducer: persistReducer(routeConfig, initailRouteReducer),
  languageReducer: languageReducer,
  favReducer: persistReducer(favConfig, favReducer),
  userReducer:persistReducer(persistConfig,userReducer),
  SavePhotoReducer: persistReducer(phtoConfig, SavePhotoReducer),
  CustomImageReducer:persistReducer(customConfig,CustomImageReducer)
  
});

export const store = configureStore({
  reducer: rootReducer,
});
export const persistor = persistStore(store);
