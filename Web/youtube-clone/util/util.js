const validateBase64 = (base64Data, expectedType) => {
  const prefix = `data:${expectedType};base64,`;
  if (!base64Data.startsWith(prefix)) {
    throw new Error(`Invalid ${expectedType} data`);
  }
  return base64Data.slice(prefix.length);
};

module.exports = { validateBase64 };
