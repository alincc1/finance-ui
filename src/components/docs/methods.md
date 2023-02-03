## 全局方法

### global

#### **auth（操作用户）**


#### **base（操作基础数据）**

#### **constant**

#### **date（时间、日期）**
##### timestampFormat (value, format)：日期转换
| 参数  | 参数说明            | 类型      | 是否必填    | 默认值         |
| ----------------- | --------------------------------- |------------|------------|--------------- |
| value          | 日期对象            | any       | 是    | -    |
| format         | 转换的格式          | string    | 是    | -    |

##### format (value, format)：日期转换
| 参数名  | 参数说明            | 类型      | 是否必填    | 默认值         |
| ----------------- | --------------------------------- |------------|------------|--------------- |
| value          | 日期对象            | any       | 是    | new Date()    |
| format         | 转换的格式          | string    | 是    | 'YYYY-MM-DD HH:mm:ss'    |

##### getRelativeTimeDesc(start,end,suffix=false)：获取时间差描述
| 参数名  | 参数说明            | 类型      | 是否必填    | 默认值         |
| ----------------- | ----------------- |------------|------------|--------------- |
| start          | 日期对象            | any        | 是    |  -       |
| end            | 日期对象            | any        | 是    |   -      |
| suffix         | 后缀（xxx之前）     | Boolean    | 否     |   false  |

##### getTimestamp()：获取当前服务器的时间戳

##### setTimestamp(time)：设置当前服务器的时间戳

##### showTimestamp(date)：转为moment对象

##### changeTimeStamp(date)：日期对象转换为时间戳（例：changeTimeStamp('2022-10-1')  // 1664553600）


#### **utils（方法、工具）**
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
| treeEmptyChildrenClean |  | |
| towardShowName |  | |
| findVue        |  | |
| init           |  | |
| createIconLink |  | |

### service


### constant
