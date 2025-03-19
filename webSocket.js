// 要在 React 组件中实时获取“我的待办数量”，通常有两种方法：

// componentDidMount / useEffect + 定时轮询（适用于类组件）
// WebSocket / SSE（Server-Sent Events）（适用于实时推送）
// ✅ 方法 1：使用 componentDidMount + setInterval 轮询
// 适用于：

// 你的 API 不能主动推送数据，只能通过前端定期拉取。
// 你希望每隔一段时间就刷新一次待办数量。
// jsx
// 复制
// 编辑
class MyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.userService = new UserService();
        this.state = {
            count: 0 // 我的待办数量
        };
    }

    /**
     * 获取我的待办数量
     */
    getMytodoCount = async () => {
        let params = {
            deptId: JSON.parse(localStorage.getItem('deptId')),
            approverId: JSON.parse(localStorage.getItem('userId')),
            projectId: localStorage.getItem('projectId'),
        }
        try {
            const res = await this.userService.getMyTodoCount(params);
            this.setState({
                count: res
            });
        } catch (error) {
            console.error("获取待办数量失败:", error);
        }
    };

    /**
     * 组件挂载时，启动轮询
     */
    componentDidMount () {
        this.getMytodoCount(); // 组件加载时先获取一次

        // 每 30 秒自动刷新一次
        this.interval = setInterval(() => {
            this.getMytodoCount();
        }, 30000);
    }

    /**
     * 组件卸载时，清除定时器
     */
    componentWillUnmount () {
        clearInterval(this.interval);
    }

    render () {
        return (
            <div className="menuStyle flex">
                <Badge className='myTodo' count={this.state.count}>
                    <div onClick={this.ToMyTodo}>我的待办</div>
                </Badge>
            </div>
        );
    }
}
// ✅ 优点：

// 适用于 API 不能主动推送的情况。
// 组件加载时会立即获取一次数据，不需要等待轮询的间隔。
// 避免组件卸载后定时器仍然运行，防止内存泄漏。
// ⚠️ 缺点：

// 轮询间隔太短会增加服务器压力，建议设置合理的时间间隔（如 30 秒）。
// 需要手动管理定时器的清理。
// ✅ 方法 2：使用 WebSocket 实现实时推送
// 适用于：

// 你的后台可以主动推送“待办数量”更新，而不是前端轮询。
// 你需要实时更新数据，而不是每隔 30 秒才刷新一次。
// jsx
// 复制
// 编辑
class MyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.userService = new UserService();
        this.state = {
            count: 0 // 我的待办数量
        };
        this.ws = null;
    }

    componentDidMount () {
        this.initWebSocket();
    }

    /**
     * 初始化 WebSocket 连接
     */
    initWebSocket = () => {
        const userId = JSON.parse(localStorage.getItem('userId'));
        if (!userId) return;

        this.ws = new WebSocket(`wss://your-api.com/todo?userId=${userId}`);

        this.ws.onopen = () => {
            console.log("WebSocket 连接成功");
        };

        this.ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            this.setState({ count: data.todoCount }); // 服务器推送新数据
        };

        this.ws.onerror = (error) => {
            console.error("WebSocket 错误:", error);
        };

        this.ws.onclose = () => {
            console.log("WebSocket 连接关闭，尝试重新连接...");
            setTimeout(this.initWebSocket, 5000); // 5 秒后尝试重连
        };
    };

    componentWillUnmount () {
        if (this.ws) {
            this.ws.close();
        }
    }

    render () {
        return (
            <div className="menuStyle flex">
                <Badge className='myTodo' count={this.state.count}>
                    <div onClick={this.ToMyTodo}>我的待办</div>
                </Badge>
            </div>
        );
    }
}
// ✅ 优点：

// 更实时：服务器主动推送，不用等 30 秒轮询。
// 减少服务器压力：比 setInterval 轮询更高效。
// 自动重连：如果 WebSocket 断开，5 秒后会自动尝试重连。
// ⚠️ 缺点：

// 需要后端支持 WebSocket。
// 可能需要额外处理身份验证和断线重连。
// 总结
// 方案	适用场景	优势	缺点
// 轮询 (setInterval)	服务器不能主动推送数据	实现简单，适用于所有 API	服务器压力大，不够实时
// WebSocket	服务器可以推送数据	实时更新，减少服务器请求	需要后端支持 WebSocket
// 如果后端支持 WebSocket，建议使用 方法 2（WebSocket），这样数据会更实时，体验更流畅。
// 如果后端不支持，就用 方法 1（轮询），但时间间隔不要太短，建议 30 秒。

// 2025-03-17 15:10:02