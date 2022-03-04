import * as React from "react";
import { createContext, Dispatch, SetStateAction, useContext } from "react";

import Repos from "@components/Repos";
import SearchForm from "@components/SearchForm";
import RepoBranchesDrawer from "@pages/RepoBranchesDrawer";
import { load } from "@store/GithubBrunchesLoader/load";
import { getNextRepos } from "@store/GitHubNewReposLoader/reposLoader";
import { GithubRepoModel } from "@store/models/github";
import { ApiResp } from "@utils/apiTypes";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

interface ContextType {
  repos: GithubRepoModel[];
  inputStr: string;
  setInputStr: React.Dispatch<React.SetStateAction<string>>;
  setRepos: Dispatch<SetStateAction<GithubRepoModel[]>>;
  isLoading: boolean;
  load: (owner: string, repo: string) => Promise<ApiResp>;
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
  const [repos, setRepos] = React.useState<GithubRepoModel[]>([]);
  const [inputStr, setInputStr] = React.useState("");

  const isLoading: boolean = false;
  return (
    <Provider
      value={{
        repos,
        isLoading,
        setRepos,
        load,
        inputStr,
        setInputStr,
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
