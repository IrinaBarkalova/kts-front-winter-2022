const githubApi = (endpoint: string): string =>
  `https://api.github.com/${endpoint}`;

export const apiUrls = {
  github: {
    repoBranches: (owner: string, repo: string): string =>
      githubApi(`repos/${owner}/${repo}/branches`),
  },
};
