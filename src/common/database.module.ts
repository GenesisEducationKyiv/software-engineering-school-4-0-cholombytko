import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const isTestEnv = configService.get<string>('NODE_ENV') === 'test';
        return {
          cli: {
            migrationsDir: 'src/migrations',
          },
          database: configService.get<string>(
            isTestEnv ? 'TEST_DB_NAME' : 'DB_NAME',
          ),
          entities: [`${__dirname}/**/*.entity{.ts,.js}`],
          host: configService.get<string>(
            isTestEnv ? 'TEST_DB_HOST' : 'DB_HOST',
          ),
          migrations: [`${__dirname}/../migrations/*.{ts,js}`],
          migrationsRun: true,
          password: configService.get<string>(
            isTestEnv ? 'TEST_DB_PASSWORD' : 'DB_PASSWORD',
          ),
          port: configService.get<number>(
            isTestEnv ? 'TEST_DB_PORT' : 'DB_PORT',
          ),
          synchronize: isTestEnv,
          type: 'postgres',
          username: configService.get<string>(
            isTestEnv ? 'TEST_DB_USER' : 'DB_USER',
          ),
        };
      },
    }),
  ],
})
export class DatabaseModule {}
