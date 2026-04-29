
## 1. Time Breakdown
The project was completed in approximately 3 hours. Below is the breakdown of time spent across different phases:

| Phase | Task Description | Time Spent |
| :--- | :--- | :--- |
| **Planning & Design** | Defining requirements, sketching UI flow, and choosing tech stack. | 0.5 Hour |
| **Environment Setup** | Setting up Prisma,Typscript, installing dependencies and devDependencies, and basic backend boilerplate which follows our architecture. | 0.5 Hour |
| **Core Development** | Building the CRUD without AI integration. | 1 Hour |
| **AI integration and testing** | Identifying edge cases, fixing AI slop bugs, and manual testing in Postman so that our core logic of task CRUD does get ignored. | 0.5 Hour |
| **Documentation** | Writing the README and this reflection report. | 0.5 Hour |

---

## 2. Where AI Was Used — and Why
AI assistance was utilized in the following areas:

* **Boilerplate:** I used AI to setup the base of Backend like got the basic packages installation all I need in single CLI , setting up the backend with only dependencies, dev deps we need. Also used it to connect my prisma , configure it with my database.
* **AI integration:** Used it to integrate the AI part of custom configuration and implementation and task input validation.
* **Reasoning:** I chose AI for these tasks to save the time of manually installing , configure , automating the boilerplate. Integrating the AI part and configuring the output to create task from a Natural language to JSON was quick as well.

---

## 3. Where AI Was NOT Used — and Why
I avoided AI assistance for the following:

* **Core Logic:** Creating the route,maintaining the folder structure,having the knowledge of DTOs didn't made me feel to automate these task with AI because there is high chance it make over complicate the simple task.

* **Reasoning:** It would've been quite lengthy to explain the code structure I want and keep it simplified and doing it manually also wouldn't take that much of the time thus structuring and applying the business logic by myself was lot more quick than being dependent on AI.

---

## 4. At Least 2 Bad AI Outputs

### 1: AI integration
* **The Issue:** When it was specified to provide the output for creating task it throws the error in enums of task priority and task status
* **Identification & Fix:** I identified the problem by testing the api endpoint in postman, later manually added the enums into rules section like it should follow 'high','low','medium','urgent' priorities by identifying the text.

### 2: API issue
* **The Issue:** I asked for a free usage API key , somehow google-gemini flash version was not compatible thus I've to find an alternative.
* **Identification & Fix:** Used Groq to tackle this issue which was free tier and simple to use as well, giving me smart results to create a task.

---

## 5. Trade-offs Made
* **Update task:** I decided **not** to implement a update feature simple ones with help of ID which would have been time consuming also didn't implement with the text because it would be unnecessary to find the similar text in db and updating with respect to text makes no sense which is a concern for data consistency as well.
* **No major error handling:** I used a standard error handling methods because I wanted to get the job done also there would be less error handling required if we have structure with less security.

---

## 6. What You Would Improve With More Time
If granted an additional 2 hours, I would focus on:

1.  **Update route:** I would add the update task route.
2.  **Good error handling:** I would improve the error handling.
