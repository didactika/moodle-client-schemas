import fs from 'fs/promises';
import path from 'path';
import os from 'os';
import { generateWebserviceFiles } from '../../../src/generator/generator-pipeline';

describe('OutDir Cleanup and Regeneration', () => {
    let tempOutDir: string;

    beforeEach(async () => {
        tempOutDir = await fs.mkdtemp(path.join(os.tmpdir(), 'moodle-outdir-test-'));
    });

    afterEach(async () => {
        await fs.rm(tempOutDir, { recursive: true, force: true });
    });

    it('should clean up and wipe stale webservice files when regenerating with fewer services', async () => {
        // 1. Initial run with 3 services
        const initialSchemas = [
            {
                name: 'core_course_get_courses',
                description: 'Get courses',
                parameters: { kind: 'parameters' as const, keys: {} },
                returns: { kind: 'value' as const, type: 'PARAM_INT', primitiveType: 'number' as const }
            },
            {
                name: 'core_user_get_users',
                description: 'Get users',
                parameters: { kind: 'parameters' as const, keys: {} },
                returns: { kind: 'value' as const, type: 'PARAM_INT', primitiveType: 'number' as const }
            },
            {
                name: 'mod_quiz_get_user_attempts',
                description: 'Get quiz attempts',
                parameters: { kind: 'parameters' as const, keys: {} },
                returns: { kind: 'value' as const, type: 'PARAM_INT', primitiveType: 'number' as const }
            }
        ];

        await generateWebserviceFiles(initialSchemas as any, tempOutDir);

        const courseFile = path.join(tempOutDir, 'core/course/get_courses.webservice-client.d.ts');
        const userFile = path.join(tempOutDir, 'core/user/get_users.webservice-client.d.ts');
        const quizFile = path.join(tempOutDir, 'mod/quiz/get_user_attempts.webservice-client.d.ts');
        const indexFile = path.join(tempOutDir, 'index.d.ts');

        expect(await fs.access(courseFile).then(() => true).catch(() => false)).toBe(true);
        expect(await fs.access(userFile).then(() => true).catch(() => false)).toBe(true);
        expect(await fs.access(quizFile).then(() => true).catch(() => false)).toBe(true);
        expect(await fs.access(indexFile).then(() => true).catch(() => false)).toBe(true);

        // 2. Second run: generate ONLY core_course_get_courses
        const reducedSchemas = [
            {
                name: 'core_course_get_courses',
                description: 'Get courses',
                parameters: { kind: 'parameters' as const, keys: {} },
                returns: { kind: 'value' as const, type: 'PARAM_INT', primitiveType: 'number' as const }
            }
        ];

        await generateWebserviceFiles(reducedSchemas as any, tempOutDir);

        // 3. Verify only core_course_get_courses remains
        expect(await fs.access(courseFile).then(() => true).catch(() => false)).toBe(true);
        expect(await fs.access(userFile).then(() => true).catch(() => false)).toBe(false);
        expect(await fs.access(quizFile).then(() => true).catch(() => false)).toBe(false);

        const indexContent = await fs.readFile(indexFile, 'utf-8');
        expect(indexContent).toContain('core_course_get_courses');
        expect(indexContent).not.toContain('core_user_get_users');
        expect(indexContent).not.toContain('mod_quiz_get_user_attempts');
    });
});
