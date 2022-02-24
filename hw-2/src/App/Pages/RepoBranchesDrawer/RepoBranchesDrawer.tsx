import "@styles/App.css";

import * as React from "react";

import BranchCard from "@components/BranchCard";
import { GithubRepoBranchesModel } from "@store/models/github";
import { Space, Drawer } from "antd";
import "@styles/RepoCard.css";

type Props = {
  setVisible: any;
  visible: boolean;
  branches: GithubRepoBranchesModel[];
};

const RepoBranchesDrawer: React.FC<Props> = ({
  setVisible,
  visible,
  branches,
}: Props) => {
  const onClose = () => {
    setVisible(false);
  };
  return (
    <div className="branch-drawer">
      <Drawer
        title="Branches"
        placement="right"
        onClose={onClose}
        visible={visible}
      >
        <Space direction="vertical">
          {branches.map((branch) => (
            <BranchCard key={branch.commit.shaCode} branch={branch} />
          ))}
        </Space>
      </Drawer>
    </div>
  );
};

export default RepoBranchesDrawer;
