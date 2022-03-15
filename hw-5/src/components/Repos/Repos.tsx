import * as React from "react";

import { useReposContext } from "@App/App";
import EndMessage from "@components/EndMessage";
import CardBlock from "@components/Layouts";
import Loader from "@components/loader";
import RepoTile from "@components/RepoTile/RepoTile";
import styles from "@components/SearchForm/SearchForm.module.scss";
import { routing } from "@config/apiUrls";
import { normalizeReposCollection } from "@utils/collection";
import { Meta } from "@utils/meta";
import { Space, Button, Alert } from "antd";
import { observer } from "mobx-react-lite";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link, useLocation } from "react-router-dom";

const Repos: React.FC = () => {
  const repoContext = useReposContext();
  const [page, setPage] = React.useState(2);
  const onClose = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {};
  const location = useLocation();

  React.useEffect(() => {
    let Value = repoContext.gitHubStore.value;
    repoContext.queryStore.update(location);
    if (!!repoContext.queryStore.value) Value = repoContext.queryStore.value;
    if (Value) {
      repoContext.getNextRepos(Value, page, 20).then((result) => {
        repoContext.gitHubStore.repos.push(
          ...normalizeReposCollection(result.data)
        );
      });
    }
  }, [repoContext, page, location]);

  const nextPage = React.useCallback(() => {
    setPage((page) => page + 1);
  }, []);

  return (
    <div className={styles.repoCards}>
      <InfiniteScroll
        dataLength={repoContext.gitHubStore.repos.length}
        next={nextPage}
        hasMore={true}
        loader={repoContext.gitHubStore.meta === Meta.loading && <Loader />}
        endMessage={<EndMessage />}
      >
        {repoContext.gitHubStore.meta === Meta.error && (
          <Alert
            message="Error"
            description="Something go wrong. Reload page, please!"
            type="error"
            closable
            onClose={onClose}
          />
        )}
        {repoContext.gitHubStore.meta === Meta.loading && (
          <Alert message="Loading..." type="info" />
        )}
        <CardBlock>
          <Space direction="vertical">
            {repoContext.gitHubStore.repos.map((repo) => (
              <>
                <Link to={routing.urls.repoTile(repo.owner.login, repo.name)}>
                  <RepoTile key={repo.id} item={repo} />
                </Link>
                <Link to={routing.urls.details(repo.id)}>
                  <Button type="dashed" block>
                    Details
                  </Button>
                </Link>
              </>
            ))}
          </Space>
        </CardBlock>
      </InfiniteScroll>
    </div>
  );
};

export default observer(Repos);
