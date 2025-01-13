import { Signup } from "../../domain/contracts/signup"
import { UserAccount } from "../../domain/entities/user-account"
import { UserRepository } from "../contracts/user-repository"
import { CarPlateIsRequiredError } from "../errors/car-plate-is-required-error"
import { PassengerShouldNotHaveCarPlateError } from "../errors/passenger-should-not-have-car-plate-error"

export class SignupService implements Signup {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: SignupService.input): Promise<UserAccount> {
    const user = new UserAccount({
      name: input.name,
      email: input.email,
      cpf: input.cpf,
      isDriver: input.isDriver,
      carPlate: input.carPlate,
    })

    if (user.props.isDriver && !user.props.carPlate) {
      throw new CarPlateIsRequiredError()
    }

    if (!user.props.isDriver && user.props.carPlate) {
      throw new PassengerShouldNotHaveCarPlateError()
    }

    await this.userRepository.findUserByEmail(input.email)

    return user
  }
}

export namespace SignupService {
  export type input = {
    name: string
    email: string
    cpf: string
    password: string
    isDriver: boolean
    carPlate?: string
  }
  
  export type output = Promise<UserAccount>
}
