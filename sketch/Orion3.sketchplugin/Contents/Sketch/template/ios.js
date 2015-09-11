/**
 * Orion For iOS Sketch Plugin
 * Created by unique on 15/9/9.
 * 版本 3.3
 */

OrionPlatform = "iOS";
OrionRatio = 2.0;
OrionCodeTemplate = {

        label: {
            create: [
                "UILabel *$name$;",
                '$name$ = [[UILabel alloc] initWithFrame: CGRectMake($x$,$y$,$width$,$height$)];',
                '[view addSubview:$name$];'
            ],
            initial: {
                textAlignment: {
                    "0": "$name$.textAlignment = NSTextAlignmentLeft;",
                    "1": "$name$.textAlignment = NSTextAlignmentCenter;",
                    "2": "$name$.textAlignment = NSTextAlignmentRight;"
                },
                textColor: "$name$.textColor = [UIColor colorWithRed:$textColor.red$ green:$textColor.green$ blue:$textColor.blue$ alpha:$textColor.alpha$];",
                backgroundColor: "$name$.backgroundColor = [UIColor colorWithRed:$backgroundColor.red$ green:$backgroundColor.green$ blue:$backgroundColor.blue$ alpha:$backgroundColor.alpha$]",
                cornerRadius: {
                    "0": "",
                    default: [
                        "$name$.layer.cornerRadius = $cornerRadius$;",
                        "$name$.layer.masksToBounds = true;"
                    ]
                },
                opacity: "$name$.layer.opacity = $opacity$;",
                fontBold: {
                    "0": "$name$.font = [UIFont systemFontOfSize:$fontSize$];",
                    "1": "$name$.font = [UIFont boldSystemFontOfSize:$fontSize$];"
                },
                fontDecoration: {
                    "0": "$name$.text = @\"$text$\";",
                    "1": [
                        "NSDictionary *$name$_attr = @{NSStrikethroughStyleAttributeName: [NSNumber numberWithInteger:NSUnderlineStyleSingle]};",
                        "NSMutableAttributedString *$name$_content = [[NSMutableAttributedString alloc] initWithString:@\"$text$\" attributes:price_attr];",
                        "$name$.attributedText = $name$_content;"
                    ],
                    "2": [
                        "NSDictionary *$name$_attr = @{NSUnderlineStyleAttributeName: [NSNumber numberWithInteger:NSUnderlineStyleSingle]};",
                        "NSMutableAttributedString *$name$_content = [[NSMutableAttributedString alloc] initWithString:@\"$text$\" attributes:price_attr];",
                        "$name$.attributedText = $name$_content;"
                    ]
                }
            }
        },
        view: {
            create: [
                "UIView *$name$;",
                "$name$ = [[UIView alloc] initWithframe: CGRectMake($x$,$y$,$width$,$height$)];",
                "[view addSubview:$name$];"
            ],
            initial: {
                fillMode: {
                    "1": [
                        "CAGradientLayer *$name$_gradientLayer = [CAGradientLayer layer];",
                        "$name$_gradientLayer.frame = CGRectMake(0,0,$name$.frame.size.width,$name$.frame.size.height);",
                        "$name$_gradientLayer.colors = @[$gradient.colors$];",
                        "$name$_gradientLayer.locations = @[$gradient.locations$];",
                        "$name$_gradientLayer.startPoint = CGPointMake($gradient.startPoint$);",
                        "$name$_gradientLayer.endPoint = CGPointMake($gradient.endPoint$);",
                        "[$name$.layer addSublayer:$name$_gradientLayer];"
                    ],
                    "0": "$name$.backgroundColor = [UIColor colorWithRed:$backgroundColor.red$ green:$backgroundColor.green$ blue:$backgroundColor.blue$ alpha:$backgroundColor.alpha$];"
                },
                cornerRadius: {
                    "0": "",
                    "default": [
                        "$name$.layer.cornerRadius = $cornerRadius$;",
                        "$name$.layer.masksToBounds = true;"
                    ]
                }
            }
        },
        image: {
            create: [
                "UIImageView *$name$;",
                "$name$ = [[UIImageView alloc] initWithFrame: CGRectMake($x$,$y$,$width$,$height$)];",
                "[view addSubview:$name$];"
            ],
            initial: {
                "backgroundColor": "$name$.backgroundColor = [UIColor colorWithRed:$backgroundColor.red$ green:$backgroundColor.green$ blue:$backgroundColor.blue$ alpha:$backgroundColor.alpha$];",
                "cornerRadius": {
                    "0": "",
                    "default": [
                        "$name$.layer.cornerRadius = $cornerRadius$;",
                        "$name$.layer.masksToBounds = true;"
                    ]
                }
            }
        },
        line: {
            "create": [
                "UIView *$name$;",
                "$name$ = [[UIView alloc] initWithFrame: CGRectMake($x$,$y$,$width$,0.5)];",
                "[view addSubview:$name$];"
            ],
            "initial": {
                "borderColor": "$name$.backgroundColor = [UIColor colorWithRed:$borderColor.red$ green:$borderColor.green$ blue:$borderColor.blue$ alpha:$borderColor.alpha$];"
            }
        }
};
