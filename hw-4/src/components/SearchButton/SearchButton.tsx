import * as React from "react";

import { useReposContext } from "@App/App";
import * as queryString from "query-string";
import { Link, useHistory } from "react-router-dom";

type Props = {
  children: React.ReactNode;
  className: string;
};
const SearchButton: React.FC<Props> = (
  props: React.PropsWithChildren<Props>
) => {
  const repoContext = useReposContext();
  const history = useHistory();

  const handleClick = React.useCallback(() => {
    repoContext.gitHubStore.getOrganizationReposList({
      organizationName: repoContext.gitHubStore.value,
      page: 1,
    });
  }, [repoContext]);
  React.useEffect(() => {
    const parsed = queryString.parse(history.location.search.substr(1));
    let Value = repoContext.gitHubStore.value;
    if (!!parsed.search) Value = String(parsed.search);
    repoContext.gitHubStore.getOrganizationReposList({
      organizationName: Value,
      page: 1,
    });
  }, [history.location.search, repoContext.gitHubStore]);
  return (
    <Link to="/repos">
      <button onClick={handleClick} className={props.className}>
        {props.children}
      </button>
    </Link>
  );
};

export default React.memo(SearchButton);
