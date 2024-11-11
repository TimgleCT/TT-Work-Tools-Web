export interface IResponseData<T> {
    data: T;
    status: number;
    statusText: string;
}