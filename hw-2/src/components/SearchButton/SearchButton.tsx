import * as React from "react";
import { useCallback } from "react";

import GitHubStore from "@store/GitHubStore";
import { GithubRepoModel } from "@store/models/github";
import { normalizeCollection } from "@utils/collection";

type Props = {
  children: React.ReactNode;
  className: string;
  isLoading: (value: boolean) => void;
  setRepos: React.Dispatch<React.SetStateAction<GithubRepoModel[]>>;
  value: string;
};
const SearchButton: React.FC<Props> = ({
  children,
  isLoading,
  setRepos,
  value,
  className,
}: Props) => {
  const handleClick = useCallback(() => {
    const gitHubStore = new GitHubStore();
    setRepos([]);
    isLoading(true);
    gitHubStore
      .getOrganizationReposList({
        organizationName: value,
      })
      .then((result) => {
        setRepos(normalizeCollection(result.data));
        isLoading(false);
      });
  }, [value]);
  return (
    <button onClick={handleClick} className={className}>
      {children}
    </button>
  );
};

export default React.memo(SearchButton);
