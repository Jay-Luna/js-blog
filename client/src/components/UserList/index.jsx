import { Link } from 'react-router-dom';

const UserList = ({
  users = [],
  title,
  showTitle = true,
  showUsername = true,
}) => {
  if (!users.length) {
    return <h3>!No Users Yet!</h3>;
  }

  return (
    <div>
      {showTitle && <h3>{title}</h3>}
      {users &&
        users.map((user) => (
          <div key={user._id} className="card mb-3">
            <h4 className="card-header text-light p-2 m-0">
              <Link to={`/profile/${user.username}`}>{user.username}</Link>
              </h4>
          </div>
        ))}
    </div>
  );
};

export default UserList;
