# api-admin

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### 总结
这边不写嵌套树级路由不仅仅是为了做简单缓存，而且如果当父级路由和子级路由都能打开浏览的时候会影响到；整个项目应当用name进行路由跳转而不是path，应为path是可变的，当父级路由改变时，整个path会进行重写。
```
{name: 'Parent', component: ParentComponent, children: [{name: 'Child', component: ChildComponent}]} // 父级没有route-view（目的父级就是不放），子级会出不来
```
