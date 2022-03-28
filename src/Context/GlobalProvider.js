import React, {createContext, useReducer} from 'react';
import authInitialState from './initialStates/authInitialState';
import badgeCountInitialState from './initialStates/badgeCountInitialState.js';
import auth from './reducers/auth';
import badgeCount from './reducers/badgeCount';

export const GlobalContext = createContext({});

const GlobalProvider = ({children}) => {
  const [authState, authDispatch] = useReducer(auth, authInitialState);
  const [badgeState, badgeStateDispatch] = useReducer(
    badgeCount,
    badgeCountInitialState,
  );
  return (
    <GlobalContext.Provider
      value={{
        authState,
        badgeState,
        badgeStateDispatch,
        authDispatch,
      }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
