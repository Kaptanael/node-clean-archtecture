import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { Types } from '../../di/types';
import { UserEntity } from '../../domain/entities/user.entity';
import { IUserRepository } from '../../domain/repositories/user.repository';
import { getErrorMessage } from '../../core/utils/error.utils';
import ResponseMessages from '../../core/utils/constants';
import logger from '../../core/utils/logger';


@injectable()
export default class UserController {
    constructor(
        @inject(Types.IUserRepository)
        private repository: IUserRepository
    ) { }

    getUsers = async (req: Request, res: Response) => {
        try {

            const users: UserEntity[] = await this.repository.findAll();

            if (users.length === 0) {
                return res.status(200).json({
                    success: true,
                    results: []
                });
            }

            //const responseUsers = users.map((user) => this.generateUserResponse(user));

            res.status(200).json({
                success: true,
                results: users

            });
        } catch (err) {
            const errorMessage = getErrorMessage(err);
            console.error(errorMessage);
            logger.appendErrorLog(req.originalUrl, errorMessage);

            return res.status(500).json({
                success: false,
                message: ResponseMessages.RES_MSG_AN_ERROR_OCCURRED_EN,
            });
        }
    }

    getUserById = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;

            const user = await this.repository.findById(id);

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: ResponseMessages.RES_MSG_USER_NOT_FOUND_EN,
                });
            }

            //const responseUsers = users.map((user) => this.generateUserResponse(user));

            res.status(200).json({
                success: true,
                user,
            })
        } catch (err) {
            const errorMessage = getErrorMessage(err);
            console.error(errorMessage);
            logger.appendErrorLog(req.originalUrl, errorMessage);

            return res.status(500).json({
                success: false,
                message: ResponseMessages.RES_MSG_AN_ERROR_OCCURRED_EN,
            });
        }
    }

    deleteUserById = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;

            const deleted = await this.repository.delete(id);

            res.status(200).json({
                success: true,
                message: ResponseMessages.RES_MSG_USER_DELETED_SUCCESSFULLY_EN,
            });
        } catch (err) {
            const errorMessage = getErrorMessage(err);
            console.error(errorMessage);
            logger.appendErrorLog(req.originalUrl, errorMessage);

            return res.status(500).json({
                success: false,
                message: ResponseMessages.RES_MSG_AN_ERROR_OCCURRED_EN,
            });
        }
    }

    createUser = async (req: Request, res: Response) => {
        try {
            const user = req.body as UserEntity;

            const createdUser = await this.repository.create(user);

            res.status(201).json({
                success: true,
                message: ResponseMessages.RES_MSG_USER_CREATED_SUCCESSFULLY_EN,
                user: createdUser
            });
        } catch (err) {
            const errorMessage = getErrorMessage(err);
            console.error(errorMessage);
            logger.appendErrorLog(req.originalUrl, errorMessage);

            return res.status(500).json({
                success: false,
                message: ResponseMessages.RES_MSG_AN_ERROR_OCCURRED_EN
            });
        }
    }

    updateUser = async (req: Request, res: Response) => {
        try {
            const user = req.body as UserEntity;
            const id = req.params.id;

            // // check if updated email exists
            // if (updates.email) {
            //     const exists = await this.repository.isExists(
            //         updates.email,
            //         undefined,
            //         id
            //     )

            //     if (exists) {
            //         return res.status(409).json({
            //             success: false,
            //             message: ResponseMessages.RES_MSG_USER_EMAIL_ALREADY_EXISTS_EN,
            //         })
            //     }
            // }

            const updatedUser = await this.repository.update(id, user);

            if (!updatedUser) {
                return res.status(404).json({
                    success: false,
                    message: ResponseMessages.RES_MSG_USER_NOT_FOUND_EN,
                });
            }

            res.status(201).json({
                success: true,
                message: ResponseMessages.RES_MSG_USER_UPDATED_SUCCESSFULLY_EN,
                user: updatedUser
            });
        } catch (err) {
            const errorMessage = getErrorMessage(err);
            console.error(errorMessage);
            logger.appendErrorLog(req.originalUrl, errorMessage);

            return res.status(500).json({
                success: false,
                message: ResponseMessages.RES_MSG_AN_ERROR_OCCURRED_EN,
            });
        }
    }

    private generateUserResponse = (user: UserEntity) => {
        return {
            ...user,
            password: undefined,
            otpCode: undefined,
            otpExpire: undefined,
        }
    }
}
