import * as React from "react";

import { useReposContext } from "@App/App";
import GitHubStore from "@store/GitHubStore";
import { normalizeCollection } from "@utils/collection";
import { Link } from "react-router-dom";

type Props = {
  children: React.ReactNode;
  className: string;
};
const SearchButton: React.FC<Props> = (
  props: React.PropsWithChildren<Props>
) => {
  const RepoContext = useReposContext();
  const handleClick = React.useCallback(() => {
    const gitHubStore = new GitHubStore();
    RepoContext.setRepos([]);
    RepoContext.isLoading = true;
    gitHubStore
      .getOrganizationReposList({
        organizationName: RepoContext.inputStr,
        page: 1,
      })
      .then((result) => {
        RepoContext.isLoading = false;
        RepoContext.setRepos(normalizeCollection(result.data));
      });
  }, [RepoContext]);
  return (
    <Link to="/repos">
      <button onClick={handleClick} className={props.className}>
        {props.children}
      </button>
    </Link>
  );
};

export default React.memo(SearchButton);
