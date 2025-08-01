
import { MapPin, Link as LinkIcon, Building, Calendar } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { formatDate, formatNumber } from '../utils/helpers';

export function UserProfile() {
  const { state } = useAppContext();
  const { user } = state;

  if (!user) return null;

  return (
    <div className="container mb-8">
      <div className="card p-6">
        <div className="flex flex-col items-center space-y-4" style={{ textAlign: 'center' }}>
          <img
            src={user.avatar_url}
            alt={`${user.login}'s avatar`}
            className="avatar"
          />
          
          <div>
            <h2>{user.name || user.login}</h2>
            <p style={{ fontSize: '1.125rem', color: '#64748b', marginBottom: '0.5rem' }}>
              @{user.login}
            </p>
            {user.bio && (
              <p style={{ color: '#64748b', marginBottom: '1rem' }}>{user.bio}</p>
            )}
          </div>

          <div className="stats">
            <div className="stat">
              <div className="stat-value">{formatNumber(user.public_repos)}</div>
              <div className="stat-label">Repositories</div>
            </div>
            <div className="stat">
              <div className="stat-value">{formatNumber(user.followers)}</div>
              <div className="stat-label">Followers</div>
            </div>
            <div className="stat">
              <div className="stat-value">{formatNumber(user.following)}</div>
              <div className="stat-label">Following</div>
            </div>
          </div>

          <div className="flex" style={{ gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center', fontSize: '0.875rem', color: '#64748b' }}>
            {user.company && (
              <div className="flex items-center" style={{ gap: '0.25rem' }}>
                <Building size={16} />
                <span>{user.company}</span>
              </div>
            )}
            {user.location && (
              <div className="flex items-center" style={{ gap: '0.25rem' }}>
                <MapPin size={16} />
                <span>{user.location}</span>
              </div>
            )}
            {user.blog && (
              <div className="flex items-center" style={{ gap: '0.25rem' }}>
                <LinkIcon size={16} />
                <a 
                  href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#2563eb' }}
                >
                  {user.blog}
                </a>
              </div>
            )}
            <div className="flex items-center" style={{ gap: '0.25rem' }}>
              <Calendar size={16} />
              <span>Joined {formatDate(user.created_at)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}