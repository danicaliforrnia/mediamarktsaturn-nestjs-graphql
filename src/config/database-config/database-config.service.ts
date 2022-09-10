import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DatabaseConfigService {
    constructor(private configService: ConfigService) {}

    get host(): string {
        return this.configService.get<string>('database.host', 'localhost');
    }

    get port(): number {
        return +this.configService.get<number>('database.port', 5432);
    }

    get name(): string {
        return this.configService.get<string>('database.name');
    }

    get username(): string {
        return this.configService.get<string>('database.username');
    }

    get password(): string {
        return this.configService.get<string>('database.password');
    }

    get logging(): boolean {
        return (
            this.configService.get<string>('database.logging', 'false') ===
            'true'
        );
    }

    get logger(): string {
        return this.configService.get<string>(
            'database.logger',
            'advanced-console',
        );
    }
}
