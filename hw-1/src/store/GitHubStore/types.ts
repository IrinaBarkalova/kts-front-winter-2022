// Параметры запроса

export type RepoItem = {
	id: number;
	name: string;
	html_url: string;
}

export type GetOrganizationReposListParams = {
	organizationName: string | undefined;
	per_page?: number;
	page?: number;
	direction?: string;
	sort?:string;
	type?:string;
};

export type GetIssuesParams = {
	owner: string,
	repo:string,
	title:string,
	token:string
}
export type ApiResp<T> = {
	success: boolean;
	orgs: T;
};

export type TokenResp ={
	success: true;
	token: string;
}|{
	success: false;

}

export type IssueResp = {
	success: boolean;
	id?: number;
};

export interface IGitHubStore {
	getOrganizationReposList(params: GetOrganizationReposListParams): Promise<ApiResp<RepoItem[]>>;
	getToken(params:string): Promise<TokenResp>
	createIssue(params:GetIssuesParams) :Promise<IssueResp>
}

