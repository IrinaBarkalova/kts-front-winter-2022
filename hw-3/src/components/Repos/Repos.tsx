import * as React from "react";

import { useReposContext } from "@App/App";
import CardBlock from "@components/Layouts";
import RepoTile from "@components/RepoCard/RepoTile";
import { Space } from "antd";
import { Link } from "react-router-dom";

const Repos: React.FC = () => {
  const RepoContext = useReposContext();
  return (
    <div className="repo-cards">
      <CardBlock>
        <Space direction="vertical">
          {RepoContext.repos.map((repo) => (
            <Link to={`/repos/${repo.owner.login}/${repo.name}`}>
              <RepoTile key={repo.id} item={repo} />
            </Link>
          ))}
        </Space>
      </CardBlock>
    </div>
  );
};

export default React.memo(Repos);
