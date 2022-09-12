import { Test, TestingModule } from '@nestjs/testing';
import { AppConfigService } from './app-config.service';

describe('AppConfigService', () => {
    let service: AppConfigService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AppConfigService],
        }).compile();

        service = module.get<AppConfigService>(AppConfigService);
    });

    it('envs should be defined', () => {
        expect(service).toBeDefined();
        expect(service.name).toBeDefined();
        expect(service.url).toBeDefined();
        expect(service.port).toBeDefined();
        expect(service.env).toBeDefined();
    });
});
