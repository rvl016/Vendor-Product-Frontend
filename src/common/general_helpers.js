
export const filter_null_and_blanks = data => 
  Object.keys( data).reduce( (acc, key) => ({
    ...( data[key] !== null && data[key] !== "" && { [key]: data[key] }),
    ...acc
  }), {});