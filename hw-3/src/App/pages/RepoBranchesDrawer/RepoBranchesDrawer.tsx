import * as React from "react";

import { useReposContext } from "@App/App";
import BranchCard from "@components/BranchCard";
import styles from "@components/BranchCard/BranchCard.module.scss";
import { GithubRepoBranchesModel } from "@store/models/github";
import { normalizeCollection } from "@utils/collection";
import { Space, Modal } from "antd";
import { useParams } from "react-router-dom";

const RepoBranchesDrawer: React.FC = () => {
  const [branches, setBranches] = React.useState<GithubRepoBranchesModel[]>([]);
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
    repoContext.load(owner, repo).then((result) => {
      setBranches(normalizeCollection(result.data));
    });
    repoContext.load(owner, repo);
  }, [owner, repo, repoContext]);
  return (
    <Modal
      title="Basic Modal"
      closable={false}
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Space className={styles.branches_page} direction="vertical">
        {branches.map((branch) => (
          <BranchCard key={branch.commit.shaCode} branch={branch} />
        ))}
      </Space>
    </Modal>
  );
};

export default RepoBranchesDrawer;
