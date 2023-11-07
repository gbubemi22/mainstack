// module.exports = {
//      preset: 'ts-jest',
//      testEnvironment: 'node',
//      testMatch: ['**/__tests__/**/*.test.ts'],
//      moduleFileExtensions: ['ts', 'js', 'json'],
//    };
   

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.[jt]s'],
  moduleFileExtensions: ['ts', 'js', 'json'],
};
