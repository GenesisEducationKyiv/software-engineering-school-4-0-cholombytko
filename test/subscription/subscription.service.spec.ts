import { Email } from '../../src/email/entities/email.entity';
import { IEmailService } from '../../src/email/interfaces/email-service.interface';
import { ICreateSubscription } from '../../src/subscription/interfaces/create-subscription.interface';
import { ISubscribeResult } from '../../src/subscription/interfaces/subscribe-response.interface';
import { ISubscriptionService } from '../../src/subscription/interfaces/subscription-service.interface';
import { SubscriptionService } from '../../src/subscription/subscription.service';

describe('SubscriptionService', () => {
  let subscriptionService: ISubscriptionService;
  let emailService: IEmailService;

  beforeEach(async () => {
    emailService = {
      create: jest.fn().mockImplementation(async (email: string) => {
        return { email: email, id: 1, isSubscribed: true } as Email;
      }),
      findAll: jest.fn().mockImplementation(async (isSubscribed: boolean) => {
        return [
          { email: 'test@example.com', id: 1, isSubscribed: isSubscribed },
        ];
      }),
    };
    subscriptionService = new SubscriptionService(emailService);
  });

  it('should create a subscription and return success message', async () => {
    const payload: ICreateSubscription = { email: 'test@example.com' };

    const result: ISubscribeResult =
      await subscriptionService.createSubscription(payload);

    expect(result).toEqual({ message: 'E-mail successfully subscribed' });
    expect(emailService.create).toHaveBeenCalledWith(payload.email);
  });
});
