import * as React from "react";
import "@styles/RepoTile.scss";

import AvatarIcon from "@components/AvatarIcon";
import StarIcon from "@components/StarIcon";
import { GithubRepoModel } from "@store/models/github";
import { formatDate } from "@utils/formatDate";
import { Card } from "antd";

type Props = {
  item: GithubRepoModel;
};

const RepoTile: React.FC<Props> = ({ item }: Props) => {
  return (
    <div className="card-block">
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
              <div className="starNum-data">
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
