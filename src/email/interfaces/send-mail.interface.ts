export interface ISendMail {
  readonly html: string;

  readonly subject: string;

  readonly to: string;
}
