"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const myExtension = require("../../utils");
suite('Utils Test Suite', () => {
    test('Capture file extension', () => {
        let file = "path/to/file.js";
        let extension = myExtension.getFileExtension(file);
        assert.strictEqual(extension, 'js');
    });
});
//# sourceMappingURL=utils.test.js.map