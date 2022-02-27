import * as React from "react";

import { useReposContext } from "@App/App";
import CardBlock from "@components/Layouts";
import RepoTile from "@components/RepoCard/RepoTile";
import { GithubRepoBranchesModel } from "@store/models/github";
import { Space } from "antd";

type Props = {
  setBranches: React.Dispatch<React.SetStateAction<GithubRepoBranchesModel[]>>;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const Repos: React.FC<Props> = ({ setVisible, setBranches }: Props) => {
  const RepoContext = useReposContext();
  return (
    <div className="repo-cards">
      <CardBlock>
        <Space direction="vertical">
          {RepoContext.repos.map((repo) => (
            <RepoTile
              setVisible={setVisible}
              setBranches={setBranches}
              key={repo.id}
              item={repo}
            />
          ))}
        </Space>
      </CardBlock>
    </div>
  );
};

export default React.memo(Repos);
