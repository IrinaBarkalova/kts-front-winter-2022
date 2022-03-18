import * as React from "react";

import { useReposContext } from "@App/App";

type Props = {
  className: string;
  value?: string | number;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  placeholder: string;
};

const SearchInput: React.FC<Props> = ({
  className,
  value,
  onChange,
  placeholder,
}: Props) => {
  const repoContext = useReposContext();
  const keyPress = React.useCallback(
    (e: any) => {
      if (repoContext.gitHubStore.value && e.key === "Enter") {
        repoContext.queryStore.setHistory();
        repoContext.gitHubStore.getOrganizationReposList({
          organizationName: repoContext.gitHubStore.value,
          page: 1,
        });
      }
    },
    [repoContext]
  );
  return (
    <input
      type="text"
      className={className}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onKeyPress={keyPress}
    />
  );
};

export default React.memo(SearchInput);
