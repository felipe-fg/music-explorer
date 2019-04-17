import { IAPIToken } from "../model/api-token";
import { IArtist } from "../model/artist";
import { IArtistEdge } from "../model/artist-edge";
import { IArtistNetwork } from "../model/artist-network";
import { IArtistService, TimeRange } from "./artist-service";

export class ArtistNetworkService {
    /**
     * Creates an instance of ArtistNetworkService.
     * @param {IArtistService} artistService Artist service to get information.
     * @memberof ArtistNetworkService
     */
    constructor(private artistService: IArtistService) {}

    /**
     * Builds an network of connected artists based on similarity.
     *
     * @param {IAPIToken} token API token.
     * @returns {Promise<IArtistNetwork>}
     * @memberof ArtistNetworkService
     */
    public async build(token: IAPIToken): Promise<IArtistNetwork> {
        const top = parseInt(process.env.REACT_APP_NETWORK_TOP_ARTISTS as string, 10);
        const similar = parseInt(process.env.REACT_APP_NETWORK_SIMILAR_ARTISTS as string, 10);
        const range = (process.env.REACT_APP_NETWORK_TIME_RANGE as unknown) as TimeRange;

        const artists: IArtist[] = [];
        const edges: IArtistEdge[] = [];

        // Use top artists as seed
        const topArtists = await this.artistService.topArtists(token, top, range);

        let current = topArtists;

        // Compute current iteration
        const nextData = await this.findSimilarData(token, current, similar);

        // Clear iteration
        artists.push(...current);
        current = [];

        // Merge new data
        for (const data of nextData) {
            const newArtists = data.artists.filter((artist) => !this.artistExists(artists, artist));
            const newEdges = data.edges.filter((edge) => !this.edgeExists(edges, edge));

            current.push(...newArtists);
            artists.push(...newArtists);
            edges.push(...newEdges);
        }

        return { artists, edges };
    }

    /**
     * Finds similar artists data for all artists.
     *
     * @private
     * @param {IAPIToken} token API token.
     * @param {IArtist[]} artists Artist array to build similar data.
     * @param {number} similar Number of similar artists to take.
     * @returns {Promise<IArtistNetwork[]>}
     * @memberof ArtistNetworkService
     */
    private async findSimilarData(token: IAPIToken, artists: IArtist[], similar: number): Promise<IArtistNetwork[]> {
        const delay = parseInt(process.env.REACT_APP_NETWORK_DELAY as string, 10);

        const networks: IArtistNetwork[] = [];

        for (const artist of artists) {
            const network = await this.findSimilarNetwork(token, artist, similar);

            networks.push(network);

            // Sleep function to not flood with network requests
            if (delay > 0) {
                await new Promise((resolve) => setTimeout(resolve, delay));
            }
        }

        return networks;
    }

    /**
     * Finds similar artists using a base artist.
     *
     * @private
     * @param {IAPIToken} token API token.
     * @param {IArtist} artist Base artist.
     * @param {number} limit Number of artists to return.
     * @returns {Promise<IArtistNetwork>} Artist network with similar artists.
     * @memberof ArtistNetworkService
     */
    private async findSimilarNetwork(token: IAPIToken, artist: IArtist, limit: number): Promise<IArtistNetwork> {
        const artists = await this.artistService.similarArtists(token, artist.id, limit);

        const edges = artists.map((item) => {
            return { from: artist.id, to: item.id } as IArtistEdge;
        });

        return { artists, edges };
    }

    /**
     * Checks if the artist already exists.
     *
     * @private
     * @param {IArtist[]} array Array of artists.
     * @param {IArtist} artist Artist to check.
     * @returns {boolean} True if exists.
     * @memberof ArtistNetworkService
     */
    private artistExists(array: IArtist[], artist: IArtist): boolean {
        return array.some((item) => artist.id === item.id);
    }

    /**
     * Checks if the edge already exists.
     *
     * @private
     * @param {IArtistEdge[]} array Array of edges.
     * @param {IArtistEdge} edge Edge to check.
     * @returns {boolean} True if extis.
     * @memberof ArtistNetworkService
     */
    private edgeExists(array: IArtistEdge[], edge: IArtistEdge): boolean {
        return array.some((item) => {
            return (edge.from === item.from && edge.to === item.to) || (edge.from === item.to && edge.to === item.from);
        });
    }
}
