import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

import Auth from "../../utils/auth";

import { useMutation } from "@apollo/client";
import { ADD_COMMENT } from "../../utils/mutations";

const CommentForm = ({ postId }) => {
    const [commentText, setCommentText] = useState('');
    const [characterCount, setCharacterCount] = useState(0);
  
    const [addComment, { error }] = useMutation(ADD_COMMENT);
  
    const handleFormSubmit = async (event) => {
      event.preventDefault();
  
      try {
        const { data } = await addComment({
          variables: {
            postId,
            commentText,
            commentAuthor: Auth.getProfile().data.username,
          },
        });
  
        setCommentText('');
      } catch (err) {
        console.error(err);
      }
    };
  
    const handleChange = (event) => {
      const { name, value } = event.target;
  
      if (name === 'commentText' && value.length <= 280) {
        setCommentText(value);
        setCharacterCount(value.length);
      }
    };


  return (
    <Box sx={{ flexGrow: 1 }}>
        <h4> Comment on it </h4>
        {Auth.loggedIn() ? (
        <>
        <p
          className={`m-0 ${
            characterCount === 280 || error ? 'text-danger' : ''
          }`}
        >
          Character Count: {characterCount}/280
          {error && <span className="ml-2">{error.message}</span>}
        </p>
        <form
          className="flex-row justify-center justify-space-between-md align-center"
          onSubmit={handleFormSubmit}
        >
          <div className="col-12 col-lg-9">
            <textarea
              name="commentText"
              placeholder="Add your comment..."
              value={commentText}
              className="form-input w-100"
              style={{ lineHeight: '1.5', resize: 'vertical' }}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="col-12 col-lg-3">
            <button className="btn btn-primary btn-block py-3" type="submit">
              Add Comment
            </button>
          </div>
        </form>
      </>


        ):(
            <p>
            Please log in
          </p>   

        )}
    </Box>
  );
};

export default CommentForm;
