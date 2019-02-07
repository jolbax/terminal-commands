const fs = require("fs");

module.exports.cd = (dirName, root = "./tmp", thenPrompt) => {
  try {
    if (dirName === undefined) {
      process.chdir(root);
    } else {
      process.chdir(dirName);
    }
  } catch (err) {
    console.log(err.errno === -2 ? "No such directory" : err);
  }
  thenPrompt();
};

module.exports.ls = thenPrompt => {
  fs.readdir("./", (err, files) => {
    if (err) throw console.log(err);

    const filesToString = files.reduce((acc, file) => {
      return `${acc} ${file} `;
    }, "");

    console.log(filesToString);
    thenPrompt();
  });
};

module.exports.touch = (fileName, thenPrompt) => {
  fs.appendFile(`./${fileName}`, "", err => {
    if (err) throw console.error(err);
    thenPrompt();
  });
};

module.exports.mkdir = (dirName, thenPrompt) => {
  let path = `./${dirName}`;

  createDir = path => {
    fs.mkdir(path, err => {
      if (err) throw console.error(err);
      thenPrompt();
    });
  };

  fs.stat(path, (err, stats) => {
    if (stats) {
      try {
        if (stats.isDirectory) {
          console.log(`Directory path ${dirName} already exists`);
          thenPrompt();
        } else {
          createDir(path);
        }
      } catch (e) {
        console.log(e, err);
      }
    } else {
      createDir(path);
    }
  });
};
