import { Email } from '../../src/email/entities/email.entity';
import { ICreateSubscription } from '../../src/subscription/interfaces/create-subscription.interface';
import { ISubscribeResult } from '../../src/subscription/interfaces/subscribe-response.interface';
import { SubscriptionService } from '../../src/subscription/subscription.service';
import { Test, TestingModule } from '@nestjs/testing';
import { IEmailService } from 'src/email/interfaces/email-service.interface';

class MockEmailService implements IEmailService {
  async create(email: string): Promise<Email> {
    return { email: 'test@example.com', id: 1, isSubscribed: true };
  }

  // This is just implementation, not using in test
  async findAll(isSubscribed: boolean): Promise<Email[]> {
    return [{ email: 'test@example.com', id: 1, isSubscribed: true }];
  }
}

describe('SubscriptionService', () => {
  let subscriptionService: SubscriptionService;
  let emailService: IEmailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SubscriptionService,
        {
          provide: 'IEmailService',
          useClass: MockEmailService,
        },
      ],
    }).compile();

    subscriptionService = module.get<SubscriptionService>(SubscriptionService);
    emailService = module.get<IEmailService>('IEmailService');
  });

  it('should be defined', () => {
    expect(subscriptionService).toBeDefined();
  });

  describe('createSubscription', () => {
    it('should create a subscription and return success message', async () => {
      const payload: ICreateSubscription = { email: 'test@example.com' };

      const result: ISubscribeResult =
        await subscriptionService.createSubscription(payload);

      expect(result).toEqual({ message: 'E-mail successfully subscribed' });
      expect(emailService.create).toHaveBeenCalledWith(payload.email);
    });
  });
});
