"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerEntry = exports.listeners = exports.commands = exports.deinit = exports.init = void 0;
const vscode = require("vscode");
const Logger_1 = require("./Logger");
Object.defineProperty(exports, "LoggerEntry", { enumerable: true, get: function () { return Logger_1.LoggerEntry; } });
let currentWindow = ""; // Current editor window filename / uri
let currentTerm = ""; // Current terminal window name
let logger; // Telemetry logger
let context; // Context of this extension
let config; // Configuration settings
/**
 * Initialize the module.
 *
 * @param context extension context
 */
async function init(inContext) {
    console.info("Telemetry is starting...");
    context = inContext;
    // Setup Workspace Storage
    logger = Logger_1.Logger.getLogger(context.extensionUri);
    // Load config
    const cfg = vscode.workspace.getConfiguration("telemetry");
    config = {
        active: cfg.get("active", false),
    };
    if (config.active) {
        console.info("Telemetry is active");
    }
    else {
        console.info("Telemetry is inactive");
    }
}
exports.init = init;
/**
 * Called when extension is deactivated
 */
function deinit() {
    currentWindow = "";
    currentTerm = "";
    /**
     * The following code is usually ineffective when the vscode window
     * is closed. For an explanation as to why, see Microsoft's explanation
     * below. The long and short of it is we may not be able to persist data.
     * https://github.com/microsoft/vscode/issues/122825#issuecomment-814218149
     */
    logger.flush();
}
exports.deinit = deinit;
/**
 * Filenames for code editors start with '/' or '\'
 *
 * !!! Not sure this is what we want here.
 *
 * @param fn filename
 * @returns true if filename starts with '/' or '\'
 */
function isCodeEditor(fn) {
    return fn.charAt(0) === "/" || fn.charAt(0) === "\\";
}
/**
 * Export this module's commands to the extension.
 *
 * Note: Manually update package.json.
 */
exports.commands = {
    dumpLog: {
        name: "GILT.telemetry.DumpLog",
        fn: () => {
            logger.flush();
            vscode.window.showInformationMessage(`Log Data flushed to file system`);
        },
    },
    clearLog: {
        name: "GILT.telemetry.ClearLog",
        fn: () => {
            logger.clear();
            logger.push(new Logger_1.LoggerEntry("logDataCleared"));
            vscode.window.showInformationMessage("Log Data cleared");
        },
    },
    logTelemetry: {
        name: "GILT.telemetry.log",
        fn: (le) => {
            if (le !== undefined && typeof le === "object") {
                logger.push(le);
            }
        },
    },
};
/**
 * Export this module's listeners to the extension.
 */
exports.listeners = [
    //
    // ----------------------- Workspace Handlers ---------------------- //
    {
        event: vscode.workspace.onDidChangeConfiguration,
        fn: (e) => {
            logger.push(new Logger_1.LoggerEntry("onDidChangeConfiguration"));
        },
    },
    {
        event: vscode.workspace.onDidChangeTextDocument,
        fn: (e) => {
            for (const c of e.contentChanges) {
                logger.push(new Logger_1.LoggerEntry("onDidChangeTextDocument", "%s:%s to %s:%s in [%s] replaced with: %s`", [
                    c.range.start.line.toString(),
                    c.range.start.character.toString(),
                    c.range.end.line.toString(),
                    c.range.end.character.toString(),
                    e.document.fileName,
                    c.text,
                ]));
            }
        },
    },
    // ------------------------ Window Handlers ------------------------ //
    {
        event: vscode.window.onDidChangeActiveTextEditor,
        fn: (editor) => {
            const previousWindow = currentWindow;
            currentWindow =
                editor !== undefined && isCodeEditor(editor.document.fileName)
                    ? editor.document.fileName
                    : editor?.document.uri.toString() ?? "";
            logger.push(new Logger_1.LoggerEntry("onDidChangeActiveTextEditor", "Current editor: [%s]; Previous editor: [%s]", [currentWindow, previousWindow]));
        },
    },
    {
        event: vscode.window.onDidChangeTextEditorSelection,
        fn: (e) => {
            for (const s of e.selections) {
                const selectedText = e.textEditor.document.getText(s);
                logger.push(new Logger_1.LoggerEntry("onDidChangeTextEditorSelection", "%s:%s to %s:%s in [%s] text: %s", [
                    s.start.line.toString(),
                    s.start.character.toString(),
                    s.end.line.toString(),
                    s.end.character.toString(),
                    e.textEditor.document.fileName,
                    selectedText,
                ]));
            }
        },
    },
    {
        event: vscode.window.onDidChangeTextEditorVisibleRanges,
        fn: (e) => {
            for (const r of e.visibleRanges) {
                logger.push(new Logger_1.LoggerEntry("onDidChangeTextEditorVisibleRanges", "%s:%s to %s:%s [%s]", [
                    r.start.line.toString(),
                    r.start.character.toString(),
                    r.end.line.toString(),
                    r.end.character.toString(),
                    e.textEditor.document.fileName,
                ]));
            }
        },
    },
    // ----------------------- Terminal Handlers ----------------------- //
    {
        event: vscode.window.onDidOpenTerminal,
        fn: (term) => {
            logger.push(new Logger_1.LoggerEntry("onDidOpenTerminal", "Opened terminal: [%s]", [
                term.name,
            ]));
        },
    },
    {
        event: vscode.window.onDidChangeActiveTerminal,
        fn: (term) => {
            const previousTerm = currentTerm;
            currentTerm = term === undefined ? "" : term.name;
            logger.push(new Logger_1.LoggerEntry("onDidChangeActiveTerminal", "Current terminal: [%s]; Previous terminal: [%s]", [currentTerm, previousTerm]));
        },
    },
    {
        event: vscode.window.onDidChangeTerminalState,
        fn: (term) => {
            logger.push(new Logger_1.LoggerEntry("onDidChangeTerminalState", "Current terminal: [%s]; InteractedWith: [%s]", [term.name, term.state.isInteractedWith ? "true" : "false"]));
        },
    },
    {
        event: vscode.window.onDidCloseTerminal,
        fn: (term) => {
            logger.push(new Logger_1.LoggerEntry("onDidCloseTerminal", "Closed terminal: [%s]", [
                term.name,
            ]));
        },
    },
];
//# sourceMappingURL=Telemetry.js.map