import * as React from "react";

import "@styles/RepoCard.css";
import AvatarIcon from "@components/AvatarIcon";
import StarIcon from "@components/StarIcon";
import GitHubStore from "@store/GitHubStore";
import { GithubRepoBranchesModel, GithubRepoModel } from "@store/models/github";
import { normalizeCollection } from "@utils/collection";
import { formatDate } from "@utils/formatDate";
import { Card } from "antd";

type Props = {
  item: GithubRepoModel;
  setBranches: React.Dispatch<React.SetStateAction<GithubRepoBranchesModel[]>>;
  showDrawer: () => void;
};

const RepoTile: React.FC<Props> = ({
  item,
  setBranches,
  showDrawer,
}: Props) => {
  const handleClick = () => {
    const gitHubStore = new GitHubStore();
    setBranches([]);
    showDrawer();
    gitHubStore
      .getOrgBranchesList({
        owner: item.owner.login,
        repo: item.name,
      })
      .then((result) => {
        setBranches(normalizeCollection(result.data));
      });
  };
  return (
    <div onClick={handleClick} className="card-block">
      <Card.Meta
        avatar={
          <AvatarIcon className="avatar-icon" src={item?.owner?.avatarUrl} />
        }
        title={item?.name}
        description={
          item && (
            <>
              <a
                href={item.htmlUrl}
                target="_blank"
                className="repo-href"
                rel="noreferrer"
              >
                {item.description}
              </a>
              <br />
              <div className="starNum-Data">
                <StarIcon color="none" />
                <p className="starNum"> {item.stargazersCount}</p>
                {formatDate(item.updatedAt)}
              </div>
            </>
          )
        }
      />
    </div>
  );
};

export default React.memo(RepoTile);
