<!--
 * @Author: 肖玲
 * @Date: 2025-03-26 15:22:51
 * @LastEditTime: 2025-03-28 00:17:13
 * @LastEditors: 肖玲
 * @Description:
 * @FilePath: /javascript_Handwritten_code/interview/05_BDInterview.md
 * 百度面经整理
-->

# 一面

### 1、说说你平常工作中常用到到的一些 ES6 的新特性（拓展问到了数组常用的 API（哪些会改变原属组哪学些不会，提到了增删改都可以用 Splice 所以面试官问到了这个 API 的具体入参以及第三个参数的入参格式以及返回结果）以及判断数据类型最稳定的方法（Object.prototype.toString.call()））

### 2、既然提到了 ES6 新增的数据类型，js 有哪些数据类型，有区别吗？你刚刚说的 Symbol 和 Map,还有别的吗（Set 和 BigInt）？说几个它们的实例属性和方法？Set 和传统数组的区别？平常工作中用到了这两种数据类型吗？

### 3、刚刚听你说了三点运算符号，在平时工作中你用过吗？常用的场景（深拷贝）？深拷贝和浅拷贝有什么区别呀？它完全能实现深拷贝吗什么情况下它实现的是浅拷贝（数组或对象嵌套只能实现浅拷贝）？对于这种局限性你有别的替代方案吗？

-   JSON.parse(JSON.stringify()) :<font color=#FF00FF >会丢失 undefined、Date、RegExp、Function</font>(面试官提问)
-   structuredClone() : 可以实现深拷贝浏览器自带的，但是有局限性老的的浏览不支持（Internet Explore 以及 Chrome 98、Safari 15 之前版本）
-   lodash 的 cloneDeep() : 引入第三方库：如 lodash、immutable.js、immer.js
-   递归实现深拷贝：讲讲你的实现思路（核心就是递归地遍历对象的每一层，对于对象或数组中的每个属性（元素），如果该属性是基本数据类型（如字符串、数字、布尔值），则直接拷贝；如果是对象或数组，则需要递归地进行深拷贝。优化:通过 WeakMap(ES6 新增数据类型) 记录已拷贝的对象来避免循环引用。

```javascript
const deepClone = (obj, map = new WeakMap()) => {
    // 1. 基本数据类型直接返回
    if (obj === null || typeof obj !== 'object') {
        return obj
    }

    // 2. 防止循环引用
    if (map.has(obj)) {
        return map.get(obj)
    }

    // 3. 处理日期对象
    if (obj instanceof Date) {
        return new Date(obj)
    }

    // 4. 处理正则表达式
    if (obj instanceof RegExp) {
        return new RegExp(obj)
    }

    // 5. 处理数组
    if (Array.isArray(obj)) {
        const arrCopy = []
        map.set(obj, arrCopy) // 记录当前对象的引用
        for (let i = 0; i < obj.length; i++) {
            arrCopy[i] = deepClone(obj[i], map)
        }
        return arrCopy
    }

    // 6. 处理普通对象
    const objCopy = {}
    map.set(obj, objCopy) // 记录当前对象的引用
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            objCopy[key] = deepClone(obj[key], map)
        }
    }

    return objCopy
}
```

### 4、你对 js 的事件循环机制有了解多少？为什么有了同步任务和异步任务的区分之后又出现了宏任务和微任务的描述呢？

js 之所以引入事件循环机制是因为 js 是单线程的，为了避免阻塞主线程，js 将任务分为同步任务和异步任务。事件循环的一个大致流程就是将当前线程在执行的代码放入执行栈中，然后执行栈中的代码，当执行栈为空时，会从任务队列（异步任务将会在编译时放入任务队列中）中取出一个任务放入执行栈中执行。之所以又有宏微任务的区分是因为并不是所有的异步任务都被统一管理，为了给异步任务提供不同的执行优先级。说到这个现在针对微任务和宏任务的执行顺序说法有很多，但是我觉得比较好的说法是：

-   宏任务：
    -   1. 渲染：渲染页面
    -   2. 网络请求：AJAX、fetch、XMLHttpRequest
    -   3. 定时器：setTimeout、setInterval
    -   4. I/O 操作
-   微任务：
    -   1. promise.then
    -   2. MutationObserver
    -   3. queueMicrotask

其实是在当前执行栈执行完毕后，会先执行微任务队列中的任务，然后再执行下一个宏任务。并没有绝对的顺序。要根据当前执行栈中执行到的内容示具体情况而定。当然在某一次事件的循环中会优先执行微任务再执行下一个宏任务。比如：

```javascript
console.log('Start') // 同步任务，先执行

setTimeout(() => {
    console.log('Macro task 1') // 宏任务 1
}, 0)

Promise.resolve()
    .then(() => {
        console.log('Micro task 1') // 微任务 1
    })
    .then(() => {
        console.log('Micro task 2') // 微任务 2
    })

setTimeout(() => {
    console.log('Macro task 2') // 宏任务 2
}, 0)

console.log('End') // 同步任务，最后执行

// Start
// End
// Micro task 1
// Micro task 2
// Macro task 1
// Macro task 2
```

### 5、刚刚有说微任务和宏任务，那你知道哪些微任务和宏任务吗？Promise 可以传入两个参数分别是什么？刚刚你说 promise 的状态是不可逆的，那你知道 promise 的状态是怎么变化的吗,比如 reject 方法执行完之后 promise 的状态怎么变化（rejected）？刚刚你说 promise 是微任务，我这有一小段代码你看下按你的理解代码是怎么执行的？

![alt text](image-7.png)

```javascript
// start
// Resolve Before
// End
// Resolved synchronously
```

所以 promise.then、promise.catch、promise.finally 才是微任务。


### 共享屏幕
- 第一个问题：实现一个promise.bind方法。
![alt text](image-8.png)

- 第二个问题： 实现一个简单的布局，两边固定宽度，中间自适应。
  https://jsbin.leping.fun/#eyJodG1sIjoiPCFET0NUWVBFIGh0bWw+XG48aHRtbCBsYW5nPVwiZW5cIj5cbjxoZWFkPlxuICA8bWV0YSBjaGFyc2V0PVwiVVRGLThcIj5cbiAgPG1ldGEgbmFtZT1cInZpZXdwb3J0XCIgY29udGVudD1cIndpZHRoPWRldmljZS13aWR0aCwgaW5pdGlhbC1zY2FsZT0xLjBcIj5cbiAgPHRpdGxlPuS4pOi+ueWbuuWumuS4remXtOiHqumAguW6lOW4g+WxgDwvdGl0bGU+XG4gIDxzdHlsZT5cbiAgICBib2R5IHtcbiAgICAgIG1hcmdpbjogMDtcbiAgICAgIGZvbnQtZmFtaWx5OiBBcmlhbCwgc2Fucy1zZXJpZjtcbiAgICB9XG5cbiAgICAuY29udGFpbmVyIHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7ICAvKiDkvb/nlKggRmxleGJveCDluIPlsYAgKi9cbiAgICAgIGhlaWdodDogMTAwdmg7ICAvKiDpq5jluqbljaDmu6HmlbTkuKrop4blj6MgKi9cbiAgICB9XG5cbiAgICAubGVmdCwgLnJpZ2h0IHtcbiAgICAgIHdpZHRoOiAyMDBweDsgICAvKiDlm7rlrprlrr3luqYgKi9cbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICMzNDk4ZGI7XG4gICAgICBjb2xvcjogd2hpdGU7XG4gICAgICBwYWRkaW5nOiAyMHB4O1xuICAgIH1cblxuICAgIC5taWRkbGUge1xuICAgICAgZmxleC1ncm93OiAxOyAgLyog6K6p5Lit6Ze055qE5YaF5a656Ieq6YCC5bqU5a695bqmICovXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjFjNDBmO1xuICAgICAgcGFkZGluZzogMjBweDtcbiAgICB9XG4gIDwvc3R5bGU+XG48L2hlYWQ+XG48Ym9keT5cblxuICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyXCI+XG4gICAgPGRpdiBjbGFzcz1cImxlZnRcIj5cbiAgICAgIDxoMj7lt6bovrk8L2gyPlxuICAgICAgPHA+5Zu65a6a5a695bqm5YaF5a65PC9wPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJtaWRkbGVcIj5cbiAgICAgIDxoMj7kuK3pl7Q8L2gyPlxuICAgICAgPHA+6Ieq6YCC5bqU5a695bqm5YaF5a65PC9wPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJyaWdodFwiPlxuICAgICAgPGgyPuWPs+i+uTwvaDI+XG4gICAgICA8cD7lm7rlrprlrr3luqblhoXlrrk8L3A+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuXG48L2JvZHk+XG48L2h0bWw+XG4iLCJjc3MiOiIuaGVsbG8geyBjb2xvcjogI2FiY2RlZjsgfSIsImphdmFzY3JpcHQiOiJQcm9taXNlLnByb3RvdHlwZS5iaW5kID0gZnVuY3Rpb24gKGNvbnRleHQsIC4uLmFyZ3MpIHtcbiAgcmV0dXJuIHRoaXMudGhlbihcbiAgICBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIHJldHVybiBjb250ZXh0LmZuKC4uLmFyZ3MsIHZhbHVlKTsvLyDnu5Hlrprlm57osIPlh73mlbDnmoTkuIrkuIvmlodcbiAgICB9LFxuICAgIGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgaWYgKGNvbnRleHQucmVqZWN0RnVuYykge1xuICAgICAgICByZXR1cm4gY29udGV4dC5yZWplY3RGdW5jKGVycm9yKTsvLyDlpITnkIYgcmVqZWN0IOeahOaDheWGtVxuICAgICAgfVxuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yKTtcbiAgICB9XG4gICk7XG59O1xuXG5cbi8vIOmdouivleWumOivseWvvOabtOS8mOmbheeahOWunueOsOaWueW8j++8mumAmui/h+WOn+eUnyBiaW5kIOaWueazleS4jiBQcm9taXNlLnByb3RvdHlwZS50aGVuIOeahOe7k+WQiO+8jOWPr+S7peWcqOS4jeaUueWPmCBQcm9taXNlIOWOn+acrOeahOW3peS9nOaWueW8j+eahOaDheWGteS4i++8jOato+ehruWcsOe7keWumiB0aGlzIOS4iuS4i+aWh+W5tuS8oOmAkumineWklueahOWPguaVsFxuUHJvbWlzZS5wcm90b3R5cGUuYmluZCA9IGZ1bmN0aW9uIChjb250ZXh0LCAuLi5hcmdzKSB7XG4gIHJldHVybiB0aGlzLnRoZW4oXG4gICAgZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICByZXR1cm4gY29udGV4dC5mbiA/IGNvbnRleHQuZm4oLi4uYXJncywgdmFsdWUpIDogdmFsdWU7XG4gICAgfSxcbiAgICBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgIHJldHVybiBjb250ZXh0LnJlamVjdEZ1bmMgPyBjb250ZXh0LnJlamVjdEZ1bmMoZXJyb3IpIDogUHJvbWlzZS5yZWplY3QoZXJyb3IpOyAgIC8v5LiN6ZyA6KaB5omL5Yqo566h55CG5LiK5LiL5paH5ZKM5Y+C5pWw5Lyg6YCSXG4gICAgfVxuICApO1xufTtcblxuXG4ifQ==

～说一下flex布局和Grid布局的区别和适用场景


# 二面

### 1、看你的简历做过的项目是web端偏多，那你知道浏览器和服务器之间的通信过程吗？https协议和http协议的区别？既然提到了TCP，那有了解过TCP（文本文件有序的）和UDP（视频音频等）的区别吗，适用场景？
浏览器也就是我们常说的客户端向服务器发送请求，服务器处理请求并返回响应。前端这个过程主要涉及到了通信层（主要是网络层和传输层协议）、 应用层、表示层和会话层。这些层次共同协作以完成从用户请求到页面呈现的整个过程。主要过程如下：
**1、** 用户输入网址，DNS 解析获取服务器的IP,这个时候会先在浏览器中查找缓存。这里的缓存分为两种：
    - 强缓存：浏览器会根据响应头中的 Expires 或 Cache-Control 字段来判断是否命中强缓存。如果命中，浏览器会直接从本地缓存中读取资源，而不会向服务器发送请求。  
    - 协商缓存：如果强缓存没有命中，浏览器会向服务器发送一个条件请求（如 If-Modified-Since 或 If-None-Match），服务器会根据请求头中的条件来判断是否需要返回新的资源。如果服务器认为资源没有变化，它会返回一个 304 Not Modified 响应，浏览器会从本地缓存中读取资源。
有缓存则直接读取资源渲染页面，没有的话则向 DNS 服务器发送请求，DNS 服务器解析域名并返回相应的 IP 地址。
**2、** 建立 TCP 连接：浏览器会与服务器建立 TCP 连接，这是一个可靠的连接，确保数据的可靠传输。还有一种传输层协议UDP,两者的区别是TCP是可靠的传输协议，UDP是不可靠的传输协议。前者是⾯向 链接 的，⽽UDP是⾯向⽆连接的。TCP仅⽀持 单播传输 ，UDP 提供了单播，多播，⼴播的功能。TCP的三次握⼿保证了连接的可靠性 ; UDP是⽆连接的、不可靠的⼀种数据传输协议，⾸先不可靠性体现在⽆连接上，通信都不需要建⽴连接，对接收到的数据也不发送确认信号，发送端不知道数据是否会正确接收。但UDP的头部开销 ⽐TCP的更⼩，数据传输速率更⾼ ，实时性更好。
**3、** 发送 HTTP 请求：浏览器向服务器发送 HTTP 请求，请求中包含请求方法（如 GET、POST）、URL、请求头等信息。
**4、** 服务器处理请求：服务器接收到请求后，根据请求的 URL 查找对应的资源，并根据请求方法执行相应的操作。服务器可能会生成动态内容，如 PHP 脚本生成的 HTML 页面。
**5、** 服务器返回响应：服务器将处理后的结果返回给浏览器，包括响应头和响应体。响应头包含了服务器的信息，如服务器类型、内容类型、缓存控制等。响应体则包含了实际的内容，如 HTML 页面、JSON 数据等。
**6、** 浏览器解析响应：浏览器接收到响应后，根据响应头中的信息来解析响应。它可能会根据响应头中的缓存控制信息来决定是否缓存资源。然后，浏览器开始解析响应体中的 HTML 内容，并构建 DOM 树。
**7、** 渲染页面：浏览器开始渲染页面，包括解析 CSS、加载图片等资源，并将 DOM 树与 CSSOM 结合，生成渲染树。渲染树是浏览器展示页面的基础，它将 DOM 树和 CSSOM 树合并，只包含可见的元素。
**8、** 页面呈现：浏览器开始根据渲染树来绘制页面，生成最终的页面显示。
**9、** 关闭连接：当页面加载完成后，浏览器与服务器之间的 TCP 连接会关闭。
**10、** 页面交互：用户与页面进行交互，如点击按钮、输入表单等，浏览器会发送相应的请求，服务器处理请求并返回响应

### 2、跨域了解多少，如果后端没法支持的情况你前端应该怎么访问跨域资源呢？
之所以出现跨域是因为浏览器的同源策略限制，协议、域名、端口号必须相同。
解决跨域的方法有：
-   CORS（跨域资源共享）：服务器端设置 Access-Control-Allow-Origin 头来允许跨域请求。
如果后端不支持COPS，前端可以通过
- JSONP：通过动态创建 script 标签并指定 src 属性为跨域请求的 URL，服务器端返回一个带有回调函数的 JavaScript 代码。局限就是只支持 GET 请求。对您上面说到的需求只请求资源不用交互应该够用了
  ###### 目前大多数的web应用前后端都是分开部署的，导致浏览器的同源策略阻止跨域请求基本解决这个问题大部分实际项目开发中还是需要前后端协调处理，常用的就是代理服务器。
-   WebSocket：WebSocket 是一种全双工的通信协议，可以在客户端和服务器之间建立持久连接，不受同源策略的限制。比较耗性能，适合即时聊天、在线游戏。
-   代理服务器：可以让前端请求后端的一个代理接口，由后端向目标跨域服务器发起请求，并返回数据给前端。
-   不过我目前接触到的项目都是前后端分离的，所以跨域问题基本都是由后端来解决，前端只需要请求代理接口即可。极少数情况下用过iframe,但也是建立访问资源和我们主域名相同的情况下。
  
  ##### 补充问了CORS预检请求的发送条件
  

### 3、React组件的两种实现方式倾向于哪种，有什么区别呢？你常用的Hooks。useEffect()实现一个类组件的componentDidMount和componentWillUnmount生命周期。useMemo / useCallback的区别和使用场景。
目前参与的项目中我做新需求都是使用函数组件，写法简洁，尤其是在react 16.8之后的Hooks，让函数组件变得更强大了基本可以完成所有类组件能够实现的功能。函数组件不需要像类组件那样需要用到ES6的class创建以及通过this来访问组件的属性和方法，直接操作函数内的状态和方法。类组件不同于函数组件的是类组件有自己的生命周期方法（componentDidMount,componentDidUpdate,componentWillUnmount等）来处理不同的阶段。而在函数组件中，我们可以使用useEffect()来模拟类组件的生命周期方法，用来处理数据获取、事件监听等。常用的Hooks的话除了刚刚提到useEffect之外还有比如useState用来管理组件的简单状态变量、以及useReducer和useState类似但通常用于更复杂的状态逻辑、useContext用来共享全局上下文状态、useRef用来引用DOM元素、useMemo和useCallback用来避免不必要的重新渲染做性能优化等。
useMemo和useCallback的区别的话其实说白了就是usMemo用来缓存一个计算值，而useCallback用来缓存一个函数。前者主要用来避免重复计算后者用来防止子组件的不必要渲染。两者都包含两个入参，useMemo第一个参数一定是返回具体值的函数，useCallback的第一个参数是一个函数，两者第二个参数都是一个数组，数组中存放的是依赖项，只有当依赖项发生变化useMemo 才会重新计算，useCallback才会返回新的函数
componentDidMount生命周期钩子函数主要是在组件挂载到DOM初次渲染后执行一些初始化操作，比如发送网络请求获取数据、设置定时器、订阅事件等。useEffect(() => {}, [])只需要将依赖项设置成空数组即可，空数组表示仅在组件挂载时执行一次。要用useEffect模拟componentWillUnmount清理定时器那直接在useEffect的回调函数中返回一个清理函数即可。useEffect(() => { return () => {} }, [])。比起冗余的类组件生命周期钩子函数用Hook实现简洁多了，逻辑清晰也更利于后续维护。

### 4、react-fiber了解多少？简单讲讲实现原理
首先react-fiber 产⽣的根本原因，是⼤量的同步计算任务阻塞了浏览器的 UI 渲染 。默认情况下，JS 运算、⻚⾯布局和⻚⾯绘制都是运⾏在浏览器的主线程当中，他们之间是互斥的关系。如果 JS 运算持续占⽤主线程，⻚⾯就没法得到及时的更新。当我们调⽤ setState 更新⻚⾯的时候，React 会遍历应
⽤的所有节点，计算出差异，然后再更新 UI。如果⻚⾯元素很多，整个过程占⽤的时机就可能超过 16
毫秒，就出现掉帧的现象了。
它的实现原理的话就是通过将任务拆分成多个小任务，将这些小任务分配给不同的线程或微任务，然后在主线程中按照优先级执行这些任务。这样可以避免主线程长时间占用，提高了应用的响应性能。
react内部运转分三层：Virtual DOM 层，描述⻚⾯⻓什么样。Reconciler 层，负责调⽤组件⽣命周期⽅法，进⾏ Diff 运算等。Render 层，根据不同的平台，渲染出相应的⻚⾯，⽐较常⻅的是 ReactDOM 和ReactNative。而Fiber 其实指的是⼀种数据结构，它可以⽤⼀个纯 JS 对象来表示。为了实现不卡顿，就需要有⼀个调度器 (Scheduler) 来进⾏任务分配。优先级⾼的任务（如键盘输⼊）可以打断优先级低的任务（如Diff）的执⾏，从⽽更快的⽣效。再展开的话，可能就没有深入了解了。

##### 面试官深入解释示了一下Fiber Reconciler执行的两个阶段然后建议我有时间可以去看看源码

### 5、对vue的底层实现原理了解多少？
vue的话底层采⽤数据劫持结合发布者-订阅者模式的⽅式，通过Object.defineProperty()来劫持各个属性的setter和getter，在数据变动时发布消息给订阅者，触发相应的监听回调
Vue是⼀个典型的MVVM框架，模型（Model）只是普通的javascript对象，修改它则试图（View）会
⾃动更新。这种设计让状态管理变得⾮常简单⽽直观
Observer（数据监听器）: Observer的核⼼是通过Object.defineProprtty()来监听数据的变动，这个函数内部可以定义setter和getter，每当数据发⽣变化，就会触发setter。这时候Observer就要通知订阅者Watcher。 Watcher订阅者作为Observer和Compile之间通信的桥梁，主要做几件事情：
1. 在⾃⾝实例化时往属性订阅器(dep)⾥⾯添加⾃⼰
2. ⾃⾝必须有⼀个update()⽅法
3. 待属性变动dep.notice()通知时，能调⽤⾃⾝的update()⽅法，并触发Compile中绑定的回调
Compile（指令解析器）主要做的事情是解析模板指令，将模板中变量替换成数据，然后初始化渲染⻚⾯视图，并将每个指令对应的节点绑定更新函数，添加鉴定数据的订阅者，⼀旦数据有变动，收到通知之后更新视图
#### 补充提问：既然提到了Object.defineProperty()那你了解proxy，两者有什么区别。
Object.defineProperty() 和 Proxy 都可以拦截和修改对象的属性访问，但它们的实现方式和适用场景不同。Object.defineProperty() 用于直接在对象上定义新属性或修改已有属性的特性，可以拦截 getter / setter，实现响应式数据劫持需要遍历整个对象并递归所有属性（对象深层次嵌套时，需要手动递归），修改属性时不影响整个对象的操作（只能监听特定属性）。vue2的的MVVM框架是通过Object.defineProperty()来实现数据劫持的。Proxy 是 ES6 中新增的特性，它可以拦截和修改对象的各种操作，包括属性访问、赋值、删除、函数调用等。Proxy 可以代理整个对象，而不仅仅是对象的属性。vue3的响应式系统是通过Proxy来实现的

### 共享屏幕

- 第一个问题：假设我现在需要匹配一个11位数字并把第四到七位加密，你会怎么写

https://jsbin.leping.fun/#eyJodG1sIjoiPCFET0NUWVBFIGh0bWw+XG48aHRtbD5cbiAgPGhlYWQ+XG4gICAgPG1ldGEgY2hhcnNldD1cIlVURi04XCIgLz5cbiAgICA8bWV0YSBuYW1lPVwidmlld3BvcnRcIiBjb250ZW50PVwid2lkdGg9ZGV2aWNlLXdpZHRoLCBpbml0aWFsLXNjYWxlPTEuMFwiIC8+XG4gICAgPHRpdGxlPkRvY3VtZW50PC90aXRsZT5cbiAgPC9oZWFkPlxuICA8Ym9keT5cbiAgICA8ZGl2IGNsYXNzPVwiaGVsbG9cIj5IZWxsbyBXb3JsZDwvZGl2PlxuICA8L2JvZHk+XG48L2h0bWw+XG4gICIsImNzcyI6Ii5oZWxsbyB7IGNvbG9yOiAjYWJjZGVmOyB9IiwiamF2YXNjcmlwdCI6Ii8vIOesrOS4gOeJiO+8muWFiOWMuemFjeWGjeeUqHNsaWNl5YGa5YiH5Ymy5ou85o6lXG5jb25zdCBwcml2YXRlSW5wdXQgPSAoc3RyKSA9PiB7XG4gICAgaWYgKC9eWzAtOV17MTF9JC8udGVzdChzdHIpKSB7XG4gICAgICAgIHJldHVybiBzdHIuc2xpY2UoMCwgMykgKyAnKioqKicgKyBzdHIuc2xpY2UoNylcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gc3RyXG4gICAgfVxufVxuXG5cblxuLy8g56ys5LqM54mI77ya5Zyo6Z2i6K+V5a6Y55qE5o+Q56S65LiL5oOz5Yiw5LqGcmVwbGFjZeaWueazlVxuY29uc3QgbWFza1Bob25lTnVtYmVyID0gKHBob25lKSA9PiB7XG4gIHJldHVybiBwaG9uZS5yZXBsYWNlKC9eKFxcZHszfSlcXGR7NH0oXFxkezR9KSQvLCAnJDEqKioqJDInKTtcbn1cblxuXG4ifQ==

- 第二个问题：知道什么时候用防抖什么时候用节流吗？简单实现一个防抖函数
  https://jsbin.leping.fun/#eyJodG1sIjoiPCFET0NUWVBFIGh0bWw+XG48aHRtbD5cbiAgPGhlYWQ+XG4gICAgPG1ldGEgY2hhcnNldD1cIlVURi04XCIgLz5cbiAgICA8bWV0YSBuYW1lPVwidmlld3BvcnRcIiBjb250ZW50PVwid2lkdGg9ZGV2aWNlLXdpZHRoLCBpbml0aWFsLXNjYWxlPTEuMFwiIC8+XG4gICAgPHRpdGxlPkRvY3VtZW50PC90aXRsZT5cbiAgPC9oZWFkPlxuICA8Ym9keT5cbiAgICA8ZGl2IGNsYXNzPVwiaGVsbG9cIj5IZWxsbyBXb3JsZDwvZGl2PlxuICA8L2JvZHk+XG48L2h0bWw+XG4gICIsImNzcyI6Ii5oZWxsbyB7IGNvbG9yOiAjYWJjZGVmOyB9IiwiamF2YXNjcmlwdCI6ImNvbnN0IGRlYm91bmNlID0gKGZuLCBkZWxheSwgaW1tZWRpYXRlID0gZmFsc2UpID0+IHtcbiAgLy8g56ys5LiA54mI77ya5pyA566A5Y2VXG4gIGxldCB0aW1lciA9IG51bGxcbiAgcmV0dXJuICguLi5hcmdzKSA9PiB7XG4gICAgaWYgKHRpbWVyKSBjbGVhclRpbWVvdXQodGltZXIpXG4gICAgdGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGZuKC4uLmFyZ3MpXG4gICAgfSwgZGVsYXkpXG4gIH1cblxuICAvLyDnrKzkuozniYjvvJrpnaLor5XlrpjooaXlhYXmj5Dpl67luIzmnJvlnKjop6blj5Hkuovku7bml7bnq4vljbPmiafooYw65YW25a6e5Y+q6ZyA6KaB5re75Yqg5LiA5Liq5qCH6K6w5Yik5pat5piv5ZCm6KaB5Yid5aeL5YyW6LCD55So5bCx5Y+v5Lul5LqGXG5cbiAgbGV0IHRpbWVyID0gbnVsbDtcbiAgbGV0IGlzSW52b2tlZCA9IGZhbHNlOyAvLyDmoIforrDmmK/lkKbnq4vljbPmiafooYxcbiAgcmV0dXJuICguLi5hcmdzKSA9PiB7XG4gICAgaWYgKGltbWVkaWF0ZSAmJiAhaXNJbnZva2VkKSB7XG4gICAgICBmbiguLi5hcmdzKTsgLy8g56uL5Y2z5omn6KGMXG4gICAgICBpc0ludm9rZWQgPSB0cnVlO1xuICAgIH1cbiAgICBpZiAodGltZXIpIGNsZWFyVGltZW91dCh0aW1lcik7XG4gICAgdGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGZuKC4uLmFyZ3MpO1xuICAgICAgaXNJbnZva2VkID0gZmFsc2U7IC8vIOmHjeaWsOWFgeiuuOeri+WNs+aJp+ihjFxuICAgIH0sIGRlbGF5KTtcbiAgfTtcbn1cblxuXG5jb25zdCBkZWJvdW5jZTxUIGV4dGVuZHMgKC4uLmFyZ3M6IGFueVtdKSA9PiB2b2lkPiA9IChcbiAgZm46IFQsXG4gIGRlbGF5OiBudW1iZXIsXG4gIGltbWVkaWF0ZTogYm9vbGVhbiA9IGZhbHNlXG4pOiBUID0+IHtcbiAgbGV0IHRpbWVyOiBSZXR1cm5UeXBlPHR5cGVvZiBzZXRUaW1lb3V0PiB8IG51bGwgPSBudWxsO1xuICBsZXQgaXNJbnZva2VkID0gZmFsc2U7IC8vIOaYr+WQpueri+WNs+aJp+ihjFxuXG4gIHJldHVybiAoLi4uYXJnczogUGFyYW1ldGVyczxUPikgPT4ge1xuICAgIGlmIChpbW1lZGlhdGUgJiYgIWlzSW52b2tlZCkge1xuICAgICAgZm4oLi4uYXJncyk7XG4gICAgICBpc0ludm9rZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIGlmICh0aW1lcikgY2xlYXJUaW1lb3V0KHRpbWVyKTtcblxuICAgIHRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBmbiguLi5hcmdzKTtcbiAgICAgIGlzSW52b2tlZCA9IGZhbHNlOyAvLyDlhYHorrjlho3mrKHnq4vljbPmiafooYxcbiAgICB9LCBkZWxheSk7XG4gIH0gYXMgVDtcbn1cblxuXG5cbiJ9

# 三面

### 1、如果让你封装一个组件，实现版本迭代之后在相应的功能入口附近浮层提示更新内容。你的封装思路是什么？
首先这个版本迭代如果需要前端来做判断的话，前端通常会将版本号存放在本地缓存中，每次打开页面的时候去读取缓存中的版本号，然后和当前的版本号进行比较，如果版本号不一致，则显示浮层提示更新内容。如果是后端来做的话，后端通常会将版本号存放在数据库中，前端每次打开页面的时候去请求后端获取版本号，然后和当前的版本号进行比较，如果版本号不一致，则显示浮层提示更新内容。
说完这个的时候面试官说这个功能的更新内容后端请求或者需求会告知，你只要说下你的封装思路就可以了。比如你的props需要接受哪些值？
好，这个需求其实可以简单拆分成两部分，一个是在什么时候触发，这个通常需要对比版本是否有更新可以监听版本号是否更新然后主动触发API获取更新内容，你上面提到了新内容后端请求或者需求会告知那这是需要props接收的其一，第二个我觉得比较重要的就是展示内容，这里主要要接收功能入口的DOM节点的位置。除此之外的话，还可以接收比如关闭逻辑相关的参数和回调等。

### 2、可以上机写一个简单的页面吗？由三部分组成，第一部分是顶部的筛选模块，中间是列表部分，支持分页。最好模拟接口请求
https://jsbin.leping.fun/#eyJodG1sIjoiPHNjcmlwdCBzcmM9XCJodHRwczovL2Nkbi5qc2RlbGl2ci5uZXQvbnBtL2pxdWVyeUAzLjcuMS9kaXN0L2pxdWVyeS5taW4uanNcIj48L3NjcmlwdD5cbjxzY3JpcHQgc3JjPVwiaHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L25wbS9sb2Rhc2hANC4xNy4yMS9sb2Rhc2gubWluLmpzXCI+PC9zY3JpcHQ+XG48c2NyaXB0IHNyYz1cImh0dHBzOi8vY2RuLmpzZGVsaXZyLm5ldC9ucG0vYXhpb3NAMS42LjcvZGlzdC9heGlvcy5taW4uanNcIj48L3NjcmlwdD5cbjwhRE9DVFlQRSBodG1sPlxuPGh0bWw+XG4gIDxoZWFkPlxuICAgIDxtZXRhIGNoYXJzZXQ9XCJVVEYtOFwiIC8+XG4gICAgPG1ldGEgbmFtZT1cInZpZXdwb3J0XCIgY29udGVudD1cIndpZHRoPWRldmljZS13aWR0aCwgaW5pdGlhbC1zY2FsZT0xLjBcIiAvPlxuICAgIDx0aXRsZT5Eb2N1bWVudDwvdGl0bGU+XG4gIDwvaGVhZD5cbiAgPGJvZHk+XG4gICAgPGRpdiBjbGFzcz1cImhlbGxvXCI+SGVsbG8gV29ybGQ8L2Rpdj5cbiAgPC9ib2R5PlxuPC9odG1sPlxuICAiLCJjc3MiOiIuaGVsbG8geyBjb2xvcjogI2FiY2RlZjsgfSIsImphdmFzY3JpcHQiOiJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IGF4aW9zIGZyb20gXCJheGlvc1wiO1xuaW1wb3J0IHsgSW5wdXQsIEJ1dHRvbiwgVGFibGUgfSBmcm9tIFwiYW50ZFwiO1xuXG5cbi8qKlxuICog5qih5ouf6K+35rGC5YiX6KGo5pWw5o2uXG4gKi9cbmNvbnN0IGdldExpc3QgPSBhc3luYyAocXVlcnkgPSBcIlwiLCBwYWdlID0gMSwgcGFnZVNpemUgPSAxMCkgPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXhpb3MuZ2V0KFwiaHR0cHM6Ly9qc29ucGxhY2Vob2xkZXIudHlwaWNvZGUuY29tL3Bvc3RzXCIsIHtcbiAgICAgIHBhcmFtczogeyBfbGltaXQ6IDUwIH0sXG4gICAgfSk7XG4gICAgY29uc3QgYWxsRGF0YSA9IHJlc3BvbnNlLmRhdGEubWFwKChpdGVtLCBpbmRleCkgPT4gKHsgaWQ6IGluZGV4ICsgMSwgbmFtZTogaXRlbS50aXRsZSB9KSk7XG4gICAgY29uc3QgZmlsdGVyZWREYXRhID0gYWxsRGF0YS5maWx0ZXIoKGl0ZW0pID0+XG4gICAgICBpdGVtLm5hbWUudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhxdWVyeS50b0xvd2VyQ2FzZSgpKVxuICAgICk7XG4gICAgY29uc3QgcGFnaW5hdGVkRGF0YSA9IGZpbHRlcmVkRGF0YS5zbGljZSgocGFnZSAtIDEpICogcGFnZVNpemUsIHBhZ2UgKiBwYWdlU2l6ZSk7XG4gICAgcmV0dXJuIHsgZGF0YTogcGFnaW5hdGVkRGF0YSwgdG90YWw6IGZpbHRlcmVkRGF0YS5sZW5ndGggfTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICByZXR1cm4geyBkYXRhOiBbXSwgdG90YWw6IDAgfTtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gTGlzdFBhZ2UoKSB7XG4gIGNvbnN0IFtxdWVyeSwgc2V0UXVlcnldID0gdXNlU3RhdGUoXCJcIik7IC8v562b6YCJ5Y+C5pWwXG4gIGNvbnN0IFtkYXRhLCBzZXREYXRhXSA9IHVzZVN0YXRlKFtdKTsgLy/liJfooajmlbDmja5cbiAgY29uc3QgW3BhZ2UsIHNldFBhZ2VdID0gdXNlU3RhdGUoMSk7IC8v5b2T5YmN6aG156CBXG4gIGNvbnN0IFt0b3RhbCwgc2V0VG90YWxdID0gdXNlU3RhdGUoMCk7IC8v5oC75p2h5pWwXG4gIGNvbnN0IHBhZ2VTaXplID0gMTA7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBnZXRMaXN0KHF1ZXJ5LCBwYWdlLCBwYWdlU2l6ZSkudGhlbigocmVzKSA9PiB7XG4gICAgICBzZXREYXRhKHJlcy5kYXRhKTtcbiAgICAgIHNldFRvdGFsKHJlcy50b3RhbCk7XG4gICAgfSk7XG4gIH0sIFtxdWVyeSwgcGFnZV0pO1xuXG4gIGNvbnN0IGNvbHVtbnMgPSBbXG4gICAgeyB0aXRsZTogXCJJRFwiLCBkYXRhSW5kZXg6IFwiaWRcIiwga2V5OiBcImlkXCIsIHdpZHRoOiA4MCB9LFxuICAgIHsgdGl0bGU6IFwi5ZCN56ewXCIsIGRhdGFJbmRleDogXCJuYW1lXCIsIGtleTogXCJuYW1lXCIgfSxcbiAgXTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwicC00IHNwYWNlLXktNFwiPlxuICAgICAgey8qIOetm+mAieaooeWdlyAqL31cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBzcGFjZS14LTJcIj5cbiAgICAgICAgPElucHV0XG4gICAgICAgICAgcGxhY2Vob2xkZXI9XCLmkJzntKIuLi5cIlxuICAgICAgICAgIHZhbHVlPXtxdWVyeX1cbiAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHtcbiAgICAgICAgICAgIHNldFF1ZXJ5KGUudGFyZ2V0LnZhbHVlKTtcbiAgICAgICAgICAgIHNldFBhZ2UoMSk7XG4gICAgICAgICAgfX1cbiAgICAgICAgICBzdHlsZT17eyB3aWR0aDogMjAwIH19XG4gICAgICAgIC8+XG4gICAgICAgIDxCdXR0b24gb25DbGljaz17KCkgPT4gc2V0UXVlcnkoXCJcIil9PumHjee9rjwvQnV0dG9uPlxuICAgICAgPC9kaXY+XG5cbiAgICAgIHsvKiDliJfooajpg6jliIbvvIhUYWJsZSDnu4Tku7bvvIkgKi99XG4gICAgICA8VGFibGVcbiAgICAgICAgY29sdW1ucz17Y29sdW1uc31cbiAgICAgICAgZGF0YVNvdXJjZT17ZGF0YX1cbiAgICAgICAgcm93S2V5PVwiaWRcIlxuICAgICAgICBwYWdpbmF0aW9uPXt7XG4gICAgICAgICAgY3VycmVudDogcGFnZSxcbiAgICAgICAgICBwYWdlU2l6ZTogcGFnZVNpemUsXG4gICAgICAgICAgdG90YWw6IHRvdGFsLFxuICAgICAgICAgIG9uQ2hhbmdlOiAocCkgPT4gc2V0UGFnZShwKSxcbiAgICAgICAgfX1cbiAgICAgIC8+XG4gICAgPC9kaXY+XG4gICk7XG59XG4ifQ==