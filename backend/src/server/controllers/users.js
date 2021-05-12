const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const salt = bcrypt.genSaltSync(10);
const Validator = require('fastest-validator');
const { v4: uuid } = require('uuid');
const UserModel = require('../models/UserModel');
const { USER_LOGIN, USER_SIGNUP, GET_USERS, GET_USERS_BY_NAME, GET_USER_BY_USER_NAME, UPDATE_USER_PROFILE } = require('../kafka/topics');
const kafka = require('../kafka/client');
const { client } = require('../db');
const util = require('util');
const AWS = require("aws-sdk");
const validator = new Validator();
var { auth, checkAuth } = require('../utils/passport');
const s3 = new AWS.S3({
  accessKeyId: "AKIARGSBJRNBLKLYG7UH",
  secretAccessKey: "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",
});
auth();

//registeration input schema
const registerSchema = {
  name: { type: 'string', nullable: false },
  email: { type: 'email', nullable: false },
  password: { type: 'string', min: 6, nullable: false },
  cpassword: { type: 'equal', field: 'password' },
};

//checker function to check validate the input
const registerCheck = validator.compile(registerSchema);

//api to create a new user account
exports.register = async (req, res) => {
  const payload = { body: req.body };
  kafka.make_request(USER_SIGNUP, payload, (error, results) => {
    if (!results.success) {
      res.status(400).send(results);
    } else {
      res.cookie('authtkn', results.token, {
        maxAge: 1000 * 60 * 60 * 4,
        httpOnly: true,
      });
      res.status(200).json({
        token: results.token,
        msg: results.msg,
        userId: results.userId,
        userName: results.userName,
        success: true,
      });
    }
  });

  // //check if inputs are proper
  // const errors = registerCheck(req.body);

  // if (errors.length) {
  //     res.status(400).json({ msg: 'Validation errors', errors });
  // } else {
  //     try {

  //         //check if user already exists in DB
  //         await UserModel.find({ email: req.body.email }, (err, docs) => {
  //             if (docs.length) {
  //                 return res.status(400).json({ msg: 'Email already registered!' });
  //             }
  //             else {

  //                 //encrpyt password before insering into DB
  //                 req.body.password = bcrypt.hashSync(req.body.password, salt);
  //                 req.body.emailToken = uuid();

  //                 //create new User instance
  //                 const newUser = new UserModel({
  //                     name: req.body.name,
  //                     email: req.body.email,
  //                     password: req.body.password
  //                 });

  //                 //register the new user
  //                 newUser.save()
  //                     .then(() => {
  //                         const token = jwt.sign(
  //                             { userId: newUser.id, email: newUser.email },
  //                             `${process.env.JWT_SECRET}`,
  //                             {
  //                                 expiresIn: '4h',
  //                             }
  //                         );
  //                         res.cookie('authtkn', token, {
  //                             maxAge: 1000 * 60 * 60 * 4,
  //                             httpOnly: true,
  //                         });
  //                         res.status(200).json({
  //                             msg: 'Registered successfully',
  //                             userId: newUser.id,
  //                         });
  //                     })
  //                     .catch((err) => {
  //                         res.status(400).json({ msg: err.message });
  //                     });
  //             }
  //         });
  //     } catch (error) {
  //         res.status(400).json({ msg: error.message });
  //     }
  // }
};

//api to login existing user account
exports.login = async (req, res) => {
  const payload = { body: req.body };
  kafka.make_request(USER_LOGIN, payload, (error, results) => {
    if (!results.success) {
      res.status(400).send(results);
    } else {
      res.cookie('authtkn', results.token, {
        maxAge: 1000 * 60 * 60 * 4,
        httpOnly: true,
      });
      res.status(200).json({
        token: results.token,
        msg: results.msg,
        userId: results.userId,
        userName: results.userName,
        extra: 'extra',
        success: true,
      });
    }
  });

  // //check whether account exists/not
  // await UserModel.findOne({ email: req.body.email }, (err, doc) => {
  //     if (!doc) {
  //         return res.status(404).json({ msg: 'Account Not Found' });
  //     }

  //     //check if password entered matches with the one in DB
  //     if (bcrypt.compareSync(req.body.password, doc.password)) {
  //         const token = jwt.sign(
  //             { userId: doc.id, email: doc.email },
  //             `${process.env.JWT_SECRET}`,
  //             {
  //                 expiresIn: '4h',
  //             }
  //         );

  //         res.cookie('authtkn', token, {
  //             maxAge: 1000 * 60 * 60 * 4,
  //             httpOnly: true,
  //         });

  //         res.status(200).json({
  //             msg: 'Logged in successfully',
  //             userId: doc.id,
  //             role: 'User'
  //         });
  //     } else {
  //         return res.status(401).json({ msg: 'Invalid Credentials Entered' });
  //     }
  // });
};

//not migrated yet
exports.autoLogin = (req, res) => {
  if (req.user) {
    res.json({ loggedIn: true, role: req.user.role });
  } else {
    res.json({ loggedIn: false, role: '' });
  }
};

// API to update user profile
exports.profile = async (req, res) => {
    kafka.make_request(UPDATE_USER_PROFILE, {
      ...req.body,
      jwtAuthData: req.user
    }, (error, results) => {
      if (!results.success) {
        res.status(400).send(results);
      } else {
        res.cookie('authtkn', results.token, {
          maxAge: 1000 * 60 * 60 * 4,
          httpOnly: true,
        });
        res.status(200).json({
          success: true,
          userId: results.userId, // TODO check if profile is returned or not
        });
      }
    });
};

exports.getUsersByName = async (req, res) => {
  const payload = { name: req.query.name };
  kafka.make_request(GET_USERS_BY_NAME, payload, (error, results) => {
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

exports.getUserByUserName = async (req, res) => {
  const payload = { userName: req.params.userName };
  kafka.make_request(GET_USER_BY_USER_NAME, payload, (error, results) => {
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

exports.getUsers = async (req, res) => {
  try {
    const payload = { body: req.body };
    kafka.make_request(GET_USERS, payload, (error, results) => {
      if (!results.success) {
        res.status(400).send(results);
      } else {
        res.status(200).json({
          msg: results.msg,
          users: results.data,
          success: true,
        });
      }
    });
  } catch (err) {
    console.log(err);
  }
};

exports.uploadUserProfile = async (req, res) => {
  // Check if the userName is valid or not
  const user = await UserModel.findOne({ userName: req.params.userName});
  console.log('User is ', user);
  if (!user) {
    res.status(400).send({
      success: false,
      msg: 'Invalid Username passed',
    });
  }

  // Check if user is allowed to update the profile image for this username
  if (`${user._id}` !== `${req.user._id}`) {
    console.log('USER IS', user._id, req.user._id)
    return res.status(400).send({
      success: false,
      msg: 'You cannot update profile image of other users!',
    });
  }

  const params = {
    Bucket: "redditapp",
    Key: `${req.file.originalname}`,
    Body: req.file.buffer,
  };

  s3.upload(params, async (error, data) => {
    if (error) {
      return res.status(400).send({
        success: false,
        msg: 'Could not upload the profile image!',
      });
    }
    const updatedUser = await user.update({ photo: data.Location });
    console.log('----------------')
    console.log('updated user is ', updatedUser);
    return res.status(200).send({
      success: true,
      msg: 'Uploaded image successfully!',
    });
  });
}
