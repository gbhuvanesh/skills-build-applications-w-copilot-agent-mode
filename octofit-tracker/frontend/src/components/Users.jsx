import CollectionState from './CollectionState.jsx'
import { useApiCollection } from './api.js'

function Users() {
  const { items: users, status, error } = useApiCollection('users')

  return (
    <section className="page-section">
      <div className="page-heading">
        <p className="eyebrow">Profiles</p>
        <h1>Users</h1>
      </div>

      {users.length > 0 ? (
        <div className="content-grid">
          {users.map((user) => (
            <article className="data-card" key={user._id || user.id || user.email || user.name}>
              <h2>{user.name}</h2>
              <p>{user.email}</p>
              <dl>
                <div>
                  <dt>Role</dt>
                  <dd>{user.role || 'Member'}</dd>
                </div>
                <div>
                  <dt>Team</dt>
                  <dd>{user.team || 'Unassigned'}</dd>
                </div>
                <div>
                  <dt>Goal</dt>
                  <dd>{user.fitnessGoal || 'Build consistency'}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      ) : (
        <CollectionState status={status} error={error} emptyMessage="No users found." />
      )}
    </section>
  )
}

export default Users