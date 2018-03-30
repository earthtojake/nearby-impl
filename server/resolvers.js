const prepare = (o) => {
  o._id = o._id.toString()
  return o
}

const resolveFunctions = {
  RootQuery: {
    groups: async (_, { count }, ctx) => {
      const group = new ctx.constructor.Group();
      return await group.findTopGroups(count);
    },
    user: async (_, { _id }, ctx) => {
      const user = new ctx.constructor.User();
      return await user.findUser(_id);
    }
  },
  User: {
    group: async ({ group_id }, _,  ctx) => {
      const group = new ctx.constructor.Group();
      return (await group.findGroup(group_id));
    }
  },
  Group: {
    users: async ({user_ids}, _, ctx) => {
      const user = new ctx.constructor.User();
      return (await user.findUsers(user_ids));
    }
  }
};

module.exports = resolveFunctions;
