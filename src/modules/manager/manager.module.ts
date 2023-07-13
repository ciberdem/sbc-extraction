import { Module } from '@nestjs/common';
import { ManagerService } from './manager.service';
import { ManagerController } from './manager.controller';
import { ApiExtractionModule } from 'src/api/extraction/extraction.module';

@Module({
  imports: [
    ApiExtractionModule
  ],
  providers: [ManagerService],
  controllers: [ManagerController],
  // exports: [ApiAuthModule]
})
export class ManagerModule { }
