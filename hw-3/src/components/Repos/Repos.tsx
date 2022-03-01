import * as React from "react";

import { useReposContext } from "@App/App";
import EndMessage from "@components/EndMessage";
import CardBlock from "@components/Layouts";
import Loader from "@components/loader";
import RepoTile from "@components/RepoTile/RepoTile";
import { apiUrls } from "@config/apiUrls";
import { normalizeGithubReposToCollection } from "@store/models/github";
import styles from "@styles/SearchForm.module.scss";
import { ApiResp } from "@utils/apiTypes";
import { normalizeCollection } from "@utils/collection";
import { Space } from "antd";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";

const Repos: React.FC = () => {
  const RepoContext = useReposContext();
  const [page, setPage] = React.useState(2);

  const getNextRepos = async (
    inputStr: string,
    page: number,
    per_page: number
  ): Promise<ApiResp> => {
    try {
      const response = await axios(
        apiUrls.github.repositories(inputStr, page, per_page)
      );
      return {
        success: true,
        data: normalizeGithubReposToCollection(response.data),
      };
    } catch (e) {
      return {
        success: false,
        data: e,
      };
    }
  };

  const nextPage = () => {
    getNextRepos(RepoContext.inputStr, page, 2).then((result) => {
      RepoContext.setRepos(normalizeCollection(result.data));
    });

    setPage((page) => page + 1);
  };

  return (
    <div className={styles.repoCards}>
      <InfiniteScroll
        dataLength={RepoContext.repos.length}
        next={nextPage}
        hasMore={true}
        loader={<Loader />}
        endMessage={<EndMessage />}
      >
        <CardBlock>
          <Space direction="vertical">
            {RepoContext.repos.map((repo) => (
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

export default React.memo(Repos);
