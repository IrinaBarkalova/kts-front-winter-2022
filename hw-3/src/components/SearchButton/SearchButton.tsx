import * as React from "react";
import { Dispatch, SetStateAction, useCallback } from "react";

import { useReposContext } from "@App/App";
import GitHubStore from "@store/GitHubStore";
import { GithubRepoModel } from "@store/models/github";
import { normalizeCollection } from "@utils/collection";
import { Link } from "react-router-dom";

type Props = {
  children: React.ReactNode;
  className: string;
  value: string;
};
const SearchButton: React.FC<Props> = ({
  children,
  value,
  className,
}: Props) => {
  const RepoContext = useReposContext();
  //TODO useCallback ???
  const handleClick = () => {
    const gitHubStore = new GitHubStore();
    RepoContext.setRepos([]);
    RepoContext.isLoading = true;
    gitHubStore
      .getOrganizationReposList({
        organizationName: value,
      })
      .then((result) => {
        RepoContext.isLoading = false;
        RepoContext.setRepos(normalizeCollection(result.data));
      });
  };
  return (
    <Link to="/repos">
      <button onClick={handleClick} className={className}>
        {children}
      </button>
    </Link>
  );
};

export default React.memo(SearchButton);
