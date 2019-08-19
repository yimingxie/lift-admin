let pcas = require("./citySelector/pcas-code.json")

var areaOptions = []
var  newFormat = {}
export default {
  /**
   * 重新组成新的结构
  */
  newAreaOption() {
    
    // 区域选择 省-市数据
    // 一级循环，加载省市下拉选项
    pcas.forEach((item, i) => {
      let obj = {
        value: item.code,
        label: item.name,
        children: []
      }
      newFormat[item.code] = item.name

      if (item.children) {
        // 二级循环
        item.children.forEach((secondItem, secondI) => {
          let secondObj = {
            value: secondItem.code,
            label: secondItem.name,
          }
          newFormat[secondItem.code] = secondItem.name

          if (secondItem.children) {
            secondObj.children = []

            // 三级循环
            secondItem.children.forEach((thirdItem, thirdI) => {
              let thirdObj = {
                value: thirdItem.code,
                label: thirdItem.name,
              }
              newFormat[thirdItem.code] = thirdItem.name


              if (thirdItem.children) {
                thirdObj.children = []

                // 四级循环
                thirdItem.children.forEach((fourthItem, fourthI) => {
                  let fourthObj = {
                    value: fourthItem.code,
                    label: fourthItem.name,
                  }
                  newFormat[fourthItem.code] = fourthItem.name

                  thirdObj.children.push(fourthObj)
                })
              }
              secondObj.children.push(thirdObj)

            })

          }
          obj.children.push(secondObj)
        })
      }
      areaOptions.push(obj)

    })
    // console.log("areaOptions==" + JSON.stringify(areaOptions))
    return areaOptions
  },
  // 根据areaCode 返回地区名称
  /**
   * 
   * @param codeList 区code码的字符串集合
   */
  getAreaName(codeList){
    // var codeList = "440304,440303001,440303003,440303004,440303005,440303006,440303007,440303008,440303009,440303010"
    if(codeList){
      var codeArr = codeList.split(",")
      var getAreaNameList = []
      codeArr.forEach(areaCode => {
        pcas.forEach((firstItem, i) => {
          if (firstItem.children) {
            // 二级循环
            firstItem.children.forEach((secondItem, secondI) => {
              if (secondItem.children) {
                // 三级循环
                secondItem.children.forEach((thirdItem, thirdI) => {

                  // 区-全部
                  
                  if(areaCode.length === 6 && thirdItem.code === areaCode){
                    var areaObj = {
                      "name": thirdItem.name,
                      "data": '全部'
                    }
                    getAreaNameList.push(areaObj)
                  } else {
                    if (thirdItem.children) {
      
                      // 四级循环
                      
                      thirdItem.children.forEach((fourthItem, fourthI) => {
                        // 区-片区
                        if(areaCode.length > 6 && fourthItem.code === areaCode && areaCode.substring(0,6) === thirdItem.code){
                          var areaObj2 = {
                            "name": thirdItem.name,
                            "data": fourthItem.name
                          }
                          getAreaNameList.push(areaObj2)
                          
                        }

                      })
                    }
                  }

                })
              }
            })
          }
        })
      })
      // console.log("getAreaNameList:" +  JSON.stringify(getAreaNameList))
      var dest = [],
      map = {};
      for(var i = 0; i < getAreaNameList.length; i++) {
          var ai = {
            "name" : getAreaNameList[i].name,
            "data": getAreaNameList[i].data
          }
        if(!map[ai.name]) {
          dest.push({
            name: ai.name,
            data: [ai.data]
          });
          map[ai.name] = ai;
        } else {
          for(var j = 0; j < dest.length; j++){
            var dj = dest[j];
            if(dj.name == ai.name) {
              dj.data.push(ai.data);
              break;
            }
          }
        }
        // console.log("所选区域码ai:" +  JSON.stringify(ai))
      }
      var selectedAreaLabels = []
      console.log("所选区域码:" +  JSON.stringify(dest));
      dest.forEach(item =>{
        var labelItem = item.name + "-" + item.data
        selectedAreaLabels.push(labelItem)
      })

      // console.log("getAreaNameList" + JSON.stringify(selectedAreaLabels) )
      return selectedAreaLabels
    }
    
  },
  // uploadPicUrl() {
  //   return 
  // }

}
