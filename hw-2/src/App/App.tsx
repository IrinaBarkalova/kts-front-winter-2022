import "@styles/App.css";

import * as React from "react";

import BranchCard from "@components/BranchCard";
import CardBlock from "@components/Layouts";
import RepoCard from "@components/RepoCard";
import SearchForm from "@components/SearchForm";
import { GithubRepoBranchesModel, GithubRepoModel } from "@store/models/github";
import { Space, Drawer } from "antd";
import "@styles/RepoCard.css";

const App: React.FC = () => {
  const [branches, setBranches] = React.useState<GithubRepoBranchesModel[]>([]);
  const [repos, setRepos] = React.useState<GithubRepoModel[]>([]);
  const [visible, setVisible] = React.useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  return (
    <div className="full-card">
      <SearchForm setRepos={setRepos} />
      <div className="repo-cards">
        <CardBlock>
          <Space direction="vertical">
            {repos.map((repo) => (
              <RepoCard
                showDrawer={showDrawer}
                setBranches={setBranches}
                key={repo.id}
                item={repo}
              />
            ))}
          </Space>
        </CardBlock>
      </div>
      <Drawer
        title="Branches"
        placement="right"
        onClose={onClose}
        visible={visible}
      >
        <Space direction="vertical">
          {branches.map((branch) => (
            <BranchCard key={branch.commit.shaCode} branch={branch} />
          ))}
        </Space>
      </Drawer>
    </div>
  );
};

export default App;
