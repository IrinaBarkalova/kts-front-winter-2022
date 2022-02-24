import * as React from "react";

type Props = {
  children: React.ReactNode;
  className: string;
  changed: any;
};
const SearchButton: React.FC<Props> = ({
  children,
  changed,
  className,
}: Props) => {
  return (
    <button onClick={changed} className={className}>
      {children}
    </button>
  );
};

export default SearchButton;
