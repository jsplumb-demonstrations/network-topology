export const NETWORK_GROUP_SHAPES = {
    id: "network-groups",
    name: "Groups",
    shapes: {
        "vpc": {
            type: "vpc",
            label: "VPC",
            description: "A virtual private cloud",
            template: `<svg:g>                    
                    <svg:rect stroke-dasharray="4 4" x="0" y="0" width="{{width}}" height="{{height}}"/>                    
                    <svg:text x="{{width/2}}" y="{{height}}" stroke="black" fill="black" stroke-width="0.5" text-anchor="middle" dominant-baseline="text-top" transform="translate(0, -20)">{{name}}</svg:text>    
                </svg:g>`,
            objectType:"Group"
        },
        "subnet": {
            type: "subnet",
            label: "Subnet",
            description: "A subnet",
            template: `<svg:g>                    
                    <svg:rect x="0" y="0" width="{{width}}" height="{{height}}"/>                    
                    <svg:text x="{{width/2}}" y="{{height}}" stroke="black" fill="black" stroke-width="0.5" text-anchor="middle" dominant-baseline="text-top" transform="translate(0, -20)">{{name}}</svg:text>    
                </svg:g>`,
            objectType:"Group"
        },
        "region": {
            type: "region",
            label: "Region",
            description: "A region",
            template: `<svg:g>                    
                        <svg:rect x="0" y="0" width="{{width}}" height="{{height}}"/>                    
                        <svg:text x="{{width/2}}" y="{{height}}" stroke="black" fill="black" stroke-width="0.5" text-anchor="middle" dominant-baseline="text-top" transform="translate(0, -20)">{{name}}</svg:text>    
                    </svg:g>`,
            objectType:"Group"
        }

    }
}
