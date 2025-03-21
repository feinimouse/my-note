# async-await

在 Python 中，`async` 和 `await` 是用于实现 **异步编程（Asynchronous Programming）** 的关键字。它们允许程序在等待某些耗时操作（如 I/O 操作、网络请求等）完成时，继续执行其他任务，从而提高程序的效率和响应能力。

---

### 1. **基本概念**
- **同步代码（Synchronous Code）**：传统的代码是顺序执行的，当遇到阻塞操作（如文件读取或网络请求）时，整个程序会暂停，直到该操作完成。
- **异步代码（Asynchronous Code）**：使用 `async` 和 `await`，可以让程序在等待某个操作完成时切换到其他任务，而不阻塞整个程序的执行。

Python 的异步编程基于 **事件循环（Event Loop）**，由 `asyncio` 库提供支持。

---

### 2. **`async` 和 `await` 的用法**

#### （1）定义异步函数
使用 `async def` 定义一个异步函数（也称为协程，Coroutine）。这样的函数不会直接运行，而是返回一个协程对象，需要通过事件循环来调度执行。

```python
import asyncio

async def say_hello():
    print("Hello")
    await asyncio.sleep(1)  # 模拟耗时操作
    print("World")

# 调用异步函数
coroutine = say_hello()
print(coroutine)  # 输出: <coroutine object say_hello at 0x...>
```

注意：调用 `say_hello()` 并不会立即执行函数，而是返回一个协程对象。

#### （2）运行异步函数
要运行异步函数，需要将其交给事件循环。可以使用 `asyncio.run()` 来启动事件循环并运行协程。

```python
import asyncio

async def say_hello():
    print("Hello")
    await asyncio.sleep(1)  # 等待 1 秒
    print("World")

# 运行异步函数
asyncio.run(say_hello())
```

**输出：**
```
Hello
（等待 1 秒）
World
```

---

### 3. **`await` 的作用**
`await` 用于等待一个异步操作完成。它可以暂停当前协程的执行，直到被等待的操作完成，同时让出控制权给事件循环，以便执行其他任务。

#### 示例：
```python
import asyncio

async def task1():
    print("Task 1 started")
    await asyncio.sleep(2)  # 模拟耗时操作
    print("Task 1 finished")

async def task2():
    print("Task 2 started")
    await asyncio.sleep(1)  # 模拟耗时操作
    print("Task 2 finished")

async def main():
    # 并发运行两个任务
    await asyncio.gather(task1(), task2())

# 运行主函数
asyncio.run(main())
```

**输出：**
```
Task 1 started
Task 2 started
（等待 1 秒）
Task 2 finished
（再等待 1 秒）
Task 1 finished
```

在这个例子中，`task1` 和 `task2` 是并发执行的，而不是顺序执行。尽管 `task1` 的总耗时更长，但 `task2` 在等待 1 秒后已经完成。

---

### 4. **并发与并行**
- **并发（Concurrency）**：多个任务交替执行，充分利用等待时间。
- **并行（Parallelism）**：多个任务同时执行，通常需要多核 CPU 支持。

Python 的 `asyncio` 实现的是 **并发**，而不是真正的并行。它适用于 I/O 密集型任务（如网络请求、文件读写），但对于 CPU 密集型任务（如复杂计算），可以考虑使用 `concurrent.futures` 或 `multiprocessing`。

---

### 5. **常见工具与方法**

#### （1）`asyncio.gather`
用于并发运行多个协程，并收集它们的结果。

```python
import asyncio

async def fetch_data(delay, name):
    await asyncio.sleep(delay)
    return f"Data from {name}"

async def main():
    results = await asyncio.gather(
        fetch_data(2, "Task A"),
        fetch_data(1, "Task B"),
        fetch_data(3, "Task C")
    )
    print(results)

asyncio.run(main())
```

**输出：**
```
['Data from Task A', 'Data from Task B', 'Data from Task C']
```

#### （2）`asyncio.create_task`
用于显式创建任务并调度到事件循环中。

```python
import asyncio

async def task(name, delay):
    print(f"{name} started")
    await asyncio.sleep(delay)
    print(f"{name} finished")

async def main():
    # 创建任务
    task1 = asyncio.create_task(task("Task 1", 2))
    task2 = asyncio.create_task(task("Task 2", 1))

    # 等待任务完成
    await task1
    await task2

asyncio.run(main())
```

**输出：**
```
Task 1 started
Task 2 started
（等待 1 秒）
Task 2 finished
（再等待 1 秒）
Task 1 finished
```

#### （3）`asyncio.sleep`
模拟异步的延迟操作。

```python
import asyncio

async def example():
    print("Start")
    await asyncio.sleep(1)  # 等待 1 秒
    print("End")

asyncio.run(example())
```

---

### 6. **注意事项**
1. **不要在普通函数中使用 `await`**：
   - `await` 只能在 `async` 函数中使用。如果在普通函数中使用 `await`，会导致语法错误。

2. **避免阻塞事件循环**：
   - 避免在异步代码中使用阻塞操作（如 `time.sleep`），否则会阻塞整个事件循环。可以使用 `asyncio.sleep` 替代。

3. **调试异步代码**：
   - 使用 `asyncio.run()` 时，可以通过设置环境变量 `PYTHONASYNCIODEBUG=1` 启用调试模式。

---

### 7. **适用场景**
- **I/O 密集型任务**：如网络请求、数据库查询、文件读写。
- **高并发需求**：如 Web 服务器处理大量请求。
- **实时应用**：如聊天应用、游戏服务器。

---

### 总结
`async` 和 `await` 提供了一种优雅的方式来编写异步代码，使程序能够高效地处理耗时操作，而不会阻塞主线程。结合 `asyncio` 库，可以轻松实现并发任务调度。对于 I/O 密集型任务，异步编程是一种非常强大的工具！