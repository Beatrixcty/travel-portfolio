// Returns the city's own coverImage if set, otherwise pulls a photo from
// LoremFlickr (searches Flickr by keyword). The lock seed is derived from
// the city name so the same photo always loads for the same city.
// To override: add coverImage to that city's entry in countries.js.

function hashSeed(str) {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) & 0xffff
  }
  return hash
}

export function getCityImage(city, countryName) {
  if (city.coverImage) return city.coverImage
  const seed = hashSeed(city.name + countryName)
  const keyword = encodeURIComponent(`${city.name} ${countryName}`)
  return `https://loremflickr.com/800/500/${keyword}?lock=${seed}`
}
