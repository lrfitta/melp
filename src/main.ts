import { NestFactory } from '@nestjs/core';
import { HttpExceptionFilter } from './exception/exception.filter';
import { MelpModule } from './melp.module';
import { Utils } from './util/utils';

const PORT = Utils.toInt(process.env.PORT || '8081');

async function bootstrap() {
  const app = await NestFactory.create(MelpModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(PORT);
}
bootstrap();
