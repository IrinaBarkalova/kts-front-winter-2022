import ApiStore from '@shared/store/ApiStore';
import { RequestParams, HTTPMethod } from '@shared/store/ApiStore/types';
import {
	IGitHubStore,
	ApiResp,
	RepoItem,
	GetOrganizationReposListParams,
	TokenResp,
	GetIssuesParams,
	IssueResp
} from "./types";

export default class GitHubStore implements IGitHubStore {
	private readonly apiStore = new ApiStore("https://api.github.com/");
	private readonly apiStore_wrapper = new ApiStore("http://localhost:8000/");

	async getOrganizationReposList(params: GetOrganizationReposListParams): Promise<ApiResp<RepoItem[]>> {

		let req: RequestParams<object> = {
			method: HTTPMethod.GET,
			endpoint: `orgs/${params.organizationName}/repos`,
			headers: {
				accept: "application/vnd.github.v3+json"
			},
			data: {
				type: params.type,
				sort: params.sort,
				direction: params.direction,
				per_page: params.per_page,
				page: params.page
			}
		}

		let result = await this.apiStore.request<RepoItem[]>(req)

		return {
			success: result.success,
			orgs: result.data
		}


	}

	async getToken(params:string):Promise<TokenResp>{
		let req_token: RequestParams<object> = {
			method: HTTPMethod.GET,
			endpoint: `login`,
			headers: {
				accept: "application/vnd.github.v3+json"
			},
			data: {
				code : params
			}
		}


		let res_token = await this.apiStore_wrapper.request<{
			access_token:string
		},{
			error:string
		}>(req_token)

		if (res_token.success && !!res_token.data.access_token)
			return {
				success: true,
				token: res_token.data.access_token
			}
		else
			return {
				success: false
			}
	}


	async createIssue(params:GetIssuesParams):Promise<IssueResp>{
		let req_issue: RequestParams<object> = {
			method: HTTPMethod.POST,
			endpoint: `repos/${params.owner}/${params.repo}/issues`,
			headers: {
				accept: "application/vnd.github.v3+json",
				Authorization: `token ${params.token}`
			},
			data: {
				title : params.title
			}
		}


		let res_issue = await this.apiStore.request<{
			id:string
		}>(req_issue)

		return {
			success: res_issue.success,
			id: res_issue.data.id
		}
	}


}