const express = require("express");
const path = require("path");
const cors = require("cors");
const http = require("http");
const cookieParser = require("cookie-parser");
const connectMongoose = require("./db/connectDB.js");
const authRouter = require("./router/authRouter.js");
const messageRouter = require("./router/messageRouter.js");
const userRouter = require("./router/userRouter.js");
const { setSocket } = require("./Socket/socket.js");
const app = express();

const server = http.createServer(app);
setSocket(server)

const dotenv = require("dotenv");
dotenv.config({ path: path.join(__dirname, "./config.env") });

const PORT = process.env.PORT || 5001;
connectMongoose();

app.use(express.static(path.join(__dirname, "./public")));
app.use(cookieParser());
app.use(express.json());

const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"],
  credentials: true,
};

app.use(cors(corsOptions));

const error = require("./middleware/error.js");

app.use('/uploads',express.static(path.join(__dirname,'./uploads')))
app.use("/api/auth/", authRouter);
app.use("/api/message/", messageRouter);
app.use("/api/users/", userRouter);

app.use(error);

app.use(express.static(path.join(__dirname,'../vite-project/dist')))
app.use('*',(req,res)=>{
  res.sendFile(path.join(__dirname,'../vite-project/dist/index.html'))
})

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

