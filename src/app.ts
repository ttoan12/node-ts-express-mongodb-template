import path from "path";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import passport from "passport";
import dotenv from "dotenv";
import dotenvParseVariables from "dotenv-parse-variables";

/* ENV */
let env = dotenv.config();
if (env.error) throw env.error;
env = dotenvParseVariables(env.parsed!, { assignToProcessEnv: true });

/* CONSTANT */
const app = express();
const HOST: string = process.env.HOST || "127.0.0.1";
const PORT: number = +(process.env.PORT || 8000);
const LISTEN_TO: string = process.env.NODE_ENV === "development" ? "0.0.0.0" : "127.0.0.1";

/* LOGGING */
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

/* PASSPORT */
require("./middlewares/passport")(passport);

/* MIDDLEWARES */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

/* STATIC */
const staticPath = path.join(__dirname, "public");
app.use("/static", express.static(staticPath));

/* ROUTING */
import router from "./routes";
router(app);

/* CONNECT TO DB */
require('./config/db')();

/* START SERVER */
app.listen(PORT, LISTEN_TO, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode at http://${HOST}:${PORT}`);
});
