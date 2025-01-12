import { Signup } from "../../domain/contratcs/signup"
import { UserAccount } from "../../domain/user-account"

export class SignupService implements Signup {
  async execute(input: SignupService.input): Promise<UserAccount> {
    const user = new UserAccount(
      input.name,
      input.email,
      input.cpf,
      input.isPassenger,
      input.isDriver,
      input.carPlate,
    )

    return user
  }
}

export namespace SignupService {
  export type input = {
    name: string
    email: string
    cpf: string
    password: string
    isPassenger: boolean
    isDriver: boolean
    carPlate?: string
  }
  
  export type output = Promise<UserAccount>
}
