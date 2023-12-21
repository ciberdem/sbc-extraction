import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { ApiExtractionModule } from 'src/modules/extraction/extraction.module';

@Module({
  imports: [ApiExtractionModule],
  providers: [SearchService],
  controllers: [SearchController]
})
export class SearchModule { }
