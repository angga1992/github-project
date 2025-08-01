export interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  name: string | null;
  company: string | null;
  blog: string | null;
  location: string | null;
  email: string | null;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
}

export interface GitHubRepository {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  clone_url: string;
  language: string | null;
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
  open_issues_count: number;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  size: number;
  default_branch: string;
  topics: string[];
  archived: boolean;
  disabled: boolean;
  private: boolean;
}

export interface GitHubReadme {
  name: string;
  path: string;
  content: string;
  encoding: string;
  size: number;
  download_url: string;
}

export interface AppState {
  user: GitHubUser | null;
  repositories: GitHubRepository[];
  selectedRepo: GitHubRepository | null;
  readme: string | null;
  loading: {
    user: boolean;
    repositories: boolean;
    readme: boolean;
  };
  error: {
    user: string | null;
    repositories: string | null;
    readme: string | null;
  };
  searchQuery: string;
}

export type AppAction =
  | { type: "SET_SEARCH_QUERY"; payload: string }
  | { type: "FETCH_USER_START" }
  | { type: "FETCH_USER_SUCCESS"; payload: GitHubUser }
  | { type: "FETCH_USER_ERROR"; payload: string }
  | { type: "FETCH_REPOSITORIES_START" }
  | { type: "FETCH_REPOSITORIES_SUCCESS"; payload: GitHubRepository[] }
  | { type: "FETCH_REPOSITORIES_ERROR"; payload: string }
  | { type: "SET_SELECTED_REPO"; payload: GitHubRepository }
  | { type: "FETCH_README_START" }
  | { type: "FETCH_README_SUCCESS"; payload: string }
  | { type: "FETCH_README_ERROR"; payload: string }
  | { type: "CLEAR_README" }
  | { type: "CLEAR_ALL" };
