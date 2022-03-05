import { apiUrls } from "@config/apiUrls";
import { normalizeOrgBranchesToCollection } from "@store/models/branches";
import { ApiResp } from "@utils/apiTypes";
import axios from "axios";

export const load = async (owner: string, repo: string): Promise<ApiResp> => {
  try {
    const response = await axios(apiUrls.github.repoBranches(owner, repo));
    return {
      success: true,
      data: normalizeOrgBranchesToCollection(response.data),
    };
  } catch (e) {
    return {
      success: false,
      data: e,
    };
  }
};
