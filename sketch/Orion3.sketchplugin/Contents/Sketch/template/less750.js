/**
 * Orion For iOS Sketch Plugin
 * Created by unique on 15/9/9.
 * 版本 3.3
 */

OrionPlatform = "Less(750)";
OrionRatio = 1.0;
OrionCodeTemplate = {
    label:{
        create:[
            "@base: 75;",
            "x: unit($x$/@base,rem);",
            "y: unit($y$/@base,rem);",
            "width: unit($width$/@base,rem);",
            "height: unit($height$/@base,rem);"
        ],
        initial: {
            "textAlignment": {
                "0": "text-align: left;",
                "1": "text-align: center;",
                "2": "text-align: right;"
            },
            "textColor": "color: $textColor.hexrgb$;",
            "backgroundColor": "background-color: $backgroundColor.hexrgb$;",
            "cornerRadius": {
                "0": "",
                "default": [
                    "border-radius: unit($cornerRadius$/@base,rem);"
                ]
            },
            "opacity": "opacity: $opacity$;",
            "fontSize":"font-size: unit($fontSize$/@base,rem);",
            "fontBold": {
                "0": "font-weight: normal;",
                "1": "font-weight: bold;"
            },
            "lineSpacing":"line-height: unit($lineSpacing$/@base,rem);",
            "fontDecoration": {
                "0": "",
                "1": "text-decoration: line-through;",
                "2": "text-decoration: underline;"
            }
        }
    },
    view:{
        create:[
            "@base: 75;",
            "x: unit($x$/@base,rem);",
            "y: unit($y$/@base,rem);",
            "width: unit($width$/@base,rem);",
            "height: unit($height$/@base,rem);"
        ],
        initial: {
            "fillMode":{
                "1":[
                ],
                "0":"background-color: $backgroundColor.hexrgb$;"
            },
            "cornerRadius": {
                "0":"",
                "default":[
                    "border-radius: unit($cornerRadius$/@base,rem);"
                ]
            }
        }
    },
    image:{
        create: [
            "@base: 75;"
        ],
        initial: {
            "backgroundColor": "background-color: $backgroundColor.hexrgb$;",
            "cornerRadius": {
                "0": "",
                "default": [
                    "border-radius: unit($cornerRadius$/@base,rem);"
                ]
            }
        }
    },
    line:{
        "create": [
            "@base: 75;",
            "x: unit($x$/@base,rem);",
            "y: unit($y$/@base,rem);",
            "width: unit($width$/@base,rem);",
            "height: unit($height$/@base,rem);"
        ],
        "initial": {
            "borderColor": "background-color = $borderColor.hexrgb$;"
        }
    }
};
