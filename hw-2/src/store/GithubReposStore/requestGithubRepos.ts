import { apiUrls } from "@config/apiUrls";
import {
  GithubRepoModel,
  normalizeGithubReposToCollection,
} from "@store/models/github";
import { ApiResp } from "@utils/apiTypes";
import { CollectionT } from "@utils/collection";
import axios from "axios";

export const requestGithubRepos = async (
  organization: string
): Promise<ApiResp<CollectionT<number, GithubRepoModel>>> => {
  try {
    const response = await axios(
      apiUrls.github.organizationRepos(organization)
    );
    return {
      isError: false,
      data: normalizeGithubReposToCollection(response.data),
    };
  } catch (e) {
    return {
      isError: true,
      data: null,
    };
  }
};
