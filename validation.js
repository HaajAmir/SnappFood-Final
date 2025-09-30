export function validateInputs(name, price, ingredients) {
  if (!name || !price || !ingredients) {
    return false
  }
  return true
}
