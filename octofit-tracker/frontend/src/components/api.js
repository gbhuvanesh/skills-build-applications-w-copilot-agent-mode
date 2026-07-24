import { useEffect, useState } from 'react'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

export function getApiUrl(endpointPath) {
  const normalizedPath = endpointPath.startsWith('/api/')
    ? endpointPath.replace(/^\/api/, '')
    : `/${endpointPath.replace(/^\/|\/$/g, '')}/`

  return `${apiBaseUrl}${normalizedPath}`
}

function findArray(payload, key) {
  if (Array.isArray(payload)) {
    return payload
  }

  if (!payload || typeof payload !== 'object') {
    return []
  }

  const candidates = [key, 'results', 'data', 'items', 'docs']
  for (const candidate of candidates) {
    if (Array.isArray(payload[candidate])) {
      return payload[candidate]
    }
  }

  return []
}

export function useApiCollection(endpointPath, key = endpointPath) {
  const [items, setItems] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function loadItems() {
      setStatus('loading')
      setError('')

      try {
        const response = await fetch(getApiUrl(endpointPath), {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error(`Request failed with ${response.status}`)
        }

        const payload = await response.json()
        setItems(findArray(payload, key))
        setStatus('ready')
      } catch (requestError) {
        if (requestError.name !== 'AbortError') {
          setError(requestError.message)
          setItems([])
          setStatus('error')
        }
      }
    }

    loadItems()

    return () => controller.abort()
  }, [endpointPath, key])

  return { items, status, error, url: getApiUrl(endpointPath) }
}