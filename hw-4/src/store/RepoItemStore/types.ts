export type GetOrganizationDrawerListParams = {
  userId: { id: string };
};

export interface IDrawerStore {
  getOrganizationDrawerList(
    params: GetOrganizationDrawerListParams
  ): Promise<void>;
}

export type User = {
  Name: string;
  Description: string;
  createdAt: Date;
  Language: string;
};
export type UserApi = {
  name: string;
  description: string;
  created_at: Date;
  language: string;
};
export const InitialUser = {
  Name: "",
  Description: "",
  createdAt: new Date(),
  Language: "",
};
export const normalizeDrawerModel = (raw: UserApi): User => ({
  Name: raw.name,
  Description: raw.description,
  createdAt: new Date(raw.created_at),
  Language: raw.language,
});
