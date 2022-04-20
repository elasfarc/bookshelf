import React from "react";
import { useParams } from "react-router-dom";
import { useAsync } from "../util/hooks";
import { client } from "../util/client-api";
import * as mq from "../styles/media-queries";

const R = require("ramda");

function Loading({ name }) {
  return (
    <>
      <h6>Loading {name}</h6>
      <img
        src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif"
        alt="spinner"
      />
    </>
  );
}

function Book() {
  const { id: bookId } = useParams();
  const { run, data, error, isIdle, isLoading, isError } = useAsync();

  React.useEffect(() => {
    R.compose(run, client, R.concat("q="), encodeURIComponent)(bookId);
  }, [bookId, run]);

  if (isLoading || isIdle) return <Loading name="book" />;
  const {
    items: [
      {
        volumeInfo: {
          title,
          publisher,
          description,
          imageLinks: { thumbnail: coverImageUrl },
          authors,
        },
      },
    ],
  } = data;

  return isError ? (
    `${error.message}`
  ) : (
    <div>
      <div
        css={{
          display: "grid",
          gridTemplateColumns: "1fr 2fr",
          gridGap: "2em",
          marginBottom: "1em",
          [mq.small]: {
            display: "flex",
            flexDirection: "column",
          },
        }}
      >
        <img
          src={coverImageUrl}
          alt={`${title} book cover`}
          css={{ width: "100%", maxWidth: "14rem" }}
        />
        <div>
          <div css={{ display: "flex", position: "relative" }}>
            <div css={{ flex: 1, justifyContent: "space-between" }}>
              <h1>{title}</h1>
              <div>
                {authors?.map((author, index) => (
                  <i key={index}>{author}</i>
                ))}
                <span css={{ marginRight: 6, marginLeft: 6 }}>|</span>
                <i>{publisher}</i>
              </div>
            </div>
          </div>
          <br />
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
}

export default Book;
