import { handleContact } from "../../lib/contactService.js"

export async function onRequestPost(context) {
  const { request, env } = context

  try {
    const data = await request.json()

    const result = await handleContact(data, {
      FORMINIT_URL: env.FORMINIT_URL,
      FORMINIT_API_KEY: env.FORMINIT_API_KEY,
      TURNSTILE_SECRET: env.TURNSTILE_SECRET,
    })

    return new Response(JSON.stringify(result), {
      headers: { "Content-Type": "application/json" },
    })

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400 }
    )
  }
}