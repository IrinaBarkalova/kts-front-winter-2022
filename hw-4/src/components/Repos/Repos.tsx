import * as React from "react";

import { useReposContext } from "@App/App";
import EndMessage from "@components/EndMessage";
import CardBlock from "@components/Layouts";
import Loader from "@components/loader";
import RepoTile from "@components/RepoTile/RepoTile";
import styles from "@components/SearchForm/SearchForm.module.scss";
import { normalizeReposCollection } from "@utils/collection";
import { Meta } from "@utils/meta";
import { Space } from "antd";
import { observer } from "mobx-react-lite";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";

const Repos: React.FC = () => {
  const repoContext = useReposContext();
  const [page, setPage] = React.useState(2);

  React.useEffect(() => {
    repoContext.getNextRepos(repoContext.inputStr, page, 8).then((result) => {
      repoContext.gitHubStore.repos.push(
        ...normalizeReposCollection(result.data)
      );
    });
  }, [repoContext, page]);

  const nextPage = React.useCallback(() => {
    setPage((page) => page + 1);
  }, []);

  return (
    <div className={styles.repoCards}>
      <InfiniteScroll
        dataLength={repoContext.gitHubStore.repos.length}
        next={nextPage}
        hasMore={true}
        loader={<Loader />}
        endMessage={<EndMessage />}
      >
        <CardBlock>
          {repoContext.gitHubStore.meta === Meta.loading && (
            <RepoTile loading />
          )}
          <Space direction="vertical">
            {repoContext.gitHubStore.repos.map((repo) => (
              <Link to={`/repos/${repo.owner.login}/${repo.name}`}>
                <RepoTile key={repo.id} item={repo} />
              </Link>
            ))}
          </Space>
        </CardBlock>
      </InfiniteScroll>
    </div>
  );
};

export default observer(Repos);
