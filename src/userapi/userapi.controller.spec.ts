import { Test, TestingModule } from '@nestjs/testing';
import { UserapiController } from './userapi.controller';
import { UserapiService } from './userapi.service';

describe('UserapiController', () => {
  let controller: UserapiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserapiController],
      providers: [UserapiService],
    }).compile();

    controller = module.get<UserapiController>(UserapiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
