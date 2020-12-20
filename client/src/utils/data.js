
export const transform = (key) => {
  let result = key.replace('_', ' ');
  return result.charAt(0).toUpperCase() + result.slice(1);
}