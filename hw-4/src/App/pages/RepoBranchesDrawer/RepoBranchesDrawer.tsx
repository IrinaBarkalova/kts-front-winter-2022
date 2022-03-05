import * as React from "react";

import { useReposContext } from "@App/App";
import BranchCard from "@components/BranchCard";
import styles from "@components/BranchCard/BranchCard.module.scss";
import { Space, Modal } from "antd";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";

const RepoBranchesDrawer: React.FC = () => {
  const repoContext = useReposContext();
  const { owner, repo } = useParams<{ owner: string; repo: string }>();
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const handleOk = React.useCallback(() => {
    setIsModalVisible(false);
  }, []);

  const handleCancel = React.useCallback(() => {
    setIsModalVisible(false);
  }, []);

  React.useEffect(() => {
    setIsModalVisible(true);
    repoContext.branchesStore.getOrgBranchesList({ owner, repo });
  }, [owner, repo, repoContext]);
  return (
    <Modal
      title="Branches"
      closable={false}
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Space className={styles.branches_page} direction="vertical">
        {repoContext.branchesStore.branches.map((branch) => (
          <BranchCard key={branch.commit.shaCode} branch={branch} />
        ))}
      </Space>
    </Modal>
  );
};

export default observer(RepoBranchesDrawer);
