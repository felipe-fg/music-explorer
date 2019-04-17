import axios from "axios";

import { IAPIToken } from "../../model/api-token";
import { IPlayerService } from "../player-service";

export class SpotifyPlayerService implements IPlayerService {
    /**
     * Plays an URI using the active device.
     *
     * @param {IAPIToken} token API token.
     * @param {string} uri URI to play.
     * @returns {Promise<void>} Nothing.
     * @memberof SpotifyPlayerService
     */
    public async playUri(token: IAPIToken, uri: string): Promise<void> {
        const url = "https://api.spotify.com/v1/me/player/play";

        const data = { context_uri: uri };

        await axios.put(url, data, this.buildConfig(token));

        return Promise.resolve();
    }

    /**
     * Builds the authorization header.
     *
     * @private
     * @param {IAPIToken} token API token.
     * @returns {object} Request config.
     * @memberof SpotifyPlayerService
     */
    private buildConfig(token: IAPIToken): object {
        return {
            headers: {
                Authorization: "Bearer " + token.token,
            },
        };
    }
}
