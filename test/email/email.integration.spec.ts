import { DatabaseModule } from '../../src/database.module';
import { Email } from '../../src/email/entities/email.entity';
import { ExistingEmailException } from '../../src/email/exceptions/existing-email.exception';
import { EmailService } from '../../src/email/services/email.service';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { IEmailService } from 'src/email/interfaces/email-service.interface';
import { Repository } from 'typeorm';

describe('EmailService', () => {
  let service: IEmailService;
  let repository: Repository<Email>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [
        {
          provide: getRepositoryToken(Email),
          useClass: Repository,
        },
      ],
    }).compile();

    repository = module.get(getRepositoryToken(Email));
    service = new EmailService(repository);
  });

  beforeEach(async () => {
    await repository.clear();
  });

  afterAll(async () => {
    await repository.clear();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new email', async () => {
    const email = 'test@example.com';
    const result = await service.create(email);

    expect(result).toBeDefined();
    expect(result.email).toBe(email);

    const foundEmail = await repository.findOne({ where: { email } });
    expect(foundEmail).toBeDefined();
    expect(foundEmail.email).toBe(email);
  });

  it('should not create an existing email', async () => {
    const email = 'test@example.com';
    await service.create(email);

    await expect(service.create(email)).rejects.toThrow(ExistingEmailException);
  });

  it('should find all subscribed emails', async () => {
    const email1 = await repository.save({
      email: 'test1@example.com',
      isSubscribed: true,
    });
    const email2 = await repository.save({
      email: 'test2@example.com',
      isSubscribed: false,
    });

    const subscribedEmails = await service.findAll(true);

    expect(subscribedEmails).toHaveLength(1);
    expect(subscribedEmails[0].email).toBe(email1.email);
  });

  it('should find all unsubscribed emails', async () => {
    const email1 = await repository.save({
      email: 'test1@example.com',
      isSubscribed: true,
    });
    const email2 = await repository.save({
      email: 'test2@example.com',
      isSubscribed: false,
    });

    const unsubscribedEmails = await service.findAll(false);

    expect(unsubscribedEmails).toHaveLength(1);
    expect(unsubscribedEmails[0].email).toBe(email2.email);
  });
});
