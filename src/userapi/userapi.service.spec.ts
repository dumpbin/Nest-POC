import { Test, TestingModule } from '@nestjs/testing';
import { UserapiService } from './userapi.service';

describe('UserapiService', () => {
  let service: UserapiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserapiService],
    }).compile();

    service = module.get<UserapiService>(UserapiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
