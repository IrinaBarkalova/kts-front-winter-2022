import { apiUrls } from "@config/apiUrls";
import { normalizeGithubReposToCollection } from "@store/models/repos";
import { ApiResp } from "@utils/apiTypes";
import axios from "axios";

export const getNextRepos = async (
  inputStr: string,
  page: number,
  per_page: number
): Promise<ApiResp> => {
  try {
    const response = await axios(
      apiUrls.github.repositories(inputStr, page, per_page)
    );
    return {
      success: true,
      data: normalizeGithubReposToCollection(response.data),
    };
  } catch (e) {
    return {
      success: false,
      data: e,
    };
  }
};
