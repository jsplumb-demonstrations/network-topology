import {
    Base,
    isNode,
    isEdge,
    VanillaInspector, createEdgeTypePickerTag, JsPlumbToolkit, Surface, isGroup
} from "@jsplumbtoolkit/browser-ui"

import {
    PROPERTY_COLOR, PROPERTY_DETAILS,
    PROPERTY_FILL,
    PROPERTY_LABEL,
    PROPERTY_LINE_STYLE, PROPERTY_NAME,
    PROPERTY_OUTLINE, PROPERTY_TEXT,
    PROPERTY_TEXT_COLOR
} from "./constants"

import edgeMappings from "./edge-mappings"

const TMPL_NODE_INSPECTOR = "tmplNodeInspector"
const TMPL_EDGE_INSPECTOR = "tmplEdgeInspector"

export interface NetworkTopologyObjectInspectorOptions {
    toolkit:JsPlumbToolkit
    container:HTMLElement
    surface:Surface
}

const inspectorTemplates = {
    [TMPL_NODE_INSPECTOR] : `
            <div class="jtk-inspector jtk-node-inspector">
                <div class="jtk-inspector-section">
                    <div>Name</div>
                    <input type="text" jtk-att="${PROPERTY_NAME}" jtk-focus/>
                </div>
                
                <div class="jtk-inspector-section">
                    <div>Fill</div>
                    <input type="color" jtk-att="${PROPERTY_FILL}"/>
                </div>
                
                <div class="jtk-inspector-section">
                    <div>Outline</div>
                    <input type="color" jtk-att="${PROPERTY_OUTLINE}"/>
                </div>
                
                <div class="jtk-inspector-section">
                    <div>Details</div>
                    <textarea rows="10" jtk-att="${PROPERTY_DETAILS}"/>
                </div>
                
            </div>`,
    [TMPL_EDGE_INSPECTOR] : `
            <div class="jtk-inspector jtk-edge-inspector">
                <div>Label</div>
                <input type="text" jtk-att="${PROPERTY_LABEL}"/>
                <div>Line style</div>
                <jtk-line-style value="{{lineStyle}}" jtk-att="${PROPERTY_LINE_STYLE}"></jtk-line-style>
                <div>Color</div>
                <input type="color" jtk-att="${PROPERTY_COLOR}"/>                
                <div>Details</div>
                <textarea rows="10" jtk-att="${PROPERTY_DETAILS}"/>
            </div>`
}

/**
 * Inspector for nodes/edges. We extend `VanillaInspector` here and provide a resolver to get an appropriate
 * template based on whether the inspector is editing a node/nodes or an edge.
 */
export class NetworkTopologyObjectInspector extends VanillaInspector {

    constructor(options:NetworkTopologyObjectInspectorOptions) {
        super(Object.assign(options as any, {
            templateResolver:(obj:Base) => {
                if (isNode(obj) || isGroup(obj)) {
                    return inspectorTemplates[TMPL_NODE_INSPECTOR]
                } else if (isEdge(obj)) {
                    return inspectorTemplates[TMPL_EDGE_INSPECTOR]
                }
            }
        }))

        this.registerTag("jtk-line-style", createEdgeTypePickerTag(options.toolkit, PROPERTY_LINE_STYLE, edgeMappings(), (v:string) => {
            this.setValue(PROPERTY_LINE_STYLE, v)
        }))

    }
}
