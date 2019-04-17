import React from "react";

const Actions = () => {
    return (
        <>
            <h1 className="subtitle">Actions</h1>

            <div className="content">
                <ul>
                    <li>
                        <strong>Drag the background</strong> to pan the view
                    </li>
                    <li>
                        <strong>Pinch the background</strong> to zoom the view
                    </li>
                    <li>
                        <strong>Drag a circle</strong> to move it around
                    </li>
                    <li>
                        <strong>Tap a circle</strong> to highlight its neighbors
                    </li>
                    <li>
                        <strong>Long press a circle</strong> to open a menu
                    </li>
                </ul>

                <p>
                    You need an <strong>active device</strong> to play an artist.{" "}
                    <strong>This service does not stream any audio</strong>.
                </p>

                <p>
                    If you wish to revoke access to this service, go to your account page and revoke{" "}
                    <strong>Music Explorer</strong>.
                </p>
            </div>
        </>
    );
};

export default Actions;
