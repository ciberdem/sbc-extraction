import { Injectable } from '@nestjs/common';
import { ExtractionService } from 'src/api/extraction/extraction.service';
import { ExtractionDTO } from 'src/dto/models/extraction.dto';

@Injectable()
export class ManagerService {

    constructor(
        private readonly extractorService: ExtractionService,
    ) { }

    async searchBy(wordSearch: string): Promise<ExtractionDTO[]> {
        return this.extractorService.getAll(wordSearch)
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
