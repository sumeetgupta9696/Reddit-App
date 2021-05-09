const mongoose = require("mongoose");
const express = require("express");
const app = express();

const {
  USER_LOGIN,
  USER_SIGNUP,
  GET_USERS_BY_NAME,
  GET_COMMUNITY,
  ADD_COMMUNITY,
  GET_COMMUNITY_BY_ID,
  DELETE_COMMUNITY_BY_ID,
  GET_COMMUNITY_BY_ADMIN,
  GET_COMMUNITY_BY_MEMBER,
  ADD_POST_TEXT,
  ADD_POST_IMAGE,
  ADD_POST_LINK,
  UPVOTE_POST,
  DOWNVOTE_POST,
  UPVOTE_COMMENT,
  DOWNVOTE_COMMENT,
  // GET_POST,
  // GET_POST_BY_ID
  GET_COMMUNITY_BY_NAME,
  GET_RULES_TOPICS,
  RATE_COMMUNITY,
  ADD_POST,
  GET_POST_BY_PAGE,
  ADD_COMMENT,
  GET_COMMENT,
  SEND_INVITE,
  GET_POST,
  GET_STATUS,
  GET_POST_COMMUNITY,
  GET_USERS,
  GET_INVITATIONS,
} = require("./kafka/topics");

//user
const userLogin = require("./services/users/userLogin");
const userSignup = require("./services/users/userSignup");
const getUsersByName = require("./services/users/GetUsersByName");
const getUsers = require("./services/users/getUsers");

//Community
const addCommunity = require("./services/Community/AddCommunity");
const getCommunity = require("./services/Community/GetCommunity");
const getCommunityById = require("./services/Community/GetCommunityById");
const getCommunityByAdmin = require("./services/Community/GetCommunityByAdmin");
const getCommunityByMember = require("./services/Community/GetCommunityByMember");
const deleteCommunityById = require("./services/Community/DeleteCommunityById");

const getCommunityByName = require("./services/Community/GetCommunityByName");
const rateCommunity = require("./services/Community/RateCommunity");
const getRulesTopics = require("./services/Community/GetRulesTopics");

//Post
const addPost = require("./services/Post/AddPost");
const getPost = require("./services/Post/GetPost");
const getPostByPage = require("./services/Post/GetPostByPage");
const upvotePost = require("./services/Post/UpvotePost");

//Comment
const addComment = require("./services/Comment/AddComment");
const getComment = require("./services/Comment/GetComment");
const upvoteComment = require("./services/Comment/UpvoteComment");
const downvoteComment = require("./services/Comment/DownvoteComment");

//Invitation
const sendInvite = require("./services/Invitation/SendInvite");
const getStatus = require("./services/Invitation/GetStatus");
const getInvitations = require("./services/Invitation/GetInvitations");

//Post
const addPostText = require("./services/Post/AddPostText");
const addPostImage = require("./services/Post/AddPostImage");
const addPostLink = require("./services/Post/AddPostLink");
const getPostCommunity = require("./services/Post/GetPostCommunity");
const downvotePost = require("./services/Post/DownvotePost");
// const getPost = require("./services/Post/GetPost");
// const getPostbyID = require("./services/Post/GetPostbyID");

const port = 3001;
const connection = require("./kafka/connection");

// /* Db Connection */
// const db = connectToDatabase().then(() => {
//     app.listen(port, console.log("Server is listening on port :", port));
//   });

const uri =
  "mongodb+srv://admin:admin@cluster0.0uwhi.mongodb.net/RedditDB?retryWrites=true&w=majority";

mongoose.connect(uri, {
  poolSize: 10,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error"));
db.once("open", function () {
  console.log("Connected to MongoDB");
});

function handleTopicRequest(topic_name, fname) {
  //var topic_name = 'root_topic';
  var consumer = connection.getConsumer(topic_name);
  var producer = connection.getProducer();
  console.log("server is running ");
  consumer.on("message", function (message) {
    console.log("message received for " + topic_name + " ", fname);
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);

    fname.handle_request(data.data, function (err, res) {
      console.log("after handle" + res);
      var payloads = [
        {
          topic: data.replyTo,
          messages: JSON.stringify({
            correlationId: data.correlationId,
            data: res,
          }),
          partition: 0,
        },
      ];
      producer.send(payloads, function (err, data) {
        console.log(data);
      });
      return;
    });
  });
}

// User
handleTopicRequest(USER_LOGIN, userLogin);
handleTopicRequest(USER_SIGNUP, userSignup);
handleTopicRequest(GET_USERS_BY_NAME, getUsersByName);
handleTopicRequest(GET_USERS, getUsers);

//Community
handleTopicRequest(ADD_COMMUNITY, addCommunity);
handleTopicRequest(GET_COMMUNITY, getCommunity);
handleTopicRequest(GET_COMMUNITY_BY_ID, getCommunityById);
handleTopicRequest(GET_RULES_TOPICS, getRulesTopics);
handleTopicRequest(DELETE_COMMUNITY_BY_ID, deleteCommunityById);
handleTopicRequest(GET_COMMUNITY_BY_MEMBER, getCommunityByMember);
handleTopicRequest(GET_COMMUNITY_BY_ADMIN, getCommunityByAdmin);

//Post
handleTopicRequest(ADD_POST_TEXT, addPostText);
handleTopicRequest(ADD_POST_IMAGE, addPostImage);
handleTopicRequest(ADD_POST_LINK, addPostLink);
handleTopicRequest(GET_POST_COMMUNITY, getPostCommunity);
// handleTopicRequest(GET_POST_BY_ID, getPostbyID);
handleTopicRequest(GET_COMMUNITY_BY_NAME, getCommunityByName);
handleTopicRequest(RATE_COMMUNITY, rateCommunity);

//Post
handleTopicRequest(ADD_POST, addPost);
handleTopicRequest(GET_POST, getPost);
handleTopicRequest(GET_POST_BY_PAGE, getPostByPage);
handleTopicRequest(UPVOTE_POST, upvotePost);
handleTopicRequest(DOWNVOTE_POST, downvotePost);

//Comment
handleTopicRequest(ADD_COMMENT, addComment);
handleTopicRequest(GET_COMMENT, getComment);
handleTopicRequest(UPVOTE_COMMENT, upvoteComment);
handleTopicRequest(DOWNVOTE_COMMENT, downvoteComment);

//Invitation
handleTopicRequest(GET_INVITATIONS, getInvitations);
handleTopicRequest(SEND_INVITE, sendInvite);
handleTopicRequest(GET_STATUS, getStatus);
