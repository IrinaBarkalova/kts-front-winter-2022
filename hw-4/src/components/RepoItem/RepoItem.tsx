import * as React from "react";

import styles from "@components/RepoTile/RepoTile.module.scss";
import RepoItemStore from "@store/RepoItemStore";
import { formatDate } from "@utils/formatDate";
import { Meta } from "@utils/meta";
import { useLocalStore } from "@utils/useLocalStore";
import { Alert } from "antd";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";

const RepoItem: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  //TODO AND STYLES, подумать чтобы открывался на "ок" у веток
  const itemStore = useLocalStore(() => new RepoItemStore());
  const onClose = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {};

  React.useEffect(() => {
    itemStore.getOrganizationDrawerList({
      userId: { id },
    });
  }, [itemStore, id]);
  return (
    <div className={styles.card_block}>
      {itemStore.meta === Meta.error && (
        <Alert
          message="Error"
          description="Something go wrong. Reload page, please!"
          type="error"
          closable
          onClose={onClose}
        />
      )}
      {itemStore.meta === Meta.loading && (
        <Alert message="Loading..." type="info" />
      )}
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

export default observer(RepoItem);
