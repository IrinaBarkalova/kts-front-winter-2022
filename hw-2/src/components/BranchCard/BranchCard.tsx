import * as React from "react";

import "@styles/RepoCard.css";
import { GithubRepoBranchesModel } from "@store/models/github";
import { Card } from "antd";

type Props = {
  branch: GithubRepoBranchesModel;
};

const BranchCard: React.FC<Props> = ({ branch }: Props) => {
  return (
    <div className="Card-block">
      <Card.Meta
        title={branch?.name}
        description={
          <>
            <a
              key="go"
              href={branch.commit.htmlUrl}
              target="_blank"
              className="repo-href"
              rel="noreferrer"
            >
              {branch.protected}
            </a>
            <br />
          </>
        }
      />
    </div>
  );
};

export default React.memo(BranchCard);
