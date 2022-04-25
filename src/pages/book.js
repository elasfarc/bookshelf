/** @jsxImportSource @emotion/react */
import React from "react";
import { useParams } from "react-router-dom";
import { client } from "../util/client-api";
import * as mq from "../styles/media-queries";
import StatusButtons from "../components/status-button";
import { useQuery } from "react-query";
import Rating from "../components/rating";
import { useUserList } from "../util/react-query/user-list";

const R = require("ramda");

function Loading() {
  return (
    <div css={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <img
        src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif"
        alt="spinner"
      />
    </div>
  );
}

function Book() {
  const { id: bookId } = useParams();
  const { data, error, isIdle, isLoading, isError } = useQuery(
    ["book-search", bookId],
    () => client(bookId, { multiple: false })
  );
  const { userList } = useUserList();
  const bookIsFinished = userList[bookId]?.finished;

  if (isLoading || isIdle) return <Loading />;
  const {
    volumeInfo: {
      title,
      publisher,
      description,
      imageLinks: { thumbnail: coverImageUrl },
      authors,
    },
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
        }}
      >
        <img
          src={coverImageUrl}
          alt={`${title} book cover`}
          css={{ width: "100%", maxWidth: "14rem" }}
        />
        <div>
          <div css={{ display: "flex" }}>
            <div css={{ flex: 1, justifyContent: "space-between" }}>
              <h1>{title}</h1>
              <div>
                {authors?.map((author, index) => (
                  <i key={index}>{author}</i>
                ))}
                <span css={{ marginRight: 6, marginLeft: 6 }}>|</span>
                <i>{publisher}</i>
              </div>
              {bookIsFinished && <Rating />}
            </div>
            <StatusButtons bookData={{ id: bookId }} />
          </div>
          <br />
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
}

export default Book;
