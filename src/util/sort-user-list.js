const R = require("ramda");

const notFinishedSortOptions = {
  sortBy: {
    TITLE: ["itemData", "title"],
    TIME_ADDED: ["added", "seconds"],
  },
  order: { ASC: "ASC", DEC: "DEC" },
};

const finishedSortOptions = {
  ...notFinishedSortOptions,
  sortBy: {
    ...notFinishedSortOptions.sortBy,
    TIME_FINISHED: ["finished", "seconds"],
    RATING: ["rating"],
  },
};

const defaultSort = {
  sortBy: "TIME_ADDED",
  order: "ASC",
};

function sortObjBy({ propPath, order = "ASC", data } = {}) {
  return Object.keys(data)
    .sort((a, b) => {
      [a, b] = order === "ASC" ? [a, b] : [b, a];
      return typeof R.path(propPath, data[a]) === "string"
        ? R.path(propPath, data[a]).localeCompare(R.path(propPath, data[b]))
        : R.path(propPath, data[a]) - R.path(propPath, data[b]);
    })
    .reduce((sortedData, k) => {
      return [...sortedData, data[k]];
    }, []);
}

export { sortObjBy, notFinishedSortOptions, finishedSortOptions, defaultSort };
