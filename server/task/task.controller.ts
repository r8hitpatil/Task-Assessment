import { Request, Response } from "express";
import { createTaskFromNaturalLanguage, createTaskService, deleteTaskService, health, updateTaskService } from "./task.service"

interface UpdateParams {
    id: string;
}

export const healthStatus = async (req:Request,res:Response) => {
    try {
        const healthStatus = await health();
        return res.json(healthStatus);
    } catch (error) {
        return res.status(500).json({ message: "Server error",error : error});
    }
}

export const createTaskHandler = async (req:Request,res:Response) => {
    try {
        const task = await createTaskService(req.body);
        return res.status(201).json(task);
    } catch (error) {
        return res.status(500).json({ message: "Failed to create task",error : error});
    }
}

export const updateTaskHandler = async (req:Request<UpdateParams>,res:Response) => {
    try {
        const { id } = req.params;
        const updateStatus = await updateTaskService(id,req.body)
        return res.status(200).json(updateStatus);
    } catch (error) {
        return res.status(500).json({ message: "Failed to update status", error });
    }
}

export const createTaskTextHandler = async(req:Request,res:Response) => {
    try {
        const { text } = req.body;
        const task = await createTaskFromNaturalLanguage(text);
        res.status(201).json(task);
    } catch (error) {
         return res.status(500).json({ message: "Failed to create task", error });
    }
}

export const deleteTaskHandler = async(req:Request<UpdateParams>,res:Response) => {
    try {
        const { id } = req.params;
        const deleteTask = await deleteTaskService(id);
        return res.status(200).json(deleteTask);
    } catch (error) {
        return res.status(500).json({ message: "Failed to delete status", error });
    }
}
