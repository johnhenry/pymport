import { spawn } from "child_process";

const split_path = (pythonModulePath) => {
  // Find the last occurrence of '/' which separates the directory from the file
  const lastSlashIndex = pythonModulePath.lastIndexOf("/");
  // If there is no '/', it means the file is in the current directory
  if (lastSlashIndex === -1) {
    return [".", pythonModulePath];
  } else {
    // Extract the path part up to the last '/'
    const path = pythonModulePath.substring(0, lastSlashIndex);
    // Extract the file/module name after the last '/'
    const module = pythonModulePath.substring(lastSlashIndex + 1);
    const PATH = path.startsWith("file://") ? path.slice(7) : path;
    return [PATH, module];
  }
};
const invoke = (command, transform = (x) => x) =>
  new Promise((resolve, reject) => {
    const python = spawn("python", ["-c", command]);
    const output = [];
    python.stdout.on("data", (data) => {
      output.push(data.toString());
    });
    python.on("close", (code) => {
      if (code !== 0) {
        reject(new Error(`Python script exited with code ${code}`));
      } else {
        resolve(transform(output.join("").trim()));
      }
    });
  });

const pymport = (pythonModulePath) => {
  const [path, module] = split_path(pythonModulePath);
  return (exportName, transform) => {
    const preamble = `import importlib.util; import sys; spec = importlib.util.spec_from_file_location("module.name","${path}/${module}"); foo = importlib.util.module_from_spec(spec); sys.modules["module.name"] = foo; spec.loader.exec_module(foo);__ = foo.${exportName};`;
    return {
      get value() {
        return invoke(`${preamble} print(__)`, transform);
      },

      call(...args) {
        return invoke(
          `${preamble} print(__(${args
            .map((arg) => JSON.stringify(arg))
            .join(",")}))`,
          transform
        );
      },
    };
  };
};

export default pymport;
