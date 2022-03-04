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
  const repoContext = useReposContext();
  const handleClick = React.useCallback(() => {
    const gitHubStore = new GitHubStore();
    repoContext.setRepos([]);
    repoContext.isLoading = true;
    gitHubStore
      .getOrganizationReposList({
        organizationName: repoContext.inputStr,
        page: 1,
      })
      .then((result) => {
        repoContext.isLoading = false;
        repoContext.setRepos(normalizeCollection(result.data));
      });
  }, [repoContext]);
  return (
    <Link to="/repos">
      <button onClick={handleClick} className={props.className}>
        {props.children}
      </button>
    </Link>
  );
};

export default React.memo(SearchButton);
