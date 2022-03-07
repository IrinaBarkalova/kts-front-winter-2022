import * as React from "react";

import AvatarIcon from "@components/AvatarIcon";
import styles from "@components/RepoTile/RepoTile.module.scss";
import StarIcon from "@components/StarIcon";
import { GithubRepoModel } from "@store/models/repos";
import { formatDate } from "@utils/formatDate";
import { Card, Skeleton } from "antd";
type Props = {
  item?: GithubRepoModel;
  loading?: boolean;
};

const RepoTile: React.FC<Props> = ({ item, loading = false }: Props) => {
  return (
    <div className={styles.card_block}>
      <Skeleton loading={loading} avatar active>
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
                  {/*TODO вынести в стор*/}
                  {formatDate(item.updatedAt, "Updated")}
                </div>
              </React.Fragment>
            )
          }
        />
      </Skeleton>
    </div>
  );
};

export default React.memo(RepoTile);
