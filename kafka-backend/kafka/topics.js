// User
const USER_LOGIN = "userLogin";
const USER_SIGNUP = "userSignup";
const GET_USER_BY_USER_NAME = "getUserByUserName";
const UPDATE_USER_PROFILE = "updateUserProfile";
const GET_USERS_BY_NAME = "getUsersByName";
const GET_USERS = "getUsers";
const GET_USER_BY_ID = "getUserById";

//Community
const ADD_COMMUNITY = "addCommunity";
const GET_COMMUNITY = "getCommunity";
const GET_COMMUNITY_BY_ID = "getCommunityById";
const DELETE_COMMUNITY_BY_ID = "deleteCommunity";
const GET_COMMUNITY_BY_PAGE = "getCommunityByPage";
const GET_COMMUNITY_BY_NAME = "getCommunityByName";
const GET_COMMUNITY_BY_MEMBER = "getCommunityByMember";
const GET_COMMUNITY_BY_ADMIN = "getCommunityByAdmin";
const GET_COMMUNITY_ANALYTICS = "getCommunityAnalytics";
const RATE_COMMUNITY = "voteCommunity";
const GET_COMMUNITY_VOTE_COUNT = "getCommunityVoteCount";
const JOIN_COMMUNITY = "joinCommunity";
const GET_RULES_TOPICS = "getRulesTopics";
const DOWNVOTE_POST = "downvotePost";
const GET_COMMUNITY_INVITE = "getcommunityinvite";
const ACCEPT_COMMUNITY_INVITE = "acceptcommunityinvite";
const REJECT_COMMUNITY_INVITE = "rejectcommunityinvite";
const GET_COMMUNITY_NAME_BY_ID = "getCommunityNameById";
const REMOVE_USER_COMMUNITY = "removeUserCommunity";

//Post
const ADD_POST = "addPost";
const GET_POST = "getPost";
const GET_POST_BY_PAGE = "getPostByPage";
const UPVOTE_POST = "upvotePost";
const GET_POST_BY_ID = "getPostById";
const ADD_POST_TEXT = "addPostText";
const ADD_POST_IMAGE = "addPostImage";
const ADD_POST_LINK = "addPostLink";
const GET_POST_COMMUNITY = "getPostCommunity";
const SORT_POST_BY_UPVOTE = "sortPostByUpvote";
const SORT_POST_BY_DOWNVOTE = "sortPostByDownvote";
const SORT_POST_BY_DATE = "sortPostByDate";
const SEARCH_POST_BY_CRITERIA = "searchPostByCriteria";
const SORT_DASHPOSTS_BY_UPVOTES = "sortDashPostsByUpvotes";
const GET_POST_BY_COMMUNITY = "getpostbycommunity";

//Comment
const ADD_COMMENT = "addComments";
const GET_COMMENT = "getComment";
const UPVOTE_COMMENT = "upvoteComment";
const DOWNVOTE_COMMENT = "downvoteComment";
const ADD_SUB_COMMENT = "addSubComment";

//Invitation
const SEND_INVITE = "sendInvite";
const GET_STATUS = "getStatus";
const GET_INVITATIONS = "getInvitations";
const GET_INVITATIONS_BY_PAGE = "getinvitationsByPage";
const LEAVE_COMMUNITY = "leaveCommunity";
const GET_INVITATIONS_FOR_COMMUNITY = "getInvitationsForCommunity";
const APPROVE_INVITE = "approveInvite";

module.exports = {
  GET_USERS,
  USER_LOGIN,
  USER_SIGNUP,
  GET_USER_BY_USER_NAME,
  UPDATE_USER_PROFILE,
  GET_USERS_BY_NAME,
  GET_USER_BY_ID,
  GET_USERS,
  ADD_COMMUNITY,
  GET_COMMUNITY,
  GET_COMMUNITY_BY_ID,
  DELETE_COMMUNITY_BY_ID,
  ADD_POST_TEXT,
  ADD_POST_IMAGE,
  ADD_POST_LINK,
  DOWNVOTE_POST,
  UPVOTE_COMMENT,
  DOWNVOTE_COMMENT,
  SORT_POST_BY_UPVOTE,
  SORT_POST_BY_DOWNVOTE,
  SORT_POST_BY_DATE,
  GET_INVITATIONS_FOR_COMMUNITY,
  REMOVE_USER_COMMUNITY,
  // GET_POST,
  // GET_POST_BY_ID
  GET_COMMUNITY_BY_NAME,
  GET_COMMUNITY_BY_PAGE,
  GET_COMMUNITY_BY_MEMBER,
  GET_COMMUNITY_BY_ADMIN,
  GET_COMMUNITY_ANALYTICS,
  RATE_COMMUNITY,
  GET_COMMUNITY_VOTE_COUNT,
  GET_COMMUNITY_NAME_BY_ID,
  ADD_POST,
  GET_POST,
  ADD_COMMENT,
  GET_POST_BY_PAGE,
  GET_COMMENT,
  SEND_INVITE,
  APPROVE_INVITE,
  GET_INVITATIONS,
  GET_INVITATIONS_BY_PAGE,
  JOIN_COMMUNITY,
  GET_STATUS,
  GET_RULES_TOPICS,
  GET_POST_COMMUNITY,
  UPVOTE_POST,
  ADD_SUB_COMMENT,
  GET_POST_BY_ID,
  SEARCH_POST_BY_CRITERIA,
  GET_COMMUNITY_INVITE,
  ACCEPT_COMMUNITY_INVITE,
  REJECT_COMMUNITY_INVITE,
  LEAVE_COMMUNITY,
  SORT_DASHPOSTS_BY_UPVOTES,
  GET_POST_BY_COMMUNITY,
};
