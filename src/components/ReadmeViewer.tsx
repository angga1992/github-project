import React, { useEffect, useState } from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import { X, ExternalLink, Star, GitFork } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { formatNumber, formatDate } from '../utils/helpers';

export function ReadmeViewer() {
  const { state, dispatch } = useAppContext();
  const { selectedRepo, readme, loading, error } = state;
  const [renderedContent, setRenderedContent] = useState('');

  useEffect(() => {
    if (readme) {
      marked.setOptions({
        breaks: true,
        gfm: true,
      });

      const htmlContent = marked(readme);
      const sanitizedContent = DOMPurify.sanitize(htmlContent as never);
      setRenderedContent(sanitizedContent);
    }
  }, [readme]);

  const handleClose = () => {
    dispatch({ type: 'CLEAR_README' });
    setRenderedContent('');
  };

  if (!selectedRepo) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
      }}
      onClick={handleClose}
    >
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          maxWidth: '4xl',
          width: '100%',
          maxHeight: '90vh',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div 
          className="p-6"
          style={{ 
            borderBottom: '1px solid #e5e7eb',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: '1rem'
          }}
        >
          <div style={{ flex: '1' }}>
            <h2 style={{ marginBottom: '0.5rem' }}>{selectedRepo.full_name}</h2>
            {selectedRepo.description && (
              <p style={{ color: '#64748b', marginBottom: '1rem' }}>
                {selectedRepo.description}
              </p>
            )}
            
            <div style={{ display: 'flex', gap: '1rem', fontSize: '0.875rem', color: '#64748b' }}>
              <span className="flex items-center" style={{ gap: '0.25rem' }}>
                <Star size={14} />
                {formatNumber(selectedRepo.stargazers_count)}
              </span>
              <span className="flex items-center" style={{ gap: '0.25rem' }}>
                <GitFork size={14} />
                {formatNumber(selectedRepo.forks_count)}
              </span>
              <span>Updated {formatDate(selectedRepo.updated_at)}</span>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
            <a
              href={selectedRepo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
            >
              <ExternalLink size={16} />
              GitHub
            </a>
            <button
              onClick={handleClose}
              className="btn btn-secondary"
              style={{ padding: '0.5rem' }}
            >
              <X size={16} />
            </button>
          </div>
        </div>

        <div style={{ flex: '1', overflow: 'auto', padding: '1.5rem' }}>
          {loading.readme ? (
            <div style={{ textAlign: 'center', padding: '3rem 2rem' }}>
              <div className="spinner" style={{ width: '40px', height: '40px', marginBottom: '1rem' }} />
              <p style={{ color: '#64748b' }}>Loading README...</p>
            </div>
          ) : error.readme ? (
            <div className="error-message">
              <h3>Error Loading README</h3>
              <p>{error.readme}</p>
            </div>
          ) : readme ? (
            <div 
              className="readme-content"
              dangerouslySetInnerHTML={{ __html: renderedContent }}
            />
          ) : (
            <div className="empty-state">
              <p>No README file found for this repository.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}