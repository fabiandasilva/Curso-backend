const passport = require("passport");
const GithubStrategy = require("passport-github2");
const usersModel = require("../dao/models/users.model");
const jwt = require("passport-jwt");
const { SECRET_JWT } = require("../utils/jwt");
const local = require("passport-local");
const { isValidPassword, createHash } = require("../utils/encrypt");



const initializePassport = () => {
  const JWTStrategy = jwt.Strategy;
  const ExtractJWT = jwt.ExtractJwt;
  const localStrategy = local.Strategy;

  passport.use(
    "register",
    new localStrategy(
      {
        passReqToCallback: true,
        usernameField: "email",
      },
      async (req, username, password, done) => {
        console.log(
          "REGISTER STRATEGY",
          username
        );

        const { first_name, last_name, email, age, role } = req.body;

        try {
          let user = await usersModel.findOne({ email });
          if (user) {
            return done(null, false);
          }
          const pswHashed = await createHash(password);

          const addUser = {
            first_name,
            last_name,
            email,
            age,
            password: pswHashed,
            role
          };

          const newUser = await usersModel.create(addUser);

          if (!newUser) {
            return res
              .status(500)
              .json({ message: "Error al registrar usuario" });
          }

          return done(null, newUser);
        } catch (error) {
          return done(error);
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
    "jwt",
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: SECRET_JWT,
      },
      async (jwtPayload, done) => {
        console.log(
          "🚀 ~ file: passport.config.js:19 ~ jwtPayload:",
          jwtPayload
        );
        try {
          return done(null, jwtPayload);
        } catch (error) {
          return done(error);
        }
      }
    )
  );


  passport.use(
    "current",
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromExtractors([
          ExtractJWT.fromAuthHeaderAsBearerToken(),
          (req) => {
            if (req && req.cookies) {
              return req.cookies["token"];
            }
            return null;
          },
        ]),
        secretOrKey: SECRET_JWT,
      },
      async (jwtPayload, done) => {
        try {
          const user = await usersModel.findById(jwtPayload.user._id);
          if (!user) {
            return done(null, false, { message: "Usuario no encontrado" });
          }
          return done(null, user);
        } catch (error) {
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
