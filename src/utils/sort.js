// Sorting Suggestions
const sortSuggestionsByNameAsc = (items) =>
  [...items].sort((a, b) => a.shopName.localeCompare(b.shopName))
const sortSuggestionsByNameDesc = (items) =>
  [...items].sort((a, b) => b.shopName.localeCompare(a.shopName))
const sortSuggestionsByNewest = (items) =>
  [...items].sort((a, b) => b.id - a.id)
const sortSuggestionsByOldest = (items) =>
  [...items].sort((a, b) => a.id - b.id)

// Sorting Clients
const sortClientsByNameAsc = (items) =>
  [...items].sort((a, b) => a.clientName.localeCompare(b.clientName))
const sortClientsByNameDesc = (items) =>
  [...items].sort((a, b) => b.clientName.localeCompare(a.clientName))
const sortClientsByNewest = (items) => [...items].sort((a, b) => b.id - a.id)
const sortClientsByOldest = (items) => [...items].sort((a, b) => a.id - b.id)

// Sort Suggestions
export const getSortedSuggestions = (items, sortOption) => {
  if (!items) {
    return []
  }

  switch (sortOption) {
    case "name-asc":
      return sortSuggestionsByNameAsc(items)

    case "name-desc":
      return sortSuggestionsByNameDesc(items)

    case "newest":
      return sortSuggestionsByNewest(items)

    case "oldest":
      return sortSuggestionsByOldest(items)

    default:
      return items
  }
}

// Sort Clients
export const getSortedClients = (items, sortOption) => {
  if (!items) {
    return []
  }

  switch (sortOption) {
    case "name-asc":
      return sortClientsByNameAsc(items)

    case "name-desc":
      return sortClientsByNameDesc(items)

    case "newest":
      return sortClientsByNewest(items)

    case "oldest":
      return sortSuggestionsByOldest(items)

    default:
      return items
  }
}
