import React from "react";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import Grid from "@mui/material/Grid";
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardTitle, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn } from 'mdb-react-ui-kit';


import PostForm from '../components/PostForm';
import PostList from '../components/PostList';

import { QUERY_USER, QUERY_ME } from '../utils/queries';

import Auth from "../utils/auth";

const Profile = () => {
  const { username: userParam } = useParams();
  const isMyProfile = userParam === Auth.getProfile().data.username; // true or false
  const profileTitle = `${userParam}'s Profile`;
  const isLoggedIn = Auth.loggedIn();

  if (!isLoggedIn) {
    window.location.assign("/login");
  }

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });
  const user = data?.user || {};
  const username = user?.username || "";
  const posts = user?.posts || [];
  const postCount = posts?.length;
  return (
    <div>
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
                    <MDBCardTitle>{username}</MDBCardTitle>
                    <MDBCardText>Senior Journalist</MDBCardText>

                    <div className="d-flex justify-content-start rounded-3 p-2 mb-2"
                      style={{ backgroundColor: '#efefef' }}>
                      <div>
                        <p className="small text-muted mb-1">Posts</p>
                        <p className="mb-0">{postCount}</p>
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
      </MDBContainer>
      <br></br>
      <br></br>
      <Grid container spacing={5} sx={{ mt: 3 }}>
        {isMyProfile ?
          (<div
            className="col-12 col-md-10 mb-3 p-3"
            style={{ border: '1px dotted #1a1a1a' }}
          >
            <PostForm currentUser={userParam} />
          </div>)
          : ""}
        {/* <PostList
          isMyProfile={isMyProfile}
          page="profile-page"
          posts={posts}
          title={profileTitle}
        /> */}
      </Grid>
      <PostList
          isMyProfile={isMyProfile}
          page="profile-page"
          posts={posts}
          title={profileTitle}
        />
    </div>
  );
};

export default Profile;
