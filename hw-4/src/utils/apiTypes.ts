import { GithubRepoBranchesModel } from "@store/models/branches";
import { GithubRepoModel } from "@store/models/repos";
import { CollectionT } from "@utils/collection";

export type ApiResp<
  SuccessData =
    | CollectionT<string, GithubRepoBranchesModel>
    | CollectionT<number, GithubRepoModel>,
  ErrorData = any
> =
  | {
      success: true;
      data: SuccessData;
    }
  | {
      success: false;
      data: ErrorData;
    };
