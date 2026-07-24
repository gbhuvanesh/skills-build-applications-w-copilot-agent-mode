import CollectionState from './CollectionState.jsx'
import { useApiCollection } from './api.js'

const endpointPath = '/api/leaderboard/'

function Leaderboard() {
  const { items: leaderboard, status, error } = useApiCollection(endpointPath, 'leaderboard')

  return (
    <section className="page-section">
      <div className="page-heading">
        <p className="eyebrow">Competition</p>
        <h1>Leaderboard</h1>
      </div>

      {leaderboard.length > 0 ? (
        <div className="table-wrap">
          <table className="data-table ranking-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>User</th>
                <th>Team</th>
                <th>Points</th>
                <th>Active minutes</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry, index) => (
                <tr key={entry._id || entry.id || `${entry.user}-${entry.rank || index}`}>
                  <td>{entry.rank || index + 1}</td>
                  <td>{entry.user}</td>
                  <td>{entry.team}</td>
                  <td>{entry.points}</td>
                  <td>{entry.activeMinutes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <CollectionState status={status} error={error} emptyMessage="No leaderboard entries found." />
      )}
    </section>
  )
}

export default Leaderboard