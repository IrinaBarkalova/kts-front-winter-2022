import * as React from "react";

import "@styles/BranchCard.css";
import { GithubRepoBranchesModel } from "@store/models/github";
import { Collapse } from "antd";

type Props = {
  branch: GithubRepoBranchesModel;
};
const { Panel } = Collapse;

const BranchCard: React.FC<Props> = ({ branch }: Props) => {
  return (
    <Collapse accordion>
      <Panel header={branch.name} key="1" className="branch-card">
        <a href={branch.commit.htmlUrl}>{branch.commit.htmlUrl}</a>
      </Panel>
    </Collapse>
  );
};

export default React.memo(BranchCard);
