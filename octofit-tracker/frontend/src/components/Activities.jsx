import CollectionState from './CollectionState.jsx'
import { useApiCollection } from './api.js'

function formatDate(value) {
  if (!value) {
    return 'Recent'
  }

  return new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value))
}

function Activities() {
  const { items: activities, status, error } = useApiCollection('activities')

  return (
    <section className="page-section">
      <div className="page-heading">
        <p className="eyebrow">Activity log</p>
        <h1>Activities</h1>
      </div>

      {activities.length > 0 ? (
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Activity</th>
                <th>Duration</th>
                <th>Calories</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity) => (
                <tr key={activity._id || activity.id || `${activity.user}-${activity.activityDate}`}>
                  <td>{activity.user || 'Octofit athlete'}</td>
                  <td>{activity.type || activity.activity}</td>
                  <td>{activity.durationMinutes || activity.duration} min</td>
                  <td>{activity.caloriesBurned || 'n/a'}</td>
                  <td>{formatDate(activity.activityDate || activity.date)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <CollectionState status={status} error={error} emptyMessage="No activities found." />
      )}
    </section>
  )
}

export default Activities