"build": {
    "appId": "cc11001100.electron.example-001", // 程序包名
    "copyright": "CC11001100", // 版权相关信息
    "productName": "example-001", // 安装包文件名
    "directories": {
        "buildResources": "build", //指定打包需要的静态资源，默认是build
        "output": "dist" // 安装包生成目录
    },
    "nsis": {
        "oneClick": false, // 是否一键安装
        "language": "2052", //安装语言，2052对应中文
        "perMachine": true, //为当前系统的所有用户安装该应用程序
        "allowToChangeInstallationDirectory": true // 允许用户选择安装目录
    },
    "dmg": {
        "background": "res/background.png", // 背景图片的路径
        "icon": "build/icons/icon.icns", //安装图标
        "iconSize": 100, //图标的尺寸
        "contents": [ //安装图标在安装窗口中的坐标信息
            {
                "x": 380,
                "y": 180,
                "type": "link",
                "path": "/Applications"
            },
            {
                "x": 130,
                "y": 180,
                "type": "file"
            }
        ],
        "window": {
            // 启动后窗口左上角位置
            "x": 100,
            "y": 100,
            // 启动后窗口的大小
            "width": 500,
            "height": 300
        }
    },
    "mac": {
        "target": [
            "dmg",
            "zip"
        ], //安装包的格式，默认是"dmg"和"zip"
        "category": "public.app-category.utilities" //应用程序安装到哪个分类下，具体有哪些分类可以在苹果官网上找
    },
    "win": {
        "icon": "build/icons/food.png", // 安装包图标，必须为 256 * 256 像素图片
        "target": [
            "target": "nsis",
            "arch": [ // 这个意思是打出来32 bit + 64 bit的包，但是要注意：这样打包出来的安装包体积比较大，所以建议直接打32的安装包，默认64位。
                "x64", 
                "ia32"
            ]
        ]
    },
    "files": [
      "build/**/*",
      "main.js",
      "public/preload.js"
    ],
    "extends": null
}