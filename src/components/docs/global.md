## window.Z.global


### **auth（操作用户）**


### **base（操作基础数据）**

### **constant**

### **date（时间、日期）**
#### timestampFormat (value, format)：日期转换
| 参数  | 参数说明            | 类型      | 是否必填    | 默认值         |
| ----------------- | --------------------------------- |------------|------------|--------------- |
| value          | 日期对象            | any       | 是    | -    |
| format         | 转换的格式          | string    | 是    | -    |

#### format (value, format)：日期转换
| 参数名  | 参数说明            | 类型      | 是否必填    | 默认值         |
| ----------------- | --------------------------------- |------------|------------|--------------- |
| value          | 日期对象            | any       | 是    | new Date()    |
| format         | 转换的格式          | string    | 是    | 'YYYY-MM-DD HH:mm:ss'    |

#### getRelativeTimeDesc(start,end,suffix=false)：获取时间差描述
| 参数名  | 参数说明            | 类型      | 是否必填    | 默认值         |
| ----------------- | ----------------- |------------|------------|--------------- |
| start          | 日期对象            | any        | 是    |  -       |
| end            | 日期对象            | any        | 是    |   -      |
| suffix         | 后缀（xxx之前）     | Boolean    | 否     |   false  |

#### getTimestamp()：获取当前服务器的时间戳

#### setTimestamp(time)：设置当前服务器的时间戳

#### showTimestamp(date)：转为moment对象

#### formatDate(date)：日期对象转换为时间戳  date:`string` | `array`（例：changeTimeStamp('2022-10-1')  // 1664553600）

### **enumData(字典、枚举)**

### **math（数字、计算）**
| 函数名            | 方法说明           | 其他描述           |
| ----------------- | ----------------- |-------------------|
| sum(...arg)       |   加法          | 支持多参数，不限参数，例：window.Z.global.math.sum(0.1,0.2,90) // 90.3 |
| diff(...arg)      |   减法          | 同上 |
| multi(...arg)     |   乘法          | 同上 |
| diffArray |   根据数字生成多个连续的数字区间，piece：是否返回对象结构 | 看以下示例 |
| fixedNumber  | 以下 |

#### **fixedNumber (number, digit, defaultValue = null, more) : 自动补全小数**
| 参数            | 参数说明           | 是否必填           |默认值    |
| ----------------- | ----------------- |-------------------|-------------------|
| number | 数值          |是           |-         |
| digit  | 补全数位      |否            |2        |
| defaultValue | number为空时的默认返回值 |否  |null  |
| more | 更多配置：{ suffix,replaceZero }，@suffix 后缀；@replaceZero：数字为0时的返回值 | 否  |-  |

- 例1：window.Z.global.math.fixedNumber(99,2,null,{suffix:'$'}) // '99.00$'
- 例2：window.Z.global.math.fixedNumber(0,2,null,{replaceZero:'-'}) // '-'

#### **diffArray (number, piece = true) 根据数值生成数据**

- 例1：window.Z.global.math.diffArray(100)
// [{"min":0,"max":20},{"min":20,"max":40},{"min":40,"max":60},{"min":60,"max":80},{"min":80,"max":100},{"min":100}]
- 例2: window.Z.global.math.diffArray(100,false)
// [0, 20, 40, 60, 80, 100]

### **message（提示、警告）**

### **path**
| 函数名            | 方法说明           | 其他描述           |
| ----------------- | ----------------- |-------------------|
| setVersion(val)    |   设置版本号          | string |
| getVersion()      |   获取版本号          |  |
| routerPush(options, blank = false)    |   路由/地址跳转         |以下  |
| getRegionFileUrl (url, region)    |   获取图片、文件等资源（统一平台）|例：getRegionFileUrl('/0021/0001/audit-bg.png')  |
| getUseRegion()    |   获取用户区划 |  |
| getFileName(url)    |   获取链接里的文件名称 |  |
| getFileName(url)    |   获取链接里的文件名称 |  |
| pushAuth(url)    |   get方式下载文件 |  |
| routerRefresh()    |   链接过期 重新刷新 |  |
| pushToken    |   为地址参数增加token和platform字段 |例：addQueryUrl('/home',{name:'90',id:10}) //'/home?name=90&id=10&token=xxx&platform=fuchi'  |
| openUrl(url, name = '在线文档', onlineShow = false) | 打开文件、文档 |  |
| isPdf (attachName) | 判断pdf文件 |  |


#### routerPush(options, blank = false) 示例
- 用法1：routerPush('http://www.baidu.com') // 带http
- 用法2：routerPush({path:'/home',query:{id:'asc1'}}) // vue-router
- 用法3：routerPush({path:'/home',query:{id:'asc1'}},true) // vue-router 新页签方式

### **subscribe（观察、订阅者模式）**
| 函数名            | 方法说明           | 其他描述           |
| ----------------- | ----------------- |-------------------|
| bind      | 发起事件监听          | window.Z.global.subscribe.bind('on-test',(val)=>{console.log(val)}) |
| trigger   | 触发事件          | window.Z.global.subscribe.trigger('on-test','触发事件-----') |
| ready     | 触发事件及发起事件监听(包括已发生的事件)  |触发：ready('on-test','触发事件-----------------'),监听：ready('on-test',(val)=>{console.log(val)})  |
| readyOnce | 只触发一次事件 | 触发：ready('on-test','触发事件-----------------'),监听：readyOnce('on-test',(val)=>{console.log(val)}) |
| unbind(event, func)    | 解绑事件          |  |
| clearBind(func) | 清除绑定          |  |

### **utils（方法、工具）**
| 函数名            | 方法说明           | 其他描述           |
| ----------------- | ----------------- |-------------------|
| clone(value)      |   深拷贝          | value: Array | Object |
| windowDownload(url) |   打开额外的新页面    | 例：windowDownload('https://www.baidu.com') |
| setCookie((key, data, options = {})   |  设置cookie   | options为可选配置，具体参数请自行去到`MDN` |
| getCookie(key)     |   获取cookie      |            |
| ellipsisText(str,length)      |   截取字符串显示省略号    |   |
| stringPadStart(str,len,value) |   在前补全字符串  |例：stringPadStart('www.baidu.com',20,'http://') // http://www.baidu.com |
| stringPadEnd(str,len,value)      |   在后补全字符串          | 参考上一条 |
| sumTime(time, format, maxlength = 4) | 秒数转化为x天x时x分x秒| 例：sumTime(300000000)  // '3天11时20分0秒' |
| trim(value) | 去除字符串两端空格| value: `String`| `Object` | `Array` | `Array<object>` |
| getKeyValue (data, key) | 获取对象属性 | 例： getKeyValue({data:{name:'admin'}},'data.name') // 'admin'|
| setKeyValue (data, key,value) | 设置对象属性    |  参考上一条  |
| getArrayValue (arr, key, keyCode = 'id', valueCode = 'name') | 通过键值获取当前对象其他属性的值 |  例: getArrayValue([{name:'admin',id:123}],123) // 'admin'  |
| setKeyValue (data, key,value) | 设置对象属性    |  参考上一条  |
| getJsonPathValue (data, key) | 获取对象属性 | 例： getKeyValue({data:{name:'admin',obj:{id:'007'}}},'data.obj.id') // '007'|
| treeEmptyChildrenClean | treeEmptyChildrenClean | |
| towardShowName | 申报对象获取（个人与单位 | |
| findVue        | 获取vue的指定class样式的子级 | |
| createIconLink | 创建 x-icon 浏览器的显示logo  | |


### **variable**