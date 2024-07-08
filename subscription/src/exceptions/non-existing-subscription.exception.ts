import { HttpException, HttpStatus } from '@nestjs/common';

export class NonExistingSubscriptionException extends HttpException {
  constructor() {
    super('Subscription does not exists', HttpStatus.CONFLICT);
  }
}
