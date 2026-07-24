import CollectionState from './CollectionState.jsx'
import { useApiCollection } from './api.js'

const endpointPath = '/api/workouts/'

function Workouts() {
  const { items: workouts, status, error } = useApiCollection(endpointPath, 'workouts')

  return (
    <section className="page-section">
      <div className="page-heading">
        <p className="eyebrow">Suggestions</p>
        <h1>Workouts</h1>
      </div>

      {workouts.length > 0 ? (
        <div className="content-grid">
          {workouts.map((workout) => (
            <article className="data-card" key={workout._id || workout.id || workout.title}>
              <div className="card-row">
                <h2>{workout.title}</h2>
                <span className="pill">{workout.level}</span>
              </div>
              <p>{workout.recommendedForGoal}</p>
              <dl>
                <div>
                  <dt>Duration</dt>
                  <dd>{workout.durationMinutes} min</dd>
                </div>
                <div>
                  <dt>Focus</dt>
                  <dd>{workout.targetMuscleGroups?.join(', ') || 'Full body'}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      ) : (
        <CollectionState status={status} error={error} emptyMessage="No workouts found." />
      )}
    </section>
  )
}

export default Workouts