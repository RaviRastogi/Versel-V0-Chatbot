import { CoreMessage, streamText } from 'ai'
import { openai } from '@ai-sdk/openai'

export async function POST(req: Request) {
  try {
    const { messages }: { messages: CoreMessage[] } = await req.json()

    const result = streamText({
      model: openai('gpt-4o-mini'),
      system: 'You are a helpful assistant.',
      messages,
    })

    return result.toDataStreamResponse()
  } catch (error) {
    console.error('Error in chat API:', error)
    return new Response(JSON.stringify({ error: 'An error occurred while processing your request.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}

