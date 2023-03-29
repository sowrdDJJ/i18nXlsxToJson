const path = require("path");
const fs = require("fs");
const xlsx = require("node-xlsx");
const { dialog } = require("electron");

async function handleFileOpen(params, message) {
  try {
    const { canceled, filePaths } = await dialog.showOpenDialog();
    if (canceled) {
      return;
    } else {
      const type = filePaths[0].split(".")[filePaths[0].split(".").length - 1];
      if (type === "xlsx") {
        let xlsxData = xlsx.parse(path.join(filePaths[0]));
        xlsxData[0].data = xlsxData[0].data.map((item) => {
          if (Array.isArray(item)) {
            item = item.map((itemG) => {
              let contentData = itemG.split("");
              let newContentData = [];
              // contentData.forEach((itemC, index) => {
                // if (
                //   itemC === "x" &&
                //   index - 1 >= 0 &&
                //   contentData[index - 1] === "x"
                // ) {
                //   return;
                // }
              //   newContentData.push(itemC);
              // });
              let curVar = 0;
              let empty = [];
              newContentData = contentData.map((itemNC, indexNC) => {
                if (
                  itemNC === "x" &&
                  indexNC - 1 >= 0 &&
                  contentData[indexNC - 1] === "x"
                ) {
                  itemNC = `{${curVar}}`;
                  empty.push(indexNC - 1);
                }
                return itemNC;
              }).filter((itemNF, indexNF) => {
                return !empty.includes(indexNF)
              });
              return newContentData.join("");
            });
          }
          return item;
        });
        console.log(xlsxData[0].data[0]);
        const jsonData = {};
        const lKey = xlsxData[0].data[0];
        xlsxData[0].data[0].forEach((item, index) => {
          if (item) {
            jsonData[index] = {};
            if (!lKey.includes(item)) {
              lKey.push(item);
            }
          }
        });
        console.log(jsonData);
        xlsxData[0].data.splice(1).forEach((item, index) => {
          if (item.length) {
            item.forEach((itemC, indexC) => {
              for (let i in jsonData) {
                if (indexC === i * 1) {
                  jsonData[i][`${lKey[i]}_${index + message.number}`] = itemC;
                }
              }
            });
          }
        });
        console.log(xlsxData[0].data[0]);
        xlsxData[0].data[0].forEach((item, index) => {
          console.log(item);
          jsonData[item] = jsonData[index]
          delete jsonData[index]
        })
        const newFilePath = `${path
          .join(filePaths[0])
          .split("\\")
          .splice(0, path.join(filePaths[0]).split("\\").length - 1)
          .join("\\")}/data_${parseInt(Math.random() * 10000)}.json`;
        fs.writeFile(newFilePath, JSON.stringify(jsonData), (err) => {
          console.log(err);
        });

        return {
          type: "success",
          data: xlsxData[0].data,
          filePaths: newFilePath,
        };
      } else {
        return {
          type: "error",
          msg: "请传入xlsx文件",
        };
      }
    }
  } catch (err) {
    console.log(err);
    return {
      type: "error",
      msg: "文件解析错误",
    };
  }
}

module.exports = { handleFileOpen };
