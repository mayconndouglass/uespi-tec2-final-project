import { randomUUID } from 'node:crypto'

export class UserAccount {
  public readonly id: string;

  constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly cpf: string,
    public readonly isPassenger: boolean,
    public readonly isDriver: boolean,
    public readonly carPlate?: string,
    id?: string
  ) {
    this.id = id ?? randomUUID()
    this.name = name
    this.email = email
    this.cpf = cpf
    this.isPassenger = isPassenger
    this.isDriver = isDriver
    this.carPlate = carPlate
  }
}
