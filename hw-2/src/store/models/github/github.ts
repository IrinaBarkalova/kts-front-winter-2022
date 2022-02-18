import { CollectionT } from "@utils/collection";
export type GithubOwnerModel = {
  id: number;
  login: string;
  avatarUrl: string;
  htmlUrl: string;
};
export type GithubOwnerApiModel = {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
};

export const normalizeGithubOwnerModel = (
  raw: GithubOwnerApiModel
): GithubOwnerModel => ({
  id: raw.id,
  login: raw.login,
  avatarUrl: raw.avatar_url,
  htmlUrl: raw.html_url,
});

export type GithubRepoModel = {
  id: number;
  name: string;
  description: string;
  htmlUrl: string;
  stargazersCount: number;
  updatedAt: Date;
  owner: GithubOwnerModel;
};
export type GithubCommitModel = {
  sha_code: string;
  htmlUrl: string;
};
export type GithubCommitApiModel = {
  sha: string;
  url: string;
};

export const normalizeGithubCommitModel = (
  raw: GithubCommitApiModel
): GithubCommitModel => ({
  sha_code: raw.sha,
  htmlUrl: raw.url,
});
export type GithubRepoBranchesModel = {
  name: string;
  commit: GithubCommitModel;
  protected: boolean;
};
export type GithubRepoBranchesApiModel = {
  name: string;
  commit: GithubCommitApiModel;
  protected: boolean;
};

export type GithubRepoApiModel = {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  updated_at: string;
  owner: GithubOwnerApiModel;
};

export const normalizeGithubRepoModel = (
  raw: GithubRepoApiModel
): GithubRepoModel => ({
  id: raw.id,
  name: raw.name,
  description: raw.description,
  htmlUrl: raw.html_url,
  stargazersCount: raw.stargazers_count,
  updatedAt: new Date(raw.updated_at),
  owner: normalizeGithubOwnerModel(raw.owner),
});

export const normalizeGithubReposToCollection = (
  rawList: GithubRepoApiModel[]
): CollectionT<number, GithubRepoModel> => {
  return {
    order: rawList.map((item) => item.id),
    entities: rawList.reduce(
      (acc, item) => ({
        ...acc,
        [item.id]: normalizeGithubRepoModel(item),
      }),
      {}
    ),
  };
};

export const normalizeOrgBranchesModel = (
  raw: GithubRepoBranchesApiModel
): GithubRepoBranchesModel => ({
  name: raw.name,
  commit: normalizeGithubCommitModel(raw.commit),
  protected: raw.protected,
});

export const normalizeOrgBranchesToCollection = (
  rawList: GithubRepoBranchesApiModel[]
): CollectionT<string, GithubRepoBranchesModel> => {
  return {
    order: rawList.map((item) => item.name),
    entities: rawList.reduce(
      (acc, item) => ({
        ...acc,
        [item.name]: normalizeOrgBranchesModel(item),
      }),
      {}
    ),
  };
};
