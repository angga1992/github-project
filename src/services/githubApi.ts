import { GitHubUser, GitHubRepository, GitHubReadme } from '../types';

const BASE_URL = 'https://api.github.com';

const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; 

function getCachedData(key: string): any | null {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  cache.delete(key);
  return null;
}

function setCachedData(key: string, data: any): void {
  cache.set(key, { data, timestamp: Date.now() });
}

class GitHubAPIError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = 'GitHubAPIError';
  }
}

async function fetchWithErrorHandling(url: string): Promise<any> {
  const cachedData = getCachedData(url);
  if (cachedData) {
    return cachedData;
  }

  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new GitHubAPIError('User not found', 404);
      } else if (response.status === 403) {
        throw new GitHubAPIError('API rate limit exceeded. Please try again later.', 403);
      } else {
        throw new GitHubAPIError(`HTTP error! status: ${response.status}`, response.status);
      }
    }
    
    const data = await response.json();
    setCachedData(url, data);
    return data;
  } catch (error) {
    if (error instanceof GitHubAPIError) {
      throw error;
    }
    throw new GitHubAPIError('Network error occurred. Please check your internet connection.');
  }
}

export async function fetchGitHubUser(username: string): Promise<GitHubUser> {
  const url = `${BASE_URL}/users/${encodeURIComponent(username)}`;
  return await fetchWithErrorHandling(url);
}

export async function fetchUserRepositories(username: string): Promise<GitHubRepository[]> {
  const url = `${BASE_URL}/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=100`;
  return await fetchWithErrorHandling(url);
}

export async function fetchRepositoryReadme(owner: string, repo: string): Promise<string> {
  try {
    const url = `${BASE_URL}/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/readme`;
    const readmeData: GitHubReadme = await fetchWithErrorHandling(url);
    
    const content = atob(readmeData.content);
    return content;
  } catch (error) {
    if (error instanceof GitHubAPIError && error.status === 404) {
      throw new GitHubAPIError('README file not found for this repository');
    }
    throw error;
  }
}