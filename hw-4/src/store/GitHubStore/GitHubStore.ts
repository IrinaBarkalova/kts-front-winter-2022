import { HTTPMethod } from "@shared/store/ApiStore/types";
import rootStore from "@shared/store/rootStore";
import {
  GithubRepoApiModel,
  GithubRepoModel,
  normalizeGithubRepoModel,
} from "@store/models/repos/reposModels";
import {
  CollectionT,
  getInitialCollectionModel,
  linearizeCollection,
  normalizeCollection,
} from "@utils/collection";
import { Meta } from "@utils/meta";
import { ILocalStore } from "@utils/useLocalStore";
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";

import { IGitHubStore, GetOrganizationReposListParams } from "./types";
type PrivateFields = "_repos" | "_meta" | "_value";
export default class GitHubStore implements IGitHubStore, ILocalStore {
  private apiStore = rootStore.api_store;
  private _repos: CollectionT<number, GithubRepoModel> =
    getInitialCollectionModel();
  private _meta: Meta = Meta.initial;
  private _value: string = "";

  constructor() {
    this.handleChangeValue = this.handleChangeValue.bind(this);
    makeObservable<GitHubStore, PrivateFields>(this, {
      _repos: observable.ref,
      _meta: observable,
      _value: observable,
      repos: computed,
      meta: computed,
      value: computed,
      handleChangeValue: action,
      getOrganizationReposList: action,
    });
  }

  get repos(): GithubRepoModel[] {
    return linearizeCollection(this._repos);
  }

  get meta(): Meta {
    return this._meta;
  }

  get value(): string {
    return this._value;
  }

  handleChangeValue(event: any) {
    this._value = event.target.value;
  }
  async getOrganizationReposList(
    params: GetOrganizationReposListParams
  ): Promise<void> {
    this._meta = Meta.loading;
    this._repos = getInitialCollectionModel();
    const response = await this.apiStore.request<GithubRepoApiModel[]>({
      method: HTTPMethod.GET,
      endpoint: `orgs/${params.organizationName}/repos`,
      headers: { accept: "application/vnd.repos.v3+json" },
      params: {
        per_page: 8,
        page: params.page,
      },
      data: {},
    });
    runInAction(() => {
      if (!response.success) {
        this._meta = Meta.error;
      }
      try {
        // TODO try normalizeCollectionT
        // eslint-disable-next-line no-console
        console.log(response.data);
        const rep: GithubRepoModel[] = [];
        for (const item of response.data) {
          rep.push(normalizeGithubRepoModel(item));
        }
        this._meta = Meta.success;
        this._repos = normalizeCollection(rep, (RepoItem) => RepoItem.id);
        return;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e);
        this._meta = Meta.error;
        this._repos = getInitialCollectionModel();
      }
    });
  }
  destroy(): void {
    this._repos = getInitialCollectionModel();
    this._meta = Meta.initial;
    this._value = "";
  }
}
