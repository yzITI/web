export function load({ url }) {
  return {
    simple: url.searchParams.get('simple'),
    type: url.searchParams.get('type')
  }
}
