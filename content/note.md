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

创建自定义路由配置~/app/router.options.ts，可以替换或新增 Nuxt3 自动生成的路由

## 路由中间件

路由中间件中有两种方式改变路由目标：
1、return navigateTo(to,options)，停止当前导航，重定向到插件或中间件中的给定路由，也可以直接调用他来执行页面导航；
2、return abortNavigation(error)，以错误拒绝当前导航，并可选错误消息

### 命名路由中间件

命名路由中间件配置文件名称规则约定为 middleware/*.js，*为路由中间件名称，在页面中通过 definePageMeta 来明确页面使用那个路由中间件。

### 匿名路由中间件

直接在使用他们的页面中定义，即在 definePageMeta 方法的 middleware 中定义。

### 路由验证器

如果是简单的路由验证逻辑，可以使用路由验证器解决。即在 definePageMeta 方法的 validate 中定义，
如果是复杂的用例，那么推荐使用路由中间件方式。

## 导航

Nuxt3 中的导航，分为组件和编程方式。

> 注意：Nuxt3 的~/server/routes/提供的数据返回，应该按外部链接处理，需要将 external 属性设置为 true。否则在开发 npm run dev 时请求数据正常，在 node 或 pm2 部署后 Nuxt3 会把此链接当着页面路由访问而出现 404 错误，需要刷新才能显示数据

### 组件式导航

在应用程序的页面之间导航，可使用<NuxtLink>组件，组件支持内部路由和跳转到外部网址，支持 to，href，target，rel，noRel，activeClass，exactActiveClass，replace，ariaCurrentValue，external，prefetch，prefetchedClass，custom 等属性设置

### 编程式导航

navigateTo 是一个路由器助手函数，允许通过 Nuxt 应用程序以编程方式导航，支持内部路由和跳转到外部网址。同时也支持 router.push 的编程方式导航。

navigateTo 在服务端和客户端都可用。他可以在插件、中间件中使用，也可以直接调用以执行页面导航

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

## 页面过渡

Nuxt 利用 Vue 的<Transition>组件在页面和布局中应用过渡动画转换。

页面过渡动画需要在 nuxt.config.ts 中配置 pageTransition 开启，同时需要在 app.vue 中配置过渡动画样式即可（两处配置的名称要一致）

## 内容管理

Nuxt3 Content 为独立模块，需要单独安装和使用。Content 读取和解析项目根目录的 content 目录下.md、.yml、.csv 和.json 文件，为应用程序创建基于文件的 CMS。

内容管理 CMS 在 Nuxt3 后台会独立提供服务（默认端口为 4000），功能非常强大和完善，可配置指定目录，有专属的 Components 和 Composables

## 静态资源

需要对客户端单独提供 URL 访问的资源放在 public，会增加请求次数；程序中内部使用、打包在一起且不对外提供 URL 访问的资源放在 assets，页面一次请求即可使用

## middleware (服务端)

Nuxt3 自动扫描~/server/api、~/server/routes 和~/server/middleware 目录中的文件，以注册 HMR 支持的 api 和服务端处理程序。

每个文件都应该导出用 defineEventHandler((event) => ......))定义的默认函数，处理程序可以直接返回 JSON 数据、Promise 或使用 event.res.end()发送响应。

server 中还支持插件~/server/plugins、工具包~/server/utils、服务端存储等高级功能。其中服务端存储使用 unjs/unstorage 工具，支持 fs (node)、localStorage (browser)等

### MIDDLEWARE 中间件

Nuxt3 将自动读取~/server/midleware 中的任何文件，自动为项目创建服务端中间件。

中间件处理程序在任何其他服务端路由之前对每个请求运行，以添加或检查报头、记录请求或扩展事件的请求对象。

中间件处理程序不应返回任何内容（也不应关闭或响应请求），只应检查或扩展请求上下文或抛出错误。

> 注意：此中间件只会对服务端渲染路由进行处理，对于客户端渲染的页面路由不会在此中间件跟踪范围内

## API 接口（服务端）

api 接口可以将后台数据存取操作统一封装，如果业务后台 API 较为简单且负载较小，可以将后台代码直接写在 server 的 api 模块中，实现前后端在一个工程中，方便开发和运维。

支持声明的 http 响应方法，在文件后缀增加.get、.post、.put、.delete 等匹配和响应前端请求。

api 路由可以使用文件名中括号内的动态参数,如/api/hello/[name].js。js 中通过 event.context.params 访问。同时支持通配路由定义，如/api/hello/[...].js

> 注意：参数名必须为完整的文件名，不支持一个文件名多参数或参数与字符混合情况。

## 路由（服务端）

~/server/api 中的文件在其路由中自动以/api 作为前缀。对于添加不带/api 前缀的服务端路由，可以将他们放在~/server/routes 目录中。

routes 和 api 类似，都可以作为数据 API 或直接在浏览器中访问，只是访问的 URL 前缀不同，可以根据应用场景来归类相应模块。

```Typescript
// ~/server/routes/server/[mode]/[...].get.ts
export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    const body = {}   //await readBody(event); //get方法无此数据
    const cookies = parseCookies(event)

    return {
        time: event.context.reqTime,
        params: event.context.params,
        query,
        body,
        cookies
    }
})
```

访问 http://localhost:3000/server/china/hello/mike?type=web

```JSON
{
  "time": "Mon Jun 03 2024",
  "params": {
    "mode": "china",
    "_": "hello/mike"
  },
  "query": {
    "type": "web"
  },
  "body": {},
  "cookies": {}
}
```

通过自定义 routes，还可以实现 proxy 功能，这种方式在 dev 或 build 都能正常使用。

> 由于 nuxt3 的路由约定机制，在 nuxt.config.ts 中配置 proxy 会出现 404 错误,并且只能在 dev 时使用。

## 数据获取

| 方法             | 分类        | 关系                                                                                                    |
| ---------------- | ----------- | ------------------------------------------------------------------------------------------------------- |
| $fetch           | utils       | 同 Axios 工具类似；$fetch 是 Nuxt3 官方提供的数据获取工具。最底层实现，不推荐使用                       |
| useAsyncData     | Composables | 使用$fetch 进行数据获取，扩展唯一 key 等属性功能。ey 为自动或人为提供，在并发时相同的 key 会不再请求。  |
| useLazyAsyncData | Composables | 是 useAsyncData 的参数 lazy 为 true 时的封装，为异常请求，不要在方法前使用 await，但要 watch 数据       |
| useFetch         | Composables | 是 useAsyncData 和$fetch 的封装，推荐使用。                                                             |
| useLazyFetch     | Composables | 是 useFetch 的参数 lazy 为 true 时的封装，推荐使用。为异常请求，不要在方法前使用 await，但要 watch 数据 |

### $fetch

$fetch 是 Nuxt3 对 ohmyfetch 的封装. 全局公开方便直接调用的 API，用于在 Vue 应用程序或 API 路由中进行 HTTP 请求。如果他在服务端上运行，他将进行直接 API 调用,如果他在客户端上运行，则他将对您的 API 进行客户端调用（可以处理调用第三方 API）

### useAsyncData

在页面、组件、插件中使用该方法获取数据，可以反序列化响应返回的 JSON 对象。useAsyncData 会阻塞路由导航，直到他的异步处理程序被解析。useLazyAsyncData 是通过将 lazy 选项设置为 true 的 useAsyncData 的包装器. useLazyAsyncData 的参数与 useAsyncData 几乎一致。

此方法的第一个请求参数为 key，是一个唯一键，用于确保数据获取可以跨请求正确地消除重复，如果您没有提供 key，那么将为您生成一个与 useAsyncData 实例的文件名和行号唯一的 key。

### useFetch

useFetch 封装 useAsyncData 和$fetch，会根据 URL 和 fetch 选项自动生成 key，并推断 API 响应类型。默认情况下，useFetch 会阻止导航，直到他的异步处理程序被解析。

useLazyFetch 是通过将 lazy 选项设置为 true 的 useFetch 的包装器。useLazyFetch 的参数与 useFetch 几乎一致。

## 渲染模式

### 客户端渲染

### 服务端渲染

### 混合渲染

混合呈现允许使用路由规则对每条路由使用不同的缓存规则，并决定服务器应如何响应给定 URL 上的新请求。

- 1、通过 routeRules 设置指定路由的渲染方式

```Typescript
export default defineNuxtConfig({
  routeRules: {
    // '/**': { ssr: false }, //将所有路由ssr关闭，即整个网站为客户端渲染
    // '/navigation/**': { ssr: false }, //匹配的路由为客户端渲染
    // '/navigation/component': { ssr: false }, //匹配的页面为客户端渲染
  }
})
```

ssr-禁用应用程序部分的服务端渲染，并仅使用 ssr:false 使其 SPA
redirect-定义服务端重定向

- 2、通过代码明确为客户端渲染

在页面中，可以通过 ClientOnly 组件明确 HTML 在客户端渲染，通过 process.client 判断明确客户端渲染时执行

## SEO 搜索引擎优化

### robots.txt

robots 协议也称爬虫协议、爬虫规则等,是在网站根目录下建立一个 robots.txt 文件来告诉搜索引擎哪些页面可以抓取,哪些页面不能抓取,而搜索引擎则通过读取 robots.txt 文件来识别这个页面是否允许被抓取。
