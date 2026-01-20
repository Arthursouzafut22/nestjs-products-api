export class PasswordsAreNotEqualError extends Error {
  constructor() {
    super('Senha Invalida!');
    this.name = 'PasswordsAreNotEqualError';
  }
}
