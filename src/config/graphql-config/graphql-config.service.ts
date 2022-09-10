import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GraphqlConfigService {
    constructor(private configService: ConfigService) {}

    get debug(): boolean {
        return this.configService.get<boolean>('graphql.debug', false);
    }

    get playground(): boolean {
        return this.configService.get<boolean>('graphql.playground', false);
    }
}
