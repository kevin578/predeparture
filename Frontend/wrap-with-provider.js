import React from 'react';
import { Provider } from 'react-redux';
import LoadUserInfo from './src/components/LoadUserInfo';
import createStore from './src/state/createStore'

export const store = createStore()

// eslint-disable-next-line react/display-name,react/prop-types
export default ({ element }) => (
  <Provider store={store}>
    <LoadUserInfo>{element}</LoadUserInfo>
  </Provider>
)
