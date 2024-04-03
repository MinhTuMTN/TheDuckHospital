const initState = {
  users: [
    {
      id: 1,
      name: 'Eric',
    },
    {
      id: 2,
      name: 'Kei',
    },
  ],
};
const rootReducer = (state = initState, action: any) => {
  return state;
};

export default rootReducer;
