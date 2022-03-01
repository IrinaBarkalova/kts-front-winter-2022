const githubApi = (endpoint: string): string =>
  `https://api.github.com/${endpoint}`;

export const apiUrls = {
  github: {
    repoBranches: (owner: string, repo: string): string =>
      githubApi(`repos/${owner}/${repo}/branches`),
    repositories: (inputStr: string, page: number, per_page: number): string =>
      githubApi(`orgs/${inputStr}/repos?per_page=${per_page}&page=${page}`),
  },
};
