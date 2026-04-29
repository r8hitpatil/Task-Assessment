import { Router } from "express";
import { createTaskHandler, createTaskTextHandler, healthStatus, updateTaskHandler } from "./task.controller";

const route = Router();

route.get('/health',healthStatus);
route.post('/create',createTaskHandler);
route.patch('/:id',updateTaskHandler);
route.post('/create-from-text',createTaskTextHandler);
const taskRoute = route;

export default taskRoute;