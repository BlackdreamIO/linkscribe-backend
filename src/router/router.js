import express from "express";

import { GenerateLinks } from "../controller/gpt/GenerateLinks.js";

const router = express.Router();

router.post('/generateLinks', GenerateLinks);

export default router;