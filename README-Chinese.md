# frege 是什么?
frege 可以从一个现有的 `package.json` 逆向生成安装所需的 `npm install` 脚本.

## 安装
建议把 frege 安装到全局, 然后就可以在命令下直接使用了.

```npm
npm install frege -g
```

## 使用
### 参数说明
```text
frege [options]

基本配置:
  -f, --file String     要解析的 package.json 文件, 默认会解析当前目录下名为 package.json 的文件 - default: package.json
  -l, --latest          不管 package.json 中 npm 包的具体版本号, 安装该包的最新版本 - default: false
  -p, --productionOnly  仅生成 dependencies 项目下 npm 包的安装脚本. - default: false
  -d, --devOnly         仅生成 devDependencies 项目下的 npm 包的安装脚本, 即开发使用的. - default: false
  -h, --help            Show help
  -v, --version         Output the version number
```

## Examples
### frege
```text
frege
```
不带任何参数直接运行 frege 命令将生成当前目录下 package.json 文件中 dependencies 和 devDependencis(如果有的话) 全部 npm 包的安装脚本, 例如:
```text
npm i -S debug@">=2.6.8 <3.0.0" optionator@">=0.8.2 <0.9.0" semver@">=5.3.0 <6.0.0"
npm i -D ava@">=0.19.1 <0.20.0" chai@">=4.0.1 <5.0.0" eslint@">=3.19.0 <4.0.0" tap-nyan@">=1.1.0 <2.0.0"
```

### frege -p
是
```text
frege --productionOnly
```
的缩写, 仅生成 `dependencis` 下面 npm 包的安装脚本.
```text
npm i -S debug@">=2.6.8 <3.0.0" optionator@">=0.8.2 <0.9.0" semver@">=5.3.0 <6.0.0"
```

### frege -d
是
```text
frege --devOnly
```
的缩写, 仅生成 `devDependencis` 项下面 npm 包的安装脚本.
```text
npm i -D ava@">=0.19.1 <0.20.0" chai@">=4.0.1 <5.0.0" eslint@">=3.19.0 <4.0.0" tap-nyan@">=1.1.0 <2.0.0"
```

### frege -l
是
```text
frege --latest
```
的简写, 安装 npm 包的最新版本, 而不是原有 package.json 中指定的版本范围.
```text
npm i -S debug optionator semver
npm i -D ava chai eslint tap-nyan
```

### frege -f ../augustine/package.json
指定要解析的 package.json 文件的完整路径.

有问题欢迎反馈!

范圣刚 <tom@tfan.org>
