import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static/dist/serve-static.module';
import { join } from 'path';
import { ApiExtractionModule } from './api/extraction/extraction.module';
import { ManagerModule } from './modules/manager/manager.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    ApiExtractionModule,
    ManagerModule
  ],
})
export class AppModule { }
