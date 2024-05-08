# pyntegrate

Import python modules into javascript files.

See [pymport](https://www.npmjs.com/package/pymport) for a similar package that allows for importing python modules into javascript files.

## Installation

```bash
npm install pyntegrate
```

## Usage: Compare to normal javascript imports

```javascript
import * as javascript_module from "./path/to/javascript_module.mjs";
const js_val = javascript_module.some_val;
const js_func_val = javascript_module.some_func();
```

```javascript
import pyntegrate from "pyntegrate";
const python_module = pyntegrate(
  import.meta.resolve("./path/to/python_module.py")
);
const ps_val = await python_module("some_val").value;
const ps_func_val = await python_module("some_func").call();
```

## Usage: Casting

```javascript
import pyntegrate from "pyntegrate";
const python_module = pyntegrate(
  import.meta.resolve("./path/to/python_module.py")
);
const ps_some_numeric_val = await python_module("some_numeric_val", Number)
  .value;
```
