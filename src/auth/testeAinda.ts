export interface UserServiceValidate {
  signIn(email: string, password: string): Promise<void>
}