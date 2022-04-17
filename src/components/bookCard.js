import * as React from "react";

import { Card, StyledBody, StyledAction, StyledThumbnail } from "baseui/card";
import { Button } from "baseui/button";
import { useNavigate } from "react-router-dom";

const PREVIEW_DESC_LENGTH = 205;

export default function BookCard({
  bookData: {
    id,
    title,
    subtitle,
    authors,
    publisher,
    publishedDate,
    averageRating,
    categories,
    description,
    imageLinks: { thumbnail, smallThumbnail },
  },
}) {
  const navigate = useNavigate();
  return (
    <Card overrides={{ Root: { style: { width: "328px" } } }} title={title}>
      <StyledThumbnail src={thumbnail} />
      <StyledBody>
        {description?.length > PREVIEW_DESC_LENGTH
          ? `${description.substring(0, 205)}...`
          : description}
      </StyledBody>
      <StyledAction>
        <Button
          overrides={{ BaseButton: { style: { width: "100%" } } }}
          onClick={() => navigate(`/book/${id}`)}
        >
          Button Label
        </Button>
      </StyledAction>
    </Card>
  );
}
