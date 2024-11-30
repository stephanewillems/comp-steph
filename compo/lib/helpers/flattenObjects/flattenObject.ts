/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */



export type Module = {
    moduleName: string;
    modules: Array<{
        module: string;
        query: string;
        executedOn: string;
        results: any;
        source: string;
    }>;
};

type FlattenedResult = {
    moduleName: string;
    source: string;
    [key: string]: any;
};
/**
 * Flattens the data from the backend to a single array of objects
 * @param data The data from the backend
 * @return The flattened data
 */
export function flattenData(data: Module[]): FlattenedResult[] {
    const flattenedResults: FlattenedResult[] = [];
    data.forEach(item => {
        const moduleName = item.moduleName;
        item.modules.forEach(moduleItem => {
            const source = moduleItem.source;
            if (Array.isArray(moduleItem.results)) {
                moduleItem.results.forEach(result => {
                    const dynamicFields: FlattenedResult = {
                        moduleName,
                        source,
                    };
                    for (const key in result) {
                        if (result.hasOwnProperty(key)) {
                            dynamicFields[key] = result[key];
                        }
                    }
                    flattenedResults.push(dynamicFields);
                });
            } else {
                const dynamicFields: FlattenedResult = {
                    moduleName,
                    source,
                };
                for (const key in moduleItem.results) {
                    if (moduleItem.results.hasOwnProperty(key)) {
                        dynamicFields[key] = moduleItem.results[key];
                    }
                }
                flattenedResults.push(dynamicFields);
            }
        });
    });
    return flattenedResults;
}



export function flattenModules(obj: Record<string, any>, parentKey: string = ''): Record<string, any> {
    const result: Record<string, any> = {};

    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            const fullKey = parentKey ? `${parentKey}_${key}` : key;

            if (typeof obj[key] === 'object' && obj[key] !== null) {
                if (Array.isArray(obj[key])) {
                    // Iterate over each item in the array
                    obj[key].forEach((item:any, index:any) => {
                        if (typeof item === 'object' && item !== null) {
                            // Flatten the object within the array and integrate it into the result
                            const temp = flattenModules(item, `${fullKey}_${index}`);
                            for (const nestedKey in temp) {
                                if (Object.prototype.hasOwnProperty.call(temp, nestedKey)) {
                                    result[nestedKey] = temp[nestedKey];
                                }
                            }
                        } else {
                            // Directly assign non-object values
                            result[`${fullKey}_${index}`] = item;
                        }
                    });
                } else {
                    // Process nested object
                    const temp = flattenModules(obj[key], fullKey);
                    Object.assign(result, temp);
                }
            } else {
                // Directly assign the value if it's not an object
                result[fullKey] = obj[key];
            }
        }
    }

    return result;
}



export function groupByModuleName(flatData: Record<string, any>) {
    const groupedResult: Record<string, any> = {};

    Object.keys(flatData).forEach(key => {
        // Extract the moduleName index and the property name
        const match = key.match(/^(\d+)_moduleName$/);
        if (match) {
            const moduleNameIndex = match[1];
            const moduleName = flatData[key];

            // Initialize the module object if not already done
            groupedResult[moduleName] = groupedResult[moduleName] || {};

            // Iterate through all keys and add the relevant ones to the current module
            Object.keys(flatData).forEach(innerKey => {
                if (innerKey.startsWith(`${moduleNameIndex}_`)) {
                    // Remove the index and 'modules' from the key to get the property name
                    const propName = innerKey.replace(`${moduleNameIndex}_modules_0_`, '');
                    groupedResult[moduleName][propName] = flatData[innerKey];
                }
            });
        }
    });

    return groupedResult;
}


