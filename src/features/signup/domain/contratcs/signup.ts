import { UserAccount } from "../entities/user-account"

export interface Signup {
  execute(input: SignupInput): Promise<UserAccount>
}

export type SignupInput = {
  name: string
  email: string
  cpf: string
  password: string
  isPassenger: boolean
  isDriver: boolean
  carPlate?: string
}
