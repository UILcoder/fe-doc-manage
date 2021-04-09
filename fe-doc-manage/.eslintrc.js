module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },

  /**
   * "off" 或 0 - 关闭规则
   * "warn" 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出),
   * "error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)
   */
  rules: {
    // 'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 允许任何地方使用require函数
    'global-require': 0,
    // 箭头函数体默认：单行不能有{},不能写return。多行要有{},要写return。改成always，统一风格
    'arrow-body-style': [0, 'always'],
    // 当一个函数里没有用this关键字，也就是没有调用其他实例函数时，eslint要求函数修饰符改成static的，这里关闭
    'class-methods-use-this': 0,
    // es6不允许字符串拼接，得用模板如`Hello, ${name}!`，这里关闭
    // "prefer-template": 0,
    // 数组或对象，最后一个元素后面不需要逗号
    'comma-dangle': [0, 'never'],
    // 缩进
    indent: [2, 2, { SwitchCase: 1 }],
    // 禁止条件表达式中出现赋值操作符
    'no-cond-assign': 2,
    // 禁用 console
    'no-console': 0,
    // 禁止 function 定义中出现重名参数
    'no-dupe-args': 2,
    // 禁止对象字面量中出现重复的 key
    'no-dupe-keys': 2,
    // 禁止重复的 case 标签
    'no-duplicate-case': 2,
    // 禁止空语句块
    'no-empty': 2,
    // 禁止不必要的括号
    'no-extra-parens': 1,
    // 禁止不必要的分号
    'no-extra-semi': 0,
    // 禁止在字符串和注释之外不规则的空白
    'no-irregular-whitespace': 2,
    // 禁止直接使用 Object.prototypes 的内置属性
    'no-prototype-builtins': 0,
    // 禁止正则表达式字面量中出现多个空格
    'no-regex-spaces': 2,
    // 禁止出现令人困惑的多行表达式
    'no-unexpected-multiline': 2,
    // 禁止在return、throw、continue 和 break语句之后出现不可达代码
    'no-unreachable': 2,
    // 定义对象的set存取器属性时，强制定义get
    'accessor-pairs': 2,
    // 强制数组方法的回调函数中有 return 语句
    'array-callback-return': 0,
    // 强制把变量的使用限制在其定义的作用域范围内
    'block-scoped-var': 0,
    // 限制圈复杂度，也就是类似if else能连续接多少个
    complexity: [2, 20],
    // 要求 return 语句要么总是指定返回的值，要么不指定
    'consistent-return': 0,
    // 强制所有控制语句使用一致的括号风格
    curly: [2, 'all'],
    // 强制object.key 中 . 的位置，参数:property，'.'号应与属性在同一行 object, '.' 号应与对象名在同一行
    'dot-location': [2, 'property'],
    // 使用 === 替代 == allow-null允许null和undefined==
    eqeqeq: [2, 'allow-null'],
    // 禁用 alert、confirm 和 prompt
    'no-alert': 0,
    // 禁用 eval()
    'no-eval': 2,
    // 禁止 case 语句落空
    'no-fallthrough': 2,
    // 禁止数字字面量中使用前导和末尾小数点
    'no-floating-decimal': 2,
    // 禁止使用多个空格
    'no-multi-spaces': 2,
    // 强制在parseInt()使用基数参数
    radix: 2,
    // if while function 后面的{必须与if在同一行
    'brace-style': [2, '1tbs', { allowSingleLine: true }],
    // 控制逗号前后的空格
    'comma-spacing': [2, { before: false, after: true }],
    // 强制在对象字面量的属性中键和值之间使用一致的间距
    'key-spacing': [2, { beforeColon: false, afterColon: true }],
    // 要求在注释周围有空行 ( 要求在块级注释之前有一空行)
    'lines-around-comment': [1, { beforeBlockComment: true }],
    // 强制回调函数最大嵌套深度 5层
    'max-nested-callbacks': [1, 5],
    // 强制一行的最大长度
    'max-len': [1, 300],
    // 强制 function 块最多允许的的语句数量
    'max-statements': [1, 200],
    // 要求或禁止使用分号而不是 ASI（这个才是控制行尾部分号的，）
    semi: 0,
    // JSX 属性中一致使用双引号或单引号, vue html标签中的属性的引号，不起作用
    'jsx-quotes': [2, 'prefer-single'],
    // 允许使用悬空下划线
    'no-underscore-dangle': 0,
    // 允许存在多行
    'no-multiple-empty-lines': 0,
    // 允许存在tab
    'no-trailing-spaces': 0,
    // 允许使用for-in for-of。推荐用.forEach
    'no-restricted-syntax': 0,
    // 允许使用Object.assign
    'prefer-object-spread': 0,
    // 允许下划线变量 主要是第三方js插件的参数基本都是xx_xx
    '@typescript-eslint/camelcase': [0, { properties: 'always' }],
    // 最多参数
    'max-params': [2, 3],
    // 禁止比较使用NaN, 只能用isNaN()
    'use-isnan': 2,
    // 禁止连续声明
    'one-var': 2,
    // 禁止给参数重新赋值
    'no-param-reassign': 0,
    // 禁止无效表达式
    'no-unused-expressions': 0,
    // 禁止使用promise-reject
    'prefer-promise-reject-errors': 0,
    // 箭头函数用小括号括起来
    'arrow-parens': 0,
    // 外部作用域中的变量不能与它所包含的作用域中的变量或参数同名
    'no-shadow': 0,
    // 'prefer-arrow-callback': 0
  },
};
