import { GithubRepoModel } from "@store/models/repos";
import { CollectionT } from "@utils/collection";
import * as qs from "qs";

import { ApiResponse, HTTPMethod, IApiStore, RequestParams } from "./types";

export default class ApiStore implements IApiStore {
  readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async request<SuccessT, ErrorT = any, ReqT = {}>(
    params: RequestParams<ReqT>
  ): Promise<ApiResponse<CollectionT<number, GithubRepoModel>>> {
    const query =
      params.method === HTTPMethod.GET
        ? "?" + qs.stringify(params.params) + qs.stringify(params.data)
        : "";
    const req: RequestInit = {};
    if (params.method === HTTPMethod.POST) {
      req.body = JSON.stringify(params.data);
      req.headers = {
        ...params.headers,
        "Content-Type": "text/plain;charset=UTF-8",
      };
    }

    const url = this.baseUrl + params.endpoint + query;

    try {
      const response = await fetch(url, req);
      if (response.ok) {
        return {
          success: true,
          data: await response.json(),
        };
      }
      return {
        success: false,
        data: await response.json(),
      };
    } catch (e: any) {
      return {
        success: false,
        data: e,
      };
    }
  }
}
