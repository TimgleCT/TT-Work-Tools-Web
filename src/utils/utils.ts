import { MessageEnum } from '@/enums/messageEnum'
/**
 * 判斷輸入的日期字串是否是當月日期。
 *
 * @param {number} second - 等待秒數'。
 */
export const delay = async (second: number): Promise<void> => {
    return await new Promise(resolve => setTimeout(resolve, second * 1000)) // 間隔 delay 秒
}

/**
 * 顯示提示訊息
 *
 * @param {string} message - 訊息內容。
 */
export const showMessage = (type: MessageEnum, message: string): void => {
    switch (type) {
        case MessageEnum.SUCCESS:
            window.$message.success(message)
            break;
        case MessageEnum.INFO:
            window.$message.info(message)
            break;
        case MessageEnum.WARNING:
            window.$message.warning(message)
            break;
        case MessageEnum.ERROR:
            window.$message.error(message)
            break;
        default:
            window.$message.info(message)
            break;
    }
}

/**
 * 將數字添加逗號
 *
 * @param {number} number - 數字。
 */
export const addNumberComma = (number: number): string => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')