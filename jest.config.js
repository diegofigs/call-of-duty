/** @type {import('@jest/types').Config.InitialOptions} */
export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ["./jest.setup.ts"],
};