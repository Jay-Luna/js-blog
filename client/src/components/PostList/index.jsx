import React, { useState } from "react";
import { Link } from 'react-router-dom';
import Button from "@mui/material/Button";

import { useMutation } from "@apollo/client";
import { DELETE_POST, EDIT_POST } from "../../utils/mutations";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import EditIcon from "@mui/icons-material/Edit";

import Auth from "../../utils/auth";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const PostList = ({
  isMyProfile,
  page,
  posts = [],
  title,
  showTitle = true,
  showUsername = true,
}) => {
  if (!posts.length) {
    return <h3>!No Post Yet!</h3>;
  }

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [removePost] = useMutation(DELETE_POST);
  const [updatePost] = useMutation(EDIT_POST);
  const sessionUsername = Auth.getProfile().data.username;

  const [postTitle, setPostTitle] = useState('');
  const [postText, setPostText] = useState('');

  const editPost = async (event) => {
    try {
      const { data } = await updatePost({
        variables: {
          postId: event.target.id,
          postTitle,
          postText
        }
      });
      setOpen(false);
      window.location.assign(`/profile/${sessionUsername}`);
    } catch (e) {
      console.error(e);
    }
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

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'postTitle') {
      setPostTitle(value);
    }

    if (name === 'postText') {
      setPostText(value);
    }
  };

  return (
    <div>
      {showTitle && <h3>{title}</h3>}
      {posts &&
        posts.map((post) => (
          <div key={post._id} className="card mb-3">
            {page === 'profile-page' && isMyProfile ? (
              <div>
                <Button variant="outlined" onClick={handleOpen}>Edit
                  <EditIcon></EditIcon>
                </Button>
                <Button variant="outlined" onClick={deletePost} id={post._id}>Delete</Button>
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
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Edit Post
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  <form
                    className="flex-row justify-center justify-space-between-md align-center"
                  >
                    <div className="col-12 col-lg-9">
                      <label for="">Edit Title</label>
                      <input
                        name="postTitle"
                        type="text"
                        value={postTitle}
                        onChange={handleChange} />
                    </div>
                    <div className="col-12 col-lg-9">
                      <textarea
                        name="postText"
                        placeholder="Updated post content..."
                        value={postText}
                        className="form-input w-100"
                        style={{ lineHeight: '1.5', resize: 'vertical' }}
                        onChange={handleChange}
                      ></textarea>
                    </div>
                  </form>
                  <Button variant="outlined" id={post._id} onClick={editPost}>Save</Button>
                </Typography>
              </Box>
            </Modal>
          </div>
        ))}
    </div>
  );
};

export default PostList;
