export class CarPlateIsRequiredError extends Error {
  constructor() {
    super('Car plate is required for drivers')
  }
}
