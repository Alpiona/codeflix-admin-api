import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from '../../../categories/categories.controller';
import { CategoriesModule } from '../../../categories/categories.module';
import { ConfigModule } from '../../../config/config.module';
import { DatabaseModule } from '../../../database/database.module';

describe('CategoriesController Integration Tests', () => {
  let controller: CategoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(), DatabaseModule, CategoriesModule],
    }).compile();

    controller = module.get(CategoriesController);
  });

  it('xpto', () => {
    console.log(controller);
  });
});
