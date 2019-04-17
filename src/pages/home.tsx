import React from "react";
import { Link } from "react-router-dom";

const repository = "https://github.com/felipe-fg/music-explorer";

const Home = () => {
    return (
        <section className="hero is-fullheight is-info is-bold">
            <div className="hero-body">
                <div className="container">
                    <h1 className="title">Music Explorer</h1>
                    <h2 className="subtitle">See your favorite artists and discover new ones in between</h2>

                    <div className="content">
                        <p className="is-marginless">
                            This experience uses Spotify to show your favorite artists and find similar artists that you
                            may also enjoy.
                        </p>

                        <p>
                            By using this service, you agree to{" "}
                            <Link to="/about">
                                <strong>these terms</strong>
                            </Link>
                            .
                        </p>

                        <br />

                        <Link to="/connect" className="button is-rounded is-success">
                            <span className="icon">
                                <i className="fab fa-spotify" />
                            </span>
                            <span>Connect with Spotify</span>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="hero-foot">
                <div className="container">
                    <div className="content has-text-centered">
                        <p className="is-marginless">
                            Music Explorer by <strong>Felipe Garcia</strong>
                        </p>
                        <p>
                            Source code available{" "}
                            <a href={repository}>
                                <strong>here</strong>
                            </a>
                        </p>

                        <br />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Home;
