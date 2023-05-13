import Project from '../../database/models/Projects';

class ProjectsRepository {
    async getAll() {
        const data = await Project.findAll();

        return data;
    }

    async create(title: string, thumbnail: string | null, categoryId: number) {
        const result = await Project.create({
            title,
            thumbnail,
            categoryId,
        });

        return result;
    }
}

export default new ProjectsRepository();
