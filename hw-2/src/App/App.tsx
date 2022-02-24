import * as React from "react";

import { GithubRepoBranchesModel, GithubRepoModel } from "@store/models/github";

import RepoBranchesDrawer from "../RepoBranchesDrawer";
import ReposSearchPage from "../ReposSearchPage";

const App: React.FC = () => {
  const [branches, setBranches] = React.useState<GithubRepoBranchesModel[]>([]);
  const [repos, setRepos] = React.useState<GithubRepoModel[]>([]);
  const [visible, setVisible] = React.useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  return (
    <div className="all=page">
      <ReposSearchPage
        repos={repos}
        setRepos={setRepos}
        setBranches={setBranches}
        showDrawer={showDrawer}
      />
      <RepoBranchesDrawer
        setVisible={setVisible}
        visible={visible}
        branches={branches}
      />
    </div>
  );
};

export default App;
