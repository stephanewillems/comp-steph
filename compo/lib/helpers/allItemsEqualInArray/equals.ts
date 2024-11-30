export const allEqual = <T>(arr: T[]): boolean => {
    return arr.every(val => val === arr[0]);
}
