const passport = require("passport");
const GithubStrategy = require("passport-github2");
const local = require("passport-local");
const usersModel = require("../dao/models/users.model");
const { isValidPassword, createHash } = require("../utils/encrypt");

const localStrategy = local.Strategy;

const initializePassport = () => {
  passport.use(
    "register",
    new localStrategy(
      {
        passReqToCallback: true,
        usernameField: "email",
      },
      async (req, username, password, done) => {
        console.log(
          "🚀 ~ file: passport.config.js:17 ~ username: REGISTER STRATEGY",
          username
        );

        const { first_name, last_name, email, age } = req.body;

        try {
          let user = await usersModel.findOne({ email });
          console.log("🚀 ~ file: passport.config.js:19 ~ user:", user);
          if (user) {
            // el usuario existe
            return done(null, false);
          }
          const pswHashed = await createHash(password);

          const addUser = {
            first_name,
            last_name,
            email,
            age,
            password: pswHashed,
          };

          const newUser = await usersModel.create(addUser); // promesa

          if (!newUser) {
            return res
              .status(500)
              .json({ message: `we have some issues register this user` });
          }

          return done(null, newUser);
        } catch (error) {
          return done(`error getting user ${error}`);
        }
      }
    )
  );

  passport.use(
    "login",
    new localStrategy(
      {
        usernameField: "email",
      },
      async (username, password, done) => {
        try {
          console.log("***LOGIN STRATEGY***");
          const user = await usersModel.findOne({ email: username });

          if (!user) {
            return done(null, false);
          }
          if (!isValidPassword(password, user.password)) {
            return done(null, false);
          }

          return done(null, user);
        } catch (error) {
          console.log("Error en la estrategia de inicio de sesión:", error);
          return done(error);
        }
      }
    )
  );

  passport.use(
    "github",
    new GithubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_TOKEN,
        callbackURL: "http://localhost:3000/api/session/github/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log(
          "🚀 ~ file: passport.config.js:17 ~ async ~ profile:",
          profile
        );
        try {
          let user = await usersModel.findOne({ email: profile._json?.email });
          if (!user) {
            let addNewUser = {
              first_name: profile._json.name,
              last_name: "",
              email: profile._json?.email,
              age: 0,
              password: "",
            };
            let newUser = await usersModel.create(addNewUser);
            done(null, newUser);
          } else {
            // ya existia el usuario
            done(null, user);
          }
        } catch (error) {
          console.log("🚀 ~ file: passport.config.js:39 ~ error:", error);

          done(error);
        }

      }

    )

  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    let user = await usersModel.findById({ _id: id });
    done(null, user);
  });
};

module.exports = initializePassport;
