// Параметры запроса

import {
  GithubRepoBranchesModel,
  GithubRepoModel,
} from "@store/models/github/github";
import { CollectionT } from "@utils/collection";

export type GetOrganizationReposListParams = {
  organizationName: string | undefined;
};

export type GetOrgBranchesParams = {
  owner: string | undefined;
  repo: string | undefined;
};

export type ApiResp<T> = {
  success: boolean;
  data: T;
};

export interface IGitHubStore {
  getOrganizationReposList(
    params: GetOrganizationReposListParams
  ): Promise<ApiResp<CollectionT<number, GithubRepoModel>>>;

  getOrgBranchesList(
    params: GetOrgBranchesParams
  ): Promise<ApiResp<CollectionT<string, GithubRepoBranchesModel>>>;
}
