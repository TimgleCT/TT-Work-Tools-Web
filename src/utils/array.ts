/**
 * 根據指定屬性取得物件陣列唯一值。
 *
 * @param {Array<{ [key: string]: any }>} 物件陣列。
 * @param {string} 屬性名稱。
 */
export const getUniqueObjArrayByProperty = <T extends { [key: string]: any }>(array: Array<T>, property: string): Array<T> => {
    const uniqueValues = new Set()
    const uniqueArray = array.filter((item) => {
        if (uniqueValues.has(item[property])) {
        return false;
        }
        uniqueValues.add(item[property])
        return true
    });
    return uniqueArray
}