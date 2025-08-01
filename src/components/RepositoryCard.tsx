
import { Star, GitFork, AlertCircle, Calendar } from 'lucide-react';
import { GitHubRepository } from '../types';
import { useAppContext } from '../context/AppContext';
import { formatNumber, formatDate, getLanguageClass } from '../utils/helpers';
import { fetchRepositoryReadme } from '../services/githubApi';

interface RepositoryCardProps {
  repository: GitHubRepository;
}

export function RepositoryCard({ repository }: RepositoryCardProps) {
  const { state, dispatch } = useAppContext();

  const handleViewReadme = async () => {
    dispatch({ type: 'SET_SELECTED_REPO', payload: repository });
    
    try {
      dispatch({ type: 'FETCH_README_START' });
      const readmeContent = await fetchRepositoryReadme(
        repository.full_name.split('/')[0],
        repository.name
      );
      dispatch({ type: 'FETCH_README_SUCCESS', payload: readmeContent });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to load README';
      dispatch({ type: 'FETCH_README_ERROR', payload: errorMessage });
    }
  };

  return (
    <div className="card p-6">
      <div className="repo-header">
        <div style={{ flex: '1' }}>
          <h3 className="repo-title">{repository.name}</h3>
          {repository.description && (
            <p className="repo-description">{repository.description}</p>
          )}
        </div>
        {repository.private && (
          <span className="badge badge-gray">Private</span>
        )}
        {repository.archived && (
          <span className="badge badge-gray">Archived</span>
        )}
      </div>

      {repository.topics && repository.topics.length > 0 && (
        <div className="mb-4" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {repository.topics.slice(0, 5).map((topic) => (
            <span key={topic} className="badge badge-blue">
              {topic}
            </span>
          ))}
          {repository.topics.length > 5 && (
            <span className="badge badge-gray">+{repository.topics.length - 5} more</span>
          )}
        </div>
      )}

      <div className="repo-meta mb-4">
        {repository.language && (
          <div className="repo-meta-item">
            <span className={`language-dot ${getLanguageClass(repository.language)}`}></span>
            <span>{repository.language}</span>
          </div>
        )}
        
        <div className="repo-meta-item">
          <Star size={12} />
          <span>{formatNumber(repository.stargazers_count)}</span>
        </div>
        
        <div className="repo-meta-item">
          <GitFork size={12} />
          <span>{formatNumber(repository.forks_count)}</span>
        </div>
        
        {repository.open_issues_count > 0 && (
          <div className="repo-meta-item">
            <AlertCircle size={12} />
            <span>{repository.open_issues_count} issues</span>
          </div>
        )}
        
        <div className="repo-meta-item">
          <Calendar size={12} />
          <span>Updated {formatDate(repository.updated_at)}</span>
        </div>
      </div>

      <div className="flex" style={{ gap: '0.75rem' }}>
        <a
          href={repository.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline"
          style={{ flex: '1' }}
        >
          View on GitHub
        </a>
        <button
          onClick={handleViewReadme}
          className="btn btn-primary"
          disabled={state.loading.readme && state.selectedRepo?.id === repository.id}
        >
          {state.loading.readme && state.selectedRepo?.id === repository.id ? (
            <>
              <div className="spinner" />
              Loading...
            </>
          ) : (
            'View README'
          )}
        </button>
      </div>
    </div>
  );
}