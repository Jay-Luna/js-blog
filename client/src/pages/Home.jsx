import { React } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { useQuery } from '@apollo/client';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import MainFeaturedPost from '../components/MainFeaturedPost.jsx';
import Header from '../components/Header.jsx';
import PostList from '../components/PostList/index.jsx';
import { QUERY_POSTS } from '../utils/queries.js';

const sections = [
  { title: 'Technology', url: '#' },
  { title: 'History', url: '#' },
  { title: 'Culture', url: '#' },
  { title: 'Business', url: '#' },
  { title: 'Politics', url: '#' },
  { title: 'Opinion', url: '#' },
  { title: 'Science', url: '#' },
  { title: 'Health', url: '#' },
  { title: 'Style', url: '#' },
  { title: 'Travel', url: '#' },
];

// Fake posts
const mainFeaturedPost = {
  title: 'More Fun in the Philippines!',
  description:
    "Get your passport ready! Over 7,000 Philippine islands ready for you to explore & soak up the sun! Immerse yourself in a culture full of adventures & delicous food! ",
  image: 'https://source.unsplash.com/random?wallpapers',
  imageText: 'main image description',
  linkText: 'Continue reading…',
};

const defaultTheme = createTheme();

const Home = () => {
  const { loading, data } = useQuery(QUERY_POSTS);
  const posts = data?.posts || [];

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="Blog" sections={sections} />
        {/* <main> */}
          <MainFeaturedPost post={mainFeaturedPost} />
          {/* <Grid container spacing={4}>
            {featuredPosts.map((post) => (
              <FeaturedPost key={post.title} post={post} />
            ))}
          </Grid> */}
          {/* <Grid container spacing={5} sx={{ mt: 3 }}> */}
            <PostList
              posts={posts}
              title="Latest Post Discussion..."
            />
            {/* <Sidebar
              title={sidebar.title}
              description={sidebar.description}
              archives={sidebar.archives}
              social={sidebar.social}
            /> */}
          {/* </Grid> */}
        {/* </main> */}
      </Container>
      {/* <Footer
        title="Footer"
        description="Something here to give the footer a purpose!"
      /> */}
    </ThemeProvider>
  );
};

export default Home;
