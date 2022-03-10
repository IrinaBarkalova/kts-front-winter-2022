import * as H from "history";
import { observable, action, makeObservable } from "mobx";
import * as queryString from "query-string";

type PrivateFields = "_location";

export class QueryParamsStore {
  private history: H.History | null = null;
  private _location: H.Location | null = null;

  // /**
  //  * Поле входящих параметров нужно в следующей ситуации:
  //  * 1. срабатывает два раза подряд `setParam`
  //  * 2. после этого только один раз вызывается `update` (в React схлопнулись обновления location)
  //  *
  //  * Таким образом в течение вызовов `setParam` накапливаются
  //  * необходимые обновления, а когда в `update` обновления применились,
  //  * этот объект перетирается
  //  * @private
  //  */
  private _incomingParams: any = {};

  params: any = {};

  constructor() {
    makeObservable<QueryParamsStore, PrivateFields>(this, {
      _location: observable.ref,
      params: observable.ref,
      update: action,
      _parseParams: action.bound,
      setParam: action,
    });
  }

  update(history: H.History<any>, location: H.Location): void {
    this.history = history;
    this._location = location;

    this._parseParams();

    this._incomingParams = {};
  }

  _parseParams(): void {
    if (!this._location) {
      return;
    }

    this.params = queryString.parse(this._location.search);
  }

  setParam(paramName: string, value: any): void {
    this._incomingParams[paramName] = value;

    if (!this.history || !this._location) {
      return;
    }

    this.history.replace({
      ...this._location,
      search: queryString.stringify({
        ...this.params,
        ...this._incomingParams,
      }),
    });
  }
}

export const queryParamsStore = new QueryParamsStore();
