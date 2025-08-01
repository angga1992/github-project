import React, { useState, FormEvent, useCallback } from 'react';
import { Search } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { fetchGitHubUser, fetchUserRepositories } from '../services/githubApi';

export function SearchForm() {
  const { state, dispatch } = useAppContext();
  const [localQuery, setLocalQuery] = useState(state.searchQuery);

  const handleSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault();

    if (!localQuery.trim()) return;

    const username = localQuery.trim();
    dispatch({ type: 'SET_SEARCH_QUERY', payload: username });
    dispatch({ type: 'CLEAR_README' });

    try {
      dispatch({ type: 'FETCH_USER_START' });
      const userData = await fetchGitHubUser(username);
      dispatch({ type: 'FETCH_USER_SUCCESS', payload: userData });

      dispatch({ type: 'FETCH_REPOSITORIES_START' });
      const repositories = await fetchUserRepositories(username);
      dispatch({ type: 'FETCH_REPOSITORIES_SUCCESS', payload: repositories });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      dispatch({ type: 'FETCH_USER_ERROR', payload: errorMessage });
      dispatch({ type: 'FETCH_REPOSITORIES_ERROR', payload: errorMessage });
    }
  }, [localQuery, dispatch]);

  return (
    <div className="container py-12">
      <div className="space-y-6">
        {/* LCP Target - Optimized */}
        <div style={{ textAlign: 'center' }}>
          <h1
            style={{
              fontFamily: 'system-ui, sans-serif',
              fontWeight: 700,
              fontSize: '2.25rem',
              marginBottom: '0.5rem',
            }}
          >
            GitHub Project Explorer
          </h1>
          <p
            style={{
              fontSize: '1.125rem',
              color: '#64748b',
              fontFamily: 'system-ui, sans-serif',
              margin: 0,
            }}
          >
            Discover and explore GitHub repositories by searching for any username
          </p>
        </div>

        {/* Search Form */}
        <form
          onSubmit={handleSubmit}
          className="flex"
          style={{
            maxWidth: '600px',
            margin: '0 auto',
            gap: '0.75rem',
          }}
        >
          <div style={{ position: 'relative', flex: '1' }}>
            <input
              type="text"
              placeholder="Enter GitHub username..."
              value={localQuery}
              onChange={(e) => setLocalQuery(e.target.value)}
              className="input"
              style={{ paddingLeft: '2.5rem' }}
              disabled={state.loading.user}
            />
            <Search
              size={20}
              style={{
                position: 'absolute',
                left: '0.75rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#9ca3af',
              }}
            />
          </div>
          <button
            type="submit"
            disabled={state.loading.user || !localQuery.trim()}
            className="btn btn-primary"
          >
            {state.loading.user ? (
              <>
                <div className="spinner" />
                Searching...
              </>
            ) : (
              'Search'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
