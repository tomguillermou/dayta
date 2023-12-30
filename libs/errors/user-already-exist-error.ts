export class EmailNotAvailablError extends Error {
  constructor() {
    super('Email not available');
  }
}
