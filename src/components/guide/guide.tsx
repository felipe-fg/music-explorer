import React from "react";

import Actions from "./actions";
import Colors from "./colors";

const Guide = ({ state, onClose }: { state: "load" | "loaded" | "ready"; onClose: () => void }) => {
    return (
        <div className="container">
            {state === "load" && (
                <>
                    <h1 className="title">Loading...</h1>
                </>
            )}

            {state === "loaded" && (
                <h1 className="title">
                    <button className="button is-rounded is-info" onClick={onClose}>
                        <span className="icon">
                            <i className="fas fa-times" />
                        </span>
                        <span>Close this</span>
                    </button>
                </h1>
            )}

            {state !== "ready" && (
                <>
                    <br />

                    <Colors />

                    <Actions />
                </>
            )}
        </div>
    );
};

export default Guide;
