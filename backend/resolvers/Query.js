const Query = {
  checkUser(parent, args, { User }, info) {
    return async () => {
      return await User.find(args.query);
    };
  },
  getCourses: async (parent, args, { Course }, info) => {
    let constrain = args.filter;
    // console.log("constrain: ", constrain);
    let filter = {};
    for (let i = 0; i < Object.keys(constrain).length; i++) {
      let key = Object.keys(constrain)[i];
      if (key.match(/time.*/)) {
        filter[key] = {
          $not: { $regex: constrain[key] },
        };
      } else {
        filter[key] = {
          $regex: constrain[key],
        };
      }
    }
    // console.log("filter: ", filter);
    let result = await Course.find(filter);
    console.log("result: ", result);
    // console.log("fetch");
    return result;
  },
};

export { Query as default };
