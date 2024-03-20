const config = {
  screens: {
    Home: {
      path: 'home',
    },
    PaymentResultScreen: {
      path: 'payment/:id',
      parse: {
        id: (id: string) => `${id}`,
      },
    },
  },
};

const linking = {
  prefixes: ['theduck://app'],
  config,
};

export default linking;
