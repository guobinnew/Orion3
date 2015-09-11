
/**
 * Orion For Swift Sketch Plugin
 * Created by unique on 15/9/9.
 * 版本 3.3
 */
OrionPlatform = "Swift";
OrionRatio = 2.0;
OrionCodeTemplate = {

    label:{
        create:[
            "var $name$: UILabel?",
            "$name$ = UILabel(frame: CGRectMake($x$,$y$,$width$,$height$))",
            "view.addSubview($name$!)"
        ],
        initial: {
            "textAlignment": {
                "0": "$name$?.textAlignment = NSTextAlignment.Left",
                "1": "$name$?.textAlignment = NSTextAlignment.Center",
                "2": "$name$?.textAlignment = NSTextAlignment.Right"
            },
            "numberOfLines": "$name$?.numberOfLines = $numberOfLines$",
            "textColor": "$name$?.textColor = UIColor(red:$textColor.red$,green:$textColor.green$,blue:$textColor.blue$,alpha:$textColor.alpha$)",
            "backgroundColor": "$name$?.backgroundColor = UIColor(red:$backgroundColor.red$,green:$backgroundColor.green$,blue:$backgroundColor.blue$,alpha:$backgroundColor.alpha$)",
            "cornerRadius": {
                "0": "",
                "default": [
                    "$name$?.layer.cornerRadius = $cornerRadius$",
                    "$name$?.layer.masksToBounds = true"
                ]
            },
            "opacity": "$name$?.layer.opacity = $opacity$",
            "fontBold": {
                "0": "$name$?.font = UIFont.systemFontOfSize($fontSize$)",
                "1": "$name$?.font = UIFont.boldSystemFontOfSize($fontSize$)"
            },
            "fontDecoration": {
                "0": "$name$?.text = \"$text$\"",
                "1": [
                    "var $name$_content: NSMutableAttributedString = NSMutableAttributedString(string: \"$text$\")",
                    "var $name$_contentRange: NSRange = NSRange(location:0,length: $name$_content.length)",
                    "$name$_content.addAttribute(NSUnderlineStyleAttributeName, value: NSNumber(integer:1), range:$name$_contentRange)",
                    "$name$?.attributedText = $name$_content;"
                ],
                "2": [
                    "var $name$_content: NSMutableAttributedString = NSMutableAttributedString(string: \"$text$\")",
                    "var $name$_contentRange: NSRange = NSRange(location:0,length: $name$_content.length)",
                    "$name$_content.addAttribute(NSStrikethroughStyleAttributeName, value: NSNumber(integer:1), range:$name$_contentRange)",
                    "$name$?.attributedText = $name$_content;"
                ]
            }
        }
    },
    view:{
        create:[
            "var $name$: UIView?",
            "$name$ = UIView(frame: CGRectMake($x$,$y$,$width$,$height$))",
            "view.addSubview($name$!)"
        ],
        initial: {
            "fillMode":{
                "1":[
                    "var $name$_gradientLayer = CAGradientLayer()",
                    "$name$_gradientLayer?.frame = CGRectMake(0,0,$name$!.frame.size.width,$name$!.frame.size.height)",
                    "$name$_gradientLayer?.colors = [$gradient.colors$]",
                    "$name$_gradientLayer?.locations = [$gradient.locations$]",
                    "$name$_gradientLayer?.startPoint = CGPointMake($gradient.startPoint$)",
                    "$name$_gradientLayer?.endPoint = CGPointMake($gradient.endPoint$)",
                    "$name$?.layer.addSublayer($name$_gradientLayer!)"
                ],
                "0":"$name$?.backgroundColor = UIColor(red:$backgroundColor.red$,green:$backgroundColor.green$,blue:$backgroundColor.blue$,alpha:$backgroundColor.alpha$)"
            },
            "cornerRadius": {
                "0":"",
                "default":[
                    "$name$?.layer.cornerRadius = $cornerRadius$",
                    "$name$?.layer.masksToBounds = true"
                ]
            }
        }
    },
    image:{
        create: [
            "var $name$: UIImageView?",
            "$name$ = UIImageView(frame: CGRectMake($x$,$y$,$width$,$height$))",
            "view.addSubview($name$!)"
        ],
        initial: {
            "backgroundColor": "$name$?.backgroundColor = UIColor(red:$backgroundColor.red$,green:$backgroundColor.green$,blue:$backgroundColor.blue$,alpha:$backgroundColor.alpha$)",
            "cornerRadius": {
                "0": "",
                "default": [
                    "$name$?.layer.cornerRadius = $cornerRadius$",
                    "$name$?.layer.masksToBounds = true"
                ]
            }
        }
    },
    line:{
        "create": [
            "var $name$: UIView?",
            "$name$ = UIView(frame: CGRectMake($x$,$y$,$width$,$height$))",
            "view.addSubview($name$!)"
        ],
        "initial": {
            "lineColor": "$name$?.backgroundColor = UIColor(red:$lineColor.red$,green:$lineColor.green$,blue:$lineColor.blue$,alpha:$lineColor.alpha$)"
        }
    }
};