import * as React from "react";

import CardBlock from "@components/Layouts";
import RepoTile from "@components/RepoCard/RepoTile";
import SearchForm from "@components/SearchForm/SearchForm";
import { GithubRepoBranchesModel, GithubRepoModel } from "@store/models/github";
import { Space } from "antd";

type Props = {
  setRepos: React.Dispatch<React.SetStateAction<GithubRepoModel[]>>;
  repos: GithubRepoModel[];
  setBranches: React.Dispatch<React.SetStateAction<GithubRepoBranchesModel[]>>;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const ReposSearchPage: React.FC<Props> = ({
  setRepos,
  repos,
  setVisible,
  setBranches,
}: Props) => {
  const [status, setIsLoading] = React.useState(false);
  return (
    <>
      <SearchForm setRepos={setRepos} isLoading={setIsLoading} />
      <div className="repo-cards">
        <CardBlock>
          <Space direction="vertical">
            {repos.map((repo) => (
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
    </>
  );
};

export default ReposSearchPage;
