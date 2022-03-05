import * as React from "react";

import { useReposContext } from "@App/App";
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
    repoContext.gitHubStore.getOrganizationReposList({
      organizationName: repoContext.gitHubStore.value,
      page: 1,
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
