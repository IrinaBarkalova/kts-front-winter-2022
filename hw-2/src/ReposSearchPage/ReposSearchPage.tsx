import * as React from "react";

import CardBlock from "@components/Layouts";
import RepoCard from "@components/RepoCard/RepoTile";
import SearchForm from "@components/SearchForm/SearchForm";
import { GithubRepoModel } from "@store/models/github";
import { Space } from "antd";

type Props = {
  setRepos: any;
  repos: GithubRepoModel[];
  showDrawer: any;
  setBranches: any;
};

const ReposSearchPage: React.FC<Props> = ({
  setRepos,
  repos,
  showDrawer,
  setBranches,
}: Props) => {
  return (
    <div className="search-page">
      <SearchForm setRepos={setRepos} />
      <div className="repo-cards">
        <CardBlock>
          <Space direction="vertical">
            {repos.map((repo) => (
              <RepoCard
                showDrawer={showDrawer}
                setBranches={setBranches}
                key={repo.id}
                item={repo}
              />
            ))}
          </Space>
        </CardBlock>
      </div>
    </div>
  );
};

export default ReposSearchPage;
