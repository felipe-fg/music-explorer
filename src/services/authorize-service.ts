import { IAPIToken } from "../model/api-token";

export interface IAuthorizeService {
    /**
     * Authorizes the user using Implicit Grant Flow.
     *
     * @returns {(IAPIToken | null)} API token on success.
     * @throws Error in case of a failed authorization.
     * @memberof IAuthorizeService
     */
    authorize(): IAPIToken | null;
}
