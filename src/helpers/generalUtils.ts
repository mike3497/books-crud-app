export const deepClone = <T>(obj: T): T => {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  const clonedObj = Array.isArray(obj) ? ([] as unknown as T) : ({} as T);

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      (clonedObj as Record<string | number | symbol, unknown>)[key] = deepClone(obj[key]);
    }
  }

  return clonedObj;
};
