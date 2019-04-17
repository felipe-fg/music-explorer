import cytoscape from "cytoscape";
import React, { useEffect, useRef } from "react";

const cxtmenu = require("cytoscape-cxtmenu"); // tslint:disable-line:no-var-requires
const euler = require("cytoscape-euler"); // tslint:disable-line:no-var-requires

import { IArtist } from "../../model/artist";
import { IArtistEdge } from "../../model/artist-edge";
import { IArtistNetwork } from "../../model/artist-network";
import theme from "./theme";

const Network = ({ network, onView, onPlay }: INetworkProps) => {
    const cyEl = useRef<HTMLDivElement>(null);

    useEffect(() => {
        createNetwork(cyEl.current, { network, onView, onPlay });
    }, [network]);

    return <div className="is-overlay" ref={cyEl} />;
};

function createNetwork<T extends HTMLElement>(container: T | null, { network, onView, onPlay }: INetworkProps) {
    if (container == null || network == null) {
        return;
    }

    const nodes = network.artists.map(createNode);
    const edges = network.edges.map(createEdge);
    const elements = [...nodes, ...edges];

    cytoscape.use(cxtmenu);
    cytoscape.use(euler);

    const cy = cytoscape({
        container,
        elements,
        layout: createLayout(),
        style: createStyle(),

        autounselectify: true,
        boxSelectionEnabled: false,
        wheelSensitivity: 0.25,
    });

    createContextMenu(cy, { network, onView, onPlay });

    createEvents(cy);
}

function createNode(artist: IArtist): any {
    return {
        data: {
            id: artist.id,
            image: artist.image,
            label: artist.name,
            top: artist.top,
        },
    };
}

function createEdge(edge: IArtistEdge): any {
    return {
        data: {
            id: `${edge.from}<>${edge.to}`,
            source: edge.from,
            target: edge.to,
        },
    };
}

function createLayout(): any {
    return {
        name: "euler",

        animate: false,
        fit: true,
        infinite: false,
        randomize: true,

        dragCoeff: 0.1,
        gravity: -1,
        mass: () => 10,
        maxIterations: 4000,
        pull: 0.002,
        springCoeff: () => 0.0002,
        springLength: () => 64,
    };
}

function createStyle(): any {
    return [createStyleNode(), createStyleEdge(), createStyleNodeSelected(), createStyleEdgeSelected()];
}

function createStyleNode(): any {
    return {
        selector: "node",
        style: {
            "font-family": "Lato, sans-serif",
            "font-size": "7px",
            "font-weight": "bold",

            "text-margin-x": "0px",
            "text-margin-y": "5px",

            "text-halign": "center",
            "text-valign": "bottom",

            "text-outline-color": theme.background,
            "text-outline-opacity": 0.5,
            "text-outline-width": "1px",

            "background-color": (e: any) => (e.data("top") ? theme.primary : theme.secondary),
            "background-fit": "contain",
            "background-image": "data(image)",

            "border-color": (e: any) => (e.data("top") ? theme.primary : theme.secondary),
            "border-width": "2px",

            height: "32px",
            width: "32px",

            color: theme.foreground,
            label: (e: any) => e.data("label"),
            shape: "rectangle",
        },
    };
}

function createStyleEdge(): any {
    return {
        selector: "edge",
        style: {
            "line-color": theme.primary,

            width: 2,
        },
    };
}

function createStyleNodeSelected(): any {
    return {
        selector: "node.selected",
        style: {
            "border-color": () => theme.active,
        },
    };
}

function createStyleEdgeSelected(): any {
    return {
        selector: "edge.selected",
        style: {
            "line-color": theme.active,
        },
    };
}

function createContextMenu(cy: cytoscape.Core, { network, onPlay, onView }: INetworkProps) {
    (cy as any).cxtmenu({
        commands: createContextMenuCommands({ network, onPlay, onView }),
        selector: "node",

        activeFillColor: theme.secondary,
    });
}

function createContextMenuCommands({ network, onPlay, onView }: INetworkProps): object[] {
    if (network == null) {
        return [];
    }

    return [
        {
            content: '<i class="fas fa-play"></i>',
            select: (element: cytoscape.SingularData) => {
                const artist = network.artists.find((a) => a.id === element.id());

                if (artist != null && onPlay != null) {
                    onPlay(artist);
                }
            },
        },
        {
            content: '<i class="fas fa-times"></i>',
        },
        {
            content: '<i class="fab fa-spotify"></i>',
            select: (element: cytoscape.SingularData) => {
                const artist = network.artists.find((a) => a.id === element.id());

                if (artist != null && onView != null) {
                    onView(artist);
                }
            },
        },
    ];
}

function createEvents(cy: cytoscape.Core) {
    cy.on("tap", (event: cytoscape.EventObject) => {
        cy.$("node.selected").removeClass("selected");
        cy.$("edge.selected").removeClass("selected");

        if (event.target.isNode != null && event.target.isNode()) {
            event.target.addClass("selected");
            event.target.connectedEdges().addClass("selected");
        }
    });
}

interface INetworkProps {
    network: IArtistNetwork | undefined;
    onView?: (artist: IArtist) => void;
    onPlay?: (artist: IArtist) => void;
}

export default Network;
