/*
 * @Author: cjl (alincc@126.com)
 * @Date: 2023-01-31 17:15:58
 */
export default [
  {
    name: "更新日志",
    path: "/changelog",
  },
  {
    name: "Iconfont",
    href: "https://www.iconfont.cn/",
  },
  {
    name: "Vue",
    href: "https://cn.vuejs.org/",
  },
  {
    name: "开发规范",
    children: [
      {
        path: "/git",
        name: "代码提交规范",
      },
      {
        path: "/docs-rule",
        name: "文档编写规范",
      },
      {
        path:'/ftest',
        name:'测试'
      }
    ],
  },
  {
    name: "组件",
    groups: [
      {
        groupName: "基础组件",
        list: [
          {
            path: "/layout",
            title: "Layout 布局",
          },
          {
            path: "/btns",
            title: "btns 操作按钮",
          },
          {
            path: "/footer-button",
            title: "footer-button 底部按钮",
          },
          {
            path: "/header",
            title: "header 头部组件",
          },
          {
            path: "/main",
            title: "页面布局",
          },
          {
            path: "/menu",
            title: "菜单",
          },
        ],
      },
      {
        groupName: "form表单",
        list:[
          {
            path: '/filters',
            title: '筛选条件'
          },
          {
            path:'/upload',
            title:'文件上传'
          },
          {
            path:'/select',
            title:'select选择器'
          },
          {
            path:'/listOperate',
            title:'搜索框'
          }
        ]
      },
      {
        groupName: "dialog弹窗",
        list:[
          {
            path: "/agree",
            title: "agree",
          },
          {
            path:'/check',
            title:'审核弹窗'
          },
          {
            path:'/check-log',
            title:'审核日志'
          },
          {
            path:'/data-verify',
            title:'数据异常弹窗'
          },
          {
            path: "/list-import",
            title: "名单导入",
          },
          {
            path:'/import-results',
            title:'导入结果异常'
          }
        ]
      },
      {
        groupName: "数据展示",
        list: [
          {
            path:'/text',
            title:'文本展开/收起'
          },
          {
            path: "/empty",
            title: "空数据展示",
          },
          {
            path:'/pagination',
            title:'分页'
          },
          {
            path:'/show-more',
            title:'展示更多'
          },
          {
            path:'/table',
            title:'表格'
          },
          {
            path:'/info-table',
            title:'其他表格'
          },
        ]
      },
      {
        groupName: "提示/警告",
        list: [
          {
            path: "/opinion",
            title: "意见弹窗",
          },
        ],
      },
      {
        groupName: "导航、跳转",
        list: [
          {
            path: "/bread",
            title: "面包屑",
          },
          {
            path: "/anchor",
            title: "anchor 标签页",
          },
          {
            path: "/tabs",
            title: "tabs 标签页",
          },
          {
            path:'/tb',
            title:'标签切换'
          },
        ],
      },
      {
        groupName: "文件操作",
        list: [
          {
            path: "/download-tip",
            title: "download-tip 下载或读取附件文件",
          },
          {
            path: "/file-tip",
            title: "file-tip 读取文件",
          },
          {
            path: "/file",
            title: "file 上传其他附件",
          }
        ],
      },
      {
        groupName: "其他",
        list: [
          {
            path: "/backtop",
            title: "Backtop 回到顶部",
          },
          {
            path: "/box-header",
            title: "box-header 头部提示",
          },
          {
            path:'/news-search',
            title:'搜索'
          },
          
          
        ],
      },
    ],
  },
  {
    name: "全局方法",
    children:[
      {
        path: "/global",
        title: "global"
      },
      {
        path: "/service",
        title: "service"
      }
    ]
  },
  {
    path:'/directives',
    title: "自定义指令"
  }
];
