const Mutation = {
  createUser: async (parent, args, { User }, info) => {
    // console.log(args.data);
    // let user;
    return await User.create(args.data).then((u) => {
      // if (err) {
      //   console.log(err);
      //   // throw new Error("insert err");
      // } else {

      return u;
      // }
    });

    // console.log("user", user);
    // return args.data;
  },
  updateUserCourse: async (parent, args, { User }, info) => {
    return await User.updateOne(
      { id: args.data.id },
      { courses: args.data.courses }
    ).then((user) => {
      return user;
    }); // (err) => {
    //   if (err) {
    //     throw new Error("update err");
    //   }
    // });
  },
};

export { Mutation as default };
