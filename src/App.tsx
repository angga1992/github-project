import React, { Suspense, lazy } from 'react';
import { AppProvider } from './context/AppContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import { SearchForm } from './components/SearchForm';
import { UserProfile } from './components/UserProfile';
import { RepositoryList } from './components/RepositoryList';

const ReadmeViewer = lazy(() => import('./components/ReadmeViewer').then(module => ({ default: module.ReadmeViewer })));

function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
          <SearchForm />
          <UserProfile />
          <RepositoryList />
          <Suspense fallback={<div />}>
            <ReadmeViewer />
          </Suspense>
        </div>
      </AppProvider>
    </ErrorBoundary>
  );
}

export default App;