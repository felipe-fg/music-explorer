import React from "react";
import { Link } from "react-router-dom";

const About = () => {
    const spotifyApi = "https://developer.spotify.com/documentation/web-api/";
    const spotifyAuthorization = "https://developer.spotify.com/documentation/general/guides/authorization-guide/";
    const spotifyTerms = "https://developer.spotify.com/terms/";

    return (
        <section className="hero is-fullheight is-light">
            <div className="hero-body">
                <div className="container">
                    <div className="content">
                        <Link to="/" className="button is-rounded is-info">
                            <span className="icon">
                                <i className="fas fa-arrow-left" />
                            </span>
                            <span>Return to homepage</span>
                        </Link>
                    </div>

                    <h1 className="title">Terms of Use</h1>
                    <div className="content">
                        <p>
                            In compliance with the Spotify Developer Terms of Service described{" "}
                            <a href={spotifyTerms}>
                                <strong>here</strong>
                            </a>
                            , by using this service, you agree that this service does:
                        </p>
                        <ul>
                            <li>
                                not make any warranties or representations on behalf of Spotify and expressly disclaim
                                all implied warranties with respect to the Spotify Platform, Spotify Service and Spotify
                                Content, including the implied warranties of merchantability, fitness for a particular
                                purpose and non-infringement;
                            </li>
                            <li>
                                prohibit modifying or creating derivative works based on the Spotify Platform, Spotify
                                Service or Spotify Content;
                            </li>
                            <li>
                                prohibit decompiling, reverse-engineering, disassembling, and otherwise reducing the
                                Spotify Platform, Spotify Service, and Spotify Content to source code or other
                                human-perceivable form, to the full extent allowed by law;
                            </li>
                            <li>disclaim any liability on the part of third parties (e.g., Spotify);</li>
                            <li>
                                state that Spotify is a third party beneficiary of this Terms of Use and Privacy Policy
                                and is entitled to directly enforce this Terms of Use.
                            </li>
                        </ul>
                        <p>Any data collection and use of data is subject to the Privacy Policy below.</p>
                        <p>
                            <strong>
                                THE SERVICE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
                                INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
                                PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
                                LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT
                                OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SERVICE OR THE USE OR OTHER
                                DEALINGS IN THE SERVICE.
                            </strong>
                        </p>
                    </div>

                    <h1 className="title">Privacy Policy</h1>
                    <div className="content">
                        <p>
                            This service uses the official Spotify Web API (described{" "}
                            <a href={spotifyApi}>
                                <strong>here</strong>
                            </a>
                            ) to get information about your top artists and artists that are similar to them.
                        </p>
                        <p>
                            Authorization is done entirely in the browser using the Implicit Grant Flow (described{" "}
                            <a href={spotifyAuthorization}>
                                <strong>here</strong>
                            </a>{" "}
                            at Implicit Grant Flow section).
                        </p>
                        <p>
                            As such, this service runs entirely in the browser and does not store any data collected
                            using the Spotify integration described above.
                        </p>
                    </div>

                    <h1 className="title">Contact Me</h1>
                    <div className="content">
                        <p>
                            Send me an e-mail at{" "}
                            <a href="mailto:hello@felipegarcia.dev">
                                <strong>hello@felipegarcia.dev</strong>
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
