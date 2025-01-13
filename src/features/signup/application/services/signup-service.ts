import { Signup } from "../../domain/contratcs/signup"
import { UserAccount } from "../../domain/user-account"
import { CarPlateIsRequiredError } from "../errors/car-plate-is-required-error"
import { PassengerShouldNotHaveCarPlateError } from "../errors/passenger-should-not-have-car-plate-error"

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

    if (user.isDriver && !user.carPlate) {
      throw new CarPlateIsRequiredError()
    }

    if (!user.isDriver && user.carPlate) {
      throw new PassengerShouldNotHaveCarPlateError()
    }

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
