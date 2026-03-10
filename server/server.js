import express from "express"
import dotenv from "dotenv"
import { handleContact } from "../src/api/contact/contactService.js"

dotenv.config()

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
    res.status(400).json({ error: error.message })
  }
})

app.listen(3001, () => {
  console.log("Dev API running on http://localhost:3001")
})