import * as React from "react";

import { queryParamsStore } from "@store/QueryParamsStore/QueryParamsStore";
import { useHistory, useLocation } from "react-router-dom";

export const useQueryParamUpdate = (): void => {
  const location: any = useLocation();
  const history: any = useHistory();

  React.useEffect(
    () => queryParamsStore.update(history, location),
    [[history, location]]
  );
};
