/** @jsxImportSource @emotion/react */

function SortBox({ groupFor, options, handleChange, defaultSort }) {
  const radioGroupStyles = {
    fontSize: "70%",
    marginTop: "1rem",
    padding: "2rem 4zrem",
    display: "flex",
    justifyContent: "space-around",
    textAlign: "center",
  };
  return (
    <div css={radioGroupStyles} onChange={handleChange}>
      {Object.entries(options)
        .map(([k]) => [
          k
            .split(/[\s_]/)
            .map((word) => `${word[0]}${word.slice(1).toLowerCase()}`)
            .join(" "),
          k,
        ])
        .map(([formatedKEy, key]) => (
          <RadioOption
            key={key}
            name={groupFor}
            id={formatedKEy}
            value={key}
            defaultSort={defaultSort}
          />
        ))}
    </div>
  );
}

function RadioOption({ id, value, name, defaultSort }) {
  return (
    <div>
      <input
        type="radio"
        id={id}
        value={value}
        name={name}
        defaultChecked={value === defaultSort[name]}
      />
      <br />
      <label htmlFor={id}>{id}</label>
    </div>
  );
}

export default SortBox;
