"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const extraction_module_1 = require("./api/extraction/extraction.module");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const all_exceptions_filter_1 = require("./filters/all-exceptions.filter");
const common_1 = require("@nestjs/common");
const body_parser_1 = require("body-parser");
const path_1 = require("path");
const hbs = require("hbs");
const helmet = require("helmet");
const session = require("express-session");
const flash = require("connect-flash");
const hbsHelpers_1 = require("./helpers/hbs/hbsHelpers");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const options = new swagger_1.DocumentBuilder()
        .setTitle('Reiwa')
        .setDescription('The Reiwa API description')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options, {
        include: [
            extraction_module_1.ApiExtractionModule,
        ]
    });
    swagger_1.SwaggerModule.setup('api', app, document);
    app.use(body_parser_1.json({ limit: '50mb' }));
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.enableCors();
    app.useGlobalFilters(new all_exceptions_filter_1.AllExceptionsFilter());
    app.useStaticAssets(path_1.join(__dirname, '..', 'public'));
    app.setBaseViewsDir(path_1.join(__dirname, '..', 'views'));
    app.setViewEngine('hbs');
    hbs.registerPartials(path_1.join(__dirname, '..', 'views/partials'));
    hbs.registerHelper('formatDate', hbsHelpers_1.default.formatDate);
    app.use(session({
        secret: 'AKSJNDKJSANDJ@#$%^&UYHGFDE$@R%TYHu3y12g3i87gbjuasd87g1ouj2v9ey',
        cookie: {
            maxAge: 86400000 * 7 * 12,
        }
    }));
    app.use(flash());
    app.use(helmet());
    await app.listen(process.env.PORT || 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map