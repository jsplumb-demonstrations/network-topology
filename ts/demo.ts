import {
    ControlsComponent,
    Group,
    Node,
    newInstance,
    ready,
    ShapeLibraryImpl,
    EVENT_CANVAS_CLICK,
    MiniviewPlugin,
    ShapeLibraryPalette,
    DROP_MANAGER_MODE_TAP,
    DEFAULT,
    AnchorLocations,
    VanillaSurfaceRenderOptions,
    BlankEndpoint,
    Edge,
    CONNECTOR_TYPE_STRAIGHT,
    SelectionModes,
    ExportControlsComponent, Connection, BrowserElement, EVENT_TAP, SurfaceObjectInfo, DrawingToolsPlugin
} from "@jsplumbtoolkit/browser-ui"

import {NETWORK_GROUP_SHAPES } from "./network-group-shapes"
import {NETWORK_SHAPES } from "./network-shapes"
import {
    DEFAULT_STROKE,
    DEFAULT_TEXT_COLOR, EDGE_TYPE_TARGET_ARROW,
    PROPERTY_COLOR,
    PROPERTY_LABEL,
    PROPERTY_LINE_STYLE,
    PROPERTY_TEXT_COLOR
} from "./constants"
import {NetworkTopologyObjectInspector} from "./object-inspector"
import edgeMappings from './edge-mappings'

const anchorPositions = [
    { x:0, y:0.5, ox:-1, oy:0, id:"left" },
    { x:1, y:0.5, ox:1, oy:0, id:"right" },
    { x:0.5, y:0, ox:0, oy:-1, id:"top" },
    { x:0.5, y:1, ox:0, oy:1, id:"bottom" }
]

ready(() => {

    const jsplumb = newInstance({
        // set the Toolkit's selection mode to 'isolated', meaning it can select a set of edges, or a set of nodes, but it
        // cannot select a set of nodes and edges. In this demonstration we use an inspector that responds to events from the
        // toolkit's selection, so setting this to `isolated` helps us ensure we dont try to inspect edges and nodes at the same
        // time.
        selectionMode:SelectionModes.isolated,
        // This is the payload to set when a user begins to drag an edge - we return values for the
        // edge's label, color and line style. If you wanted to implement a mechanism whereby you have
        // some "current style" you could update this method to return some dynamically configured
        // values.
        beforeStartConnect:(node, edgeType) => {
            return {
                [PROPERTY_LABEL]:"",
                [PROPERTY_COLOR]:DEFAULT_STROKE,
                [PROPERTY_LINE_STYLE]:EDGE_TYPE_TARGET_ARROW
            }
        },
        // disallow edges between any object and its ancestors.
        beforeConnect:(s:Node|Group, t:Node|Group) => {
            return s.id !== t.id && !jsplumb.graph.isAncestor(s, t as any) && !jsplumb.graph.isAncestor(t, s as any)
        }
    })
    const shapeLibrary = new ShapeLibraryImpl([NETWORK_GROUP_SHAPES, NETWORK_SHAPES])

    const container = document.getElementById("jtk-demo-network-topology")

    const options:VanillaSurfaceRenderOptions = {
        useModelForSizes:true,
        templateMacros:{
            textColor:(data) => {
                return data[PROPERTY_TEXT_COLOR] || DEFAULT_TEXT_COLOR
            }
        },
        shapes:{
            library:shapeLibrary,
            showLabels:false
        },
        dragOptions:{
            filter:".jtk-draw-handle"
        },
        propertyMappings:{
            edgeMappings:edgeMappings()
        },
        view:{
            groups:{
                [DEFAULT]:{
                    elastic:true,
                    padding:20,
                    template:`<div style="color:{{#textColor}}" class="jtk-network-object jtk-network-{{type}}" data-jtk-target="true">
                            <jtk-shape/>  
                            ${anchorPositions.map(ap => `<div class="jtk-network-topology-connect jtk-network-topology-connect-${ap.id}"  data-jtk-anchor-x="${ap.x}" data-jtk-anchor-y="${ap.y}" data-jtk-orientation-x="${ap.ox}"  data-jtk-orientation-y="${ap.oy}" data-jtk-source="true" title="Drag connection to another object"></div>`).join("")}                           
                            <div class="jtk-edge-delete jtk-network-topology-delete"/>
                        </div>`,
                    events:{
                        "tap":(p:{obj:Group}) => jsplumb.setSelection(p.obj)
                    }
                }
            },
            nodes:{
                [DEFAULT]:{
                    template:`<div style="color:{{#textColor}}" class="jtk-network-object jtk-network-{{type}}" data-jtk-target="true">
                            <jtk-shape/> 
                              ${anchorPositions.map(ap => `<div class="jtk-network-topology-connect jtk-network-topology-connect-${ap.id}"  data-jtk-anchor-x="${ap.x}" data-jtk-anchor-y="${ap.y}" data-jtk-orientation-x="${ap.ox}"  data-jtk-orientation-y="${ap.oy}" data-jtk-source="true" title="Drag connection to another object"></div>`).join("")}                          
                            <div class="jtk-edge-delete jtk-network-topology-delete"/>
                        </div>`,
                    events:{
                        "tap":(p:{obj:Node}) => jsplumb.setSelection(p.obj)
                    }
                }
            },
            edges:{
                [DEFAULT]:{
                    label:"{{label}}",
                    outlineWidth:10,
                    connector:CONNECTOR_TYPE_STRAIGHT,
                    anchor:AnchorLocations.Continuous,
                    endpoint:BlankEndpoint.type,
                    events:{
                        "tap":(p:{edge:Edge}) => {
                            jsplumb.setSelection(p.edge)
                        }
                    },
                    overlays:[
                        {
                            type:"Custom",
                            options:{
                                location:0.8,
                                create:(c:Connection<BrowserElement>) => {
                                    const d = document.createElement("div")
                                    d.className = "jtk-edge-delete"
                                    return d
                                },
                                events:{
                                    "tap":(p:{edge:Edge}) => {
                                        jsplumb.removeEdge(p.edge.id)
                                    }
                                }
                            }
                        }
                    ]
                }
            }
        },
        layout:{
            type:"Absolute"
        },
        plugins:[
            {
                type:MiniviewPlugin.type,
                options:{
                    container:document.querySelector(".miniview")
                },
            },
            DrawingToolsPlugin.type
        ],
        consumeRightClick:false,
        events:{
            [EVENT_CANVAS_CLICK]:() => jsplumb.clearSelection()
        },
        zoomToFit:true,
        modelEvents:[
            {
                event:EVENT_TAP,
                selector:".jtk-network-topology-delete",
                callback:(event: Event, eventTarget: BrowserElement, modelObject: SurfaceObjectInfo<any>) => {
                    jsplumb.removeNode(modelObject.obj)
                }
            }
        ]

    }

    const surface = jsplumb.render(container, options)

    ;(window as any).s = surface

    new ControlsComponent(document.querySelector(".controls"), surface)

    new ShapeLibraryPalette({
        showLabels:true,
        container:document.querySelector(".node-palette"),
        surface,
        mode:DROP_MANAGER_MODE_TAP,
        shapeLibrary,
        allowClickToAdd:true,
        dataGenerator:(el) => {
            return {
                name:el.getAttribute("data-type"),
                details:""
            }
        }
    })

    new NetworkTopologyObjectInspector({
        toolkit:jsplumb,
        container:document.querySelector(".inspector"),
        surface
    })

    new ExportControlsComponent(document.querySelector(".jtk-export"), surface, shapeLibrary, {
        margins: {x: 50, y: 50},
        imageOptions:{
            dimensions:[
                { width:3000}, { width:1200}, {width:800}
            ]
        }
    })


    jsplumb.load({url:'./network-1.json'})


})
