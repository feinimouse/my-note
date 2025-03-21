# Pydantic库是做什么的

## 前情提要

在 Python 中，**类型注解（Type Annotations）本身并不会强制限制变量的类型**。也就是说，即使你在类中为某个成员变量指定了数据类型（如 `quantity: int`），Python 仍然允许你将该变量赋值为其他类型的值（例如字符串）。这是因为 Python 是一种动态类型语言，类型注解仅用于静态分析和工具支持（如 IDE 提示、代码检查工具等），而不会在运行时强制执行。

---

### 示例：类型注解不会强制限制类型
```python
class Example:
    def __init__(self, quantity: int):
        self.quantity = quantity

# 创建实例并赋值为整数
obj1 = Example(quantity=10)
print(obj1.quantity)  # 输出: 10

# 创建实例并赋值为字符串
obj2 = Example(quantity="not an integer")
print(obj2.quantity)  # 输出: not an integer
```

在这个例子中，尽管我们在 `__init__` 方法中为 `quantity` 参数添加了类型注解 `: int`，但 Python 并不会阻止我们将一个字符串赋值给 `quantity`。

---

### 如何实现类型检查？
如果你希望在运行时强制执行类型检查，可以使用以下几种方法：

#### 1. **使用 Pydantic**
Pydantic 是一个专门用于数据验证的库，它会在运行时检查字段的类型，并在类型不匹配时抛出错误。

##### 示例：
```python
from pydantic import BaseModel, ValidationError

class Example(BaseModel):
    quantity: int

# 合法赋值
obj1 = Example(quantity=10)
print(obj1)  # 输出: quantity=10

# 非法赋值
try:
    obj2 = Example(quantity="not an integer")
except ValidationError as e:
    print(e)
```

**输出：**
```
1 validation error for Example
quantity
  value is not a valid integer (type=type_error.integer)
```

在这里，Pydantic 强制要求 `quantity` 必须是整数类型，否则会抛出 `ValidationError`。

---

#### 2. **手动实现类型检查**
如果你不想依赖外部库，可以在代码中手动进行类型检查。

##### 示例：
```python
class Example:
    def __init__(self, quantity: int):
        if not isinstance(quantity, int):
            raise TypeError(f"Expected int for quantity, got {type(quantity).__name__}")
        self.quantity = quantity

# 合法赋值
obj1 = Example(quantity=10)
print(obj1.quantity)  # 输出: 10

# 非法赋值
try:
    obj2 = Example(quantity="not an integer")
except TypeError as e:
    print(e)
```

**输出：**
```
Expected int for quantity, got str
```

这种方法通过 `isinstance` 检查变量类型，并在类型不匹配时抛出自定义异常。

---

#### 3. **使用 `@property` 和 `@quantity.setter`**
如果你希望对类的属性进行更细粒度的控制，可以使用 `@property` 和 `@setter` 装饰器来实现类型检查。

##### 示例：
```python
class Example:
    def __init__(self, quantity: int):
        self.quantity = quantity  # 调用 setter 方法

    @property
    def quantity(self) -> int:
        return self._quantity

    @quantity.setter
    def quantity(self, value: int):
        if not isinstance(value, int):
            raise TypeError(f"Expected int for quantity, got {type(value).__name__}")
        self._quantity = value

# 合法赋值
obj1 = Example(quantity=10)
print(obj1.quantity)  # 输出: 10

# 非法赋值
try:
    obj2 = Example(quantity="not an integer")
except TypeError as e:
    print(e)

# 修改属性时也会触发类型检查
try:
    obj1.quantity = "invalid"
except TypeError as e:
    print(e)
```

**输出：**
```
Expected int for quantity, got str
Expected int for quantity, got str
```

这种方式通过 `@property` 和 `@setter` 实现了对属性的类型保护。

---

### 总结
- **默认情况下，Python 的类型注解不会强制限制变量的类型**。
- 如果需要强制类型检查，可以使用以下方法：
  1. 使用 Pydantic 进行自动验证。
  2. 手动实现类型检查（如 `isinstance`）。
  3. 使用 `@property` 和 `@setter` 控制属性访问。

根据你的需求选择合适的方法。如果项目中需要大量数据验证，推荐直接使用 Pydantic，因为它功能强大且易于集成。

## Pydantic

Pydantic 是一个用于数据验证和设置管理的 Python 库，它基于 Python 的类型注解（Type Annotations）来实现强大的功能。其核心目的是确保输入数据符合预期的结构和类型，并在数据不符合要求时提供清晰的错误信息。

以下是 Pydantic 的主要用途和特点：

---

### 1. **数据验证**
Pydantic 使用类模型（`BaseModel`）定义数据结构，并根据字段的类型注解自动验证输入数据是否符合预期。如果数据无效，Pydantic 会抛出详细的错误信息。

#### 示例：
```python
from pydantic import BaseModel, ValidationError

class User(BaseModel):
    id: int
    name: str
    age: int

# 合法的数据
user = User(id=1, name="Alice", age=30)
print(user)  # 输出: id=1 name='Alice' age=30

# 非法的数据
try:
    user = User(id="one", name="Bob", age="thirty")
except ValidationError as e:
    print(e)
```

**输出：**
```
2 validation errors for User
id
  value is not a valid integer (type=type_error.integer)
age
  value is not a valid integer (type=type_error.integer)
```

在这个例子中，`User` 模型定义了三个字段：`id`、`name` 和 `age`，并指定了它们的类型。当输入数据不符合这些类型时，Pydantic 会捕获并报告错误。

---

### 2. **数据解析与转换**
Pydantic 不仅可以验证数据，还可以将输入数据自动转换为正确的类型。例如，字符串形式的数字可以被自动解析为整数或浮点数。

#### 示例：
```python
class Item(BaseModel):
    price: float
    quantity: int

data = {"price": "19.99", "quantity": "5"}
item = Item(**data)
print(item)  # 输出: price=19.99 quantity=5
```

在这里，虽然输入的 `price` 和 `quantity` 是字符串，但 Pydantic 自动将其转换为 `float` 和 `int` 类型。

---

### 3. **嵌套模型支持**
Pydantic 支持嵌套模型，即一个字段可以是另一个模型的实例。这使得复杂数据结构的验证变得非常方便。

#### 示例：
```python
class Address(BaseModel):
    city: str
    zipcode: str

class Person(BaseModel):
    name: str
    address: Address

data = {
    "name": "John",
    "address": {
        "city": "New York",
        "zipcode": "10001"
    }
}

person = Person(**data)
print(person)
```

**输出：**
```
name='John' address=Address(city='New York', zipcode='10001')
```

这种嵌套模型的能力非常适合处理 JSON 数据或其他复杂结构。

---

### 4. **默认值与可选字段**
Pydantic 允许为字段指定默认值，或者使用 `Optional` 表示字段是可选的。

#### 示例：
```python
from typing import Optional

class Product(BaseModel):
    name: str
    price: float
    description: Optional[str] = None  # 可选字段，默认值为 None

product = Product(name="Laptop", price=999.99)
print(product)  # 输出: name='Laptop' price=999.99 description=None
```

---

### 5. **自定义验证器**
除了基于类型注解的验证外，Pydantic 还允许通过装饰器 `@validator` 定义自定义验证逻辑。

#### 示例：
```python
from pydantic import BaseModel, validator

class UserModel(BaseModel):
    name: str
    password: str

    @validator('password')
    def password_strength(cls, v):
        if len(v) < 8:
            raise ValueError('Password must be at least 8 characters long')
        return v

try:
    user = UserModel(name="Alice", password="123")
except ValidationError as e:
    print(e)
```

**输出：**
```
1 validation error for UserModel
password
  Password must be at least 8 characters long (type=value_error)
```

---

### 6. **与 JSON 的无缝集成**
Pydantic 提供了方便的方法（如 `.json()` 和 `.dict()`），可以轻松地将模型序列化为 JSON 或字典格式。这使得它在 Web 开发（如 FastAPI）中非常流行。

#### 示例：
```python
class Book(BaseModel):
    title: str
    author: str
    year: int

book = Book(title="Python Cookbook", author="David Beazley", year=2013)
print(book.json())  # 输出: {"title": "Python Cookbook", "author": "David Beazley", "year": 2013}
```

---

### 7. **与其他工具的集成**
Pydantic 广泛应用于现代 Python 生态系统中，特别是在以下场景中：
- **FastAPI**：用于构建 API 的请求和响应模型。
- **配置管理**：用于加载和验证应用程序的配置文件。
- **ORM（对象关系映射）**：如 SQLAlchemy 的模型验证。

---

### 总结
Pydantic 是一个强大且灵活的库，主要用于以下场景：
- 数据验证与解析。
- 复杂数据结构的建模。
- 自动生成文档（如在 FastAPI 中）。
- 提高代码的可读性和可靠性。

如果你需要处理用户输入、API 数据或配置文件，Pydantic 是一个非常值得推荐的工具！