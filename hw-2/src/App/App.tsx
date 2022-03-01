import * as React from "react";

import { GithubRepoBranchesModel, GithubRepoModel } from "@store/models/github";

import RepoBranchesDrawer from "./Pages/RepoBranchesDrawer";
import ReposSearchPage from "./Pages/ReposSearchPage";

const App: React.FC = () => {
  const [branches, setBranches] = React.useState<GithubRepoBranchesModel[]>([]);
  const [repos, setRepos] = React.useState<GithubRepoModel[]>([]);
  const [visible, setVisible] = React.useState(false);

  return (
    <>
      <ReposSearchPage
        repos={repos}
        setRepos={setRepos}
        setBranches={setBranches}
        setVisible={setVisible}
      />
      <RepoBranchesDrawer
        setVisible={setVisible}
        visible={visible}
        branches={branches}
      />
    </>
  );
};

export default App;
