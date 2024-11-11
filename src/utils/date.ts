/**
 * 判斷輸入的日期字串是否是當月日期。
 *
 * @param {string} dateString - 日期字串，格式為 'YYYY-MM-DD'。
 * @returns {boolean} - 是否是當月日期。
 */
export const isCurrentMonth = (dateString: string): boolean => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const date = new Date(dateString);
  const month = date.getMonth();
  const year = date.getFullYear();

  return year === currentYear && month === currentMonth;
}

/**
 * 將日期字串陣列統整成年月陣列（沒有重複值）。
 *
 * @param {string[]} dateArray - 日期字串陣列，格式為 'YYYY-MM-DD'。
 * @returns {string[]} - 年月陣列，格式為 'YYYY-MM'。
 */
export const getUniqueYearMonths = (dateArray: string[]): string[] =>  {
  const yearMonths: Set<string> = new Set();

  dateArray.forEach((dateString) => {
    if (dateString) {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = date.getMonth() + 1; // 月份從 0 開始，所以加 1
      const yearMonth = `${year}-${month.toString().padStart(2, '0')}`;
      yearMonths.add(yearMonth);
    }
  });

  return Array.from(yearMonths);
}

/**
 * 判斷字串是否是如 'YYYY-MM' 格式的日期字串。
 *
 * @param {string} dateString - 日期字串。
 * @returns {boolean} - 是否是日期字串。
 */
export const isYearMonthString = (dateString: string): boolean => {
  const regex = /^\d{4}-\d{2}$/;
  return regex.test(dateString);
}

/**
 * 將時間戳轉換為指定格式的日期時間字串。
 *
 * @param {number} timeStamp - 時間戳。
 * @param {string} [format='YYYY-MM-DD HH:mm:ss'] - 日期時間格式 (預設: 'YYYY-MM-DD HH:mm:ss')。
 * @returns {string} - 日期時間字串。
 */
export const timestampToDateString = (timeStamp: number, format: string = 'YYYY-MM-DD HH:mm:ss'): string => {
  const date = new Date(timeStamp);
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  const hours = ('0' + date.getHours()).slice(-2);
  const minutes = ('0' + date.getMinutes()).slice(-2);
  const seconds = ('0' + date.getSeconds()).slice(-2);

  const formatMap: { [key: string]: string | number } = {
    'YYYY': year,
    'MM': month,
    'DD': day,
    'HH': hours,
    'mm': minutes,
    'ss': seconds,
  };
  
  return format.replace(/YYYY|MM|DD|HH|mm|ss/g, (match: string) => String(formatMap[match]));
}

/**
 * 將日期字串依時間排序。
 *
 * @param {string[]} dateArray - 日期字串陣列，格式為 'YYYY-MM-DD'。
 * @param {string} ascOrDesc - 排序方式，可選 'asc' 或 'desc'。
 * @returns {string[]} - 日期字串陣列，格式為 'YYYY-MM'。
 */
export const sortDateStringList = (dateArray: string[], ascOrDesc: 'asc' | 'desc'): string[] =>  {
  return dateArray.sort((a, b) => {
    const dateA = new Date(a);
    const dateB = new Date(b);
    if (ascOrDesc === 'asc') {
      return dateA.getTime() - dateB.getTime();
    } else {
      return dateB.getTime() - dateA.getTime();
    }
  });
}

