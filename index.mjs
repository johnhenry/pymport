import { spawn } from "child_process";

function mod(pythonModulePath) {
  return function (exportName) {
    return {
      get value() {
        const command = `import sys; sys.path.append('.'); from ${pythonModulePath.replace(
          /.py$/,
          ""
        )} import ${exportName} as exported_value; print(exported_value)`;
        return new Promise((resolve, reject) => {
          const python = spawn("python", ["-c", command]);
          let output = "";
          python.stdout.on("data", (data) => {
            output += data.toString();
          });
          python.on("close", (code) => {
            if (code !== 0) {
              reject(new Error(`Python script exited with code ${code}`));
            } else {
              resolve(output.trim());
            }
          });
        });
      },

      call(...args) {
        const argsString = args.map((arg) => JSON.stringify(arg)).join(",");
        const command = `import sys; sys.path.append('.'); from ${pythonModulePath.replace(
          /.py$/,
          ""
        )} import ${exportName} as exported_function; print(exported_function(${argsString}))`;
        return new Promise((resolve, reject) => {
          const python = spawn("python", ["-c", command]);
          let output = "";
          python.stdout.on("data", (data) => {
            output += data.toString();
          });
          python.on("close", (code) => {
            if (code !== 0) {
              reject(new Error(`Python script exited with code ${code}`));
            } else {
              resolve(output.trim());
            }
          });
        });
      },
    };
  };
}

export default mod;
