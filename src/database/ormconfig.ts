import { ConfigModule } from '@nestjs/config';
import configuration from '../config/database-config/configuration';
import { DataSource } from 'typeorm';

ConfigModule.forRoot({
    isGlobal: true,
    load: [configuration],
});

export default new DataSource(configuration());
