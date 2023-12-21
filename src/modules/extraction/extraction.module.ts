import { Module } from '@nestjs/common';
import { ApiExtractionController } from './extraction.controller';
import { ExtractionService } from './extraction.service';
import { NestCrawlerModule } from 'nest-crawler';

@Module({
  imports: [
    NestCrawlerModule,
  ],
  providers: [ExtractionService],
  controllers: [ApiExtractionController],
  exports: [ExtractionService]
})
export class ApiExtractionModule { }
