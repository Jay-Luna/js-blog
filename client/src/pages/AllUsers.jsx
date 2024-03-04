import { useQuery } from '@apollo/client';

import UserList from '../components/UserList';
import PostForm from '../components/PostForm';

import { QUERY_USERS } from '../utils/queries';
import { Link } from 'react-router-dom';

const AllUsers = () => {
  const { loading, data } = useQuery(QUERY_USERS);
  const users = data?.users || [];

  return (
    <main>
      <div className="flex-row justify-center">
        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: '1px dotted #1a1a1a' }}
        >
          <p>USER LIST</p>
        </div>
        <div className="col-12 col-md-8 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <UserList
              users={users}
              title="USER LIST"
            />
          )}
        </div>
        <Link></Link>
      </div>
    </main>
  );
};

export default AllUsers;
