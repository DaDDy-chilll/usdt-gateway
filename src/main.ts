import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as express from 'express';
import * as swaggerUiDist from 'swagger-ui-dist';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Enable CORS for Vercel
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('USDT Gateway API')
    .setDescription('API documentation for USDT Gateway service')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // Serve Swagger UI with the correct base path
  const swaggerUiAssetPath = swaggerUiDist.getAbsoluteFSPath();
  app.use(
    '/api/swagger-ui-assets',
    express.static(swaggerUiAssetPath, { index: false }),
  );

  SwaggerModule.setup('api', app, document, {
    customSiteTitle: 'USDT Gateway API',
    customCss: `
      .swagger-ui .topbar { display: none }
      .swagger-ui .info { margin: 20px 0 }
    `,
    customJs: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.js',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.js',
    ],
    customCssUrl:
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.css',
  });

  await app.listen(process.env.PORT || 3000);
  console.log(
    `Application is running on: http://localhost:${process.env.PORT || 3000}`,
  );
  console.log(
    `Swagger UI is available at: http://localhost:${process.env.PORT || 3000}/api`,
  );
}

bootstrap();
