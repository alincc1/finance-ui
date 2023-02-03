### Global全局
> 通过Vue install 注册至全局prototype中；
```javascript
export default{
  install (Vue, options) {
    // 全局属性
    const G = { auth }
    Vue.prototype.G = G
  }
}
```

### 函数和属性一览

#### [auth模块](./auth)

  * 设置登录用户
 ```shell
  func    auth.setLoginUser
  params  user # 用户信息
  return  null
  ```

  * 获取登录用户
```shell
  func    auth.getLoginUser
  params  null
  return  user  #用户对象
```

  * 删除登录用户
```shell
  func    removeLoginUser
  params  null
  return null
```

  * 是否为政府用户
```shell
  func    isGov
  params  null
  return  Boolean # true表示为政府用
```
