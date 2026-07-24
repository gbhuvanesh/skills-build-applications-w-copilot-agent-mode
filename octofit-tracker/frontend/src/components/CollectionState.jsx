function CollectionState({ status, error, emptyMessage }) {
  if (status === 'loading') {
    return <p className="state-message">Loading...</p>
  }

  if (status === 'error') {
    return <p className="state-message error-message">Unable to load data: {error}</p>
  }

  return <p className="state-message">{emptyMessage}</p>
}

export default CollectionState