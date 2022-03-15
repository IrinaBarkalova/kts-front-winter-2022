// Параметры запроса

export type GetOrgBranchesParams = {
  owner: string;
  repo: string;
};
export interface IBranchesStore {
  getOrgBranchesList(params: GetOrgBranchesParams): Promise<void>;
}
