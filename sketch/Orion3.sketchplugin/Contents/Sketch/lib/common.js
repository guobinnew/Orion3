/**
 * Created by unique on 15/9/9.
 * 版本 3.3
 */

var orion = orion || {};
orion.sketch = {

    codeView: function(text){
        var cellWidth = 512;
        var cellHeight = 256;

        var scrollview = [[NSScrollView alloc] initWithFrame:NSMakeRect(0, 0, cellWidth, cellHeight)];
        var contentSize = [scrollview contentSize];

        [scrollview setBorderType:NSNoBorder];
        [scrollview setHasVerticalScroller:true];
        [scrollview setHasHorizontalScroller:true];
        [scrollview setAutoresizingMask:NSViewWidthSizable | NSViewHeightSizable];

        var FLT_MAX = 3.40282347e+38;
        var view = [[NSTextField alloc] initWithFrame:NSMakeRect(0, 0, contentSize.width, contentSize.height)];
        view.font = [NSFont boldSystemFontOfSize:18];
        view.stringValue= text;
        [scrollview setDocumentView:view];

        var alert = [[NSAlert alloc] init];
        alert.setMessageText("Orion For " + OrionPlatform);
        alert.addButtonWithTitle("关闭");
        alert.setAccessoryView(scrollview);

        [alert runModal];
    },

    // 转换为pt
    ratio: function(n){
        return n / OrionRatio;
    },

    // 转换为js字符串
    toJSString: function(str){
        return new String(str).toString();
    },

    // 颜色输出Json
    colorToJSON: function(color) {
        return {
            r: Math.round(color.red() * 255),
            g: Math.round(color.green() * 255),
            b: Math.round(color.blue() * 255),
            a: color.alpha()
        };
    },

    colorToHex: function(color) {
        var strHex = "#";
        var items = [Math.round(color.a * 255), color.r, color.g, color.b];

        for (var i = 0; i < items.length; i++) {
            var hex = Number(items[i]).toString(16);
            if (hex === "0") {
                hex += hex;
            }
            strHex += hex;
        }
        return strHex;
    },

    colorToHexRGB: function(color) {
        var strHex = "#";
        var items = [color.r, color.g, color.b];

        for (var i = 0; i < items.length; i++) {
            var hex = Number(items[i]).toString(16);
            if (hex === "0") {
                hex += hex;
            }
            strHex += hex;
        }
        return strHex;
    },

    // 坐标点输出Json
    pointToJSON: function(point){
        return {
            x: parseFloat(point.x),
            y: parseFloat(point.y)
        };
    },

    // 渐变输出json
    BorderPositions: ["center", "inside", "outside"],
    FillTypes: ["color", "gradient"],
    GradientTypes: ["linear", "radial", "angular"],
    ShadowTypes: ["outer", "inner"],
    TextAligns: ["left", "right", "center", "justify", "left"],
    colorStopToJSON: function(colorStop) {
        return {
            color: this.colorToJSON(colorStop.color()),
            position: colorStop.position()
        };
    },
    gradientToJSON: function(gradient) {
        var stops = [],
            msStop, stopIter = gradient.stops().array().objectEnumerator();
        while (msStop = stopIter.nextObject()) {
            stops.push(this.colorStopToJSON(msStop));
        }

        return {
            type: this.GradientTypes[gradient.gradientType()],
            from: this.pointToJSON(gradient.from()),
            to: this.pointToJSON(gradient.to()),
            colorStops: stops
        };
    },

    // 数组转换
    convertToJSArray: function (nsArray) {
        var jsArray = [];
        for (var i = 0, l = [nsArray count]; i < l; i++) {
            jsArray.push([nsArray objectAtIndex:i]);
        }
        return jsArray;
    },

    // 获取填充颜色
    acquireFillColor: function (data, fillstyles) {
        data = data || {}

        // 目前仅支持一个背景模式(仅支持单色模式)
        data.fillColor =  data.fillColor || []  //'(r:0.0 g:0.0 b:0.0 a:0.0)'  // 默认背景透明

        for (var j = 0; j < fillstyles.count(); j++) {
            var fillstyle = [fillstyles objectAtIndex:j]
            if (fillstyle.isEnabled()) {
                var fillType = this.FillTypes[fillstyle.fillType()]
                var fill = {
                    fillType: fillType
                };
                switch (fillType) {
                    case "color":
                        fill.color = this.colorToJSON(fillstyle.color());
                        break;

                    case "gradient":
                        fill.gradient = this.gradientToJSON(fillstyle.gradient());
                        break;

                    default:
                        continue;
                }
                data.fillColor.push(fill);

            }
        }
        return data
    },

    // 获取边框样式
    acquireBorderStyle: function (data, borderstyles) {
        data = data || {}

        // 目前仅支持一个边框模式(仅支持单色模式)
        data.borderColor = {
            "r":0,
            "g":0,
            "b":0,
            "a":0
        }  // 默认无边框
        data.borderThickness = 0.0
        for (var j = 0; j < borderstyles.count(); j++) {
            var borderstyle = [borderstyles objectAtIndex:j]
            if (borderstyle.isEnabled()) {
                data.borderColor = this.colorToJSON(borderstyle.color())
                data.borderThickness = borderstyle.thickness()
                break
            }
        }
        return data
    },


    // 处理Layer基础属性
    processLayer: function (data, layer, prefix) {
        var obj = {}
        var name = layer.name()

        // 获取名
        obj.name = '' + name.substr(prefix)
        obj.x = layer.frame().x()
        obj.y = layer.frame().y()
        obj.width = layer.frame().width()
        obj.height = layer.frame().height()
        obj.opacity = layer.style().contextSettings().opacity()

        if ([layer isKindOfClass:[MSLayerGroup class]])
        {
            var sublayers = layer.layers()
            for (var j = 0; j < sublayers.count(); j++) {
                var sublayer = [sublayers objectAtIndex:j]
                var layerNameStr = '' + sublayer.name()

                if (layerNameStr == 'Background') { // Label背景属性
                    // 获取圆角半径
                    if ([sublayer isKindOfClass:[MSLayerGroup class]])
                    {
                        var shape = sublayer.layers().firstObject()

                        if ([shape isKindOfClass:[MSRectangleShape class]])
                        {
                            obj.radius = shape.fixedRadius()
                        }
                    }

                    // 获取背景填充色
                    var fillstyles = sublayer.style().fills().array()
                    obj = this.acquireFillColor(obj, fillstyles)
                }
            }
        }

        return obj
    },


// 处理Label属性
    processLabel: function (data, layer) {

        var label = this.processLayer(data, layer, 6)
        label.family = 'label'

        // 判断类型,如果是ShapeGroup,则获取子Layer的字体和背景色属性
        // 如果是TextLayer则直接获取字体和背景色属性

        if ([layer isKindOfClass:[MSLayerGroup class]])
        {
            var sublayers = layer.layers()
            for (var j = 0; j < sublayers.count(); j++) {
                var sublayer = [sublayers objectAtIndex:j]
                var layerNameStr = '' + sublayer.name()

                if (layerNameStr == 'Text') { // Cell属性
                    label.fontSize = sublayer.fontSize()
                    label.textColor = this.colorToJSON(sublayer.textColor())
                    label.textAlignment = this.TextAligns[sublayer.textAlignment()]  // 0:左对齐 1:右对齐 2:居中 3: 平铺
                    label.characterSpacing = sublayer.characterSpacing()
                    label.fontName = '' + sublayer.fontPostscriptName()
                    label.text = '' + sublayer.stringValue()
                    label.lineSpacing = sublayer.lineSpacing()  // 指一行的完整高度(包含文字高度)
                    layer.letterSpacing = sublayer.characterSpacing();
                }
            }
        }
        else if ([layer isKindOfClass:[MSTextLayer class]])
        {
            label.fontSize = layer.fontSize()
            label.textColor = this.colorToJSON(layer.textColor())
            label.textAlignment = this.TextAligns[layer.textAlignment()]  // 0:左对齐 1:右对齐 2:居中 3: 平铺
            label.characterSpacing = layer.characterSpacing()
            label.fontName = '' + layer.fontPostscriptName()
            label.lineSpacing = layer.lineSpacing()  // 指一行的完整高度(包含文字高度)
            label.text = '' + layer.stringValue()
            layer.letterSpacing = layer.characterSpacing();

            // 获取背景填充色
            var fillstyles = layer.style().fills().array()
            label = this.acquireFillColor(label, fillstyles)
        }

        return label;
    },


    // 处理Image属性
    processImage: function (data, layer) {
        var img = this.processLayer(data, layer, 6)
        img.family = 'image'

        // 获取边框
        var borderstyles = layer.style().borders().array()
        img = this.acquireBorderStyle(img, borderstyles)

        return img;
    },

    // 处理Line属性
    processLine: function (data, layer) {
        var line = {}
        var name = layer.name()

        // 获取Label名
        line.name = '' + name.substr(5)
        line.x = layer.frame().x()
        line.y = layer.frame().y()
        line.width = layer.frame().width()
        line.height = layer.frame().height()
        line.family = 'line'

        // 获取边框
        var borderstyles = layer.style().borders().array()
        line = this.acquireBorderStyle(line, borderstyles)

        return line;
    },


    // 处理View属性
    processView: function (data, layer) {
        var view = this.processLayer(data, layer, 5)
        view.family = 'view'
        // 获取背景填充色
        var fillstyles = layer.style().fills().array()
        view = this.acquireFillColor(view, fillstyles)

        // 获取圆角半径
        if ([layer isKindOfClass:[MSLayerGroup class]])
        {
            var shape = layer.layers().firstObject()
            if ([shape isKindOfClass:[MSRectangleShape class]])
            {
                view.radius = shape.fixedRadius()
            }
        }

        return view;
    },

    // 提示对话框
    warn: function (msg) {
        var alert = [[NSAlert alloc] init];
        [alert setMessageText:'警告'];
        [alert setInformativeText:msg];
        [alert addButtonWithTitle:'确定'];
        [alert runModal];
    },

    isArray:function(v) {
        return Object.prototype.toString.call(v) === '[object Array]';
    },

    isString: function(v){
        return Object.prototype.toString.call() === "[object String]"
    },

    isObject: function(v){
        return (typeof v ==='object');
    },

    textAlignment: {
        left : 0,
        center : 1,
        right: 2
    },

    replaceCode: function(src, variables) {
        var code = '';
        // 循环替换
        for( var i=0; i<src.length; i++){
            var source = src[i];
            log('source->' + source);
            for(var s in variables){// 替换字符串
                var reg=new RegExp("\\$"+s +"\\$","gi"); //创建正则RegExp对象
                source = source.replace(reg,variables[s]);
            }

            code += source;
            code += "\n";
        }
        return code;
    },

    transferCode: function(key, chunk, variables){

        var code = '';
        var entry = '';
        if( key.length > 0 ){
            entry = variables[key];
        }
        else{
            entry = 'default';
        }
        log('key->' + key + 'value'+ entry);

        var src = [];
        if( chunk && entry ) {

            var entrychunk = chunk
            if(!this.isArray(chunk) && this.isObject(chunk)) {
                log('object->' + chunk);
                // 根据值获取对应代码块
                entrychunk = chunk[entry];
                log('entry->'+entry + '   value->' + entrychunk);

                if( !entrychunk ){
                    entrychunk = chunk["default"];
                }
            }

            if(entrychunk){
                var src = [];

                if (this.isArray(entrychunk)) {
                    log('array->' + entrychunk);
                    src = entrychunk;
                }
                else{
                    log('string->' + entrychunk);
                    src.push(entrychunk);
                }

                code = this.replaceCode(src, variables);
            }


        }

        return code;
    },

    // 生成代码
    generateCode: function(data){
        var code = '';

        if( !OrionCodeTemplate ){
            code = '****没有找到代码模板*****';
            return code;
        }

        var template = OrionCodeTemplate[data.family];
        //log(JSON.stringify(template));

        if( template ){
            // 生成变量
            var variables = {};

            variables.name = ''+data.name;
            variables.x = ''+ Math.round(this.ratio(data.x) * 100.0 ) /100.0;
            variables.y = ''+ Math.round(this.ratio(data.y) * 100.0 ) /100.0;
            variables.width = ''+Math.round(this.ratio(data.width)* 100.0 ) /100.0;
            variables.height= ''+Math.round(this.ratio(data.height)* 100.0 ) /100.0;

            // 颜色值
            if( data.fillColor && data.fillColor.length > 0 ){
                if( data.fillColor[0].fillType == "gradient"){
                    variables.fillMode = "1";
                    variables.gradient = {};
                    variables["gradient.startPoint"] = '' + Math.round(data.fillColor[0].gradient.from.y * 100.0)/100.0 + ',' + Math.round(data.fillColor[0].gradient.from.x*100.0)/ 100.0;
                    variables["gradient.endPoint"] = '' + Math.round(data.fillColor[0].gradient.to.y* 100.0) / 100.0 + ',' + Math.round(data.fillColor[0].gradient.to.x*100.0)/100.0;

                }
                else if( data.fillColor[0].fillType == "color"){
                    variables.fillMode = "0";
                    variables.backgroundColor = {}
                    variables["backgroundColor.red"] = '' +  Math.round(data.fillColor[0].color.r * 100.0 / 255.0) / 100.0;
                    variables["backgroundColor.blue"] = '' + Math.round(data.fillColor[0].color.b * 100.0 / 255.0) / 100.0;
                    variables["backgroundColor.green"] = '' + Math.round(data.fillColor[0].color.g * 100.0 / 255.0) / 100.0;
                    variables["backgroundColor.alpha"] = '' + data.fillColor[0].color.a;
                    variables["backgroundColor.hex"] = this.colorToHex(data.fillColor[0].color);
                    variables["backgroundColor.hexrgb"] = this.colorToHexRGB(data.fillColor[0].color);
                }
            }

            // 透明度
            if( data.opacity ){
                variables.opacity = '' + Math.round( data.opacity* 100.0) / 100.0;
            }

            // 字号
            if( data.fontSize ){
                variables.fontSize = '' + Math.round(this.ratio(data.fontSize));
            }

            // 字体样式
            variables.fontDecoration = "0";

            // 字体颜色
            if( data.textColor ){
                variables.textColor = {};
                variables["textColor.red"] = '' + Math.round(data.textColor.r * 100.0 / 255.0) / 100.0;
                variables["textColor.blue"] = '' + Math.round(data.textColor.b * 100.0 / 255.0) / 100.0;
                variables["textColor.green"] = '' + Math.round(data.textColor.g * 100.0 / 255.0) / 100.0;
                variables["textColor.alpha"] = '' + data.textColor.a;
                variables["textColor.hex"] = this.colorToHex(data.textColor);
                variables["textColor.hexrgb"] = this.colorToHexRGB(data.textColor);
            }

            // 边框颜色
            if( data.borderColor ){
                variables.borderColor = {};
                variables["borderColor.red"] = '' + Math.round(data.borderColor.r * 100.0 / 255.0) / 100.0;
                variables["borderColor.blue"] = '' + Math.round(data.borderColor.b * 100.0 / 255.0) / 100.0;
                variables["borderColor.green"] = '' + Math.round(data.borderColor.g * 100.0 / 255.0) / 100.0;
                variables["borderColor.alpha"] = '' + data.borderColor.a;
                variables["borderColor.hex"] = this.colorToHex(data.borderColor);
                variables["borderColor.hexrgb"] = this.colorToHexRGB(data.borderColor);
            }

            // 对齐
            if( data.textAlignment ){
                variables.textAlignment = '' + this.textAlignment[data.textAlignment];
            }

            // 字符间距
            if( data.characterSpacing ){
                variables.characterSpacing = '' + Math.round(data.characterSpacing);
            }

            // 获取粗体信息
            if( data.fontName ){
                var index = data.fontName.lastIndexOf("-Light");
                variables.fontBold = ( index == data.fontName.length - 6 )? "0" : "1";
            }

            // 获取行距
            if( data.lineSpacing ){
                variables.lineSpacing = '' + Math.round(this.ratio(data.lineSpacing));
            }

            // 文本
            if( data.text ){
                variables.text = '' + data.text;
            }

            // 文本
            if( data.radius ){
                variables.cornerRadius = '' + Math.round(data.radius * 100 ) / 100.0 ;
            }

            // 创建
            if( template["create"] ) {
                code += this.replaceCode(template["create"], variables);
                code += "\n";
            }

            // 初始化代码
            if( template["initial"] ) {
                var initCode = template["initial"]
                for( var s in initCode){
                    // 检查有效属性variable
                    log("id->" + s);
                    code += this.transferCode(s, initCode[s], variables);
                }
            }
        }

        return code;

    },

    // 导出单个Cell对象
    exportCell: function (cell) {

        var data = {};

        var layerName = cell.name();
        var layerNameStr = '' + cell.name();

        if ([layerName hasPrefix:'Label@'] )
        {  // Label属性
            data = this.processLabel(data, cell)
        }
        else if ([layerName hasPrefix:'Image@'] )
        {  // Image属性
            data = this.processImage(data, cell)
        }
        else if ([layerName hasPrefix:'Line@'] )
        {  // Line属性
            data = this.processLine(data, cell)
        }
        else if ([layerName hasPrefix:'View@'] )
        {  // 自定义View
            data = this.processView(data, cell)
        }

        // 生成代码
        var code = this.generateCode(data);
        return code;
    },


    // 运行函数
    exec:function(context){

        if (context.selection.count() == 1) {
            var group = context.selection[0]
            // 生成Cell配置
            var code = this.exportCell(group);
            // 对话框显示
            this.codeView(code);
        }
        else {
            this.warn('请选择一个对象(1次只能选择一个对象)!')
        }

    }
};
