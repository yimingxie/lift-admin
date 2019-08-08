# avue2.0

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


## 监测内容对应表
```javascript
[
    {
        "monitorVal": "温度",
        "id": 1
    },
    {
        "monitorVal": "湿度",
        "id": 2
    },
    {
        "monitorVal": "风速",
        "id": 3
    },
    {
        "monitorVal": "电流",
        "id": 4
    },
    {
        "monitorVal": "电压",
        "id": 5
    },
    {
        "monitorVal": "振动",
        "id": 6
    },
    {
        "monitorVal": "转速",
        "id": 7
    },
    {
        "monitorVal": "圈数",
        "id": 8
    },
    {
        "monitorVal": "位移",
        "id": 9
    },
    {
        "monitorVal": "开关",
        "id": 10
    },
    {
        "monitorVal": "水浸",
        "id": 11
    },
    {
        "monitorVal": "位移（up）",
        "id": 12
    },
    {
        "monitorVal": "位移（down）",
        "id": 13
    }
]
```

## 基础规则监测内容对应表
```javascript
[
  {
    "dataPointIndex": 0,
    "dataPointName": "电压"
  },
  {
    "dataPointIndex": 1,
    "dataPointName": "电流"
  },
  {
    "dataPointIndex": 2,
    "dataPointName": "距离"
  },
  {
    "dataPointIndex": 3,
    "dataPointName": "转速"
  },
  {
    "dataPointIndex": 4,
    "dataPointName": "转圈计数"
  },
  {
    "dataPointIndex": 5,
    "dataPointName": "温度"
  },
  {
    "dataPointIndex": 6,
    "dataPointName": "湿度"
  },
  {
    "dataPointIndex": 7,
    "dataPointName": "振动速度"
  },
  {
    "dataPointIndex": 8,
    "dataPointName": "振动位移"
  },
  {
    "dataPointIndex": 9,
    "dataPointName": "振动加速度"
  },
  {
    "dataPointIndex": 10,
    "dataPointName": "风速"
  },
  {
    "dataPointIndex": 11,
    "dataPointName": "开/关"
  }
]


```


