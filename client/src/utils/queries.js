import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      posts {
        _id
        postTitle
        postText
        createdAt
      }
    }
  }
`;

export const QUERY_USERS = gql`
  query findAll {
  users {
    _id
    username
    email
      posts {
      _id
      postTitle
      postText
      createdAt
    }
  }
}
`;

export const QUERY_POSTS = gql`
query GetPost {
  posts {
    _id
    postTitle
    postText
    postAuthor
    createdAt
  }
}
`;

export const QUERY_SINGLE_POST = gql`
  query getSinglePost($postId: ID!) {
    post(postId: $postId) {
      _id
      postTitle
      postText
      postAuthor
      createdAt
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      posts {
        _id
        postTitle
        postText
        postAuthor
        createdAt
      }
    }
  }
`;
