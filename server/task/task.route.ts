import { Router } from "express";
import { createTaskHandler, createTaskTextHandler, deleteTaskHandler, healthStatus, updateTaskHandler } from "./task.controller";

const route = Router();

route.get('/health',healthStatus);
route.post('/create',createTaskHandler);
route.patch('/:id',updateTaskHandler);
route.post('/create-from-text',createTaskTextHandler);
route.post('/delete-task/:id',deleteTaskHandler);
const taskRoute = route;

export default taskRoute;
