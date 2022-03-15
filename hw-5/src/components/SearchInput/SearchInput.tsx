import * as React from "react";

type Props = {
  className: string;
  value?: string | number;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  placeholder: string;
};

const SearchInput: React.FC<Props> = ({
  className,
  value,
  onChange,
  placeholder,
}: Props) => {
  return (
    <input
      type="text"
      className={className}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default React.memo(SearchInput);
