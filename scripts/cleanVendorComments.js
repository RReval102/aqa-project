const fs = require('fs');
const path = require('path');

// Patterns that indicate explanatory vendor comments we want to remove
const COMMENT_KEYWORDS = [
  'Aliasing the binding',
  'Rollup and Webpack',
  'shake `import',
  'shake `import z from',
];

function shouldSkipFile(content) {
  // Preserve licensing headers — keep files that contain MIT or Copyright
  if (/MIT License/i.test(content) || /Copyright/i.test(content)) return true;
  return false;
}

function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    if (shouldSkipFile(content)) return false;

    const lines = content.split(/\r?\n/);
    let changed = false;
    const out = [];
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      let matched = false;
      for (const kw of COMMENT_KEYWORDS) {
        if (line.indexOf(kw) !== -1) {
          // remove surrounding consecutive // comment lines
          let start = i;
          while (start > 0 && /^\s*\/\//.test(lines[start - 1])) start--;
          let end = i;
          while (end + 1 < lines.length && /^\s*\/\//.test(lines[end + 1])) end++;
          // skip to end+1
          i = end;
          matched = true;
          changed = true;
          break;
        }
      }
      if (!matched) out.push(line);
    }

    if (changed) {
      fs.writeFileSync(filePath, out.join('\n'), 'utf8');
    }
    return changed;
  } catch (e) {
    return false;
  }
}

function walkDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      // skip .git directory
      if (e.name === '.git') continue;
      walkDir(full);
    } else if (e.isFile() && /\.(js|ts|mjs)$/.test(e.name)) {
      processFile(full);
    }
  }
}

function main() {
  const root = process.cwd();
  // target node_modules and src and tests — but skip gitignored folders
  const targets = [path.join(root, 'node_modules'), path.join(root, 'src'), path.join(root, 'tests')];
  for (const t of targets) {
    if (fs.existsSync(t)) {
      walkDir(t);
    }
  }
}

main();
console.log('cleanVendorComments finished');
