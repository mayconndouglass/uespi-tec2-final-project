import { UserAccount } from "../../domain/entities/user-account";

interface LoadUserRepository {
  findUserByEmail(email: string): Promise<UserAccount | null>
}

export interface registerUserRepository {
  register(user: UserAccount): Promise<void>
}

export interface UserRepository extends LoadUserRepository, registerUserRepository {}
