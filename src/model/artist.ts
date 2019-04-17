export interface IArtist {
    id: string;
    name: string;
    image: string | undefined;
    genres: string[];
    top: boolean;
    uri: string;
    url: string;
    popularity: number;
}
