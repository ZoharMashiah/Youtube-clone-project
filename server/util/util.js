function randomizeArray(arr) {
  len = arr.length;
  for (let i = len - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    let temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
  }
  return arr;
}

const validateBase64 = (base64Data, expectedType) => {
  const prefix = `data:${expectedType};base64,`;
  if (!base64Data.startsWith(prefix)) {
    throw new Error(`Invalid ${expectedType} data`);
  }
  return base64Data.slice(prefix.length);
};

export { randomizeArray, validateBase64 };
