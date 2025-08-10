const fs = require("fs");
const path = require("path");
const JavaScriptObfuscator = require("javascript-obfuscator");

const dirPath = path.join(__dirname, "../.next/static/chunks/app");

function obfuscateFile(filePath) {
    const code = fs.readFileSync(filePath, "utf8");
    const obfuscatedCode = JavaScriptObfuscator.obfuscate(code, {
        compact: true,
        stringArrayEncoding: ["rc4"],
        stringArrayThreshold: 1,
        unicodeEscapeSequence: true,
    }).getObfuscatedCode();
    fs.writeFileSync(filePath, obfuscatedCode, "utf8");
    console.log(`Obfuscated: ${filePath}`);
}

function traverseDirectory(directory) {
    fs.readdirSync(directory).forEach(file => {
        const fullPath = path.join(directory, file);
        if (fs.statSync(fullPath).isDirectory()) {
            traverseDirectory(fullPath);
        } else if (file.endsWith(".js")) {
            obfuscateFile(fullPath);
        }
    });
}

if (fs.existsSync(dirPath)) {
    traverseDirectory(dirPath);
} else {
    console.error("Static chunk directory not found!");
}