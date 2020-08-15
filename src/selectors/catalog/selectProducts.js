export function selectProducts(state) {
  return state.catalog.products.toJS()
}