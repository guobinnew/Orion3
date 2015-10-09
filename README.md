# Orion3
Sketch plugin for Code(iOS/Swift, Android, CSS)

本插件的功能从Sketch文件中直接提取设计要素，并转换为目标代码，安装非常简单，将插件拷贝到sketch的插件目录即可（从菜单"Plugins"->"Reveal Plugins Folder..."打开插件所在目录）.安装成功后，在菜单“Plugins”下能够看到Orion插件选项

使用方法
1.在sketch文件中，选中一个对象（例如文本），按规则重新命名：Type@Name, 其中Type为对象实现类型，Name为对象名（对于iOS/Swift, 为代码中变量名，对于Android，为对象id，对于CSS，则为标签class（暂时没有用到））；
文字： Label@xxxxx
图像： Image@xxxx
线条: Line@xxxx
区域：View@xxxx
2.按下快捷键或从插件菜单来执行，然后将生成的代码拷贝到工程项目中即可。
  iOS:  Ctrl+O
  Swift: Ctrl+W
  Andriod: Ctrl+D
