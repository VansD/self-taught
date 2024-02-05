import { User } from "../models/user.model";
import { Op } from "sequelize";
import { ListResponse } from "./listResponse";

const TABLE_NAME = "users";



interface IUserRepository {
    create(user: User): Promise<User>;
    getAll(searchParams: { lastName: string, firstName: string }): Promise<User[]>;
    getAllWithCount(page: number, pageLimit: number): Promise<ListResponse<User>>;
    getById(userId: number): Promise<User | null>;
    update(user: User): Promise<number>;
    delete(userId: number): Promise<number>;
}

class UserRepository implements IUserRepository {
    async create(user: User): Promise<User> {
        try {
            return await User.create({
                firstName: user.firstName,
                lastName: user.lastName,
                middleName: user.middleName,
                grade: user.grade,
                role: user.role
            } as User);
        } catch (err) {
            throw new Error("Failed to create User!");
        }
    }
    async getAll(searchParams?: { lastName: string; firstName: string; }): Promise<User[]> {
        try {
            let condition: any = {};

            if (searchParams?.lastName)
                condition.lastName = { [Op.like]: `%${searchParams.lastName}%` };
            return await User.findAll({ 
                offset: 5, 
                limit: 5,
                order: [ ['full_name', 'DESC']], 
                where: condition });
        } catch (error) {
            throw new Error("Failed to retrieve Tutorials!");
        }
    }
    async getAllWithCount( page: number, pageLimit: number): Promise<ListResponse<User>> {
        try {
            return await User.findAndCountAll({ 
                offset: (page - 1)*pageLimit, 
                limit: pageLimit,
                order: [ ['id', 'DESC']],
                paranoid: true 
            });
        } catch (error) {
            console.log(`Page: ${page}, Limit: ${pageLimit}`)
            console.log(JSON.stringify(error))
            throw new Error("Failed to retrieve Tutorials!");
        }
    }
    async getById(userId: number): Promise<User | null> {
        try {
            return await User.findByPk(userId);
        } catch (error) {
            throw new Error("Failed to retrieve User!");
        }
    }
    async update(user: User): Promise<number> {
        const { id, firstName, lastName, middleName, role, grade } = user;

        try {
            const affectedRows = await User.update(
                { firstName, lastName, middleName, role, grade },
                { where: { id: id } }
            );

            return affectedRows[0];
        } catch (error) {
            throw new Error("Failed to update User!");
        }
    }
    async delete(userId: number): Promise<number> {
        try {
            const affectedRows = await User.destroy({ where: { id: userId } });
        
            return affectedRows;
          } catch (error) {
            throw new Error("Failed to delete User!");
          }
    }
}

export default new UserRepository();