const API_URL = 'http://localhost:3000/api/v1'

export async function login(email, password) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  })

  const data = await response.json()

  if (!response.ok) {
    const message = Array.isArray(data.message)
      ? data.message.join(', ')
      : data.message || 'No se pudo iniciar sesión'

    const error = new Error(message)
    error.status = response.status

    throw error
  }

  return data
}

export async function registrar(usuario) {
  const response = await fetch(`${API_URL}/auth/registro`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(usuario),
  })

  const data = await response.json()

  if (!response.ok) {
    const message = Array.isArray(data.message)
      ? data.message.join(', ')
      : data.message || 'No se pudo registrar el usuario'

    const error = new Error(message)
    error.status = response.status

    throw error
  }

  return data
}