"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerEntry = exports.Logger = void 0;
const util = require("util");
const vscode = require("vscode");
const JSON5 = require("json5");
/**
 * Lightweight storage for event data prior to de-staging.
 *
 * This is a singleton.  Use getLogger() to get the instance.
 */
class Logger {
    static getLogger(extensionUri) {
        if (Logger.theInstance === undefined) {
            Logger.theInstance = new Logger(extensionUri);
        }
        return Logger.theInstance;
    }
    constructor(extensionUri) {
        this.extensionUri = extensionUri;
        this.log = [];
        this.interval = 30000; // 30 seconds
        this.chunkPrefix = `LoggerChunk`;
        this.lastPersist = new Date();
        this.nextPersist = new Date(this.lastPersist.getTime() + this.interval);
        this.calcPersist();
    }
    calcPersist() {
        this.lastPersist = new Date();
        this.nextPersist = new Date(this.lastPersist.getTime() + this.interval);
    }
    persistChunk() {
        const { workspaceFolders } = vscode.workspace;
        if (workspaceFolders === undefined) {
            console.debug(`No workspace folders, not persisting log chunk`);
            return;
        }
        if (workspaceFolders.length !== 1) {
            console.debug(`${workspaceFolders.length} workspace folders instead of 1, not persisting log chunk`);
            return;
        }
        const chunkName = `${this.chunkPrefix}-${this.lastPersist.toISOString()}`;
        const chunkUri = vscode.Uri.joinPath(workspaceFolders[0].uri, "telemetry", chunkName + ".json");
        console.log(chunkUri);
        this.calcPersist(); // Reset the persistence stamps
        if (this.log.length) {
            const logCopy = this.log;
            this.log = []; // Clear the persisted data
            vscode.workspace.fs.writeFile(chunkUri, Buffer.from(JSON5.stringify(logCopy)));
        }
        else {
            console.debug("No log data to persist");
        }
    }
    clear() {
        this.log = [];
        /*
        const keys: readonly string[] = this.memory.keys();
        for (const keyidx in keys) {
          const key: string = keys[keyidx];
          if (key.startsWith(this.chunkPrefix)) {
            this.memory.delete(key);
            console.debug(`Deleted chunk: ${key}`);
          }
        }
        */
        console.debug(`Cleared in-memory log data (any persisted chunks remain)`);
    }
    flush() {
        this.persistChunk();
    }
    push(logEntry) {
        this.log.push(logEntry);
        if (new Date() > this.nextPersist) {
            this.persistChunk(); // Persist if needed
        }
    }
}
exports.Logger = Logger;
/**
 * An entry in the log
 */
class LoggerEntry {
    constructor(src, msg, prm) {
        this.src = src;
        this.msg = msg;
        this.prm = prm;
        this.time = new Date().toISOString();
    }
    toString() {
        const logStart = `${this.time}:${this.src}`;
        if (this.msg === undefined) {
            return logStart;
        }
        else if (this.prm === undefined) {
            return `${logStart}: ${this.msg}`;
        }
        else {
            return `${logStart}: ${util.format(this.msg, ...this.prm)}`;
        }
    }
}
exports.LoggerEntry = LoggerEntry;
//# sourceMappingURL=Logger.js.map