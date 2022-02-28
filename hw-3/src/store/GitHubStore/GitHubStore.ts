import ApiStore from "@shared/store/ApiStore";
import { RequestParams, HTTPMethod } from "@shared/store/ApiStore/types";
import {
  GithubRepoBranchesModel,
  GithubRepoModel,
  normalizeGithubReposToCollection,
  normalizeOrgBranchesToCollection,
} from "@store/models/github/github";
import { CollectionT } from "@utils/collection";

import {
  IGitHubStore,
  ApiResp,
  GetOrganizationReposListParams,
  GetOrgBranchesParams,
} from "./types";

export default class GitHubStore implements IGitHubStore {
  private readonly apiStore = new ApiStore("https://api.github.com/");

  async getOrganizationReposList(
    params: GetOrganizationReposListParams
  ): Promise<ApiResp<CollectionT<number, GithubRepoModel>>> {
    let req: RequestParams<object> = {
      method: HTTPMethod.GET,
      endpoint: `orgs/${params.organizationName}/repos`,
      headers: {
        accept: "application/vnd.github.v3+json",
      },
      // TODO dop
      params: {
        per_page: 2,
        page: 1,
      },
      data: {},
    };

    let result = await this.apiStore.request<GithubRepoModel[]>(req);

    return {
      success: result.success,
      data: normalizeGithubReposToCollection(result.data),
    };
  }

  async getOrgBranchesList(
    params: GetOrgBranchesParams
  ): Promise<ApiResp<CollectionT<string, GithubRepoBranchesModel>>> {
    let req: RequestParams<object> = {
      method: HTTPMethod.GET,
      endpoint: `repos/${params.owner}/${params.repo}/branches`,
      headers: {
        accept: "application/vnd.github.v3+json",
      },
      data: {},
    };

    let result = await this.apiStore.request<GithubRepoBranchesModel[]>(req);

    return {
      success: result.success,
      data: normalizeOrgBranchesToCollection(result.data),
    };
  }
}
