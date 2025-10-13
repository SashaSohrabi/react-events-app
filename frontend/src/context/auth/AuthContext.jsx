import { useReducer, useMemo, useCallback } from 'react';
import { registerUser, loginUser } from '@/utils/api';
import { AuthContext } from './AuthContext.js';
import {AUTH_STORAGE_KEY} from '@/utils/constants';
import { removeFromLocalStorage } from '@/utils/storage'; 

const initialState = {
  user: null,
  token: null,
  status: 'idle', // idle | loading | authenticated | error
  error: null,
};

function authReducer(state, action) {
  switch (action.type) {
    case 'AUTH_REQUEST':
      return { ...state, status: 'loading', error: null };
    case 'AUTH_SUCCESS':
      return {
        ...state,
        status: 'authenticated',
        user: action.payload.user ?? null,
        token: action.payload.token ?? null,
        error: null,
      };
    case 'AUTH_FAILURE':
      return { ...state, status: 'error', error: action.payload };
    case 'LOGOUT':
      return { ...initialState };
    default:
      return state;
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const signup = useCallback(async (formData) => {
    dispatch({ type: 'AUTH_REQUEST' });
    try {
      const user = await registerUser(formData);
      if (user?.error) throw new Error(user.error);
      dispatch({ type: 'AUTH_SUCCESS', payload: { user } });
      return user;
    } catch (error) {
      const message = error?.message ?? 'Registration failed';
      dispatch({ type: 'AUTH_FAILURE', payload: message });
      throw error;
    }
  }, []);

  const login = useCallback(async (credentials) => {
    dispatch({ type: 'AUTH_REQUEST' });
    try {
      const result = await loginUser(credentials);
      const apiUser = result?.user ?? result;
      if (apiUser?.error || result?.error) throw new Error(apiUser?.error ?? result?.error);
      const user = apiUser;
      const token = result?.token ?? null;
      dispatch({ type: 'AUTH_SUCCESS', payload: { user, token } });
      return { user, token };
    } catch (error) {
      const message = error?.message ?? 'Login failed';
      dispatch({ type: 'AUTH_FAILURE', payload: message });
      throw error;
    }
  }, []);

  const logout = useCallback(() => {
    removeFromLocalStorage(AUTH_STORAGE_KEY);
    dispatch({ type: 'LOGOUT' });
  }, []);

  const value = useMemo(
    () => ({
      ...state,
      signup,
      login,
      logout,
    }),
    [state, signup, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
