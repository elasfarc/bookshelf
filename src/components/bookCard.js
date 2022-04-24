import * as React from "react";
import { Card, StyledBody, StyledAction, StyledThumbnail } from "baseui/card";
import { Button } from "baseui/button";
import { useNavigate } from "react-router-dom";
import StatusButtons from "./status-button";

const PREVIEW_DESC_LENGTH = 205;

export default function BookCard({ bookData } = {}) {
  const {
    id: bookId,
    title,
    subtitle,
    authors,
    publisher,
    publishedDate,
    averageRating,
    categories,
    description,
    imageLinks: { thumbnail, smallThumbnail },
  } = bookData;

  const navigate = useNavigate();

  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <Card title={title}>
        <StyledThumbnail src={thumbnail} />
        <StyledBody>
          {description?.length > PREVIEW_DESC_LENGTH
            ? `${description.substring(0, 205)}...`
            : description}
        </StyledBody>
        <StyledAction style={{ display: "flex", justifyContent: "center" }}>
          <Button
            overrides={{
              BaseButton: { style: { width: "90%" } },
            }}
            onClick={() => navigate(`/book/${bookId}`)}
          >
            Read more...
          </Button>
        </StyledAction>
      </Card>
      <StatusButtons bookData={bookData} />
    </div>
  );
}
