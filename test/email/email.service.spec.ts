import { Email } from '../../src/email/entities/email.entity';
import { ExistingEmailException } from '../../src/email/exceptions/existing-email.exception';
import { EmailService } from '../../src/email/services/email.service';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

const createEmail = (email: string, isSubscribed: boolean = true): Email => {
  return {
    email,
    id: Math.floor(Math.random() * 1000), // Mock ID
    isSubscribed,
  } as Email;
};

describe('EmailService', () => {
  let emailService: EmailService;
  let emailRepository: Repository<Email>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmailService,
        {
          provide: getRepositoryToken(Email),
          useClass: Repository,
        },
      ],
    }).compile();

    emailService = module.get<EmailService>(EmailService);
    emailRepository = module.get<Repository<Email>>(getRepositoryToken(Email));
  });

  describe('create', () => {
    it('should throw an ExistingEmailException if the email already exists', async () => {
      const email = 'test@example.com';
      jest
        .spyOn(emailRepository, 'findOne')
        .mockResolvedValueOnce(createEmail(email));

      await expect(emailService.create(email)).rejects.toThrow(
        ExistingEmailException,
      );
    });

    it('should save and return the new email if it does not exist', async () => {
      const email = 'test@example.com';
      const newEmail = createEmail(email);

      jest.spyOn(emailRepository, 'findOne').mockResolvedValueOnce(null);
      jest.spyOn(emailRepository, 'create').mockReturnValue(newEmail);
      jest.spyOn(emailRepository, 'save').mockResolvedValueOnce(newEmail);

      const result = await emailService.create(email);
      expect(result).toEqual(newEmail);
      expect(emailRepository.create).toHaveBeenCalledWith({ email });
      expect(emailRepository.save).toHaveBeenCalledWith(newEmail);
    });
  });

  describe('findAll', () => {
    it('should return all subscribed emails', async () => {
      const isSubscribed = true;
      const emailList = [
        createEmail('test1@example.com'),
        createEmail('test2@example.com'),
      ];

      jest.spyOn(emailRepository, 'find').mockResolvedValueOnce(emailList);

      const result = await emailService.findAll(isSubscribed);
      expect(result).toEqual(emailList);
      expect(emailRepository.find).toHaveBeenCalledWith({
        where: { isSubscribed },
      });
    });

    it('should return all unsubscribed emails', async () => {
      const isSubscribed = false;
      const emailList = [
        createEmail('test1@example.com', false),
        createEmail('test2@example.com', false),
      ];

      jest.spyOn(emailRepository, 'find').mockResolvedValueOnce(emailList);

      const result = await emailService.findAll(isSubscribed);
      expect(result).toEqual(emailList);
      expect(emailRepository.find).toHaveBeenCalledWith({
        where: { isSubscribed },
      });
    });
  });
});
