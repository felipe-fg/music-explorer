import { IAPIToken } from "../../model/api-token";
import { IAuthorizeService } from "../authorize-service";

export class SpotifyAuthorizeService implements IAuthorizeService {
    /**
     * Authorizes the user using Implicit Grant Flow.
     *
     * @returns {(IAPIToken | null)} API token on success.
     * @throws Error in case of a failed authorization.
     * @memberof SpotifyAuthorizeService
     */
    public authorize(): IAPIToken | null {
        const urlToken = this.parseUrl();

        if (urlToken != null) {
            this.saveToken(urlToken);

            return urlToken;
        }

        const sessionToken = this.loadToken();

        if (sessionToken != null && sessionToken.expires > Date.now()) {
            return sessionToken;
        }

        window.location.href = this.buildUrl();

        return null;
    }

    /**
     * Builds the Implicit Grant Flow URL for authorization.
     *
     * @private
     * @returns {string} URL for redirect.
     * @memberof SpotifyAuthorizeService
     */
    private buildUrl(): string {
        const client = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
        const redirect = process.env.REACT_APP_SPOTIFY_REDIRECT_URI;
        const scope = process.env.REACT_APP_SPOTIFY_SCOPE;
        const dialog = process.env.REACT_APP_SPOTIFY_SHOW_DIALOG;

        return (
            `https://accounts.spotify.com/authorize` +
            `?client_id=${client}` +
            `&redirect_uri=${redirect}` +
            `&scope=${scope}` +
            `&show_dialog=${dialog}` +
            `&response_type=token`
        );
    }

    /**
     * After Spotify redirect, parses the URL to extract the token.
     *
     * @private
     * @returns {(IAPIToken | null)} API token on success.
     * @throws Error in case of a failed authorization.
     * @memberof SpotifyAuthorizeService
     */
    private parseUrl(): IAPIToken | null {
        this.validateUrl();

        const tokenMatch = window.location.hash.match(/access_token=(.+?)&/);
        const expiresMatch = window.location.hash.match(/expires_in=(.+)/);

        if (tokenMatch == null || expiresMatch == null) {
            return null;
        }

        return {
            expires: Date.now() + parseInt(expiresMatch[1], 10) * 1000,
            token: tokenMatch[1],
        };
    }

    /**
     * Validates if an error occurred while authorizing the user.
     *
     * @private
     * @throws Error in case of a failed authorization.
     * @memberof SpotifyAuthorizeService
     */
    private validateUrl() {
        const redirect = process.env.REACT_APP_SPOTIFY_REDIRECT_URI;

        if (redirect == null || !window.location.href.includes(redirect)) {
            return;
        }

        if (window.location.href.includes("error=access_denied")) {
            throw new Error("Access denied");
        }
    }

    /**
     * Saves the token to sessionStorage.
     *
     * @private
     * @param {IAPIToken} token API token to save.
     * @memberof SpotifyAuthorizeService
     */
    private saveToken(token: IAPIToken) {
        const session = process.env.REACT_APP_SESSION_ENABLED;
        const name = process.env.REACT_APP_SESSION_TOKEN_NAME;

        if (session !== "true" || name == null) {
            return;
        }

        sessionStorage.setItem(name, JSON.stringify(token));
    }

    /**
     * Loads an API token from sessionStorage.
     *
     * @private
     * @returns {(IAPIToken | null)} API token on success.
     * @memberof SpotifyAuthorizeService
     */
    private loadToken(): IAPIToken | null {
        const session = process.env.REACT_APP_SESSION_ENABLED;
        const name = process.env.REACT_APP_SESSION_TOKEN_NAME;

        if (session !== "true" || name == null) {
            return null;
        }

        const data = sessionStorage.getItem(name);

        if (data == null) {
            return null;
        }

        return JSON.parse(data) as IAPIToken;
    }
}
