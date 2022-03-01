// Параметры запроса

import {
  GithubRepoBranchesModel,
  GithubRepoModel,
} from "@store/models/github/github";
import { CollectionT } from "@utils/collection";

export type GetOrganizationReposListParams = {
  organizationName?: string;
  page: number;
};

export type GetOrgBranchesParams = {
  owner?: string;
  repo?: string;
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
