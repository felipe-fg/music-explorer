import { IAPIToken } from "../model/api-token";

export interface IPlayerService {
    /**
     * Plays an URI using the active device.
     *
     * @param {IAPIToken} token API token.
     * @param {string} uri URI to play.
     * @returns {Promise<void>} Nothing.
     * @memberof IPlayerService
     */
    playUri(token: IAPIToken, uri: string): Promise<void>;
}
