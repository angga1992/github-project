import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { AppState, AppAction } from '../types';

const initialState: AppState = {
  user: null,
  repositories: [],
  selectedRepo: null,
  readme: null,
  loading: {
    user: false,
    repositories: false,
    readme: false,
  },
  error: {
    user: null,
    repositories: null,
    readme: null,
  },
  searchQuery: '',
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_SEARCH_QUERY':
      return {
        ...state,
        searchQuery: action.payload,
      };

    case 'FETCH_USER_START':
      return {
        ...state,
        loading: { ...state.loading, user: true },
        error: { ...state.error, user: null },
      };

    case 'FETCH_USER_SUCCESS':
      return {
        ...state,
        user: action.payload,
        loading: { ...state.loading, user: false },
        error: { ...state.error, user: null },
      };

    case 'FETCH_USER_ERROR':
      return {
        ...state,
        user: null,
        loading: { ...state.loading, user: false },
        error: { ...state.error, user: action.payload },
      };

    case 'FETCH_REPOSITORIES_START':
      return {
        ...state,
        loading: { ...state.loading, repositories: true },
        error: { ...state.error, repositories: null },
        repositories: [],
      };

    case 'FETCH_REPOSITORIES_SUCCESS':
      return {
        ...state,
        repositories: action.payload,
        loading: { ...state.loading, repositories: false },
        error: { ...state.error, repositories: null },
      };

    case 'FETCH_REPOSITORIES_ERROR':
      return {
        ...state,
        repositories: [],
        loading: { ...state.loading, repositories: false },
        error: { ...state.error, repositories: action.payload },
      };

    case 'SET_SELECTED_REPO':
      return {
        ...state,
        selectedRepo: action.payload,
        readme: null,
        error: { ...state.error, readme: null },
      };

    case 'FETCH_README_START':
      return {
        ...state,
        loading: { ...state.loading, readme: true },
        error: { ...state.error, readme: null },
      };

    case 'FETCH_README_SUCCESS':
      return {
        ...state,
        readme: action.payload,
        loading: { ...state.loading, readme: false },
        error: { ...state.error, readme: null },
      };

    case 'FETCH_README_ERROR':
      return {
        ...state,
        readme: null,
        loading: { ...state.loading, readme: false },
        error: { ...state.error, readme: action.payload },
      };

    case 'CLEAR_README':
      return {
        ...state,
        selectedRepo: null,
        readme: null,
        error: { ...state.error, readme: null },
      };

    case 'CLEAR_ALL':
      return {
        ...initialState,
        searchQuery: state.searchQuery,
      };

    default:
      return state;
  }
}

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}