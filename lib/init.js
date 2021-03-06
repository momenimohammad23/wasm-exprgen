"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.thirdParties = exports.thirdPartyRoot = exports.outputDir = exports.binDirectory = exports.buildDirectory = exports.toolsDirectory = exports.rootDir = exports.isWindows = undefined;

var _bluebird = require("bluebird");

var _bluebird2 = _interopRequireDefault(_bluebird);

var _fsExtra = require("fs-extra");

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _which = require("which");

var _which2 = _interopRequireDefault(_which);

var _child_process = require("child_process");

var _child_process2 = _interopRequireDefault(_child_process);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _os = require("os");

var _os2 = _interopRequireDefault(_os);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isWindows = exports.isWindows = _os2.default.platform() === "win32";

_bluebird2.default.promisifyAll(_fsExtra2.default);
_which2.default.async = _bluebird2.default.promisify(_which2.default);
_bluebird2.default.promisifyAll(_child_process2.default);

var rootDir = exports.rootDir = _path2.default.join(__dirname, "..");
var toolsDirectory = exports.toolsDirectory = _path2.default.join(rootDir, "tools");
var buildDirectory = exports.buildDirectory = {
  csmith: _path2.default.join(toolsDirectory, "csmith"),
  spec: _path2.default.join(toolsDirectory, "spec"),
  llvm: _path2.default.join(toolsDirectory, "llvm")
};
var binDirectory = exports.binDirectory = {
  csmith: _path2.default.join(buildDirectory.csmith, "src", "Release"),
  spec: buildDirectory.spec,
  llvm: _path2.default.join(buildDirectory.llvm, isWindows ? "Release/bin" : "bin")
};
var outputDir = exports.outputDir = _path2.default.join(rootDir, "output");
var thirdPartyRoot = exports.thirdPartyRoot = _path2.default.join(rootDir, "third_party");
var thirdParties = exports.thirdParties = {
  llvm: _path2.default.join(thirdPartyRoot, "emscripten-fastcomp"),
  emscripten: _path2.default.join(thirdPartyRoot, "emscripten"),
  csmith: _path2.default.join(thirdPartyRoot, "csmith"),
  clang: _path2.default.join(thirdPartyRoot, "clang"),
  spec: _path2.default.join(thirdPartyRoot, "wasm-spec"),
  m4: thirdPartyRoot
};