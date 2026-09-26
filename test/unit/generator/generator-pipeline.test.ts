import fs from 'fs/promises';
import path from 'path';
import os from 'os';
import { generateWebserviceFiles } from '../../../src/generator/generator-pipeline';
import { WebServiceSchema } from '../../../src/webservice-extractor/interfaces/schema-extractor.interfaces';

describe('generateWebserviceFiles', () => {
    let tempDir: string;
    let targetDir: string;

    beforeEach(async () => {
        tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'generate-files-test-'));
        targetDir = path.join(tempDir, 'schemas');
    });

    afterEach(async () => {
        await fs.rm(tempDir, { recursive: true, force: true });
    });

    it('should generate webservice client files and index barrels in targetDir', async () => {
        const fakeSchemas: WebServiceSchema[] = [
            {
                name: 'core_course_get_courses',
                description: 'Get courses by id or all courses',
                parameters: {
                    kind: 'parameters',
                    keys: {
                        options: {
                            kind: 'object',
                            required: 0,
                            keys: {
                                ids: {
                                    kind: 'array',
                                    required: 0,
                                    content: {
                                        kind: 'value',
                                        type: 'PARAM_INT',
                                        primitiveType: 'number'
                                    }
                                }
                            }
                        }
                    }
                },
                returns: {
                    kind: 'array',
                    content: {
                        kind: 'object',
                        keys: {
                            id: {
                                kind: 'value',
                                type: 'PARAM_INT',
                                primitiveType: 'number',
                                required: 1
                            },
                            fullname: {
                                kind: 'value',
                                type: 'PARAM_TEXT',
                                primitiveType: 'string',
                                required: 1
                            }
                        }
                    }
                }
            },
            {
                name: 'core_user_get_users',
                description: 'Search for users',
                parameters: {
                    kind: 'parameters',
                    keys: {
                        criteria: {
                            kind: 'array',
                            required: 1,
                            content: {
                                kind: 'object',
                                keys: {
                                    key: { kind: 'value', type: 'PARAM_ALPHA', primitiveType: 'string', required: 1 },
                                    value: { kind: 'value', type: 'PARAM_RAW', primitiveType: 'string', required: 1 }
                                }
                            }
                        }
                    }
                },
                returns: {
                    kind: 'object',
                    keys: {
                        users: {
                            kind: 'array',
                            content: {
                                kind: 'object',
                                keys: {
                                    id: { kind: 'value', type: 'PARAM_INT', primitiveType: 'number', required: 1 }
                                }
                            }
                        }
                    }
                }
            }
        ];

        await generateWebserviceFiles(fakeSchemas, targetDir);

        // Check course files
        const courseTsFile = path.join(targetDir, 'core/course/get_courses.webservice-client.ts');
        const courseDtsFile = path.join(targetDir, 'core/course/get_courses.webservice-client.d.ts');
        expect(await fs.access(courseTsFile).then(() => true).catch(() => false)).toBe(true);
        expect(await fs.access(courseDtsFile).then(() => true).catch(() => false)).toBe(true);

        const courseContent = await fs.readFile(courseTsFile, 'utf-8');
        expect(courseContent).toContain('export interface CoreCourseGetCoursesParams');
        expect(courseContent).toContain('export type CoreCourseGetCoursesReturns');

        // Check user files
        const userTsFile = path.join(targetDir, 'core/user/get_users.webservice-client.ts');
        expect(await fs.access(userTsFile).then(() => true).catch(() => false)).toBe(true);

        // Check index barrels
        const indexTsFile = path.join(targetDir, 'index.ts');
        const indexDtsFile = path.join(targetDir, 'index.d.ts');
        expect(await fs.access(indexTsFile).then(() => true).catch(() => false)).toBe(true);
        expect(await fs.access(indexDtsFile).then(() => true).catch(() => false)).toBe(true);

        const indexContent = await fs.readFile(indexDtsFile, 'utf-8');
        expect(indexContent).toContain('export interface GeneratedMoodleServices');
        expect(indexContent).toContain('core_course_get_courses(params?: CoreCourseGetCoursesParams');
        expect(indexContent).toContain('core_user_get_users(params: CoreUserGetUsersParams');
        expect(indexContent).toContain('declare module "@didactika/moodle-client"');
    });

    it('should wipe targetDir before generating to eliminate stale files', async () => {
        await fs.mkdir(targetDir, { recursive: true });
        const staleFile = path.join(targetDir, 'stale-service.ts');
        await fs.writeFile(staleFile, '// old', 'utf-8');

        await generateWebserviceFiles([], targetDir);

        expect(await fs.access(staleFile).then(() => true).catch(() => false)).toBe(false);
        expect(await fs.access(path.join(targetDir, 'index.d.ts')).then(() => true).catch(() => false)).toBe(true);
    });
});
