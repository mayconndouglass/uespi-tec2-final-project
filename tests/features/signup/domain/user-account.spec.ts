import { UserAccount } from "../../../../src/features/signup/domain/entities/user-account";

describe("UserAccount", () => {
  it("should create a new UserAccount instance", () => {
    const sut = new UserAccount({
      name: "John Doe",
      email: "john.doe@example.com",
      cpf: "12345678900",
      isDriver: false,
      carPlate: "ABC123",
      passwordHash: "password",
    });

    expect(sut.props.name).toBe("John Doe");
    expect(sut.props.email).toBe("john.doe@example.com");
    expect(sut.props.cpf).toBe("12345678900");
    expect(sut.props.isDriver).toBe(false);
    expect(sut.props.carPlate).toBe("ABC123");
    expect(sut.props.passwordHash).toBe("password");
  });
});
