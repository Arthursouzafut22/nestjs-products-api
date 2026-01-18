export class UsersEmailExistsError extends Error {
  constructor() {
    super('Este e-mail já está cadastrado no sistema.');
    this.name = 'UsersEmailExistsError';
  }
}
