import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import TextField from "@mui/material/TextField";

import { ADD_COMMENT } from '../../utils/mutations';
import Auth from '../../utils/auth';

const CommentForm = ({ postId }) => {
  const [commentText, setCommentText] = useState('');
  const [addComment] = useMutation(ADD_COMMENT);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addComment({
        variables: {
          postId,
          commentText,
          commentAuthor: Auth.getProfile().data.username,
        }
      });

      setCommentText('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'commentText') {
      setCommentText(value);
    }
  };

  return (
    <div>
      <h4>What do you think about this Post?</h4>

      {Auth.loggedIn() ? (
        <>
          <TextField
            name="commentText"
            label="Add a comment"
            color="primary"
            margin="normal"
            onChange={handleChange}
            fullWidth
            focused
          />
          <button className="btn btn-primary btn-block py-3" type="submit" onClick={handleFormSubmit}>
            Join this discussion
          </button>
        </>
      ) : (
        <p>
          You need to be logged in to share your posts. Please{' '}
          <Link to="./pages/login">login</Link> or <Link to="./pages/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default CommentForm;
