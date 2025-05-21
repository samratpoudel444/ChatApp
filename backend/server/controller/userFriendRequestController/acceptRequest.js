

const acceptRequest = async () => {
  try {  
  } catch (err) {
    console.log(err);
    return next({
      code: err.code || 500,
      messaage: err.message || "Internal Server Error",
    });
  }
};