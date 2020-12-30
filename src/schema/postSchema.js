const createPostfile = {
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

    postType: {
      type: 'string',
    },
    description: {
      type: 'string',
    },
  },
  require: ['file', 'postType', 'description'],
};

const savePost = {
  properties: {
    post: {
      type: 'string',
    },
  },
  required: ['post'],
};

const unlikePost = {
  properties: {
    post: {
      type: 'string',
    },
  },
  required: ['post'],
};

module.exports = {
  createPostfile,
  savePost,
  unlikePost,
};
