import React from "react";

import { HTTPMethod } from "@shared/store/ApiStore/types";
import rootStore from "@shared/store/rootStore";
import {
  GithubRepoApiModel,
  GithubRepoModel,
  normalizeGithubReposToCollection,
} from "@store/models/repos/reposModels";
import {
  CollectionT,
  getInitialCollectionModel,
  linearizeCollection,
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
export default class ReposListStore implements IGitHubStore, ILocalStore {
  private apiStore = rootStore.apiStore;
  private _repos: CollectionT<number, GithubRepoModel> =
    getInitialCollectionModel();
  private _meta: Meta = Meta.initial;
  private _value: string = "";

  constructor() {
    this.handleChangeValue = this.handleChangeValue.bind(this);
    makeObservable<ReposListStore, PrivateFields>(this, {
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

  handleChangeValue(event: React.ChangeEvent<HTMLInputElement>) {
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
        per_page: 20,
        page: params.page,
      },
      data: {},
    });
    runInAction(() => {
      if (!response.success) {
        this._meta = Meta.error;
      }
      try {
        this._meta = Meta.success;
        this._repos = normalizeGithubReposToCollection(response.data ?? []);
        return;
      } catch (e) {
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
