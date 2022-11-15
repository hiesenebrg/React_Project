import { createContext } from 'react';

import { useProvideAuth } from '../hooks';


const initialState = {
  user: null,
  login: () => {},
  logout: () => {},
  signup:()=> {},
  loading: true,
  updateUser: ()=> {},
};

export const AuthContext = createContext(initialState);

export const AuthProvider = ({ children }) => {
  const auth = useProvideAuth();
  // here children isbasically whatever in-between AuthContext.Provider Component
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
