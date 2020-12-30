const newEvent = {
  properties: {
    file: {
      type: 'object',
      allOf: [
        {
          type: 'object',
          properties: {
            path: {
              type: 'string',
            },
            fileName: {
              type: 'string',
            },
            publicId: {
              type: 'string',
            },
            secureUrl: {
              type: 'string',
            },
          },
          required: ['path', 'fileName', 'public', 'secureUrl'],
        },
      ],
    },
    name: {
      properties: 'string',
    },
    sport: {
      properties: 'string',
    },
    registrationType: {
      type: 'string',
    },
    startDate: {
      type: 'string',
    },
    endDate: {
      type: 'string',
    },
    registerTill: {
      type: 'string',
    },
    noOfPlayers: {
      type: 'string',
    },
    address: {
      type: 'string',
    },
    state: {
      type: 'string',
    },
    city: {
      type: 'string',
    },
    latitude: {
      type: 'string',
    },
    longitutde: {
      type: 'string',
    },

    description: {
      type: 'string',
    },
    winningPrice: {
      type: 'string',
    },
    fees: {
      type: 'string',
    },
  },
};

const editEvent = {
  properties: {
    file: {
      type: 'object',
      allOf: [
        {
          type: 'object',
          properties: {
            path: {
              type: 'string',
            },
            fileName: {
              type: 'string',
            },
            publicId: {
              type: 'string',
            },
            secureUrl: {
              type: 'string',
            },
          },
          required: ['path', 'fileName', 'public', 'secureUrl'],
        },
      ],
    },
    name: {
      properties: 'string',
    },
    sport: {
      properties: 'string',
    },
    registrationType: {
      type: 'string',
    },
    startDate: {
      type: 'string',
    },
    endDate: {
      type: 'string',
    },
    registerTill: {
      type: 'string',
    },
    noOfPlayers: {
      type: 'string',
    },
    address: {
      type: 'string',
    },
    state: {
      type: 'string',
    },
    city: {
      type: 'string',
    },
    latitude: {
      type: 'string',
    },
    longitutde: {
      type: 'string',
    },

    description: {
      type: 'string',
    },
    winningPrice: {
      type: 'string',
    },
    fees: {
      type: 'string',
    },
  },
};

module.exports = {
  newEvent,
  editEvent,
};
