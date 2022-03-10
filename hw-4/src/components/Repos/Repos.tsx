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
import { autorun } from "mobx";
import { observer } from "mobx-react-lite";
import * as queryString from "query-string";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link, useHistory } from "react-router-dom";

const Repos: React.FC = () => {
  const repoContext = useReposContext();
  const [page, setPage] = React.useState(2);
  const onClose = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {};
  const history = useHistory();
  //TODO rewrit in store
  React.useEffect(() => {
    if (repoContext.gitHubStore.value) {
      history.push({
        pathname: "/repos",
        search: `?searchStr=${repoContext.gitHubStore.value}`,
      });
    }
  }, [repoContext, history]);

  React.useEffect(
    autorun(() => {
      const parsed = queryString.parse(history.location.search.substr(1));
      let value = repoContext.gitHubStore.value;
      if (!!parsed.searchStr) value = String(parsed.search);
      repoContext.getNextRepos(value, page, 20).then((result) => {
        repoContext.gitHubStore.repos.push(
          ...normalizeReposCollection(result.data)
        );
      });
    }),
    [repoContext, page]
  );

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
                {/*TODO TEST IT!!!*/}
                {/*<Link to={`/repos/${repo.owner.login}/${repo.name}`}>*/}
                <Link to={routing.urls.repoTile(repo.owner.login, repo.name)}>
                  <RepoTile key={repo.id} item={repo} />
                </Link>
                {/*<Link to={`/repos/${repo.id}`}>*/}
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
