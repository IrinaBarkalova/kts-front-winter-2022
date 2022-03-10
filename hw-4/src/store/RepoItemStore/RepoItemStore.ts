import { apiUrls } from "@config/apiUrls";
import {
  GetOrganizationDrawerListParams,
  IDrawerStore,
  InitialUser,
  normalizeDrawerModel,
  User,
} from "@store/RepoItemStore/types";
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

type PrivateFields = "_user" | "_meta";

export default class RepoItemStore implements IDrawerStore, ILocalStore {
  private _meta: Meta = Meta.initial;
  private _user: User = InitialUser();

  constructor() {
    makeObservable<RepoItemStore, PrivateFields>(this, {
      _user: observable.ref,
      _meta: observable,
      user: computed,
      meta: computed,
      getOrganizationDrawerList: action,
    });
  }

  get user(): User {
    return this._user;
  }

  get meta(): Meta {
    return this._meta;
  }

  async getOrganizationDrawerList(
    params: GetOrganizationDrawerListParams
  ): Promise<void> {
    this._meta = Meta.loading;
    this._user = InitialUser();
    const result = await axios(apiUrls.github.repoItem(params.userId.id));
    runInAction(() => {
      if (result.status === 404) {
        this._meta = Meta.error;
      }
      try {
        this._meta = Meta.success;
        this._user = normalizeDrawerModel(result.data);
        return;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e);
        this._meta = Meta.error;
        this._user = InitialUser();
      }
    });
  }

  destroy(): void {
    this._user = InitialUser();
    this._meta = Meta.initial;
  }
}
