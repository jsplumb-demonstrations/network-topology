export const NETWORK_SHAPES = {
    id: "network",
    name: "Network Shapes",
    shapes: {
        "server":{
            type:"server",
            label:"Server",
            description:"A Server",
            template:`<svg:g>
                    <svg:rect x="0" y="0" width="{{width}}" height="{{height}}"/>
                    <svg:text x="{{width/2}}" y="{{height/2}}" stroke="black" fill="black" stroke-width="0.5" text-anchor="middle" dominant-baseline="middle">{{name}}</svg:text>
            </svg:g>`
        },
        "database": {
            type: "database",
            label:"Database",
            template: `
                <svg:g>
                <svg:path d="M 0 {{height-(height/5)}} A {{width/2}} {{height/5}} 0 0 0 {{width}} {{height-(height/5)}} L {{width}} {{height/5}} A {{width/2}} {{height/5}} 0 0 0 0 {{(height/5)}} Z" data-fill/>
                <svg:path d="M {{width}} {{height/5}} A {{width/2}} {{height/5}} 0 0 1 0 {{height/5}}" fill="none"/>
                <svg:path d="M {{width}} {{height/ 4}} A {{width/2}} {{height/ 5}} 0 0 1 0 {{height/ 4}}" fill="none"/>
                <svg:text x="{{width/2}}" y="{{height}}" stroke="black" fill="black" stroke-width="0.5" text-anchor="middle" dominant-baseline="hanging" transform="translate(0, 10)">{{name}}</svg:text>
                </svg:g>
            `
        },
        "router":{
            type:"router",
            label:"Router",
            template:`
                <svg:g>
                    <svg:ellipse cx="{{width/2}}" cy="{{height/2}}" rx="{{width/2}}" ry="{{height/2}}"/>
                    
                    <svg:path d="M 5 {{height/2}} L {{(width/2)-5}} {{height/2}}"/>
                    <svg:path d="M {{width-5}} {{height/2}} L {{(width/2)+5}} {{height/2}}"/>
                    <svg:path d="M {{width/2}} 5 L {{width/2}} {{(height/2)-5}}"/>
                    <svg:path d="M {{width/2}} {{height-5}} L {{width/2}} {{(height/2)+5}}"/>
                    
                    <svg:path d="M {{(width/2)-10}} 20 L {{width/2}} 5 L {{(width/2)+10}} 20 Z"/>
                    <svg:path d="M {{(width/2)-10}} {{height-20}} L {{width/2}} {{height-5}} L {{(width/2)+10}} {{height-20}} Z"/>
                    
                    <svg:path d="M {{(width/2)-20}} {{(height/2)-10}} L {{(width/2)-5}} {{height/2}} L {{(width/2)-20}} {{(height/2)+10}} Z"/>
                    <svg:path d="M {{(width/2)+20}} {{(height/2)-10}} L {{(width/2)+5}} {{height/2}} L {{(width/2)+20}} {{(height/2)+10}} Z"/>                 
                                       
                    <svg:text x="{{width/2}}" y="{{height}}" stroke="black" fill="black" stroke-width="0.5" text-anchor="middle" dominant-baseline="hanging" transform="translate(0, 10)">{{name}}</svg:text>
                </svg:g>
            `
        },
        "switch":{
            type:"switch",
            label:"Switch",
            template:`
                <svg:g>
                <svg:rect x="0" y="0" width="{{width}}" height="{{height}}"/>
                    <svg:path d="M {{width/5}} 10 L {{width/5}} {{height-10}}"/>                    
                    <svg:path d="M {{(width*2)/5}} 10 L {{(width*2)/5}} {{height-10}}"/>
                    <svg:path d="M {{(width*3)/5}} 10 L {{(width*3)/5}} {{height-10}}"/>
                    <svg:path d="M {{(width*4)/5}} 10 L {{(width*4)/5}} {{height-10}}"/>
                    
                    <svg:path d="M {{(width/5)-10}} 30 L {{width/5}} 10 L {{(width/5)+10}} 30 Z"/>
                    <svg:path d="M {{((width*2)/5)-10}} {{height-30}} L {{(width*2)/5}} {{height-10}} L {{((width*2)/5)+10}} {{height-30}} Z"/>
                    <svg:path d="M {{((width*3)/5)-10}} 30 L {{(width*3)/5}} 10 L {{((width*3)/5)+10}} 30 Z"/>
                    <svg:path d="M {{((width*4)/5)-10}} {{height-30}} L {{(width*4)/5}} {{height-10}} L {{((width*4)/5)+10}} {{height-30}} Z"/>
                
                    <svg:text x="{{width/2}}" y="{{height}}" stroke="black" fill="black" stroke-width="0.5" text-anchor="middle" dominant-baseline="hanging" transform="translate(0, 10)">{{name}}</svg:text>
                </svg:g>
            `
        }

    }
}


