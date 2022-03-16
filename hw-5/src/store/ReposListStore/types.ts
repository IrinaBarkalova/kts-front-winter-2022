// Параметры запроса

import { GithubRepoModel } from "store/models/repos";

export type GetOrganizationReposListParams = {
  organizationName?: string;
  page: number;
};
export type GetNewReposListParams = {
  enterRepos: GithubRepoModel[];
  inputStr: string;
  page: number;
  per_page: number;
};
export interface IGitHubStore {
  getOrganizationReposList(
    params: GetOrganizationReposListParams
  ): Promise<void>;
}

export interface INewReposStore {
  getNewRepos(params: GetNewReposListParams): Promise<void>;
}
