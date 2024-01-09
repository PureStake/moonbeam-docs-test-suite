export default [
  {
    inputs: [
      {
        components: [
          {
            internalType: 'uint8',
            name: 'parents',
            type: 'uint8',
          },
          {
            internalType: 'bytes[]',
            name: 'interior',
            type: 'bytes[]',
          },
        ],
        internalType: 'struct XcmUtils.Multilocation',
        name: 'multilocation',
        type: 'tuple',
      },
    ],
    name: 'getUnitsPerSecond',
    outputs: [
      {
        internalType: 'uint256',
        name: 'unitsPerSecond',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'uint8',
            name: 'parents',
            type: 'uint8',
          },
          {
            internalType: 'bytes[]',
            name: 'interior',
            type: 'bytes[]',
          },
        ],
        internalType: 'struct XcmUtils.Multilocation',
        name: 'multilocation',
        type: 'tuple',
      },
    ],
    name: 'multilocationToAddress',
    outputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes',
        name: 'message',
        type: 'bytes',
      },
    ],
    name: 'weightMessage',
    outputs: [
      {
        internalType: 'uint64',
        name: 'weight',
        type: 'uint64',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes',
        name: 'message',
        type: 'bytes',
      },
      {
        internalType: 'uint64',
        name: 'maxWeight',
        type: 'uint64',
      },
    ],
    name: 'xcmExecute',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'uint8',
            name: 'parents',
            type: 'uint8',
          },
          {
            internalType: 'bytes[]',
            name: 'interior',
            type: 'bytes[]',
          },
        ],
        internalType: 'struct XcmUtils.Multilocation',
        name: 'dest',
        type: 'tuple',
      },
      {
        internalType: 'bytes',
        name: 'message',
        type: 'bytes',
      },
    ],
    name: 'xcmSend',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];
