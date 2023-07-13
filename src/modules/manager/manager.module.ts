import { Module } from '@nestjs/common';
import { ManagerService } from './manager.service';
import { ManagerController } from './manager.controller';

@Module({
  imports: [
    // ApiAuthModule
  ],
  providers: [ManagerService],
  controllers: [ManagerController],
  // exports: [ApiAuthModule]
})
export class ManagerModule { }
