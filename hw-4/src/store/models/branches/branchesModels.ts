import { CollectionT } from "@utils/collection";

export type GithubCommitModel = {
  shaCode: string;
  htmlUrl: string;
};
export type GithubCommitApiModel = {
  sha: string;
  url: string;
};

export const normalizeGithubCommitModel = (
  raw: GithubCommitApiModel
): GithubCommitModel => ({
  shaCode: raw.sha,
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
