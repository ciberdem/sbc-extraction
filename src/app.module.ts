import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static/dist/serve-static.module';
import { join } from 'path';
import { ApiExtractionModule } from './modules/extraction/extraction.module';
import { SearchModule } from './modules/manager/search.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    ApiExtractionModule,
    SearchModule
  ],
})
export class AppModule { }
