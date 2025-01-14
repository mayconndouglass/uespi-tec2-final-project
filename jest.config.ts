import type { Config } from "jest";

const config: Config = {
  verbose: true,
  collectCoverageFrom: ["<rootDir>/src/**/*.ts"],
  coverageDirectory: "./coverage",
  coverageProvider: "babel",
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/src/$1",       // Alvo direto para arquivos em `src`
    "@/tests/(.*)": "<rootDir>/tests/$1" // Alvo direto para arquivos em `tests`
  },
  roots: ["<rootDir>/src", "<rootDir>/tests"],
  testEnvironment: "jest-environment-node",
  transform: {
    "\\.ts$": "ts-jest",
  },
};

export default config;
