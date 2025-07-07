"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Memory = void 0;
/**
 * Front-end for the Memento VS Code persistence service
 */
class Memory {
    constructor(memento) {
        this.memento = memento;
    }
    has(key) {
        return this.get(key) === undefined;
    }
    get(key) {
        return this.memento.get(key);
    }
    delete(key) {
        this.memento.update(key, undefined);
    }
    set(key, value) {
        console.debug(`Mementoizing ${key}`);
        this.memento.update(key, value);
    }
    keys() {
        return this.memento.keys();
    }
}
exports.Memory = Memory;
//# sourceMappingURL=Memory.js.map