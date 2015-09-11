/**
 * Orion For iOS Sketch Plugin
 * Created by unique on 15/9/9.
 * 版本 3.3
 */

OrionPlatform = "Android";
OrionRatio = 2.0;
OrionCodeTemplate = {
    label:{
        create:[
            "android:id=\"@+id/$name$\"",
            "android:layout_width=\"$width$dp\"",
            "android:layout_height=\"$height$dp\"",
            "android:layout_alignParentLeft=\"true\"",
            "android:layout_alignParentTop=\"true\""
        ],
            initial: {
            "textAlignment": {
                "0": "android:gravity=\"center_vertical|left\"",
                    "1": "android:gravity=\"center\"",
                    "2": "android:gravity=\"center_vertical|right\""
            },
            "textColor": "android:textColor=\"$textColor.hex$\"",
                "backgroundColor": "android:background=\"$backgroundColor.hex$\"",
                "fontSize": "android:textSize=\"$fontSize$sp\"",
                "fontBold": {
                "0": "",
                    "1": "android:textStyle=\"0\""
            },
            "fontDecoration": {
                "0": "android:text=\"$text$\"",
                    "1": [
                ],
                    "2": [
                ]
            }
        }
    },
    view:{
        create:[
            "android:id=\"@+id/$name$\"",
            "android:layout_width=\"$width$dp\"",
            "android:layout_height=\"$height$dp\"",
        ],
            initial: {
            "fillMode":{
                "1":[
                ],
                    "0":"android:background=\"$backgroundColor.hex$\""
            }
        }
    },
    image:{
        create: [
            "android:id=\"@+id/$name$\"",
            "android:layout_width=\"$width$dp\"",
            "android:layout_height=\"$height$dp\"",
            "android:layout_alignParentLeft=\"true\"",
            "android:layout_alignParentTop=\"true\"",
            "android:scaleType=\"centerCrop\"",
        ],
            initial: {
            "backgroundColor": "android:background=\"$backgroundColor.hex$\""
        }
    },
    line: {
        "create": [
            "android:id=\"@+id/$name$\"",
            "android:layout_width=\"$width$dp\"",
            "android:layout_height=\"$height$dp\"",
        ],
        "initial": {
            "lineColor": "android:background=\"$backgroundColor.hex$\""
        }
    }
};