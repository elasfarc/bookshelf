import * as React from "react";
import BookCard from "./bookCard";
import { invalidateBookData } from "../util/invalidate-book-data";

export default function BookList({ books }) {
  return (
    <div className="p-4  grid gap-4 xs:grid-cols-2 xs:p-8 md:grid-cols-3 lg:gap-6">
      {books.map(({ id, volumeInfo }) => (
        <BookCard
          key={id}
          bookData={invalidateBookData({ id, ...volumeInfo })}
        />
      ))}
    </div>
  );
}
