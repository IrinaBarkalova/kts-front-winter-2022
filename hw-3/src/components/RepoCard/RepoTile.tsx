import * as React from "react";

import AvatarIcon from "@components/AvatarIcon";
import StarIcon from "@components/StarIcon";
import { GithubRepoModel } from "@store/models/github";
import styles from "@styles/RepoTile.module.scss";
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
            className={styles.avatarIcon}
            src={item?.owner?.avatarUrl}
          />
        }
        title={item?.name}
        description={
          item && (
            <>
              <a
                href={item.htmlUrl}
                target="_blank"
                className={styles.repoHref}
                rel="noreferrer"
              >
                {item.description}
              </a>
              <br />
              <div className={styles.starNum_data}>
                <StarIcon color="none" />
                <p className={styles.starNum}> {item.stargazersCount}</p>
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
