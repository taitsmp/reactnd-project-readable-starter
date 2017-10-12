/*
Generic Utilities
*/

export const uuid = () =>
  Math.random()
    .toString(36)
    .substr(-10)

export const dateFromTimestamp = (ts) => {
  const date = new Date(ts)
  let month = date.getMonth() +1
  let year = date.getFullYear()
  let day = date.getDate()
  return `${month}/${day}/${year}`
}
