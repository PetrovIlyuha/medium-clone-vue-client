export const getItem = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key))
  } catch (error) {
    console.error(`Error getting from local storage: ${error}`)
  }
}

export const setItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error(`Error saving to local storage: ${error}`)
  }
}

export const removeItem = (key) => {
  try {
    localStorage.removeItem(key)
  } catch (error) {
    console.error(`Error removing from local storage: ${error}`)
  }
}
