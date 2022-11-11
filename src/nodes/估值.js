//widgets
(function(global) {
    var LiteGraph = global.LiteGraph;

    /* Button ****************/

    function WidgetButton() {
        this.addOutput("", LiteGraph.EVENT);
        this.addOutput("", "boolean");
        this.addProperty("text", "点击我");
        this.addProperty("font_size", 15);
        this.addProperty("message", "");
        this.size = [164, 84];
        this.clicked = false;
    }

    WidgetButton.title = "触发器";
    WidgetButton.desc = "Triggers an event";

    WidgetButton.font = "Arial";
    WidgetButton.prototype.onDrawForeground = function(ctx) {
        if (this.flags.collapsed) {
            return;
        }
        var margin = 10;
        ctx.fillStyle = "black";
        ctx.fillRect(
            margin + 1,
            margin + 1,
            this.size[0] - margin * 2,
            this.size[1] - margin * 2
        );
        ctx.fillStyle = "#AAF";
        ctx.fillRect(
            margin - 1,
            margin - 1,
            this.size[0] - margin * 2,
            this.size[1] - margin * 2
        );
        ctx.fillStyle = this.clicked
            ? "white"
            : this.mouseOver
            ? "#668"
            : "#334";
        ctx.fillRect(
            margin,
            margin,
            this.size[0] - margin * 2,
            this.size[1] - margin * 2
        );

        if (this.properties.text || this.properties.text === 0) {
            var font_size = this.properties.font_size || 30;
            ctx.textAlign = "center";
            ctx.fillStyle = this.clicked ? "black" : "white";
            ctx.font = font_size + "px " + WidgetButton.font;
            ctx.fillText(
                this.properties.text,
                this.size[0] * 0.5,
                this.size[1] * 0.5 + font_size * 0.3
            );
            ctx.textAlign = "left";
        }
    };

    WidgetButton.prototype.onMouseDown = function(e, local_pos) {
        if (
            local_pos[0] > 1 &&
            local_pos[1] > 1 &&
            local_pos[0] < this.size[0] - 2 &&
            local_pos[1] < this.size[1] - 2
        ) {
            this.clicked = true;
            this.setOutputData(1, this.clicked);
            this.triggerSlot(0, this.properties.message);
            return true;
        }
    };

    WidgetButton.prototype.onExecute = function() {
        this.setOutputData(1, this.clicked);
    };

    WidgetButton.prototype.onMouseUp = function(e) {
        this.clicked = false;
    };

    LiteGraph.registerNodeType("估值/触发器", WidgetButton);

    /* Button ****************/

    function WidgetDefineCells() {
        this.addOutput("", LiteGraph.EVENT);
        this.addOutput("", "string");
        this.addProperty("text", "选择单元格范围");
        this.addProperty("font_size", 15);
        this.addProperty("message", "");
        this.size = [160, 60];
        this.clicked = false;
    }

    WidgetDefineCells.title = "选择单元格范围";
    WidgetDefineCells.desc = "选择单元格范围";

    WidgetDefineCells.font = "Arial";
    WidgetDefineCells.prototype.onDrawForeground = function(ctx) {
        if (this.flags.collapsed) {
            return;
        }
        var margin = 10;
        ctx.fillStyle = "black";
        ctx.fillRect(
            margin + 1,
            margin + 1,
            this.size[0] - margin * 2,
            this.size[1] - margin * 2
        );
        ctx.fillStyle = "#AAF";
        ctx.fillRect(
            margin - 1,
            margin - 1,
            this.size[0] - margin * 2,
            this.size[1] - margin * 2
        );
        ctx.fillStyle = this.clicked
            ? "white"
            : this.mouseOver
            ? "#668"
            : "#334";
        ctx.fillRect(
            margin,
            margin,
            this.size[0] - margin * 2,
            this.size[1] - margin * 2
        );

        if (this.properties.text || this.properties.text === 0) {
            var font_size = this.properties.font_size || 30;
            ctx.textAlign = "center";
            ctx.fillStyle = this.clicked ? "black" : "white";
            ctx.font = font_size + "px " + WidgetButton.font;
            ctx.fillText(
                this.properties.text,
                this.size[0] * 0.5,
                this.size[1] * 0.5 + font_size * 0.3
            );
            ctx.textAlign = "left";
        }
    };

    WidgetDefineCells.prototype.onMouseDown = function(e, local_pos) {
        if (
            local_pos[0] > 1 &&
            local_pos[1] > 1 &&
            local_pos[0] < this.size[0] - 2 &&
            local_pos[1] < this.size[1] - 2
        ) {
            var getRangeAxis = window.luckysheet.getRangeAxis();
            this.properties.message = getRangeAxis;
            this.clicked = true;
            this.setOutputData(1, getRangeAxis);
            this.triggerSlot(0, this.properties.message);
            return true;
        }
    };

    WidgetDefineCells.prototype.onExecute = function() {
        this.setOutputData(1, this.clicked);
    };

    WidgetDefineCells.prototype.onMouseUp = function(e) {
        this.clicked = false;
    };

    LiteGraph.registerNodeType("估值/选择单元格范围", WidgetDefineCells);

    //Show value inside the debug console
    function Alert() {
        this.mode = LiteGraph.ON_EVENT;
        this.addProperty("msg", "");
        this.addInput("log", LiteGraph.EVENT);
        this.addInput("msg", 0);
        this.addOutput("", LiteGraph.EVENT);
        this.addOutput("", "string");
        var that = this;
        this.widget = this.addWidget("text", "值", "", "msg");
        this.widgets_up = true;
        this.size = [200, 60];
    }

    Alert.title = "弹窗";
    Alert.desc = "Show an alert window";
    Alert.color = "#510";

    Alert.prototype.onConfigure = function(o) {
        this.widget.value = o.properties.msg;
    };

    Alert.prototype.onAction = function(action, param) {
        var msg = this.getInputData(1); 
        this.properties.msg = msg;
        this.setOutputData(0, LiteGraph.EVENT);
        this.setOutputData(1, msg);
        this.triggerSlot(0, this.properties.msg);

        setTimeout(function() {
            alert(msg);
            console.log("in 弹窗")
            console.log(msg);
        }, 10);
    };

    LiteGraph.registerNodeType("估值/弹窗", Alert);

    //Show value inside the debug console
    function getCellsValues() {
        this.mode = LiteGraph.ON_EVENT;
        this.addInput("事件触发器", LiteGraph.EVENT);
        this.addInput("单元格坐标", 0);
        this.addOutput("事件触发器", LiteGraph.EVENT);
        this.addOutput("forEach单元格值", "string");
        var that = this;
        this.size = [200, 60];
    }

    getCellsValues.title = "单元格内容获取器";
    getCellsValues.desc = "获取单元格内的值";
    getCellsValues.color = "#510";

    getCellsValues.prototype.onAction = function(action, param) {
        var range = this.getInputData(1);
        var json_value_array = window.luckysheet.getRangeArray("twoDimensional",range);
        for(item in json_value_array){
             var item_value = json_value_array[item];
             this.setOutputData(0, LiteGraph.EVENT);
             console.log(item_value);
             this.setOutputData(1, item_value);
             this.triggerSlot(0, range);
        }
        // this.setOutputData(0, LiteGraph.EVENT);
        // this.setOutputData(1, json_value_array);
        // this.triggerSlot(0, range);
        setTimeout(function() {
            alert(json_value_array);
            console.log(json_value_array);
        }, 10);
    };

    LiteGraph.registerNodeType("估值/单元格内容获取器", getCellsValues);

    /* 选择器 ****************/
    function WidgetCombo() {
        this.addInput("事件触发器", LiteGraph.EVENT);
        this.addInput("列表选项", 0);
        this.addOutput("选择项", "string");
        this.addOutput("选项变化触发器", LiteGraph.EVENT);
        this.size = [80, 60];
        this.properties = { value: "A", values:"A;B;C" };
        this.old_y = -1;
        this.mouse_captured = false;
        this._values = this.properties.values.split(";");
        var that = this;
        this.widgets_up = true;
        this.widget = this.addWidget("combo","", this.properties.value, function(v){
            that.properties.value = v;
            that.triggerSlot(1, v);
        }, { property: "value", values: this._values } );
    }

    WidgetCombo.title = "选择器";
    WidgetCombo.desc = "Widget to select from a list";

    WidgetCombo.prototype.onAction = function(action, param) {
        var msg = this.getInputData(1);
        console.log("选择器控件内调试信息：");
        console.log(msg);
        this.properties = { value: "A", values:msg};
        this._values = msg.split(";");
        this.widget.options.values = this._values;
        this.properties = { value:this._values[0]};
    };

    WidgetCombo.prototype.onExecute = function() {
        //console.log("选择器控件内调试信息：",this.properties.value);
        //this.setOutputData( 0, this.properties.value );
    };

    WidgetCombo.prototype.onPropertyChanged = function(name, value) {
        if(name == "values")
        {
            this._values = value.split(";");
            this.widget.options.values = this._values;
        }
        else if(name == "value")
        {
            this.widget.value = value;
            this.setOutputData(0, value);
            //this.triggerSlot(1, value);
        }
    };

    LiteGraph.registerNodeType("估值/选择器", WidgetCombo);

    /* Button ****************/

    function WidgetGetCellTable() {
        this.addOutput("触发器", LiteGraph.EVENT);
        this.addOutput("表格对象", "string");
        this.addOutput("第一列选择值", "string");
        this.addProperty("text", "取得范围内表格数据");
        this.addProperty("font_size", 15);
        this.addProperty("message", "");
        this.size = [200, 60];
        this.clicked = false;
    }

    WidgetGetCellTable.title = "取得范围内表格数据";
    WidgetGetCellTable.desc = "取得范围内表格数据";

    WidgetGetCellTable.font = "Arial";
    WidgetGetCellTable.prototype.onDrawForeground = function(ctx) {
        if (this.flags.collapsed) {
            return;
        }
        var margin = 10;
        ctx.fillStyle = "black";
        ctx.fillRect(
            margin + 1,
            margin + 1,
            this.size[0] - margin * 2,
            this.size[1] - margin * 2
        );
        ctx.fillStyle = "#AAF";
        ctx.fillRect(
            margin - 1,
            margin - 1,
            this.size[0] - margin * 2,
            this.size[1] - margin * 2
        );
        ctx.fillStyle = this.clicked
            ? "white"
            : this.mouseOver
            ? "#668"
            : "#334";
        ctx.fillRect(
            margin,
            margin,
            this.size[0] - margin * 2,
            this.size[1] - margin * 2
        );

        if (this.properties.text || this.properties.text === 0) {
            var font_size = this.properties.font_size || 30;
            ctx.textAlign = "center";
            ctx.fillStyle = this.clicked ? "black" : "white";
            ctx.font = font_size + "px " + WidgetButton.font;
            ctx.fillText(
                this.properties.text,
                this.size[0] * 0.5,
                this.size[1] * 0.5 + font_size * 0.3
            );
            ctx.textAlign = "left";
        }
    };

    //从选择的二维表当中得到形状如{class1:0,class2:1,class2:3}
    //这样的key和行号对象键值对，方便未来查找
    //已经弃用了
    function getKeyRowIndexPairFromTwoDimensionalArray(twoDimensionalArray){
        var key_rowIndexPair={};

        for(row_index in twoDimensionalArray){
                var row = twoDimensionalArray[row_index];
                var key = row[0];
                key_rowIndexPair[key]=row_index;
        }

        return key_rowIndexPair;
    }

    //从选择的二维表当中得到形状如{class1:"1;2;3",class2:"1;2;3",class2:"1;2;3"}
    //这样的key和行号对象键值对，方便未来查找
    function getKeyRowValuePairFromTwoDimensionalArray(twoDimensionalArray){
        var keyRowValuePair={};

        for(row_index in twoDimensionalArray){
                var row = twoDimensionalArray[row_index];
                var key = row[0];
                var value = row[1];
                keyRowValuePair[key]=value;
        }

        return keyRowValuePair;
    }

    //从选择的二维表当中得到形状如{class1:"1;2;3",class2:"1;2;3",class2:"1;2;3"}
    //这样的key和行号对象键值对，方便未来查找
    function genKeySeqFromTwoDimensionalArray(twoDimensionalArray){
        var keySeq=""

        for(row_index in twoDimensionalArray){
                var row = twoDimensionalArray[row_index];
                var key = row[0];
                keySeq=keySeq+key+";"
        }

        return keySeq;
    }

    WidgetGetCellTable.prototype.onMouseDown = function(e, local_pos) {
        if (
            local_pos[0] > 1 &&
            local_pos[1] > 1 &&
            local_pos[0] < this.size[0] - 2 &&
            local_pos[1] < this.size[1] - 2
        ) {
            var getRangeAxis = window.luckysheet.getRangeAxis();
            var json_value_array = window.luckysheet.getRangeArray("twoDimensional",getRangeAxis);
            var keyRowValuePair = getKeyRowValuePairFromTwoDimensionalArray(json_value_array);
            var keySeq=genKeySeqFromTwoDimensionalArray(json_value_array);
            console.log(keyRowValuePair);
            console.log(keySeq);


            this.properties.message = json_value_array;
            this.clicked = true;
            this.setOutputData(1, keyRowValuePair);
            this.setOutputData(2, keySeq);

            this.triggerSlot(0, this.properties.message);
            return true;
        }
    };

    WidgetGetCellTable.prototype.onExecute = function() {
        this.setOutputData(1, this.clicked);
    };

    WidgetGetCellTable.prototype.onMouseUp = function(e) {
        this.clicked = false;
    };

    LiteGraph.registerNodeType("估值/取得范围内表格数据", WidgetGetCellTable);

    /* 选双择器 ****************/
    function WidgetDoubleCombo() {
        this.addInput("事件触发器", LiteGraph.EVENT);
        this.addInput("一级选项输入", 0);
        this.addInput("两级选项输入", 0);
        this.addOutput("选项变化触发器", LiteGraph.EVENT);
        this.addOutput("一级选项输出", "string");
        this.addOutput("二级选项输出", "string");
        this.size = [200, 100];
        this.properties = { value: "A", values:"A;B;C" };
        this.old_y = -1;
        this.mouse_captured = false;
        this._values = this.properties.values.split(";");
        var that = this;
        this.widgets_up = true;
        //LGraphNode.prototype.addWidget = function( type, name, value, callback, options )
        this.widget1 = this.addWidget("combo","keySeq", this.properties.value, function(v){
            console.log("两级选择器，keySeq:");
            console.log(v);
            that.properties.selectedKey = v;
            var valueSeq = that.properties.valueSeqValues[v];
            console.log("两级选择器，addWidget1,valueSeq:");
            console.log(valueSeq);
            that._valueSeqValues = valueSeq.split(";");
            that.widget2.options.values = that._valueSeqValues;
            that.setOutputData(1, v);
            that.setOutputData(2, that.properties.selectedValue);
            that.triggerSlot(0, v);
        }, { property: "name", values: this._values } );

        this.widget2 = this.addWidget("combo","valueSeq", this.properties.value, function(v){
            console.log("两级选择器，valueSeq:");
            console.log(v);
            that.properties.selectedValue = v;
            that.setOutputData(1, that.properties.selectedKey);
            that.setOutputData(2, v);
            that.triggerSlot(0, v);
        }, { property: "name", values: this._values } );
    }

    WidgetDoubleCombo.title = "两级选择器";
    WidgetDoubleCombo.desc = "Widget to select from a list";

    WidgetDoubleCombo.prototype.onAction = function(action, param) {
        var keySeq = this.getInputData(1);
        console.log("两级选择器，onAction,keySeq:");
        console.log(keySeq);
        this.properties.keySeqValues = keySeq;
        this._keySeqValues = keySeq.split(";");
        this.widget1.options.values = this._keySeqValues;

        var valueSeq = this.getInputData(2);
        this.properties.valueSeqValues = valueSeq;
        console.log("两级选择器，onAction,valueSeq:");
        console.log(valueSeq);
    };

    WidgetDoubleCombo.prototype.onExecute = function() {
        //console.log("选择器控件内调试信息：",this.properties.value);
        //this.setOutputData( 0, this.properties.value );
    };

    WidgetDoubleCombo.prototype.onPropertyChanged = function(name, value) {
        console.log("两级选择器，onPropertyChanged,name:",name)
            console.log(value)
    };

    LiteGraph.registerNodeType("估值/两级选择器", WidgetDoubleCombo);

})(this);
