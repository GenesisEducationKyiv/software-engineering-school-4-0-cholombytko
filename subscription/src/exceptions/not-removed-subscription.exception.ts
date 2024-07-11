import { HttpException, HttpStatus } from '@nestjs/common';

export class NotRemovedSubscriptionException extends HttpException {
  constructor() {
    super('Subscription not removed', HttpStatus.CONFLICT);
  }
}
