import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        cli: {
          migrationDir: 'src/migrations',
        },
        database: configService.get<string>('DB_NAME'),
        entities: [`${__dirname}/**/entities/*.entity.{ts,js}`],
        host: configService.get<string>('DB_HOST'),
        migrations: [`${__dirname}/../migrations/*.{ts,js}`],
        migrationsRun: true,
        password: configService.get<string>('DB_PASSWORD'),
        port: configService.get<number>('DB_PORT'),
        synchronize: false,
        type: 'postgres',
        username: configService.get<string>('DB_USER'),
      }),
    }),
  ],
})
export class DatabaseModule {}
