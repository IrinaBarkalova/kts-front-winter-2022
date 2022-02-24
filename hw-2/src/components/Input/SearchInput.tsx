import * as React from "react";

type Props = {
  className: string;
  value: string | number | readonly string[] | undefined;
  changed: any;
  placeholder: string;
};

const SearchInput: React.FC<Props> = ({
  className,
  value,
  changed,
  placeholder,
}: Props) => {
  return (
    <input
      type="text"
      className={className}
      placeholder={placeholder}
      value={value}
      onChange={changed}
    />
  );
};

export default SearchInput;
