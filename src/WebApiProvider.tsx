import { createContext, useReducer } from 'react';

const WebApiContext = createContext({});

const initialState = {
  code: undefined,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_CODE':
      return { code: action.code };
    default:
      throw new Error('Unknown action');
  }
};

const WebApiProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <WebApiContext.Provider value={{ state, dispatch }}>
      {children}
    </WebApiContext.Provider>
  );
};

export { WebApiProvider, WebApiContext };
