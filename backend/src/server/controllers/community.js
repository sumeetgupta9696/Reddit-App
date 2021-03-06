const kafka = require('../kafka/client');
var { auth, checkAuth } = require('../utils/passport');
auth();

const {
  ADD_COMMUNITY,
  GET_COMMUNITY,
  GET_COMMUNITY_BY_ID,
  RATE_COMMUNITY,
  SEND_INVITE,
  GET_STATUS,
  GET_COMMUNITY_BY_NAME,
  GET_COMMUNITY_BY_ADMIN,
  GET_COMMUNITY_BY_MEMBER,
  GET_RULES_TOPICS,
  GET_INVITATIONS_FOR_COMMUNITY,
  APPROVE_INVITE,
  GET_COMMUNITY_ANALYTICS,
  GET_INVITATIONS,
  DELETE_COMMUNITY_BY_ID,
  GET_COMMUNITY_BY_PAGE,
  GET_INVITATIONS_BY_PAGE,
  GET_COMMUNITY_INVITE,
  ACCEPT_COMMUNITY_INVITE,
  REJECT_COMMUNITY_INVITE,
  GET_COMMUNITY_VOTE_COUNT,
  GET_COMMUNITY_NAME_BY_ID,
  LEAVE_COMMUNITY,
  REMOVE_USER_COMMUNITY,
} = require('../kafka/topics');

exports.addCommunity = async (req, res) => {
  const payload = { body: req.body };
  kafka.make_request(ADD_COMMUNITY, payload, (error, results) => {
    if (!results.success) {
      res.status(400).send(results);
    } else {
      res.status(200).json({
        msg: results.msg,
      });
    }
  });
};

exports.getRulesTopics = async (req, res) => {
  //console.log("Here.....", req.body)
  const payload = { rules: true, topics: true };
  kafka.make_request(GET_RULES_TOPICS, payload, (error, results) => {
    if (!results.success) {
      res.status(400).send(results);
    } else {
      // console.log(results);
      res.status(200).json({
        msg: results.data,
        //role: results.role,
      });
    }
  });
};

exports.deleteCommunityById = async (req, res) => {
  const payload = { community_id: req.query.community_id };
  kafka.make_request(DELETE_COMMUNITY_BY_ID, payload, (error, results) => {
    if (!results.success) {
      res.status(400).send(results);
    } else {
      console.log(results);
      res.status(200).json({
        msg: results.msg,
      });
    }
  });
};

exports.getCommunity = async (req, res) => {
  let msg = '';
  if (req.query.id !== '') {
    msg = req.query.id;
  }

  kafka.make_request(GET_COMMUNITY, msg, (error, results) => {
    if (!results.success) {
      res.status(400).send(results);
    } else {
      // console.log(results);
      res.status(200).json({
        msg: results.msg,
        data: results.data,
        //role: results.role,
      });
    }
  });
};
exports.getCommunityById = async (req, res) => {
  const payload = { community_id: req.params.community_id };
  kafka.make_request(GET_COMMUNITY_BY_ID, payload, (error, results) => {
    if (!results.success) {
      res.status(400).send(results);
    } else {
      res.status(200).json({
        msg: results.msg,
        data: results.data,
      });
    }
  });
};

exports.getCommunityByAdmin = async (req, res) => {
  const payload = { adminId: req.query.id };
  kafka.make_request(GET_COMMUNITY_BY_ADMIN, payload, (error, results) => {
    if (!results.success) {
      res.status(400).send(results);
    } else {
      console.log(results);
      res.status(200).json({
        msg: results.data,
        //role: results.role,
      });
    }
  });
};

exports.getCommunityByMember = async (req, res) => {
  const payload = { memberId: req.user._id };
  kafka.make_request(GET_COMMUNITY_BY_MEMBER, payload, (error, results) => {
    if (!results.success) {
      res.status(400).send(results);
    } else {
      console.log(results);
      res.status(200).json({
        msg: results.data,
        //role: results.role,
      });
    }
  });
};

exports.getCommunityByName = async (req, res) => {
  const payload = { communityName: req.query.name };
  kafka.make_request(GET_COMMUNITY_BY_NAME, payload, (error, results) => {
    if (!results.success) {
      res.status(400).send(results);
    } else {
      // console.log(results);
      res.status(200).json({
        msg: results.msg,
        data: results.data,
      });
    }
  });
};

exports.getCommunityByPage = async (req, res) => {
  const data = {
    communityName: req.body.name,
    page: req.body.page,
    rows: req.body.rows,
  };
  const payload = data;
  kafka.make_request(GET_COMMUNITY_BY_PAGE, payload, (error, results) => {
    if (!results.success) {
      res.status(400).send(results);
    } else {
      //console.log(results);
      res.status(200).json({
        msg: results.msg,
        data: results.data,
      });
    }
  });
};

exports.rateCommunity = async (req, res) => {
  const payload = { body: req.body };
  kafka.make_request(RATE_COMMUNITY, payload, (error, results) => {
    if (!results.success) {
      res.status(400).send(results);
    } else {
      // console.log(results);
      res.status(200).send(results);
    }
  });
};

exports.sendInvite = async (req, res) => {
  const payload = { body: req.body };
  kafka.make_request(SEND_INVITE, payload, (error, results) => {
    if (!results.success) {
      res.status(400).send(results);
    } else {
      // console.log(results);
      res.status(200).send(results);
    }
  });
};

exports.getStatus = async (req, res) => {
  const payload = { body: req.body };
  kafka.make_request(GET_STATUS, payload, (error, results) => {
    if (!results.success) {
      res.status(400).send(results);
    } else {
      // console.log(results);
      res.status(200).send(results);
    }
  });
};

exports.getInvitations = async (req, res) => {
  const payload = { userId: req.query.userId };
  kafka.make_request(GET_INVITATIONS, payload, (error, results) => {
    if (!results.success) {
      res.status(400).send(results);
    } else {
      res.status(200).json({
        msg: results.msg,
        data: results.data,
      });
    }
  });
};

exports.getInvitationsByPage = async (req, res) => {
  const data = {
    userId: req.body.userId,
    page: req.body.page,
    rows: req.body.rows,
  };
  const payload = data;
  kafka.make_request(GET_INVITATIONS_BY_PAGE, payload, (error, results) => {
    if (!results.success) {
      res.status(400).send(results);
    } else {
      res.status(200).json({
        msg: results.msg,
        data: results.data,
      });
    }
  });
};

exports.getCommunityVoteCount = async (req, res) => {
  const payload = { id: req.query.id };
  kafka.make_request(GET_COMMUNITY_VOTE_COUNT, payload, (error, results) => {
    if (!results.success) {
      res.status(400).send(results);
    } else {
      res.status(200).json({
        msg: results.msg,
        data: results.data,
      });
    }
  });
};

exports.getcommunityinvite = async (req, res) => {
  // console.log("---",req);
  const data = {
    userId: req.user._id,
  };
  const payload = data;
  kafka.make_request(GET_COMMUNITY_INVITE, payload, (error, results) => {
    if (!results.success) {
      res.status(400).send(results);
    } else {
      res.status(200).json({
        msg: results.msg,
        data: results.data,
      });
    }
  });
};

exports.leaveCommunity = async (req, res) => {
  const payload = { user_id: req.body.user_id, community_id: req.body.community_id };
  kafka.make_request(LEAVE_COMMUNITY, payload, (error, results) => {
    if (!results.success) {
      res.status(400).send(results);
    } else {
      res.status(200).json({
        msg: results.msg,
        data: results.data,
      });
    }
  });
};

exports.acceptcommunityinvite = async (req, res) => {
  const data = {
    userId: req.user._id,
    community_id: req.body.community_id,
  };
  const payload = data;
  kafka.make_request(ACCEPT_COMMUNITY_INVITE, payload, (error, results) => {
    if (!results.success) {
      res.status(400).send(results);
    } else {
      res.status(200).json({
        msg: results.msg,
        data: results.data,
      });
    }
  });
};

exports.getCommunityNameById = async (req, res) => {
  const payload = { id: req.query.id };
  kafka.make_request(GET_COMMUNITY_NAME_BY_ID, payload, (error, results) => {
    if (!results.success) {
      res.status(400).send(results);
    } else {
      // console.log(results);
      res.status(200).json({
        msg: results.msg,
        data: results.data,
      });
    }
  });
};

exports.rejectcommunityinvite = async (req, res) => {
  const data = {
    userId: req.body.userId,
  };
  const payload = data;
  kafka.make_request(REJECT_COMMUNITY_INVITE, payload, (error, results) => {
    if (!results.success) {
      res.status(400).send(results);
    } else {
      // console.log(results);
      res.status(200).json({
        msg: results.msg,
        data: results.data,
      });
    }
  });
};

exports.approveInvite = async (req, res) => {
  const payload = { body: req.body };
  kafka.make_request(APPROVE_INVITE, payload, (error, results) => {
    if (!results.success) {
      res.status(400).send(results);
    } else {
      console.log(results);
      res.status(200).json({
        msg: results.msg,
      });
    }
  });
};

exports.removeUserCommunity = async (req, res) => {
  const payload = { body: req.body };
  kafka.make_request(REMOVE_USER_COMMUNITY, payload, (error, results) => {
    if (!results.success) {
      res.status(400).send(results);
    } else {
      console.log(results);
      res.status(200).json({
        msg: results.msg,
      });
    }
  });
};
exports.getInvitationsForCommunity = async (req, res) => {
  const payload = { communityId: req.query.id };
  kafka.make_request(GET_INVITATIONS_FOR_COMMUNITY, payload, (error, results) => {
    if (!results.success) {
      res.status(400).send(results);
    } else {
      console.log(results);
      res.status(200).json({
        msg: results.data,
        //role: results.role,
      });
    }
  });
};

exports.getCommunityAnalytics = async (req, res) => {
  const payload = { adminId: req.body.adminId, jwtAuthData: req.user };
  kafka.make_request(GET_COMMUNITY_ANALYTICS, payload, (error, results) => {
    if (!results.success) {
      res.status(400).send(results);
    } else {
      console.log(results);
      res.status(200).json({
        success: true,
        data: results.data,
      });
    }
  });
};
