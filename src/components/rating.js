import * as React from "react";
import { StarRating } from "baseui/rating";

export default function Rating() {
  const [value, setValue] = React.useState(null);
  return (
    <StarRating
      numItems={5}
      onChange={(data) => setValue(data.value)}
      size={15}
      value={value}
    />
  );
}
