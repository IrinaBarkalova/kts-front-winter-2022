import * as React from "react";

type Props = {
  children: React.ReactNode;
  className: string;
  changeFun?: React.MouseEventHandler<HTMLButtonElement>;
};
const SearchButton: React.FC<Props> = ({
  children,
  changeFun,
  className,
}: Props) => {
  return (
    <button onClick={changeFun} className={className}>
      {children}
    </button>
  );
};

export default React.memo(SearchButton);
