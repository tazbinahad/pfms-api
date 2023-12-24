export class ApplicationError extends Error {
  statusCode: number;
  error: Error | unknown;
  constructor(message: string, statusCode: number, error?: Error | unknown) {
    super(message);
    this.statusCode = statusCode;
    this.error = error;
  }
}
