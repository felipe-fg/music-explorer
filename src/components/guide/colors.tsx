import React from "react";

const Colors = () => {
    return (
        <>
            <h1 className="subtitle">Colors</h1>

            <div className="content">
                <ul>
                    <li>
                        <strong className="has-text-danger">Reds</strong> are your top artists
                    </li>
                    <li>
                        <strong className="has-text-info">Blues</strong> are similar artists
                    </li>
                </ul>
            </div>
        </>
    );
};

export default Colors;
