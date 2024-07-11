import { Email } from './entities/email.entity';
import { ExistingEmailException } from './exceptions/existing-email.exception';
import { NonExistingSubscriptionException } from './exceptions/non-existing-subscription.exception';
import { NotRemovedSubscriptionException } from './exceptions/not-removed-subscription.exception';
import { ICreateSubscription } from './interfaces/create-subscription.interface';
import { IRemoveSubscription } from './interfaces/remove-subscription.interface';
import { ISubscriptionService } from './interfaces/subscription-service.interface';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AppService implements ISubscriptionService {
  constructor(
    @InjectRepository(Email)
    private readonly emailRepository: Repository<Email>,
  ) {}

  public async createSubscription(
    payload: ICreateSubscription,
  ): Promise<Email> {
    const existingEmail = await this.emailRepository.findOne({
      where: { email: payload.email },
    });

    if (existingEmail) {
      throw new ExistingEmailException();
    }

    const newEmail = this.emailRepository.create({ email: payload.email });
    await this.emailRepository.save(newEmail);
    return newEmail;
  }

  public async removeSubscription(
    payload: IRemoveSubscription,
  ): Promise<boolean> {
    const existingEmail = await this.emailRepository.findOne({
      where: { email: payload.email },
    });

    if (!existingEmail || !existingEmail.isSubscribed) {
      throw new NonExistingSubscriptionException();
    }

    const result = await this.emailRepository.update(
      { email: payload.email },
      { isSubscribed: false },
    );

    const isUpdated = result.affected > 0;

    if (!isUpdated) {
      throw new NotRemovedSubscriptionException();
    }

    return isUpdated;
  }

  public async findAllSubscribers(): Promise<Email[]> {
    const emails = await this.emailRepository.find({
      where: { isSubscribed: true },
    });
    return emails;
  }
}
