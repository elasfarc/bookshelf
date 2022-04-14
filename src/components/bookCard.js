import * as React from "react";
import { BaseProvider, LightTheme } from "baseui";
import { Provider as StyletronProvider } from "styletron-react";
import { Client as Styletron } from "styletron-engine-atomic";
import { Card, StyledBody, StyledAction, StyledThumbnail } from "baseui/card";
import { Button } from "baseui/button";

const engine = new Styletron();

const PREVIEW_DESC_LENGTH = 205;

export default function BookCard({
  bookData: {
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
  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        <Card overrides={{ Root: { style: { width: "328px" } } }} title={title}>
          <StyledThumbnail src={thumbnail} />
          <StyledBody>
            {description?.length > PREVIEW_DESC_LENGTH
              ? `${description.substring(0, 205)}...`
              : description}
          </StyledBody>
          <StyledAction>
            <Button overrides={{ BaseButton: { style: { width: "100%" } } }}>
              Button Label
            </Button>
          </StyledAction>
        </Card>
      </BaseProvider>
    </StyletronProvider>
  );
}
