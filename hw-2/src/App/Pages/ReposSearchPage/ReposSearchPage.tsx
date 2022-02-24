import * as React from "react";

import CardBlock from "@components/Layouts";
import RepoTile from "@components/RepoCard/RepoTile";
import SearchForm from "@components/SearchForm/SearchForm";
import { GithubRepoBranchesModel, GithubRepoModel } from "@store/models/github";
import { Space } from "antd";

type Props = {
  setRepos: React.Dispatch<React.SetStateAction<GithubRepoModel[]>>;
  repos: GithubRepoModel[];
  showDrawer: () => void;
  setBranches: React.Dispatch<React.SetStateAction<GithubRepoBranchesModel[]>>;
};

const ReposSearchPage: React.FC<Props> = ({
  setRepos,
  repos,
  showDrawer,
  setBranches,
}: Props) => {
  const [isLoading, setIsLoading] = React.useState(false);
  return (
    <div className="search-page">
      <SearchForm setRepos={setRepos} />
      <div className="repo-cards">
        <CardBlock>
          <Space direction="vertical">
            {repos.map((repo) => (
              <RepoTile
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
