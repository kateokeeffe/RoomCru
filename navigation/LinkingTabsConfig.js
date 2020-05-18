import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    Root: {
      path: 'tab',
      screens: {
        Matches: 'matches',
        Profile: 'profile',
      },
    },
  },
};
