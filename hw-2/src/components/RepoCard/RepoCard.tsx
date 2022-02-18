import * as React from "react";

import "@styles/RepoCard.css";
import favStar from "@components/img/StarIcon.png";
import GitHubStore from "@store/GitHubStore";
import { GithubRepoModel } from "@store/models/github";
import { normalizeCollection } from "@utils/collection";
import { formatDateDDMMYYYY } from "@utils/formatDateDDMMYYYY";
import { Card, Avatar } from "antd";

type Props = {
  repo: GithubRepoModel;
  setBranches: any;
  showDrawer: any;
};

const RepoCard: React.FC<Props> = ({
  repo,
  setBranches,
  showDrawer,
}: Props) => {
  const handleClick = () => {
    const gitHubStore = new GitHubStore();
    setBranches([]);
    showDrawer();
    gitHubStore
      .getOrgBranchesList({
        owner: repo.owner.login,
        repo: repo.name,
      })
      .then((result) => {
        // eslint-disable-next-line no-console
        console.log(result);
        setBranches(normalizeCollection(result.data));
      });
  };
  return (
    <div onClick={handleClick} className="Card-block">
      <Card.Meta
        avatar={
          <Avatar
            className="avatar-icon"
            size={67}
            src={repo?.owner?.avatarUrl}
          />
        }
        title={repo?.name}
        description={
          repo && (
            <>
              <a
                key="go"
                href={repo.htmlUrl}
                target="_blank"
                className="repo-href"
                rel="noreferrer"
              >
                {repo.description}
              </a>
              <br />
              <div className="starNum-Data">
                <img className="starNum_img" src={favStar} alt="" />
                <p className="starNum"> {repo.stargazersCount}</p>
                {formatDateDDMMYYYY(repo.updatedAt)}
              </div>
            </>
          )
        }
      />
    </div>
  );
};

export default React.memo(RepoCard);
