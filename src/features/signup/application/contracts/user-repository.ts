import { UserAccount } from "../../domain/entities/user-account";

export interface UserRepository {
  findUserByEmail(email: string): Promise<UserAccount | null>
}
