const isEmptyJson = function (json) {
  // console.log("isEmptyJson =>" + (Object.keys(json).length));

  const isEmpty = 
    json // 👈 null and undefined check
    && Object.keys(json).length === 0;
    // && Object.getPrototypeOf(json) === Object.prototype;
  
    // console.log("isEmptyJson.isEmpty =>" + isEmpty);

    return isEmpty;
};

const onErr = function (err) {
  console.log(err);

  return 1;
};

export default { isEmptyJson, onErr };
