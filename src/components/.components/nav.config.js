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
            path: "/main",
            title: "页面布局",
          },
        ],
      },
      {
        groupName: "form表单",
        list:[
          {
            path:'/upload',
            title:'文件上传'
          },
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
            path:'/pagination',
            title:'分页'
          },
          {
            path:'/show-more',
            title:'展示更多'
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
            path:'/tb',
            title:'标签切换'
          },

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
            path: "/list-import",
            title: "listImport 名单导入",
          },
          {
            path:'/news-search',
            title:'搜索'
          }
          
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
