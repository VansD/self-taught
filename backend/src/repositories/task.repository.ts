import { Task } from "../models/task.model";
import { Op } from "sequelize";
import { ListResponse } from "./listResponse";

const TABLE_NAME = "tasks";

interface ITaskRepository {
    create(task: Task): Promise<Task>;
    getAll(searchParams: { title: string, text: string }): Promise<Task[]>;
    getAllWithCount(page: number, pageLimit: number): Promise<ListResponse<Task>>;
    getById(taskId: number): Promise<Task | null>;
    update(task: Task): Promise<number>;
    delete(taskId: number): Promise<number>;
}

class TaskRepository implements ITaskRepository {
    async create(task: Task): Promise<Task> {
        try {
            return await Task.create({
                userId: task.userId,
                title: task.title,
                text: task.text,
                imgUrl: task.imgUrl,
                score: task.score,
                taskType: task.taskType,
                answers: task.answers,
            } as Task);
        } catch (err) {
            console.log(JSON.stringify(err));
            throw new Error("Failed to create Task!");
        }
    }
    async getAll(searchParams?: { title: string; text: string; }): Promise<Task[]> {
        try {
            let condition: any = {};

            if (searchParams?.title)
                condition.title = { [Op.like]: `%${searchParams.title}%` };
            if (searchParams?.text)
                condition.text = { [Op.like]: `%${searchParams.text}%` };
            return await Task.findAll({ where: condition });
        } catch (error) {
            throw new Error("Failed to retrieve Task!");
        }
    }
    async getAllWithCount( page: number, pageLimit: number): Promise<ListResponse<Task>> {
        try {
            return await Task.findAndCountAll({ 
                offset: (page - 1)*pageLimit, 
                limit: pageLimit,
                order: [ ['id', 'DESC']],
                paranoid: true 
            });
        } catch (error) {
            throw new Error("Failed to retrieve Task!");
        }
    }
    async getById(taskId: number): Promise<Task | null> {
        try {
            return await Task.findByPk(taskId);
        } catch (error) {
            throw new Error("Failed to retrieve Task!");
        }
    }
    async update(task: Task): Promise<number> {
        const { id, title, taskType, text, imgUrl, answers } = task;

        try {
            const affectedRows = await Task.update(
                { title, taskType, text, imgUrl, answers  },
                { where: { id: id } }
            );

            return affectedRows[0];
        } catch (error) {
            throw new Error("Failed to update Task!");
        }
    }
    async delete(taskId: number): Promise<number> {
        try {
            const affectedRows = await Task.destroy({ where: { id: taskId } });

            return affectedRows;
        } catch (error) {
            throw new Error("Failed to delete Task!");
        }
    }
}

export default new TaskRepository();