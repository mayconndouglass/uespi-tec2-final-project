export class UserAccount {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: string,
    public readonly cpf: string,
    public readonly isPassenger: boolean,
    public readonly isDriver: boolean,
    public readonly carPlate?: string
  ) {}
}
