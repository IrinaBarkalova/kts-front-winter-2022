import * as React from "react";

type Props = {
  className: string;
  src: string;
};

const AvatarIcon: React.FC<Props> = ({ className, src }: Props) => {
  return <img className={className} src={src} alt="" />;
};

export default React.memo(AvatarIcon);
