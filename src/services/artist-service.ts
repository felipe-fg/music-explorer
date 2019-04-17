import { IAPIToken } from "../model/api-token";
import { IArtist } from "../model/artist";

export interface IArtistService {
    /**
     * Finds the top artists for the current user.
     *
     * @param {IAPIToken} token API token.
     * @param {number} limit Number of artists to return.
     * @param {TimeRange} range Time range.
     * @returns {Promise<IArtist[]>} List of top artists.
     * @memberof IArtistService
     */
    topArtists(token: IAPIToken, limit: number, range: TimeRange): Promise<IArtist[]>;

    /**
     * Finds the similar artists of an artist.
     *
     * @param {IAPIToken} token API token.
     * @param {string} artist Artist id.
     * @param {number} limit Number of artists to return.
     * @returns {Promise<IArtist[]>} List of top artists.
     * @memberof IArtistService
     */
    similarArtists(token: IAPIToken, artist: string, limit: number): Promise<IArtist[]>;
}

/**
 * Time range options.
 *
 * @export
 * @enum {number}
 */
export enum TimeRange {
    "short_term",
    "medium_term",
    "long_term",
}
