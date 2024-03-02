



import { useQuery } from '@apollo/client';

import PostList from '../components/PostList';
import PostForm from '../components/PostForm';

import { QUERY_POSTS } from '../utils/queries';
import { Link } from 'react-router-dom';

const AllUsers = () => {
  const { loading, data } = useQuery(QUERY_POSTS);
  const posts = data?.posts || [];

  return (
    <main>
      <div className="flex-row justify-center">
        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: '1px dotted #1a1a1a' }}
        >
          <p>What's up!</p>
          <PostForm/>
        </div>
        <div className="col-12 col-md-8 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <PostList
              posts={posts}
              title="Some Feed for Posts..."
            />
          )}
        </div>
        <Link to="/posts/65e264f6f415d3b31117d8ed">Click here to go to single post</Link>
      </div>
    </main>
  );
};

export default AllUsers;
