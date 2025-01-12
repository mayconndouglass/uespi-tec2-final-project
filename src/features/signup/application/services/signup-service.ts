export class SignupService {
  execute(input: SignupService.input): void { }
}

namespace SignupService {
  export type input = {
    name: string
    email: string
    cpf: string
    password: string
    isPassenger: boolean
    isDriver: boolean
    carPlate?: string
  }
  
  export type output = void
}
