1、项目地址
https://github.com/dream-num/Luckysheet

2、下载所有的文件
<link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/luckysheet@latest/dist/plugins/css/pluginsCss.css' />
<link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/luckysheet@latest/dist/plugins/plugins.css' />
<link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/luckysheet@latest/dist/css/luckysheet.css' />
<link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/luckysheet@latest/dist/assets/iconfont/iconfont.css' />
<script src="https://cdn.jsdelivr.net/npm/luckysheet@latest/dist/plugins/js/plugin.js"></script>
<script src="https://cdn.jsdelivr.net/npm/luckysheet@latest/dist/luckysheet.umd.js"></script>


替换成

<link rel='stylesheet' href='./pluginsCss.css' />
<link rel='stylesheet' href='./plugins.css' />
<link rel='stylesheet' href='./luckysheet.css' />
<link rel='stylesheet' href='./iconfont.css' />
<script src="./plugin.js"></script>
<script src="./luckysheet.umd.js"></script>

3、新建一个容器
<div id="luckysheet" style="margin:0px;padding:0px;position:absolute;width:100%;height:100%;left: 0px;top: 0px;"></div>

4、加载代码到容器
<script>
    $(function () {
        //Configuration item
        var options = {
            container: 'luckysheet' //luckysheet is the container id
        }
        luckysheet.create(options)
    })
</script>


5、配置一下哈
https://dream-num.github.io/LuckysheetDocs/guide/config.html#basic-structure

// Configuration item
const options = {
     container:'luckysheet', // set the id of the DOM container
     title:'Luckysheet Demo', // set the name of the table
     lang:'zh' // set language

     // More other settings...
}

// Initialize the table
luckysheet.create(options)

6、中文文档


7、尝试加载数据
远端加载数据是loadUrl还是updateUrl？
A：loadUrl。配置了loadUrl，Luckysheet会通过ajax请求整个表格数据，而updateUrl会作为协同编辑实时保存的接口地址。 注意：初始化数据需要配置loadUrl参数，而协同编辑则在配置loadUrl、updateUrl和allowUpdate四个参数才能生效。

#

8、保存数据
Luckysheet如何把表格里的数据保存到数据库？有没有服务端存储和协作的解决方案？
A：有两个方案：

一是表格操作完成后，使用luckysheet.getAllSheets()方法获取到全部的工作表数据，全部发送到后台存储。
二是开启协同编辑功能，实时传输数据给后端。 具体的操作步骤参考这篇文章：Luckysheet如何把表格里的数据保存到数据库(opens new window)
#


