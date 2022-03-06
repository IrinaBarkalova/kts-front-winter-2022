import * as React from "react";

import styles from "@components/RepoTile/RepoTile.module.scss";
import RepoItemStore from "@store/RepoItemStore";
import { formatDate } from "@utils/formatDate";
import { useLocalStore } from "@utils/useLocalStore";
import { useParams } from "react-router-dom";

const RepoItem: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const itemStore = useLocalStore(() => new RepoItemStore());
  React.useEffect(() => {
    itemStore.getOrganizationDrawerList({
      userId: { id },
    });
    // eslint-disable-next-line no-console
    console.log(itemStore.user, "Drawer");
  }, [itemStore, id]);
  return (
    <div className={styles.card_block}>
      {itemStore.user?.Name}
      <br />
      {itemStore.user.Description}
      <br />
      {itemStore.user.Language}
      <br />
      {formatDate(itemStore.user.createdAt, "Created")}
    </div>
  );
};

export default React.memo(RepoItem);
