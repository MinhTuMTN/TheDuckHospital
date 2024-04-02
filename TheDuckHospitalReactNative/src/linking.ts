const config = {
  screens: {
    HomeScreen: {
      path: 'home',
    },
    PaymentResultScreen: {
      path: 'payment/:id',
      parse: {
        id: (id: string) => `${id}`,
      },
    },
    NotificationScreen: {
      path: 'notifications',
    },
  },
};

const linking = {
  prefixes: ['theduck://app'],
  config,
};

export default linking;
