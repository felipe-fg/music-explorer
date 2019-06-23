import React, { useContext, useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";

import { IAPIToken } from "../model/api-token";
import { IArtist } from "../model/artist";
import { IArtistNetwork } from "../model/artist-network";
import { ArtistNetworkService } from "../services/artist-network-service";
import { SpotifyArtistService } from "../services/spotify/spotify-artist-service";
import { SpotifyPlayerService } from "../services/spotify/spotify-player-service";

import { ImageChecker } from "../helpers/image-checker";

import { AuthContext } from "../components/auth/auth-provider";
import Guide from "../components/guide/guide";
import Network from "../components/network/network";

const artistService = new SpotifyArtistService();
const playerService = new SpotifyPlayerService();
const artistNetworkService = new ArtistNetworkService(artistService);

const Explorer = ({ history }: RouteComponentProps) => {
    const context = useContext(AuthContext);

    const [token] = useState<IAPIToken | undefined>(context.token);
    const [state, setState] = useState<"load" | "loaded" | "ready">("load");
    const [network, setNetwork] = useState<IArtistNetwork>();

    useEffect(() => {
        if (token == null || token.expires < Date.now()) {
            history.push("/");
            return;
        }
    }, [history, token]);

    useEffect(() => {
        if (token == null) {
            return;
        }

        const fetch = async () => {
            const data = await artistNetworkService.build(token);

            for (const artist of data.artists) {
                const validImage = await ImageChecker.checkImage(artist.image);

                if (!validImage) {
                    artist.image = undefined;
                }
            }

            setState("loaded");
            setNetwork(data);
        };

        fetch();
    }, [token]);

    const onCloseGuide = (): void => {
        setState("ready");
    };

    const onViewArtist = (artist: IArtist): void => {
        window.open(artist.url, "_blank");
    };

    const onPlayArtist = async (artist: IArtist): Promise<void> => {
        if (token == null) {
            return;
        }

        try {
            await playerService.playUri(token, artist.uri);
        } catch (e) {
            if (e.response && e.response.data && e.response.data.error && e.response.data.error.message) {
                alert(e.response.data.error.message);
            } else {
                alert(e.message);
            }
        }
    };

    return (
        <section className="hero is-fullheight is-dark is-bold">
            <div className="hero-body">
                <Guide state={state} onClose={onCloseGuide} />

                {state === "ready" && <Network network={network} onView={onViewArtist} onPlay={onPlayArtist} />}
            </div>

            <div className="hero-foot">
                <div className="container">
                    <div className="content has-text-centered has-text-weight-bold is-small">
                        <p>Artist metadata, images, and user data provided by Spotify</p>

                        <br />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Explorer;
