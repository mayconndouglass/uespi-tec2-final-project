import { randomUUID } from "node:crypto";

type UserAccountProps = {
  id: string;
  name: string;
  email: string;
  cpf: string;
  isDriver: boolean;
  carPlate?: string;
  passwordHash: string;
};

export class UserAccount {
  constructor(
    public readonly props: Omit<UserAccountProps, "id"> & { id?: string },
  ) {
    this.props.id = this.props.id || randomUUID();
  }
}
