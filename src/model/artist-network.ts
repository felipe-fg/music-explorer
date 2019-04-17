import { IArtist } from "./artist";
import { IArtistEdge } from "./artist-edge";

export interface IArtistNetwork {
    artists: IArtist[];
    edges: IArtistEdge[];
}
