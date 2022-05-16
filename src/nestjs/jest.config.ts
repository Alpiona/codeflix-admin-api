export default {
  displayName: {
    name: 'nestjs',
    color: 'magentaBright'
  },
  "moduleFileExtensions": [
    "js",
    "json",
    "ts"
  ],
  "rootDir": "src",
  "testRegex": ".*\\.spec\\.ts$",
  "transform": {
    "^.+\\.(t|j)s$": "ts-jest"
  },
  "collectCoverageFrom": [
    "**/*.(t|j)s"
  ],
  "coverageDirectory": "../coverage",
  "testEnvironment": "node",
  moduleNameMapper: {
    '@core/(.*)$': '<rootDir>/../../../node_modules/core/dist/$1'
  }
}