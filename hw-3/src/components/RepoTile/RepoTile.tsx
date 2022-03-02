import * as React from "react";

import AvatarIcon from "@components/AvatarIcon";
import styles from "@components/RepoTile/RepoTile.module.scss";
import StarIcon from "@components/StarIcon";
import { GithubRepoModel } from "@store/models/github";
import { formatDate } from "@utils/formatDate";
import { Card } from "antd";

type Props = {
  item: GithubRepoModel;
};

const RepoTile: React.FC<Props> = ({ item }: Props) => {
  return (
    <div className={styles.card_block}>
      <Card.Meta
        avatar={
          <AvatarIcon
            className={styles.avatar__icon}
            src={item?.owner?.avatarUrl}
          />
        }
        title={item?.name}
        description={
          item && (
            <React.Fragment>
              <a
                href={item.htmlUrl}
                target="_blank"
                className={styles.repo_href}
                rel="noreferrer"
              >
                {item.description}
              </a>
              <br />
              <div className={styles.star_num_data}>
                <StarIcon color="none" />
                <p className={styles.star_num}> {item.stargazersCount}</p>
                {formatDate(item.updatedAt)}
              </div>
            </React.Fragment>
          )
        }
      />
    </div>
  );
};

export default React.memo(RepoTile);
