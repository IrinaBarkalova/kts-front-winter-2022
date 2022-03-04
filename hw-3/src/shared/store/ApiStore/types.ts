// Перечисление методов HTTP-запроса
import { GithubRepoModel } from "@store/models/github";
import { CollectionT } from "@utils/collection";

export enum HTTPMethod {
  GET = "GET",
  POST = "POST",
}

// Параметры запроса
export type RequestParams<ReqT> = {
  method: HTTPMethod; // Метод запроса, GET или POST
  endpoint: string; // API-endpoint, на который делается запрос
  headers: Record<string, string>; // Объект с передаваемыми HTTP-заголовками
  params?: Record<string, number>;
  /**
   * Объект с данными запроса.
   * - Для GET-запроса данные превращаются в query-строку и добавляются в endpoint
   * - Для POST-запроса данные преобразуются к формату JSON и добавляются в тело запроса (необязательное требование)
   */

  data: ReqT;
};

// Ответ API
export type ApiResponse<SuccessT = any, ErrorT = any> =
  | {
      success: true;
      data: SuccessT;
    }
  | {
      success: false;
      data: ErrorT;
    };

// Интерфейс для класса, с помощью которого можно делать запросы к API
export interface IApiStore {
  readonly baseUrl: string;

  request<SuccessT, ErrorT = any, ReqT = {}>(
    params: RequestParams<ReqT>
  ): Promise<ApiResponse<CollectionT<number, GithubRepoModel>>>;
}
