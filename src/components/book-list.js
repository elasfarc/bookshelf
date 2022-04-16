import * as React from "react";
import BookCard from "./bookCard";

export default function BookList({ books }) {
  return (
    <div className="p-4 max-w-5xl grid gap-4 xs:grid-cols-2 xs:p-8 md:grid-cols-4 lg:gap-6">
      {books.map(({ id, volumeInfo }) => (
        <BookCard key={id} bookData={volumeInfo} />
      ))}
    </div>
  );
}
