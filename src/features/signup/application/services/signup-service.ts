import { Signup } from "@/features/signup/domain/contracts/signup";
import { UserAccount } from "../../domain/entities/user-account";
import { Encrypter } from "../contracts/encrypter";
import { UserRepository } from "../contracts/user-repository";
import { CarPlateIsRequiredError } from "../errors/car-plate-is-required-error";
import { EmailAlreadyExistsError } from "../errors/email-already-exists-error";
import { PassengerShouldNotHaveCarPlateError } from "../errors/passenger-should-not-have-car-plate-error";

export class SignupService implements Signup {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly encrypter: Encrypter
  ) {}

  async execute(input: SignupService.input): SignupService.output {
    const { password, ...restInput } = input;

    if (input.isDriver && !input.carPlate) {
      throw new CarPlateIsRequiredError();
    }

    if (!input.isDriver && input.carPlate) {
      throw new PassengerShouldNotHaveCarPlateError();
    }

    const userWithSameEmail = await this.userRepository.findUserByEmail(
      input.email,
    );

    if (userWithSameEmail) {
      throw new EmailAlreadyExistsError();
    }

    const passwordHash = await this.encrypter.encrypt(input.password);
    
    const user = new UserAccount({ ...restInput, passwordHash });

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
