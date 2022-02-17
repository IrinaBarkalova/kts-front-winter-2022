import {ApiResponse, HTTPMethod, IApiStore, RequestParams, StatusHTTP} from "./types";

let qs = require("qs");

export default class ApiStore implements IApiStore {
	readonly baseUrl: string;

	constructor(baseUrl: string) {
		this.baseUrl = baseUrl;
	}

	async request<SuccessT, ErrorT = any, ReqT = {}>(
		params: RequestParams<ReqT>
	): Promise<ApiResponse<SuccessT, ErrorT>> {
		let query =
			params.method === HTTPMethod.GET ? "?" + qs.stringify(params.data) : "";
		let req: RequestInit = {
			method: params.method
		};

		if (params.method === HTTPMethod.POST) {
			req.body = JSON.stringify(params.data);
			req.headers = {
				...params.headers,
				"Content-Type": "application/json",
			};
		}

		let url = this.baseUrl + params.endpoint + query;

		try {
			const response = await fetch(url, req);
			if (response.ok) {
				return {
					success: true,
					data: await response.json(),
					status: StatusHTTP.OK,
				};
			}
			return {
				success: false,
				data: await response.json(),
				status: StatusHTTP.ERR,
			};
		} catch (e: any) {
			console.error(e)
			return {
				success: false,
				data: e,
				status: e.code,
			};
		}
	}
}