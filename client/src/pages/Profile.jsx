import React, { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// import ThoughtForm from '../components/ThoughtForm';
// import ThoughtList from '../components/ThoughtList';

// import { QUERY_USER, QUERY_ME } from '../utils/queries';

import Auth from "../utils/auth";

const defaultTheme = createTheme();

const Profile = () => {
  const { username: userParam } = useParams();
  // console.log(username);

  // const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
  //   variables: { username: userParam },
  // });

  // const user = data?.me || data?.user || {};
  // // navigate to personal profile page if username is yours
  // if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
  //   return <Navigate to="/me" />;
  // }

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (!user?.username) {
  //   return (
  //     <h4>
  //       You need to be logged in to see this. Use the navigation links above to
  //       sign up or log in!
  //     </h4>
  //   );
  // }

  // return (
  //   <div>
  //     <div className="flex-row justify-center mb-3">
  //       <h2 className="col-12 col-md-10 bg-dark text-light p-3 mb-5">
  //         Viewing {userParam ? `${user.username}'s` : 'your'} profile.
  //       </h2>

  //       <div className="col-12 col-md-10 mb-5">
  //         <ThoughtList
  //           thoughts={user.thoughts}
  //           title={`${user.username}'s thoughts...`}
  //           showTitle={false}
  //           showUsername={false}
  //         />
  //       </div>
  //       {!userParam && (
  //         <div
  //           className="col-12 col-md-10 mb-3 p-3"
  //           style={{ border: '1px dotted #1a1a1a' }}
  //         >
  //           <ThoughtForm />
  //         </div>
  //       )}
  //     </div>
  //   </div>
  // );
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            sx={{ m: 1, bgcolor: "secondary.main", width: 56, height: 56 }}
            alt="Remy Sharp"
            src="/static/images/avatar/1.jpg"
          />
          <Typography component="h1" variant="h5">
            My Profile
          </Typography>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Profile;
