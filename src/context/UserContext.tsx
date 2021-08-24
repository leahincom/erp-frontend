import { createContext, useReducer, useEffect } from 'react';

export const UserStateContext = createContext({});
export const UserDispatchContext = createContext({});

type STATETYPE = {
  isAuth: boolean;
};

type ACTIONTYPE = { type: 'LOGIN' } | { type: 'LOGOUT' };

const reducer = (state: STATETYPE, action: ACTIONTYPE): STATETYPE => {
  switch (action.type) {
    case 'LOGIN': {
      return {
        isAuth: true,
      };
    }
    case 'LOGOUT': {
      return {
        isAuth: false,
      };
    }
    default: {
      throw new Error('Unhandled action type');
    }
  }
};

export interface UserProviderProps {
  children: any;
  isAuthenticated: boolean;
}

const UserProvider = ({ children, isAuthenticated }: UserProviderProps) => {
  const [state, dispatch] = useReducer(reducer, { isAuth: isAuthenticated });

  useEffect(() => {
    if (isAuthenticated) {
      dispatch({ type: 'LOGIN' });
    } else {
      dispatch({ type: 'LOGOUT' });
    }
  }, [isAuthenticated]);

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>{children}</UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
};

export default UserProvider;
