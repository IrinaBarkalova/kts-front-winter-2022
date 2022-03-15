import * as React from "react";

import styles from "@components/BranchCard/BranchCard.module.scss";
import { GithubRepoBranchesModel } from "@store/models/branches";
import { Collapse } from "antd";

type Props = {
  branch: GithubRepoBranchesModel;
};
const { Panel } = Collapse;

const BranchCard: React.FC<Props> = ({ branch }: Props) => {
  return (
    <Collapse accordion>
      <Panel header={branch.name} key="1" className={styles.branch_card}>
        <a href={branch.commit.htmlUrl}>{branch.commit.htmlUrl}</a>
      </Panel>
    </Collapse>
  );
};

export default React.memo(BranchCard);
