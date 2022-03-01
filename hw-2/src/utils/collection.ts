export type CollectionT<Uid extends number | string, T> = {
  order: Uid[];
  entities: Record<Uid, T>;
};

export const normalizeCollection = <Uid extends string | number, T>(
  collection: CollectionT<Uid, T>
): T[] => collection.order.map((uid) => collection.entities[uid]);
