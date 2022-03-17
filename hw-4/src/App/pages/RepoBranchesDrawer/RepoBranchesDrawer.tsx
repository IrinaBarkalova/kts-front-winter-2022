import * as React from "react";

import { useReposContext } from "@App/App";
import BranchCard from "@components/BranchCard";
import styles from "@components/BranchCard/BranchCard.module.scss";
import { Meta } from "@utils/meta";
import { Space, Modal, Alert } from "antd";
import { observer } from "mobx-react-lite";
import { useHistory, useParams } from "react-router-dom";

const RepoBranchesDrawer: React.FC = () => {
  const repoContext = useReposContext();
  const { owner, repo } = useParams<{ owner: string; repo: string }>();
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const onClose = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {};
  let history = useHistory();
  const handleCancel = React.useCallback(() => {
    history.push({
      pathname: "/repos",
      search: `?searchStr=${repoContext.gitHubStore.value}`,
    });
    setIsModalVisible(false);
  }, [repoContext.gitHubStore, history]);

  React.useEffect(() => {
    setIsModalVisible(true);
    repoContext.branchesStore.getOrgBranchesList({ owner, repo });
  }, [owner, repo, repoContext]);
  return (
    <Modal
      title="Branches"
      closable={false}
      visible={isModalVisible}
      onOk={handleCancel}
      onCancel={handleCancel}
    >
      {repoContext.branchesStore.meta === Meta.error && (
        <Alert
          message="Error"
          description="Something go wrong. Reload page, please!"
          type="error"
          closable
          onClose={onClose}
        />
      )}
      {repoContext.branchesStore.meta === Meta.loading && (
        <Alert message="Loading..." type="info" />
      )}
      <Space className={styles.branches_page} direction="vertical">
        {repoContext.branchesStore.branches.map((branch) => (
          <BranchCard key={branch.commit.shaCode} branch={branch} />
        ))}
      </Space>
    </Modal>
  );
};

export default observer(RepoBranchesDrawer);
