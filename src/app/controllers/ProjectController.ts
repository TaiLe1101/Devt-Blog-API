import { Request, Response } from 'express';
import { responseData } from '../../helpers';
import ThrowResponse from '../../types/ThrowResponse';
import ProjectService from '../services/ProjectService';
import { CODE } from '../../constant';
import { validateValues } from '../../validators';

class ProjectController {
    async index(req: Request, res: Response) {
        try {
            const projects = await ProjectService.getAllProjects();
            return res
                .status(CODE.SUCCESS)
                .json(responseData(projects, 'Get Success'));
        } catch (error) {
            const err = error as ThrowResponse;
            return res
                .status(err.status)
                .json(
                    responseData(err.data, err.message, err.status, err.error)
                );
        }
    }

    async create(req: Request, res: Response) {
        const title = req.body.title as string;
        const thumbnailFile = req.file;
        const categoryId = Number(req.body.categoryId);
        try {
            if (
                validateValues([title, categoryId], { unPositiveNumber: true })
            ) {
                return res
                    .status(CODE.BAD_REQUEST)
                    .json(
                        responseData(
                            null,
                            'Value is valid',
                            CODE.BAD_REQUEST,
                            true
                        )
                    );
            }

            const projects = await ProjectService.createProject(
                title,
                thumbnailFile,
                categoryId
            );

            return res
                .status(CODE.SUCCESS)
                .json(responseData(projects, 'Get Success'));
        } catch (error) {
            const err = error as ThrowResponse;
            return res
                .status(err.status)
                .json(
                    responseData(err.data, err.message, err.status, err.error)
                );
        }
    }
}

export default new ProjectController();
