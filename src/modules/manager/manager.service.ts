import { Injectable } from '@nestjs/common';
import { ExtractionDTO } from 'src/dto/models/extraction.dto';

@Injectable()
export class ManagerService {

    async searchBy(wordSearch: string): Promise<ExtractionDTO[]> {
        return [
            {
                title: "title",
                year: 'year',
                authors: 'authors',
                abstract: 'abstract'
            }
        ]
    }

    // async create(managerDto: CreateManagerDTO) {
    //     return this.managersModel.create(managerDto);
    // }

    // async findBy(userId: string) {
    //     return this.managersModel.findOne({ userId });
    // }

    // async updateToken(manager: Manager, token: string): Promise<Manager> {
    //     manager.token = token;
    //     return await manager.save();
    // }
}
