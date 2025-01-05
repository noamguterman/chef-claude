import Anthropic from "@anthropic-ai/sdk"

const corsHeaders = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'POST, OPTIONS',
	'Access-Control-Allow-Headers': 'Content-Type'
  }

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page
`

export default {
	async fetch(request, env, ctx) {
		// Handle CORS preflight requests
		if (request.method === 'OPTIONS') {
			return new Response(null, { headers: corsHeaders });
		}

		// Only process POST requests
		if (request.method !== 'POST') {
			return new Response(JSON.stringify({ error: `${request.method} method not allowed.`}), { status: 405, headers: corsHeaders })
		}

		const anthropic = new Anthropic({
			apiKey: env.ANTHROPIC_API_KEY,
			baseURL: 'https://gateway.ai.cloudflare.com/v1/b0758b7460a85a7fc28c4d6e12675269/chefclaude/anthropic'
		})

		try {
			const messages = await request.json()
			const msg = await anthropic.messages.create({
				model: 'claude-3-haiku-20240307',
				max_tokens: 1024,
				system: SYSTEM_PROMPT,
				messages
			})
			const response = msg.content[0].text

			return new Response(JSON.stringify(response), { headers: corsHeaders })
		} catch(err) {
			return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: corsHeaders })
		}
	},
}
