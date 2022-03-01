import * as React from "react";

import { useReposContext } from "@App/App";
import CardBlock from "@components/Layouts";
import RepoTile from "@components/RepoTile/RepoTile";
import styles from "@styles/SearchForm.module.scss";
import { Space } from "antd";
import { Link } from "react-router-dom";

const Repos: React.FC = () => {
  const RepoContext = useReposContext();

  return (
    <div className={styles.repoCards}>
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
