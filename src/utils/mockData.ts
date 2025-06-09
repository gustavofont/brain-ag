export const farmMockData = {
  createFarmData: {
    name: 'Cambota Farm',
    city: 'Belem',
    state: 'Para',
    fieldSize: 20000,
    cultivableField: 7000,
    vegetationField: 5000,
    owner: 1,
  },

  createFarmDataWrong: {
    name: 'Cambota Farm',
    city: 'Belem',
    state: 'Para',
    fieldSize: 20000,
    cultivableField: 7000,
    vegetationField: 5000,
    ownerr: 1,
  },

  findAllMockResponse: [
    {
      id: 1,
      name: 'Venus Farm',
      city: 'Sao Paulo',
      state: 'Sao Paulo',
      fieldSize: 10000,
      cultivableField: 5000,
      vegetationField: 2000,
      owner: 1,
      createdAt: '2025-06-06T18:49:19.688Z',
      updatedAt: '2025-06-06T22:45:51.449Z',
    },
  ],

  findOneMockResponse: {
    id: 1,
    name: 'Venus Farm',
    city: 'Sao Paulo',
    state: 'Sao Paulo',
    fieldSize: 10000,
    cultivableField: 5000,
    vegetationField: 2000,
    owner: 1,
    createdAt: '2025-06-06T18:49:19.688Z',
    updatedAt: '2025-06-06T22:45:51.449Z',
  },

  findAllMockResponseDashboard: [
    {
      dataValues: {
        id: 1,
        name: 'Venus Farm',
        city: 'Sao Paulo',
        state: 'Sao Paulo',
        fieldSize: 10000,
        cultivableField: 5000,
        vegetationField: 2000,
        owner: 1,
        createdAt: '2025-06-06T18:49:19.688Z',
        updatedAt: '2025-06-06T22:45:51.449Z',
        harvests: [
          {
            dataValues: {
              id: 1,
              year: 2025,
              culture: 'Potato',
              farm: 1,
              createdAt: '2025-06-07T20:20:42.996Z',
              updatedAt: '2025-06-07T20:20:42.996Z',
            },
          },
          {
            dataValues: {
              id: 4,
              year: 2024,
              culture: 'Potato',
              farm: 1,
              createdAt: '2025-06-07T20:27:55.461Z',
              updatedAt: '2025-06-07T20:27:55.461Z',
            },
          },
          {
            dataValues: {
              id: 7,
              year: 2023,
              culture: 'Tomato',
              farm: 1,
              createdAt: '2025-06-07T20:28:24.429Z',
              updatedAt: '2025-06-07T20:28:24.429Z',
            },
          },
        ],
      },
    },
  ],
};

export const producerMockData = {
  createProducerData: {
    name: 'Sandro Goiano',
    cpfOrCnpj: '740.977.110-08',
  },

  createProducerDataWrong: {
    name: 'Sandro Goiano',
    cpfOrCnpjj: '740.977.110-08',
  },

  findAllMockResponse: [
    {
      id: 1,
      name: 'Juninho Capixaba',
      cpfOrCnpj: '12345678900',
      createdAt: '2025-06-06T12:17:22.289Z',
      updatedAt: '2025-06-06T19:14:34.498Z',
    },
  ],

  findOneMockResponse: {
    id: 1,
    name: 'Juninho Capixaba',
    cpfOrCnpj: '12345678900',
    createdAt: '2025-06-06T12:17:22.289Z',
    updatedAt: '2025-06-06T19:14:34.498Z',
  },
};

export const harvestMockData = {
  createHarvestData: {
    year: 2025,
    culture: 'potato',
    farm: 10,
  },

  createHarvestDataWrong: {
    year: 2025,
    culture: 'potato',
    farmm: 10,
  },

  findAllMockResponse: [
    {
      id: 1,
      year: 2025,
      culture: 'Potato',
      farm: 1,
      createdAt: '2025-06-07T17:20:42.996Z',
      updatedAt: '2025-06-07T17:20:42.996Z',
    },
  ],

  findOneMockResponse: {
    id: 1,
    year: 2025,
    culture: 'Potato',
    farm: 1,
    createdAt: '2025-06-07T17:20:42.996Z',
    updatedAt: '2025-06-07T17:20:42.996Z',
  },
};
