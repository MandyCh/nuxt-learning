# NUXT 入门

## 安装

```shell
node  v18.0.0 or newer

npx nuxi@latest init <project-name>

cd <project-name>

pnpm dev
```

## 目录

.
├── .nuxt -- 开发期间自动生成 Vue 应用程序和配置的目录，pnpm dev 时重新创建整个目录，不要修改此目录内容。
├── .output -- 生产构建 npm run build 应用程序时创建
├── .nuxtignore -- 允许 Nuxt 在构建阶段忽略目录和文件，编写规范与.gitignore 相同。另外也可以在~/nuxt.config.ts 中配置 ignoreOptions、ignorePrefix 和 ignore 选项。
├── dist -- 生产构建 npm run generate
├── app.vue -- 应用配置文件，页面挂载
├── assets -- 静态资源（别名～）
├── middleware -- 路由中间件
├── composables -- 公共函数文件，子目录不会自动导入
├── content -- 内容文件，子目录不会自动导入
├── plugins -- 插件，第三方插件可在此配置
├── components -- 组件文件，子目录会自动导入
├── utils -- 工具函数文件
├── nuxt.config.ts -- 配置文件
├── pages -- 页面文件，根据路径文件名自动生成路由
│ ├── components -- 页面组件
│ └── index.vue -- 根路由
├── layouts -- 项目布局组件
├── public -- 公共资源文件
├── server -- 服务端处理代码文件
├── error.vue -- 项目异常统一处理页面
├── package.json
└── tsconfig.json -- TypeScript 的配置文件

> nuxt build 用于构建应用程序的生产版本，而 nuxt generate 用于生成静态站点。nuxt build 会构建应用程序的客户端和服务器端代码，而 nuxt generate 会预渲染所有路由并生成静态 HTML 文件，适用于静态站点部署。

## pages

页面必须放在项目根目录的 pages 目录下，页面是 Vue 组件，可以具有.vue、.js、.jsx、.ts 或.tsx 扩展名
页面路径与页面的路由相对应

## 路由

### 页面路径

Nuxt3 采用约定路由方式，当我们创建了 pages 文件夹目录后，Nuxt3 会自动集成 vue-router，结合 pages 目录下的文件(夹)名来构建我们的项目 routes 配置

> 由于 Nuxt3 采用约定式开发，因此 pages 页面路径（不要与后面的根路径重复）、server 服务端路径（含 api 和 routes，推荐统一到/api 和/server）、public 资源路径（推荐统一到/resource）等自行做好根路径约定和区分，不要混淆或者重复。

### 动态路由

在 pages 目录下的路径或文件名中如果包含方括号，他们将被转换为动态路由参数。可以通过“[参数名]”来设置动态路由，单方括号“[]”表示访问时必须提供参数，双方括号“[[]]”表示访问时可为空参数。

```vue
<template>
  <div class="">
    <div>路由模式之动态路由的示例。</div>
    <div>当前页面路径：~/pages/route/dynamic/[[type]]/by[date].vue</div>
    <div>当前访问路由：{{ $route.fullPath }}</div>
    <div>路由中参数值: type={{ params.type }},date={{ params.date }}</div>
  </div>
</template>

<script setup lang="ts">
const { params } = useRoute()
</script>
```

### 通配路由

在 pages 目录下的文件名可以通过“[...参数名]”来设置通配路由（此参数必须占完整个文件名），能实现对无限层次 URL 归到同一页面展示

```vue
<template>
  <div class="">
    <div>路由模式之通配路由的示例。</div>
    <div>当前页面路径：~/pages/route/all/[...paths].vue</div>
    <div>当前页面路由：{{ $route.fullPath }}</div>
    <div>路由中参数值：{{ $route.params.paths }}</div>
  </div>
  <!-- 输入路由http://localhost:3000/route/all/by20240531/tets/aooo -->
  <!-- paths为[ "by20240531", "tets", "aooo" ]-->
</template>
```

### 嵌套路由

在 pages 目录下的目录名与此目录下文件名一致时，Nuxt3 会自动生成嵌套路由,父组件中使用 NuxtPage 组件显示嵌套子组件内容

```vue
<!-- ~/pages/route/nested.vue -->
<template>
  <div class="">
    <h6>路由模式之嵌套路由的示例（父级）</h6>
    <div>当前页面路由：{{ $route.fullPath }}</div>
    <div>当前页面父文件路径：~/pages/route/nested.vue</div>
    <div class="app-box">
      <!--  显示嵌套子组件内容 -->
      <NuxtPage ptype="demo"></NuxtPage>
    </div>
  </div>
</template>
<!-- ~/pages/route/nested/child.vue -->

<template>
  <div class="">
    <h6>路由模式之嵌套路由示例（子级）。</h6>
    <div>当前页面子文件路径：~/pages/route/nested/child.vue</div>
    <div>当前父级传入的参数：{{ ptype }}</div>
  </div>
</template>

<script setup lang="ts">
const ptype = defineProps(['ptype'])
</script>
```
访问 http://localhost:3000/route/nested/child 正常显示

### 自定义路由

创建自定义路由配置~/app/router.options.ts，可以替换或新增Nuxt3自动生成的路由

## 动态引入组件

- 方法一： vue3 resolveComponent
- 方法二：全局注册组件

```Vue
<template>
    <div>
        <BaseFooLink></BaseFooLink>
        <h6>动态引入组件</h6>
        <span @click="islink = true">选择链接组件</span>
        <span @click="islink = false">选择页脚组件</span>
        <component :is="islink ? BaseFooLink : TheFooter"></component>
    </div>
</template>

<script setup lang="ts">
    const islink = ref(false)
    // 这里由于组件全局引入 所以不需要 resolveComponent
    const BaseFooLink = 'BaseFooLink'
    // resolveComponent 用于动态引入组件
    const TheFooter = resolveComponent('TheFooter')
</script>
```

## 懒加载组件

如果不总是需要组件，通过使用 Lazy 前缀，可以将加载组件代码延迟到合适的时间，有助于优化 JavaScript 包的大小。

## 页面布局

页面布局 Vue 文件必须放在项目根目录的 layouts 目录下，使用时自动异步导入加载
layouts 下不要创建子目录，所有 Vue 布局文件都放在 layouts 根目录下

```Javascript
// 路由中间件 Nuxt提供setPageLayout函数允许动态修改页面的布局，以来与Nuxt的上下文context的访问，只能在组件的设置函数，插件和路由中间件中调用
export default defineNuxtRouteMiddleware((to, from) => {
    if (to.fullPath.indexOf('/components/dynamic') === 0) {
        setPageLayout('custom-first')
    }
})
```

## 模块化代码

工具包（utils）和公共函数代码（composables）

这两项相似性很大，从粒度和范围来看：utils 大而全，是单独和完整的工具包，使用起来更简单，推荐工具类相关代码使用；composables 小而精，注重复用和自由组合使用，使用起来更灵活，推荐数据类或通过 useState 共享数据类相关代码使用.

utils 和 composables 中模块可以相互引用，默认情况下 Nuxt3 会自动导出此两个目录下的第一级文件，如需同时导出此两个目录所有子目录下的文件，增加以下配置即可。

```Javascript
export default defineNuxtConfig({
  imports:{
    // 配置全子目录支持自动导入
    dirs:[
      "utils/**",
      "composable/**"
    ]
  }
})
```

### composables

公共函数代码的.js 或.ts 文件必须放在项目根目录的 composables 目录下，使用时自动异步导入加载，如果文件名有中横线（-）使用时需转换为 camelCase（驼峰式）写法，供全局使用。

composables 有两种命名方法

```Javascript
// 命名式导出
export const useColor = () => {
  return useState('color', () => '#FFFFFF')
}

// 默认导出 使用文件名来命名
export default function(){
    return useState('times',()=>parseInt(Math.random()*100))
}
```

> 在公共函数代码（composables）中使用 useState 构建共享状态数据管理，实现跨页面（引用、查看和修改等）共享数据。
> composables 中模块化代码添加、修改或删除后，Nuxt3 都会自动生成声明类型文件.nuxt/imports.d.ts

### utils

使用方法同 composables
