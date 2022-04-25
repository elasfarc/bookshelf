const bookAttributes = [
  "id",
  "title",
  "subtitle",
  "authors",
  "publisher",
  "publishedDate",
  "averageRating",
  "categories",
  "description",
  "imageLinks",
];
export const invalidateBookData = (bookData) =>
  bookAttributes.reduce(
    (acc, attr) => ({
      ...acc,
      [attr]:
        bookData[attr] ??
        (attr === "imageLinks"
          ? {
              thumbnail:
                "https://bookstoreromanceday.org/wp-content/uploads/2020/08/book-cover-placeholder.png",
            }
          : `${attr} data is not avaiable!`),
    }),
    {}
  );
