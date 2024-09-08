import { readFile, writeFile } from "fs/promises";
import { resolve } from "path";

const filePath = resolve("dist/bundle.js");
const shebang = "#!/usr/bin/env node\n";

async function addShebang() {
  try {
    const data = await readFile(filePath, "utf8");
    if (!data.startsWith(shebang)) {
      await writeFile(filePath, shebang + data, "utf8");
    }
  } catch (err) {
    console.error(err);
  }
}

addShebang();
