import * as React from "react";

import { useReposContext } from "App/App";
import { Link, useLocation } from "react-router-dom";

type Props = {
  children: React.ReactNode;
  className: string;
};
const SearchButton: React.FC<Props> = (
  props: React.PropsWithChildren<Props>
) => {
  const repoContext = useReposContext();
  const location = useLocation();
  const handleClick = React.useCallback(() => {
    if (repoContext.gitHubStore.value) {
      repoContext.queryStore.setHistory();
      repoContext.gitHubStore.getOrganizationReposList({
        organizationName: repoContext.gitHubStore.value,
        page: 1,
      });
    }
  }, [repoContext]);
  React.useEffect(() => {
    let Value = repoContext.gitHubStore.value;
    repoContext.queryStore.update(location);
    if (!!repoContext.queryStore.value) Value = repoContext.queryStore.value;
    if (Value) {
      repoContext.gitHubStore.getOrganizationReposList({
        organizationName: Value,
        page: 1,
      });
    }
  }, [repoContext.gitHubStore, repoContext.queryStore, location]);
  return (
    <Link
      to={{
        pathname: "/repos",
        search: `?searchStr=${repoContext.gitHubStore.value}`,
      }}
    >
      <button onClick={handleClick} className={props.className}>
        {props.children}
      </button>
    </Link>
  );
};

export default React.memo(SearchButton);
