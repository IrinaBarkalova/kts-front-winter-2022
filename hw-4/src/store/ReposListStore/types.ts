// Параметры запроса

export type GetOrganizationReposListParams = {
  organizationName?: string;
  page: number;
};

export interface IGitHubStore {
  getOrganizationReposList(
    params: GetOrganizationReposListParams
  ): Promise<void>;
}
