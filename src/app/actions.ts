"use server";

import { streamText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { createStreamableValue } from "ai/rsc";
import { ReactFlowJsonObject } from "@xyflow/react";

export interface Message {
  role: "user" | "assistant";
  content: string;
}

const groq = createOpenAI({
  baseURL: "https://api.groq.com/openai/v1",
  apiKey: process.env.GROQ_API_KEY,
});

export async function continueConversation(
  history: Message[],
  flowJson: ReactFlowJsonObject | undefined
) {
  "use server";

  const { systemPrompt } = parseFlowJson(flowJson);

  const stream = createStreamableValue();

  (async () => {
    const { textStream } = await streamText({
      model: groq("llama3-8b-8192"),
      system: systemPrompt,
      messages: history,
    });

    for await (const text of textStream) {
      stream.update(text);
    }

    stream.done();
  })();

  return {
    messages: history,
    newMessage: stream.value,
  };
}

function parseFlowJson(flowJson: ReactFlowJsonObject | undefined) {
  const { nodes } = flowJson || {};
  const systemPrompt = (nodes?.find((v) => v.type === "systemRole")?.data
    .value || "") as string;

  return { systemPrompt };
}
