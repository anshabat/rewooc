import type {Config} from '@jest/types';

const config: Config.InitialOptions = {
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
}

export default config;