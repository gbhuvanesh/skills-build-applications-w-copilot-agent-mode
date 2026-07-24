import CollectionState from './CollectionState.jsx'
import { useApiCollection } from './api.js'

function Teams() {
  const { items: teams, status, error } = useApiCollection('teams')

  return (
    <section className="page-section">
      <div className="page-heading">
        <p className="eyebrow">Groups</p>
        <h1>Teams</h1>
      </div>

      {teams.length > 0 ? (
        <div className="content-grid">
          {teams.map((team) => (
            <article className="data-card" key={team._id || team.id || team.name}>
              <h2>{team.name}</h2>
              <p>{team.focus}</p>
              <dl>
                <div>
                  <dt>Coach</dt>
                  <dd>{team.coach}</dd>
                </div>
                <div>
                  <dt>Members</dt>
                  <dd>{team.memberCount}</dd>
                </div>
                <div>
                  <dt>Weekly goal</dt>
                  <dd>{team.weeklyGoalMinutes} min</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      ) : (
        <CollectionState status={status} error={error} emptyMessage="No teams found." />
      )}
    </section>
  )
}

export default Teams