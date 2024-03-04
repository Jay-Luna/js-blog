import { Link } from 'react-router-dom';
import Button from "@mui/material/Button";

import { useMutation } from "@apollo/client";
import { DELETE_POST } from "../../utils/mutations";

import Auth from "../../utils/auth";

const PostList = ({
  isMine,
  page,
  posts = [],
  title,
  showTitle = true,
  showUsername = true,
}) => {
  if (!posts.length) {
    return <h3>!No Post Yet!</h3>;
  }

  const [removePost, { error }] = useMutation(DELETE_POST);
  const sessionUsername = Auth.getProfile().data.username;

  const editPost = (event) => {
    console.log(event.target.id);
  };

  const deletePost = async (event) => {
    try {
      const { data } = await removePost({
        variables: {
          postId: event.target.id,
          postAuthor: sessionUsername,
        },
      });

      window.location.assign(`/profile/${sessionUsername}`);

    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      {showTitle && <h3>{title}</h3>}
      {posts &&
        posts.map((post) => (
          <div key={post._id} className="card mb-3">
            {page === 'profile-page' && isMine ? (
              <div>
                <Button variant="outlined" onClick={deletePost} id={post._id}>Delete</Button>
                <Button variant="outlined" onClick={editPost} id={post._id}>Edit</Button>
              </div>
            ) : ""}
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
