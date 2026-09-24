import express from "express";
import { handleContact } from "../src/api/contact/contactService.js";
import { toErrorResponse } from "../src/api/apiErrorResponse.js";
import { getMissingContactConfigKeys } from "../src/api/contact/contactConfig.js";
import { loadEnvFile } from "node:process";

loadEnvFile();

const contactConfig = {
  FORMINIT_URL: process.env.FORMINIT_URL,
  FORMINIT_API_KEY: process.env.FORMINIT_API_KEY,
  TURNSTILE_SECRET: process.env.TURNSTILE_SECRET,
  SEND_EMAIL: process.env.SEND_EMAIL,
};

const missingKeys = getMissingContactConfigKeys(contactConfig);
if (missingKeys.length > 0) {
  console.error(
    `Missing required environment variable(s): ${missingKeys.join(", ")}. Set them in your .env file before starting the server.`,
  );
  process.exit(1);
}

const app = express();
app.use(express.json());

app.post("/api/contact", async (req, res) => {
  try {
    const result = await handleContact(req.body, contactConfig);

    res.json(result);
  } catch (error) {
    const { status, body } = toErrorResponse(error);
    res.status(status).json(body);
  }
});

app.listen(3001, () => {
  console.log("Dev API running on http://localhost:3001");
});
