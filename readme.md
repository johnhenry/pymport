# pymport

Import python modules into javascript files.

## Installation

```bash
npm install pymport
```

## Usage: Compare to normal javascript imports

```javascript
import * as javascript_module from "./path/to/javascript_module.mjs";
const js_val = javascript_module.some_val;
const js_func_val = javascript_module.some_func();
```

```javascript
import pymport from "pymport";
const python_module = pymport(
  import.meta.resolve("./path/to/python_module.py")
);
const ps_val = await python_module("some_val").value;
const ps_func_val = await python_module("some_func").call();
```

## Usage: Casting

```javascript
import pymport from "pymport";
const python_module = pymport(
  import.meta.resolve("./path/to/python_module.py")
);
const ps_some_numeric_val = await python_module("some_numeric_val", Number)
  .value;
```
