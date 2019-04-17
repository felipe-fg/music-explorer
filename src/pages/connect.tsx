import React, { useContext, useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Link } from "react-router-dom";

import { SpotifyAuthorizeService } from "../services/spotify/spotify-authorize-service";

import { AuthContext } from "../components/auth/auth-provider";

const Connect = ({ history }: RouteComponentProps) => {
    const authorizeService = new SpotifyAuthorizeService();

    const context = useContext(AuthContext);

    const [message, setMessage] = useState();
    const [error, setError] = useState();

    useEffect(() => {
        setMessage("Connecting...");

        try {
            const token = authorizeService.authorize();

            if (token != null) {
                context.setToken(token);
                history.push("/explorer");
            }
        } catch (e) {
            setMessage("Error");
            setError(e.message);
        }
    }, []);

    return (
        <section className="hero is-fullheight is-info is-bold">
            <div className="hero-body">
                <div className="container">
                    <h1 className="title">{error || message}</h1>

                    {error != null && (
                        <div className="content">
                            <Link to="/" className="button is-rounded is-danger">
                                <span className="icon">
                                    <i className="fas fa-arrow-left" />
                                </span>
                                <span>Return to homepage</span>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Connect;
