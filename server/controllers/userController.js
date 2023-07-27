const { comparePassword } = require('../helpers/bcrypt');
const { generateToken } = require('../helpers/jwt');
const { User } = require('../models/index')
const { OAuth2Client } = require("google-auth-library");
const { mailer } = require('../helpers/nodeMailer')


class UserController {
    static async register(req, res, next) {
        try {
          const { name, username, email, password, imgUrl, phoneNumber, address } = req.body;
          // let imgId = data.imgId;

          //   let imgUrl

          //   if (req.file?.path) {
          //       const cloudResult = await cloudinary.uploader.upload(req.file.path, {
          //           folder: "iProject",
          //       });

          //       imgUrl = cloudResult.secure_url;
          //       imgId = cloudResult.public_id;
          //   }

          const created = await User.create({
            name: name,
            username: `@${username}`,
            email: email,
            password: password,
            imgUrl: imgUrl,
            phoneNumber: phoneNumber,
            address: address,
            
          });
          mailer(email)
          res.status(201).json({
            id: created.id,
            email:created.email,
          });
        } catch (err) {
          next(err);
        }
      }
      static async login(req, res, next) {
        try {
          const { email, password } = req.body;
          const user = await User.findOne({
            where: { email },
          });
          if (!user) {
            throw { name: 'loginInvalid' };
          }
          const isPasswordValid = comparePassword(password, user.password);
          if (!isPasswordValid) {
            throw { name: 'loginInvalid' };
          }
          const accessToken = generateToken({
            id: user.id,
            email: user.email,
          });
          res.status(200).json({
            accessToken,
            id: user.id,
          });
        } catch (err) {
          next(err);
        }
      }
      static async gLogin(req, res, next) {
        try {
          const { token_google } = req.headers;
          if (!token_google) {
            throw new Error("Missing Google token");
          }
    
          const client = new OAuth2Client({
            clientId: process.env.CLIENT_ID,
          });
    
          const ticket = await client.verifyIdToken({
            idToken: token_google,
            audience: process.env.CLIENT_ID,
          });
          const payload = await ticket.getPayload();
    
          const [user, created] = await User.findOrCreate({
            where: { email: payload.email },
            defaults: {
              name: payload.name,
              email: payload.email,
              password: "kP4^$)3%^%^$j*M*fG%(B2#sE$4",
            },
          });
          let token;
          let loggedUser;
          if (created) {
            token = generateToken({ id: created.id, email: created.email });
            loggedUser = created;
            res.status(201).json({
              statusCode: 201,
              accessToken: token,
              id: loggedUser.id,
              email: loggedUser.email,
              msg: "created",
            });
          } else {
            token = generateToken({ id: user.id, email: user.email });
            loggedUser = user;
            res.status(200).json({
              statusCode: 200,
              accessToken: token,
              id: loggedUser.id,
              email: loggedUser.email,
              msg: "Logged in",
            });
          }
        } catch (err) {
          next(err);
        }
      }
      static async githubLogin(req,res,next){
        try {
          const { token_google } = req.headers;
          if (!token_google) {
            throw new Error("Missing Google token");
          }
    
          const client = new OAuth2Client({
            clientId: process.env.CLIENT_ID,
          });
    
          const ticket = await client.verifyIdToken({
            idToken: token_google,
            audience: process.env.CLIENT_ID,
          });
          const payload = await ticket.getPayload();
    
          const [user, created] = await User.findOrCreate({
            where: { email: payload.email },
            defaults: {
              username: payload.name,
              email: payload.email,
              password: "kP4^$)3%^%^$j*M*fG%(B2#sE$4",
            },
          });
          let token;
          let loggedUser;
          if (created) {
            token = signToken({ id: created.id, email: created.email });
            loggedUser = created;
            res.status(201).json({
              access_token: token,
              id: loggedUser.id,
              username:loggedUser.username,
              email: loggedUser.email,
              username: loggedUser.username,
            });
          } else {
            token = signToken({ id: user.id, email: user.email });
            loggedUser = user;
            res.status(200).json({
              access_token: token,
              id: loggedUser.id,
              username:loggedUser.username,
              email: loggedUser.email,
              username: loggedUser.username,
            });
          }
        } catch (err) {
          console.log(err);
          next(err);
        }
      }
      static async fetchProfile(req, res, next) {
        try {
            const {id} = req.additionalData
            console.log(id);
            const user = await User.findOne({
              where: {id: id},
              attributes: {
                exclude: ['createdAt', 'password', 'updatedAt'],
              }
            });
            res.status(200).json(user);
          } catch (err) {
            console.log(err);
            next(err);
          }
      }
      static async editProfile (req, res, next) {
        try {
            const {id} = req.additionalData
            const data = await User.findByPk(id)
            const { name, username, phoneNumber, address } = req.body;
            let imgId = data.imgId;

            let imgUrl

            if (req.file?.path) {
                const cloudResult = await cloudinary.uploader.upload(req.file.path, {
                    folder: "iProject",
                });

                imgUrl = cloudResult.secure_url;
                imgId = cloudResult.public_id;
            }
            const update = await User.update({
                name, username, imgUrl, phoneNumber, address, imgId
            }, {
                where: {id: id},
                returning: true
            })
            res.status(200).json(update[1][0])            
        } catch (err) {
            console.log(err);
            next(err);

        }
      }
      static async deleteProfile (req, res, next) {
        try {
            const { id } = req.additionalData;
            const data = await User.findByPk(id);
            const destroy = await User.destroy({
              where: {
                id: id,
              },
            });
            if (!destroy) {
              throw {
                name: "NOT_FOUND",
              };
            }
            res.status(200).json({
              statuscode: 200,
              message: `${data.name} success to delete`,
            });
          } catch (err) {
            next(err);
          }
      }
}

module.exports = UserController