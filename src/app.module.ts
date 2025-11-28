import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { UserModule } from './user/user.module';
import { ProfileModule } from './profile/profile.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [CommonModule, UserModule, ProfileModule, ChatModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
