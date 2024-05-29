import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { json } from 'body-parser';
import { join } from 'path';
import * as hbs from 'hbs';
import * as helmet from 'helmet';
import * as session from 'express-session';
import flash = require('connect-flash');
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
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  // Limit 
  app.use(json({ limit: '50mb' }));
  
  // Validations
  app.useGlobalPipes(new ValidationPipe());

  // Serve static assets from the 'public' directory
  app.useStaticAssets(join(__dirname, '..', 'public'));
  
  // View engine setup
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

  // Helmet for security headers
  app.use(helmet({ contentSecurityPolicy: false }));

  // Start the application
  await app.listen(process.env.PORT || 3001);
}
bootstrap();
