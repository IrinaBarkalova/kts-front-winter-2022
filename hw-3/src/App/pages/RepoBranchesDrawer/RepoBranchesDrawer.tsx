import * as React from "react";
import { useEffect, useState } from "react";

import { useReposContext } from "@App/App";
import BranchCard from "@components/BranchCard";
import { GithubRepoBranchesModel } from "@store/models/github";
import styles from "@styles/BranchCard.module.scss";
import { normalizeCollection } from "@utils/collection";
import { Space, Modal } from "antd";
import { useParams } from "react-router-dom";

const RepoBranchesDrawer: React.FC = () => {
  const [branches, setBranches] = useState<GithubRepoBranchesModel[]>([]);
  const RepoContext = useReposContext();
  const { owner, repo } = useParams<{ owner: string; repo: string }>();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    setIsModalVisible(true);
    RepoContext.load(owner, repo).then((result) => {
      setBranches(normalizeCollection(result.data));
    });
    RepoContext.load(owner, repo);
  }, [owner, repo, RepoContext]);
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
