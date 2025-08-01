import React, { memo, useMemo } from 'react';
import { useAppContext } from '../context/AppContext';
import { RepositoryCard } from './RepositoryCard';

export const RepositoryList = memo(function RepositoryList() {
  const { state } = useAppContext();
  const { repositories, loading, error } = state;

  const repositoryCards = useMemo(() => 
    repositories.map((repository) => (
      <RepositoryCard key={repository.id} repository={repository} />
    )), [repositories]
  );

  if (loading.repositories) {
    return (
      <div className="container">
        <div style={{ textAlign: 'center', padding: '3rem 2rem' }}>
          <div className="spinner" style={{ width: '40px', height: '40px', marginBottom: '1rem' }} />
          <p style={{ color: '#64748b' }}>Loading repositories...</p>
        </div>
      </div>
    );
  }

  if (error.repositories) {
    return (
      <div className="container">
        <div className="error-message">
          <h3>Error Loading Repositories</h3>
          <p>{error.repositories}</p>
        </div>
      </div>
    );
  }

  if (repositories.length === 0) {
    return null;
  }

  return (
    <div className="container mb-8">
      <div className="mb-6">
        <h2>Repositories ({repositories.length})</h2>
        <p style={{ color: '#64748b' }}>
          Click "View README" to see detailed documentation for each project
        </p>
      </div>
      
      <div className="grid grid-cols-1 grid-cols-2 grid-cols-3">
        {repositoryCards}
      </div>
    </div>
  );
}
)