import { useState } from 'react'

export default () => {
  const [ loading, setLoading ] = useState(false)
  const [ galleries, setGalleries ] = useState(null)
  const [ error, setError ] = useState(null)

  async function tryAuth(password) {
    setError(null)
    setLoading(true)

    let response
    let responseData

    try {
      response = await fetch('https://api.hannessolo.now.sh/gallery-password', {
        method: 'POST',
        body: JSON.stringify({
          password: password
        }),
        headers: {
          "Content-Type": "application/json"
        }
      })
      responseData = await response.json()
    } catch (e) {
      setError('Error fetching data from server.')
      setLoading(false)
      return
    }


    if (responseData.error != null) {
      setError(responseData.error)
    } else {
      setGalleries(responseData.galleries)
    }

    setLoading(false)
  }

  return [loading, error, tryAuth, galleries]
}
