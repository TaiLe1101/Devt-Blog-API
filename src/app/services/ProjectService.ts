import { CODE, __PROD__ } from '../../constant';
import { responseData } from '../../helpers';
import logger from '../../helpers/logger';
import { FileUpload } from '../../types/FileUpload';
import ThrowResponse from '../../types/ThrowResponse';
import ProjectRepository from '../repositories/ProjectRepository';

class ProjectService {
    async getAllProjects() {
        try {
            const projects = await ProjectRepository.getAll();

            if (!projects) {
                throw responseData(null, 'Get Failed', CODE.BAD_REQUEST, true);
            }

            return projects;
        } catch (error) {
            const err = error as ThrowResponse;
            if (err.status) {
                throw err;
            }

            if (!__PROD__) logger.error(err.message);
            throw responseData(err.data, 'Server', CODE.SERVER, true);
        }
    }

    async createProject(
        title: string,
        thumbnailFile: FileUpload,
        categoryId: number
    ) {
        try {
            let thumbnail: string | null = null;

            if (thumbnailFile) {
                thumbnail = `${process.env.DOMAIN_ENV}/uploads/projects/${thumbnailFile.filename}`;
            } else {
                thumbnail = `${process.env.DOMAIN_ENV}/default/images/no-image-pro.png`;
            }

            const projectResult = await ProjectRepository.create(
                title,
                thumbnail,
                categoryId
            );

            if (!projectResult) {
                throw responseData(
                    null,
                    'Create Failed',
                    CODE.BAD_REQUEST,
                    true
                );
            }

            return projectResult;
        } catch (error) {
            const err = error as ThrowResponse;
            if (err.status) {
                throw err;
            }

            if (!__PROD__) logger.error(err.message);
            throw responseData(err.data, 'Server', CODE.SERVER, true);
        }
    }
}

export default new ProjectService();
