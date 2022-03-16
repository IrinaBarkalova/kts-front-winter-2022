import { ILocalStore } from "utils/useLocalStore";
import * as H from "history";
import { action, computed, makeObservable, observable } from "mobx";
import * as queryString from "query-string";
type PrivateFields = "_value" | "_location";

export class QueryStore implements ILocalStore {
  private history: H.History | null = null;
  private _location: H.Location | null = null;
  private _value: string = "";
  params: any = {};
  constructor() {
    makeObservable<QueryStore, PrivateFields>(this, {
      _location: observable.ref,
      params: observable.ref,
      _value: observable,
      value: computed,
      update: action,
      _getSearchValue: action,
      setHistory: action,
    });
  }

  get value(): string {
    return this._value;
  }

  update(location: H.Location): void {
    this._location = location;

    this._getSearchValue();
  }
  _getSearchValue(): void {
    if (!this._location) {
      return;
    }
    this.params = queryString.parse(this._location.search.substr(1));
    if (!!this.params.searchStr) this._value = String(this.params.searchStr);
  }

  setHistory(): void {
    if (!this.history) {
      return;
    }
    this.history.replace({
      ...this._location,
      search: queryString.stringify({
        ...this.params,
      }),
    });
  }

  destroy(): void {
    this._value = "";
    this.history = null;
    this._location = null;
    this.params = {};
  }
}
export const queryStore = new QueryStore();
