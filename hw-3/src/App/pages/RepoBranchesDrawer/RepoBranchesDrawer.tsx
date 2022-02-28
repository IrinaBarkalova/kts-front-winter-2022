import * as React from "react";
import { useEffect, useState } from "react";

import { useReposContext } from "@App/App";
import BranchCard from "@components/BranchCard";
import { GithubRepoBranchesModel } from "@store/models/github";
import { normalizeCollection } from "@utils/collection";
import { Space, Modal } from "antd";
import "@styles/RepoTile.scss";
import { useParams } from "react-router-dom";

// type Props = {
//   setVisible: React.Dispatch<React.SetStateAction<boolean>>;
//   visible: boolean;
// };

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
  }, [owner, repo]);
  return (
    <Modal
      title="Basic Modal"
      closable={false}
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Space className="branches-page" direction="vertical">
        {branches.map((branch) => (
          <BranchCard key={branch.commit.shaCode} branch={branch} />
        ))}
      </Space>
    </Modal>
  );
};

export default RepoBranchesDrawer;
