import { Link } from 'react-router-dom';
import Button from "@mui/material/Button";


const PostList = ({
  posts = [],
  title,
  showTitle = true,
  showUsername = true,
}) => {
  if (!posts.length) {
    return <h3>!No Post Yet!</h3>;
  }

  const editPost = (event) => {
    console.log(event.target.id);
  };

  const deletePost = (event) => {
    console.log(event.target.id);
  };

  return (
    <div>
      {showTitle && <h3>{title}</h3>}
      {posts &&
        posts.map((post) => (
          <div key={post._id} className="card mb-3">
            <Button variant="outlined" onClick={deletePost} id={post._id}>Delete</Button>
            <Button variant="outlined" onClick={editPost} id={post._id}>Edit</Button>
            <h4 className="card-header bg-primary text-light p-2 m-0">
              {showUsername ? (
                <Link
                  className="text-light"
                  to={`/profile/${post.postAuthor}`}
                >
                  {post.postAuthor} <br />
                  {post.postTitle} <br />
                  <span style={{ fontSize: '1rem' }}>
                    Posted on {post.createdAt}
                  </span>
                </Link>
              ) : (
                <>
                  <span style={{ fontSize: '1rem' }}>
                    You had this Post on {post.createdAt}
                  </span>
                </>
              )}
            </h4>
            <div className="card-body bg-light p-2">
              <p>{post.postText}</p>
            </div>
            <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/posts/${post._id}`}
            >
              Check out the Discussion.
            </Link>
          </div>
        ))}
    </div>
  );
};

export default PostList;
