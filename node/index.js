// node/index.js

const { spawn } = require("child_process");
const path = require("path");
const fs = require("fs");

// Зчитуємо конфіг
const config = require("../js/config.json");
const PROJECT = config.projectFile;
const SCRIPTS = [
  {
    label: "Модифікація контенту",
    script: "../js/modifyContent.jsx",
    log: "../logs/modify_content_log.txt",
  },
];

const AE_PATH = process.env.AFTERFX_PATH || "afterfx";

function runScript(scriptPath) {
  return new Promise((resolve, reject) => {
    const proc = spawn(AE_PATH, ["-r", path.resolve(__dirname, scriptPath)], {
      windowsHide: true,
    });
    let output = "",
      err = "";
    proc.stdout && proc.stdout.on("data", (d) => (output += d.toString()));
    proc.stderr && proc.stderr.on("data", (d) => (err += d.toString()));
    proc.on("close", (code) => {
      if (code === 0) resolve({ output });
      else reject({ error: err, output, code });
    });
  });
}

(async () => {
  // Попередня перевірка, чи існує проект і потрібні файли (можна розширити)
  if (!fs.existsSync(PROJECT)) {
    console.error("Проект After Effects не знайдено:", PROJECT);
    process.exit(1);
  }
  for (let s of SCRIPTS) {
    console.log("\n===", s.label, "(", s.script, ") ===");
    try {
      await runScript(s.script);
      if (s.log && fs.existsSync(path.resolve(__dirname, s.log))) {
        console.log(
          `Лог із ${s.label}:\n`,
          fs.readFileSync(path.resolve(__dirname, s.log), "utf-8")
        );
      }
      console.log("Статус: успішно\n");
    } catch (e) {
      console.error("ПОМИЛКА при", s.label, "\n", e);
      break;
    }
  }
  console.log("\n=== Завершено ===");
})();
