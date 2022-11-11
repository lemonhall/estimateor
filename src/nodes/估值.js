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
        setTimeout(function() {
            alert(msg);
        }, 10);
    };

    LiteGraph.registerNodeType("估值/弹窗", Alert);

})(this);
