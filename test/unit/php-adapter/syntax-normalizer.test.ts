import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import path from 'node:path';
import fs from 'node:fs';
import os from 'node:os';

const execFileAsync = promisify(execFile);
const NORMALIZER_SCRIPT = path.resolve(__dirname, '../../../src/php-adapter/bootstrap/syntax-normalizer.php');

describe('SyntaxNormalizer Unit Tests', () => {
  let tempDir: string;

  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'moodle_syntax_test_'));
  });

  afterEach(() => {
    if (fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });

  it('should normalize legacy $var{0} syntax to $var[0]', async () => {
    const filePath = path.join(tempDir, 'legacy_syntax.php');
    const content = '<?php\n$email = "test@example.com";\nif ($email{0} === "t") { echo "ok"; }\n';
    fs.writeFileSync(filePath, content, 'utf8');

    const phpCode = `
      require_once '${NORMALIZER_SCRIPT}';
      \\Didactika\\MoodleClientSchemas\\Bootstrap\\SyntaxNormalizer::normalize('${tempDir}');
    `;

    await execFileAsync('php', ['-r', phpCode]);

    const updatedContent = fs.readFileSync(filePath, 'utf8');
    expect(updatedContent).toContain('$email[0]');
    expect(updatedContent).not.toContain('$email{0}');
  });

  it('should remove legacy class object extends stdClass declarations', async () => {
    const filePath = path.join(tempDir, 'setup_legacy.php');
    const content = '<?php\nclass object extends stdClass {}\n$obj = new stdClass();\n';
    fs.writeFileSync(filePath, content, 'utf8');

    const phpCode = `
      require_once '${NORMALIZER_SCRIPT}';
      \\Didactika\\MoodleClientSchemas\\Bootstrap\\SyntaxNormalizer::normalize('${tempDir}');
    `;

    await execFileAsync('php', ['-r', phpCode]);

    const updatedContent = fs.readFileSync(filePath, 'utf8');
    expect(updatedContent).not.toContain('class object extends stdClass');
  });

  it('should create .php8_normalized marker and be idempotent on subsequent calls', async () => {
    const filePath = path.join(tempDir, 'sample.php');
    fs.writeFileSync(filePath, '<?php\n$val = 1;\n', 'utf8');

    const markerPath = path.join(tempDir, '.php8_normalized');
    expect(fs.existsSync(markerPath)).toBe(false);

    const phpCode = `
      require_once '${NORMALIZER_SCRIPT}';
      \\Didactika\\MoodleClientSchemas\\Bootstrap\\SyntaxNormalizer::normalize('${tempDir}');
    `;

    await execFileAsync('php', ['-r', phpCode]);

    expect(fs.existsSync(markerPath)).toBe(true);

    // Subsequent call should execute cleanly without error
    await execFileAsync('php', ['-r', phpCode]);
    expect(fs.existsSync(markerPath)).toBe(true);
  });
});
