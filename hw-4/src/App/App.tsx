import * as React from "react";
import { createContext, useContext } from "react";

import Repos from "@components/Repos";
import SearchForm from "@components/SearchForm";
import RepoBranchesDrawer from "@pages/RepoBranchesDrawer";
import { getNextRepos } from "@store/GitHubNewReposLoader/reposLoader";
import ReposBranchesStore from "@store/ReposBranchesStore";
import ReposListStore from "@store/ReposListStore";
import { ApiResp } from "@utils/apiTypes";
import { useLocalStore } from "@utils/useLocalStore";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

interface ContextType {
  gitHubStore: ReposListStore;
  branchesStore: ReposBranchesStore;
  getNextRepos: (
    inputStr: string,
    page: number,
    per_page: number
  ) => Promise<ApiResp>;
}
const ReposContext = createContext({} as ContextType);
export const useReposContext = () => useContext(ReposContext);

const Provider = ReposContext.Provider;

const App: React.FC = () => {
  const gitHubStore = useLocalStore(() => new ReposListStore());
  const branchesStore = useLocalStore(() => new ReposBranchesStore());

  return (
    <Provider
      value={{
        branchesStore,
        gitHubStore,
        getNextRepos,
      }}
    >
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <SearchForm />
          </Route>
          <Route exact path="/repos">
            <SearchForm />
            <Repos />
          </Route>
          <Route path="/repos/:owner/:repo" component={RepoBranchesDrawer} />
          <Redirect to="/repos" />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
