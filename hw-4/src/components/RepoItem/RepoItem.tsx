import * as React from "react";

import styles from "@components/RepoItem/RepoItem.module.scss";
import RepoItemStore from "@store/RepoItemStore";
import { formatDate } from "@utils/formatDate";
import { Meta } from "@utils/meta";
import { useLocalStore } from "@utils/useLocalStore";
import { Alert, Card } from "antd";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";

const RepoItem: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  //TODO подумать чтобы открывался на "ок" у веток
  const itemStore = useLocalStore(() => new RepoItemStore());
  const onClose = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {};

  React.useEffect(() => {
    itemStore.getOrganizationDrawerList({
      userId: { id },
    });
  }, [itemStore, id]);
  return (
    <div className={styles.detail_block}>
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
      <Card
        title={itemStore.user?.Name}
        bordered={false}
        className={styles.card}
        headStyle={{ fontSize: 50, fontWeight: 300 }}
      >
        <p>Description: {itemStore.user.Description}</p>
        <p>Using language: {itemStore.user.Language}</p>
        <p> {formatDate(itemStore.user.createdAt, "Created")}</p>
      </Card>
    </div>
  );
};

export default observer(RepoItem);
