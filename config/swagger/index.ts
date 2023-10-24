import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export default class SwaggerConfig {
  async set(app: any) {
    const options = new DocumentBuilder()
      .setTitle('Event Manager')
      .setDescription(
        'A fictional event management application organizes events in categories. The categories are organized as a tree with infinite depth, that can be manipulated by the application administrators. Each tree node, a category, contains a unique numeric identifier (id), as well as a string label (the category name). Each tree node may contain 0 or N descending nodes.',
      )
      .setVersion('1.0')
      .addTag('Event Manager')
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);
  }
}
