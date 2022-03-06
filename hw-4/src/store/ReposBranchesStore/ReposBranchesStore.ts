import { apiUrls } from "@config/apiUrls";
import {
  GithubRepoBranchesModel,
  normalizeOrgBranchesToCollection,
} from "@store/models/branches";
import {
  GetOrgBranchesParams,
  IBranchesStore,
} from "@store/ReposBranchesStore/types";
import {
  CollectionT,
  getInitialCollectionModel,
  linearizeCollection,
} from "@utils/collection";
import { Meta } from "@utils/meta";
import { ILocalStore } from "@utils/useLocalStore";
import axios from "axios";
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";

type PrivateFields = "_branches" | "_meta";

export default class ReposBranchesStore implements ILocalStore, IBranchesStore {
  private _meta: Meta = Meta.initial;
  private _branches: CollectionT<string, GithubRepoBranchesModel> =
    getInitialCollectionModel();

  constructor() {
    makeObservable<ReposBranchesStore, PrivateFields>(this, {
      _branches: observable.ref,
      _meta: observable,
      branches: computed,
      meta: computed,
      getOrgBranchesList: action,
    });
  }

  get branches(): GithubRepoBranchesModel[] {
    return linearizeCollection(this._branches);
  }
  get meta(): Meta {
    return this._meta;
  }

  async getOrgBranchesList(params: GetOrgBranchesParams): Promise<void> {
    this._meta = Meta.loading;
    this._branches = getInitialCollectionModel();
    const response = await axios(
      apiUrls.github.repoBranches(params.owner, params.repo)
    );

    runInAction(() => {
      if (response.status === 404) {
        this._meta = Meta.error;
      }
      try {
        this._meta = Meta.success;
        this._branches = normalizeOrgBranchesToCollection(response.data);
        return;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e);
        this._meta = Meta.error;
        this._branches = getInitialCollectionModel();
      }
    });
  }
  destroy(): void {
    this._branches = getInitialCollectionModel();
    this._meta = Meta.initial;
  }
}
