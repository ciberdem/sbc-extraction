import { ApiExtractionModule } from './modules/extraction/extraction.module';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express/interfaces/nest-express-application.interface';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AllExceptionsFilter } from './filters/all-exceptions.filter';
import { ValidationPipe } from '@nestjs/common';
import { json } from 'body-parser';
import { join } from 'path';
import * as hbs from 'hbs';
import CustomHelpers from './helpers/hbs/hbsHelpers';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // API DOCS
  const options = new DocumentBuilder()
    .setTitle('Reiwa')
    .setDescription('The Reiwa API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options, {
    include: [
      ApiExtractionModule,
    ]
  });
  SwaggerModule.setup('api', app, document);

  //Limit 
  app.use(json({ limit: '50mb' }));
  // Validations
  app.useGlobalPipes(new ValidationPipe());
  // Cors
  app.enableCors();
  // Add filters
  app.useGlobalFilters(new AllExceptionsFilter())
  //VIEW - HBS
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');
  hbs.registerPartials(join(__dirname, '..', 'views/partials'));
  hbs.registerHelper('formatDate', CustomHelpers.formatDate);

  hbs.registerHelper('contains', function (array, value, options) {
    if (array && array.indexOf(value) !== -1) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  });

  // PORT
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
