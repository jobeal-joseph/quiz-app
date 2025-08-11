import express from "express"
import mongoose from "mongoose"
import cors from "cors"

const app = express();
app.use(cors());
app.use(express.json());

const DBurl = ""
//connect to mongoDB
mongoose.connect(DBurl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});




const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));