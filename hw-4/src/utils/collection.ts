import { GithubOwnerModel } from "@store/models/repos";

export type CollectionT<Uid extends number | string, T> = {
  order: Uid[];
  entities: Record<Uid, T>;
};
export const normalizeCollectionT = <Uid extends string | number, T>(
  collection: CollectionT<Uid, T>
): T[] => collection.order.map((uid) => collection.entities[uid]);

type GithubRepoModel = {
  id: number;
  name: string;
  description: string;
  htmlUrl: string;
  stargazersCount: number;
  updatedAt: Date;
  owner: GithubOwnerModel;
};
export const normalizeReposCollection = <
  Uid extends string | number,
  T extends GithubRepoModel
>(
  collection: CollectionT<Uid, T>
): T[] => collection.order.map((uid) => collection.entities[uid]);

export const getInitialCollectionModel = (): CollectionT<any, any> => ({
  order: [],
  entities: {},
});

export const linearizeCollection = <Uid extends string | number, T>(
  elements: CollectionT<Uid, T>
): T[] => elements.order.map((el) => elements.entities[el]);
