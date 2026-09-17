import express from "express"
import { handleContact } from "../src/api/contact/contactService.js"
import {
  ApiServerError,
  ApiValidationError,
  ApiRateLimitError,
} from "../src/api/apiErrors.js"
import { loadEnvFile } from 'node:process';

loadEnvFile();

const app = express()
app.use(express.json())

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" })
});

app.post("/api/contact", async (req, res) => {
  try {
    const result = await handleContact(req.body, {
      FORMINIT_URL: process.env.FORMINIT_URL,
      FORMINIT_API_KEY: process.env.FORMINIT_API_KEY,
      TURNSTILE_SECRET: process.env.TURNSTILE_SECRET,
      IS_PRODUCTION: process.env.IS_PRODUCTION === "true",
    })

    res.json(result)

  } catch (error) {
    if (error instanceof ApiValidationError) {
      res.status(error.status).json({ fieldErrors: error.fieldErrors })
      return
    }

    if (error instanceof ApiServerError || error instanceof ApiRateLimitError) {
      res.status(error.status).json({ error: error.message })
      return
    }

    console.error("Contact request failed:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

app.listen(3001, () => {
  console.log("Dev API running on http://localhost:3001")
})