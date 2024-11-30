/* eslint-disable require-jsdoc */
// eslint-disable-next-line valid-jsdoc
/**
 * Flattens an object and groups the keys into an array
 * @param {Record<string, any>} obj
 * @return {Record<string, any>} 
 * @ author Stéphane
 */
export function flattenAndGroupKeys(obj: Record<string, any>): Record<string, any> {
    const result: Record<string, any> = {};
  
    function recurse(current: Record<string, any>, parentKey?: string) {
      for (const key in current) {
        if (current.hasOwnProperty(key)) {
          const newKey = parentKey ? `${parentKey}_${key}` : key;
  
          if (typeof current[key] === 'object' && !Array.isArray(current[key])) {
            recurse(current[key], newKey); // Recurse into nested objects
          } else if (Array.isArray(current[key])) {
            result[newKey] = result[newKey] || [];
            result[newKey] = result[newKey].concat(current[key]);
          } else {
            result[newKey] = result[newKey] || [];
            result[newKey].push(current[key]);
          }
        }
      }
    }
  
    recurse(obj);
    return result;
  }
  


  /**
   * Flattens an object and groups the keys into an array
   * @param {Record<string, any>} obj
   * @return {Record<string, any>}
   * @author: Stéphane
   */

 export  type ResultType = {
    [key: string]: string | number | null | undefined | string[] | number[] | null[] | undefined[];
};
 
  export const splitKeys = (data: ResultType, keysToIgnore:string[]) => {
    const keys = Object.keys(data) as string[];
    const values = Object.values(data);
    // split all key over underscore and use last part as key, except if it is part of the list of keys to ignore
    for (let i = 0; i < keys.length; i++) {
      const split = keys[i].split('_');
      if (keysToIgnore.includes(keys[i])) {
        continue;
      }
      if (split.length > 1) {
        const lastPart = split[split.length - 1];
        if (lastPart === 'url') {
          // Combine the last part into 'Photo' key
          keys[i] = 'Photo';
        } else if (lastPart === 'Source') {
          keys[i] = lastPart.toLowerCase();
        } else {
          keys[i] = lastPart.charAt(0).toUpperCase() + lastPart.slice(1); // Capitalize the last part
        }
      }
    }
    // combine keys and values, if keys are the same then combine the values in an array
    const combined: any = {};
    for (let i = 0; i < keys.length; i++) {
      let key = keys[i];
      if (key.toLowerCase() === 'source') {
        key = 'source';
      }
      if (combined[key]) {
        if (Array.isArray(combined[key])) {
          combined[key].push(values[i]); // Push the value to the existing array
        } else {
          combined[key] = [combined[key], values[i]]; // Create an array with the existing value and the new value
        }
      } else {
        combined[key] = values[i];
      }
    }
    return combined;
};


export function normalizeTags(tags: any[]): string[] {
  if (!tags || tags.length === 0) return [];

  // Check if the first element is an object with a 'name' property
  if (tags[0].hasOwnProperty('name')) {
      // If so, map each object to its 'name' property
      return tags.map(tag => tag.name);
  }

  // If the tags are already strings, return them as is
  return tags;
}
