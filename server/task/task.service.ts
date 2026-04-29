import { prisma } from "../lib/prisma";
import { CreateTaskDto, UpdateTaskDto } from "../dto";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";


async function parseTaskFromNaturalLanguage(userInput: string) {
  const API_KEY = process.env.GROQ_API_KEY;
  
  const prompt = `You are a task parser. Convert this natural language input into a structured task.

Input: "${userInput}"

Return ONLY valid JSON with these fields:
{
  "title": "short task title (max 50 chars)",
  "description": "detailed description if mentioned",
  "priority": "low" | "medium" | "high" | "urgent" ,
  "dueDate": "2024-03-15T00:00:00.000Z" or null  // Full ISO-8601
}

Rules:
- Infer priority from urgency keywords (urgent=high, soon=medium, etc.)
- Extract dates intelligently ("by Friday", "tomorrow", "next week")
- Send status only if ("in_progress","pending","completed","cancelled")
- Send priorty compulsory but only send smartly by using only these ("low","medium","high","urgent")
- If no date mentioned, set dueDate to null`;

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile', // Fast & free
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.2,
      response_format: { type: 'json_object' }
    })
  });

  const data = await response.json();
  return JSON.parse(data.choices[0].message.content);
}

export const health = async() => {
    try {
        return ({ status : "Ok" });
    } catch (error) {
        throw error;
    }
}

export const createTaskService = async (input: CreateTaskDto) => {
    try {
        const task = await prisma.task.create({
            data: {
                title: input.title,
                description: input.description || "",
                priority: input.priority,
                status: input.status,
                dueDate: input.dueDate
            }
        });
        return task;
    } catch (error) {
        throw error;
    }
}

export const updateTaskService = async (taskId: string, input: UpdateTaskDto) => {
    try {
        const statusUpdate = await prisma.task.update({
            where: { id: taskId },
            data: {
                status: input.status
            }
        });
        return statusUpdate;
    } catch (error) {
        throw error;
    }
}

export const createTaskFromNaturalLanguage = async (userInput: string) => {
    try {
        const parsedData = await parseTaskFromNaturalLanguage(userInput);
        
        // using dto to handle the error
        const dto = plainToInstance(CreateTaskDto, parsedData);
        const errors = await validate(dto);
        
        if (errors.length > 0) {
            console.log("Validation errors:", errors);
            throw new Error(`Validation failed: ${JSON.stringify(errors)}`);
        }
        
        const task = await createTaskService(dto);
        return task;
    } catch (error) {
        console.error("Error in createTaskFromNaturalLanguage:", error);
        throw error;
    }
}

