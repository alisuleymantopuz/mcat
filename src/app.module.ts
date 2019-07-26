import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service'; 
import { GenresModule } from './genres/genres.module';
import { CommonModule } from './common/common.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TerminusModule } from '@nestjs/terminus';
import { TerminusOptionsService } from './.infrastructure/terminus-options.service'; 
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [GenresModule, 
    CommonModule, 
    MongooseModule.forRoot('mongodb://localhost/movies-catalog'),
    TerminusModule.forRootAsync({
      useClass: TerminusOptionsService,
    }), 
    AuthModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
