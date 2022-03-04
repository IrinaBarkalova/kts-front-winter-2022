import * as React from "react";

import BranchCard from "@components/BranchCard";
import { GithubRepoBranchesModel } from "@store/models/github";
import { Space, Drawer } from "antd";
import "@styles/RepoTile.css";

type Props = {
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
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
    <>
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
    </>
  );
};

export default RepoBranchesDrawer;
