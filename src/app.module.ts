import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NinjaModule } from './ninja/ninja.module';

@Module({
  imports: [NinjaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
