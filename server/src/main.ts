import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfigService } from './config/app-config/app-config.service';
import { ClassSerializerInterceptor, Logger } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.enableCors();

    const appConfigService: AppConfigService = app.get(AppConfigService);
    const logger = new Logger();

    app.useGlobalInterceptors(
        new ClassSerializerInterceptor(app.get(Reflector)),
    );

    app.setGlobalPrefix('api');
    await app.listen(appConfigService.port, appConfigService.url);
    logger.log(`API running on port ${appConfigService.port}`);
}

bootstrap();
