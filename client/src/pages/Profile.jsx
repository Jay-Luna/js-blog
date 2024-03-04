import React, { useState } from "react";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
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
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardTitle, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn } from 'mdb-react-ui-kit';


// import ThoughtForm from '../components/ThoughtForm';
import PostList from '../components/PostList';

import { QUERY_USER, QUERY_ME } from '../utils/queries.js';

import Auth from "../utils/auth";

const defaultTheme = createTheme();

const Profile = () => {
  const { username: userParam } = useParams();
  const isLoggedIn = Auth.loggedIn();

  if (!isLoggedIn) {
    //alert;
    window.location.assign("/login");
  }

  console.log(userParam);

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });
  const posts = data?.posts || [];

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
    <div className="vh-100" style={{ backgroundColor: '#9de2ff' }}>
      <MDBContainer>
        <MDBRow className="justify-content-center">
          <MDBCol md="9" lg="7" xl="5" className="mt-5">
            <MDBCard style={{ borderRadius: '15px' }}>
              <MDBCardBody className="p-4">
                <div className="d-flex text-black">
                  <div className="flex-shrink-0">
                    <MDBCardImage
                      style={{ width: '180px', borderRadius: '10px' }}
                      src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp'
                      alt='Generic placeholder image'
                      fluid />
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <MDBCardTitle>Danny McLoan</MDBCardTitle>
                    <MDBCardText>Senior Journalist</MDBCardText>

                    <div className="d-flex justify-content-start rounded-3 p-2 mb-2"
                      style={{ backgroundColor: '#efefef' }}>
                      <div>
                        <p className="small text-muted mb-1">Articles</p>
                        <p className="mb-0">41</p>
                      </div>
                      <div className="px-3">
                        <p className="small text-muted mb-1">Followers</p>
                        <p className="mb-0">976</p>
                      </div>
                      <div>
                        <p className="small text-muted mb-1">Rating</p>
                        <p className="mb-0">8.5</p>
                      </div>

                    </div>
                  </div>
                  </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
        <Grid container spacing={5} sx={{ mt: 3 }}>
          <PostList
            posts={posts}
            title="Some Feed for Posts..."
          />
        </Grid>
      </MDBContainer>
    </div>
    // <ThemeProvider theme={defaultTheme}>
    //   <Container component="main" maxWidth="xs">
    //     <CssBaseline />

  );
};

export default Profile;
