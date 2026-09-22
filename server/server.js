import express from "express";
import { handleContact } from "../src/api/contact/contactService.js";
import { toErrorResponse } from "../src/api/apiErrorResponse.js";
import { loadEnvFile } from "node:process";

loadEnvFile();

const app = express();
app.use(express.json());

app.post("/api/contact", async (req, res) => {
  try {
    const result = await handleContact(req.body, {
      FORMINIT_URL: process.env.FORMINIT_URL,
      FORMINIT_API_KEY: process.env.FORMINIT_API_KEY,
      TURNSTILE_SECRET: process.env.TURNSTILE_SECRET,
      SKIP_EMAIL: process.env.SKIP_EMAIL !== "false",
    });

    res.json(result);
  } catch (error) {
    const { status, body } = toErrorResponse(error);
    res.status(status).json(body);
  }
});

app.listen(3001, () => {
  console.log("Dev API running on http://localhost:3001");
});
