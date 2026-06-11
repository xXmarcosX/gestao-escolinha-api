// exception-response.dto.ts
export class ExceptionResponse {
  messages: string[];
  status: number;
  date: Date;

  constructor(messages: string[], status: number) {
    this.messages = messages;
    this.status = status;
    this.date = new Date();
  }
}