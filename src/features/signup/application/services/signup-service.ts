import { Signup } from "../../domain/contracts/signup";
import { UserAccount } from "../../domain/entities/user-account";
import { UserRepository } from "../contracts/user-repository";
import { CarPlateIsRequiredError } from "../errors/car-plate-is-required-error";
import { EmailAlreadyExistsError } from "../errors/email-already-exists-error";
import { PassengerShouldNotHaveCarPlateError } from "../errors/passenger-should-not-have-car-plate-error";

export class SignupService implements Signup {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: SignupService.input): Promise<UserAccount> {
    const { password, ...restInput } = input;
    const user = new UserAccount({ ...restInput, passwordHash: password });

    if (user.props.isDriver && !user.props.carPlate) {
      throw new CarPlateIsRequiredError();
    }

    if (!user.props.isDriver && user.props.carPlate) {
      throw new PassengerShouldNotHaveCarPlateError();
    }

    const emailExists = await this.userRepository.findUserByEmail(
      user.props.email,
    );

    if (emailExists) {
      throw new EmailAlreadyExistsError();
    }

    await this.userRepository.register(user);

    return user;
  }
}

export namespace SignupService {
  export type input = {
    name: string;
    email: string;
    cpf: string;
    password: string;
    isDriver: boolean;
    carPlate?: string;
  };

  export type output = Promise<UserAccount>;
}
