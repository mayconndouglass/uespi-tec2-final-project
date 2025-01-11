import type { Config } from "jest";

const config: Config = {
  verbose: true,
  collectCoverageFrom: ["<rootDir>/src/**/*.ts"],
  coverageDirectory: "./coverage",
  coverageProvider: "babel",
  moduleNameMapper: {
    "@/tests/(.+)": "<rootDir>/tests/$1",
    "@/(.+)": "<rootDir>/src/$1",
  },
  roots: ["<rootDir>/src", "<rootDir>/tests"],
  testEnvironment: "jest-environment-node",
  transform: {
    "\\.ts$": "ts-jest",
  },
};

export default config;
