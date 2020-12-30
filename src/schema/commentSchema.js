const addPostComment = {
  properties: {
    post: {
      type: 'string',
    },
    comment: {
      type: 'string',
    },
  },
  required: ['post', 'comment'],
};

const deleteComment = {
  properties: {
    id: {
      type: 'string',
    },
  },
};

const getPostComment = {
  properties: {
    post: {
      type: 'string',
    },
  },
};

const getCommentLikes = {
  properties: {
    post: {
      type: 'string',
    },
    comment: {
      type: 'string',
    },
  },
};

const likeComment = {
  properties: {
    post: {
      type: 'string',
    },
    comment: {
      type: 'string',
    },
  },
};

const unlikeComment = {
  properties: {
    post: {
      type: 'string',
    },
    comment: {
      type: 'string',
    },
  },
};

const addPostCommentReply = {
  properties: {
    post: {
      type: 'string',
    },
    comment: {
      type: 'string',
    },
    replyComment: {
      type: 'string',
    },
  },
};

const deletePostCommentReply = {
  properties: {
    id: {
      type: 'string',
    },
  },
};

const getPostReplyComments = {
  properties: {
    post: {
      type: 'string',
    },
    comment: {
      type: 'string',
    },
  },
};

const getPostReplyComments = {
  properties: {
    post: {
      type: 'string',
    },
    comment: {
      type: 'string',
    },
  },
};

const getReplyCommentLikes = {
  properties: {
    post: {
      type: 'string',
    },
    comment: {
      type: 'string',
    },
    replyComment: {
      type: 'string',
    },
  },
};

const likeReplyComment = {
  properties: {
    post: {
      type: 'string',
    },
    comment: {
      type: 'string',
    },
    replyComment: {
      type: 'string',
    },
  },
};

const unlikeReplyComment = {
  properties: {
    post: {
      type: 'string',
    },
    comment: {
      type: 'string',
    },
    replyComment: {
      type: 'string',
    },
  },
};

module.exports = {
  addPostComment,
  deleteComment,
  getPostComment,
  getCommentLikes,
  likeComment,
  unlikeComment,
  addPostCommentReply,
  deletePostCommentReply,
  getPostReplyComments,
  getReplyCommentLikes,
  likeReplyComment,
  unlikeReplyComment,
};
