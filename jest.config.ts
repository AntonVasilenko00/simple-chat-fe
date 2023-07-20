export default {
	testEnvironment: 'jsdom',
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/src/$1',
	},
	transform: {
		'^.+\\.tsx?$': 'ts-jest',
	},
	testPathIgnorePatterns: ['cypress'],
	setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
}
