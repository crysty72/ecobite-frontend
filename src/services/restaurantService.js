const API_URL = 'http://localhost:8080/api/restaurantes'

export async function getRestaurants() {
  try {
    const response = await fetch(API_URL)

    if (!response.ok) {
      throw new Error('Error al obtener los restaurantes')
    }

    const data = await response.json()

    return data
  } catch (error) {
    console.error('Error en restaurantService:', error)
    throw error
  }
}