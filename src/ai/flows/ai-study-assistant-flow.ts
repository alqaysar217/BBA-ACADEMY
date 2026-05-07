'use server';
/**
 * @fileOverview An AI study assistant that helps students understand lesson material
 * and generate practice questions.
 *
 * - aiStudyAssistant - A function that handles student queries for lesson material or practice questions.
 * - AiStudyAssistantInput - The input type for the aiStudyAssistant function.
 * - AiStudyAssistantOutput - The return type for the aiStudyAssistant function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiStudyAssistantInputSchema = z.object({
  lessonContent: z.string().describe('The textual content of the current lesson.'),
  userQuery: z.string().describe(
    'The student\'s question or request. This can be a question about the lesson content or a request to generate practice questions. Example: "Explain this concept" or "Generate 3 multiple-choice questions."'
  ),
});
export type AiStudyAssistantInput = z.infer<typeof AiStudyAssistantInputSchema>;

const AiStudyAssistantOutputSchema = z.object({
  response: z
    .string()
    .describe('The AI\'s generated response, either an answer or practice questions.'),
});
export type AiStudyAssistantOutput = z.infer<typeof AiStudyAssistantOutputSchema>;

export async function aiStudyAssistant(input: AiStudyAssistantInput): Promise<AiStudyAssistantOutput> {
  return aiStudyAssistantFlow(input);
}

const aiStudyAssistantPrompt = ai.definePrompt({
  name: 'aiStudyAssistantPrompt',
  input: {schema: AiStudyAssistantInputSchema},
  output: {schema: AiStudyAssistantOutputSchema},
  prompt: `You are an AI study assistant. Your goal is to help students understand the lesson material and generate practice questions to reinforce their learning.

Current Lesson Content:
```
{{{lessonContent}}}
```

Student's Request:
{{{userQuery}}}

Based on the student's request and the provided lesson content, provide a helpful response. If the student asks a question, answer it thoroughly and concisely using only the information available in the provided lesson content. If the student asks for practice questions, generate a few relevant questions of varying types (e.g., multiple-choice, true/false, short answer) based on the lesson content. Always prioritize using the provided lesson content for your answers and questions. If the request is unclear or outside the scope of the lesson content, kindly state that you can only assist with the provided material.`,
});

const aiStudyAssistantFlow = ai.defineFlow(
  {
    name: 'aiStudyAssistantFlow',
    inputSchema: AiStudyAssistantInputSchema,
    outputSchema: AiStudyAssistantOutputSchema,
  },
  async input => {
    const {output} = await aiStudyAssistantPrompt(input);
    return output!;
  }
);
