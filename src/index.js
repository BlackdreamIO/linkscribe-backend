import express from "express";
import cors from "cors";
import compression from "compression";
import router from "./router/router.js";
import { userSubscirptionMiddleware } from "./middlewere/userSubscirptionMiddleware.js";

const allowedOrigins = ["*", "http://localhost:5173", "http://localhost:3000"];
const port = 5000;

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
};

const app = express();
app.use(express.json());
app.use(cors(corsOptions));
//app.use(compression());
//app.use(userSubscirptionMiddleware);
app.use('/', router)

app.listen(port, () => {
    console.log(`server is running at http://localhost:${port}`);
});
