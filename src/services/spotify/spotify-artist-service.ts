import axios from "axios";

import { IAPIToken } from "../../model/api-token";
import { IArtist } from "../../model/artist";
import { IArtistService, TimeRange } from "../artist-service";

export class SpotifyArtistService implements IArtistService {
    /**
     * Finds the top artists for the current user.
     *
     * @param {IAPIToken} token API token.
     * @param {number} limit Number of artists to return.
     * @param {TimeRange} range Time range.
     * @returns {Promise<IArtist[]>} List of top artists.
     * @memberof SpotifyArtistService
     */
    public async topArtists(token: IAPIToken, limit: number, range: TimeRange): Promise<IArtist[]> {
        limit = Math.max(1, Math.min(50, limit));

        const url = `https://api.spotify.com/v1/me/top/artists?limit=${limit}&time_range=${range}`;

        const result = await axios.get(url, this.buildConfig(token));

        return result.data.items.slice(0, limit).map((item: any) => this.parseItem(item, true));
    }

    /**
     * Finds the similar artists of an artist.
     *
     * @param {IAPIToken} token API token.
     * @param {string} artist Artist id.
     * @param {number} limit Number of artists to return.
     * @returns {Promise<IArtist[]>} List of top artists.
     * @memberof SpotifyArtistService
     */
    public async similarArtists(token: IAPIToken, artist: string, limit: number): Promise<IArtist[]> {
        limit = Math.max(1, Math.min(20, limit));

        const url = `https://api.spotify.com/v1/artists/${artist}/related-artists`;

        const result = await axios.get(url, this.buildConfig(token));

        return result.data.artists.slice(0, limit).map((item: any) => this.parseItem(item, false));
    }

    /**
     * Builds the authorization header.
     *
     * @private
     * @param {IAPIToken} token API token.
     * @returns {object} Request config.
     * @memberof SpotifyArtistService
     */
    private buildConfig(token: IAPIToken): object {
        return {
            headers: {
                Authorization: "Bearer " + token.token,
            },
        };
    }

    /**
     * Parses an item from the list.
     *
     * @private
     * @param {*} data Artist data.
     * @param {boolean} top If it is a top artist.
     * @returns {IArtist} Parsed artist.
     * @memberof SpotifyArtistService
     */
    private parseItem(data: any, top: boolean): IArtist {
        return {
            genres: data.genres,
            id: data.id,
            image: this.findOptimalImage(data.images),
            name: data.name,
            popularity: data.popularity,
            top,
            uri: data.uri,
            url: data.external_urls && data.external_urls.spotify,
        } as IArtist;
    }

    /**
     * Returns the optimal image for an artist.
     *
     * @private
     * @param {any[]} images Image array.
     * @returns {(string | undefined)} Optimal image URL.
     * @memberof SpotifyArtistService
     */
    private findOptimalImage(images: any[]): string | undefined {
        if (images == null || images.length < 1) {
            return undefined;
        }

        const optimal = images.sort((a, b) => b.width - a.width).find((a) => a.width <= 320);

        return optimal && optimal.url;
    }
}
