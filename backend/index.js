const express=require("express")
const app = express();
require("dotenv").config();
const cors = require("cors");
const transcriptRoutes = require("./routes/Transcript");
const summaryRoutes = require("./routes/Summary");
const emailRoutes = require("./routes/Email");
const db = require("./config/database");
// const fileUpload = require("express-fileupload");
const { cloudinaryConnect } = require("./config/cloudinary");
const bodyParser = require("body-parser");

// Setting up port number
const PORT = process.env.PORT || 4000;

// Connecting to database
db.dbConnect();

// Middlewares
app.use(express.json());
app.use(
    cors({
        origin: "*",
		credentials: true,
    })
)
// app.use(
// 	fileUpload({
// 		useTempFiles: true,
// 		tempFileDir: "/tmp/",
// 	})
// );
app.use(bodyParser.json());
// Connecting to cloudinary
cloudinaryConnect();

// index.js
app.use("/api/v1/summary", summaryRoutes);
app.use("/api/v1/email", emailRoutes);
app.use("/api/v1/transcript", transcriptRoutes);

// Testing the server
app.get("/", (req, res) => {
	return res.json({
		success: true,
		message: "Your server is up and running ...",
	});
});

// Listening to the server
app.listen(PORT, () => {
	console.log(`App is listening at ${PORT}`);
});

// End of code