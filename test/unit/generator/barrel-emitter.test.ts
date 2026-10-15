import { emitBarrelCode } from '../../../src/generator/emitter/barrel-emitter';

describe('Barrel & Declaration Merging Emitter', () => {
    it('should emit index.ts with re-exports and GeneratedMoodleServices', () => {
        const services = [
            {
                name: 'core_course_get_courses',
                relativeImportPath: './core/course/get_courses.webservice',
                hasRequiredParams: false,
                description: 'Return course details'
            },
            {
                name: 'core_user_create_users',
                relativeImportPath: './core/user/create_users.webservice',
                hasRequiredParams: true,
                description: 'Create users'
            }
        ];

        const barrelCode = emitBarrelCode(services);

        // Verify module re-exports
        expect(barrelCode).toContain("export * from './core/course/get_courses.webservice'");
        expect(barrelCode).toContain("export * from './core/user/create_users.webservice'");

        // Verify interface
        expect(barrelCode).toContain('export interface GeneratedMoodleServices');

        // Optional vs required params
        expect(barrelCode).toContain(
            'core_course_get_courses(params?: CoreCourseGetCoursesParams, method?: HttpMethod): Promise<MoodleResponse<CoreCourseGetCoursesReturns>>'
        );
        expect(barrelCode).toContain(
            'core_user_create_users(params: CoreUserCreateUsersParams, method?: HttpMethod): Promise<MoodleResponse<CoreUserCreateUsersReturns>>'
        );

        // Verify JSDoc with @param and @returns
        expect(barrelCode).toContain('* Return course details');
        expect(barrelCode).toContain('* @param {CoreCourseGetCoursesParams} [params]');
        expect(barrelCode).toContain('* @param {CoreUserCreateUsersParams} params');
        expect(barrelCode).toContain("* @param {HttpMethod} [method] - Optional HTTP method override (defaults to the client's method)");
        expect(barrelCode).toContain('* @returns {Promise<MoodleResponse<CoreCourseGetCoursesReturns>>}');
        expect(barrelCode).toContain('* @returns {Promise<MoodleResponse<CoreUserCreateUsersReturns>>}');

        // No client augmentation unless requested
        expect(barrelCode).not.toContain('declare module');
        expect(barrelCode).not.toContain('interface MoodleClient');
    });

    it('should support custom importSource', () => {
        const services = [
            {
                name: 'core_course_get_courses',
                relativeImportPath: './core/course/get_courses.webservice',
                hasRequiredParams: false,
                description: 'Return course details'
            }
        ];

        const barrelCode = emitBarrelCode(services, { importSource: '../types/http.types' });
        expect(barrelCode).toContain('import type { MoodleResponse, HttpMethod } from "../types/http.types";');
    });

    it('should not augment any client by default', () => {
        const code = emitBarrelCode([], { importSource: 'my-moodle-client' });
        expect(code).not.toContain('declare module');
        expect(code.endsWith('export interface GeneratedMoodleServices {\n}\n')).toBe(true);
    });

    it('should not augment any client when augmentClient is false', () => {
        expect(emitBarrelCode([], { augmentClient: false })).not.toContain('declare module');
    });

    it('should augment the MoodleClient of the default importSource when augmentClient is true', () => {
        const code = emitBarrelCode([], { augmentClient: true });
        expect(code.endsWith('declare module "@didactika/moodle-client" {\n    interface MoodleClient extends GeneratedMoodleServices {}\n}\n')).toBe(true);
    });

    it('should augment the module named by importSource when augmentClient is true', () => {
        const code = emitBarrelCode([], { importSource: 'my-moodle-client', augmentClient: true });
        expect(code).toContain('import type { MoodleResponse, HttpMethod } from "my-moodle-client";');
        expect(code).toContain('declare module "my-moodle-client" {');
        expect(code).not.toContain('@didactika/moodle-client');
    });

    it('should escape comment terminators in service descriptions', () => {
        const code = emitBarrelCode([
            {
                name: 'local_x_run',
                relativeImportPath: './local/x/run.webservice',
                hasRequiredParams: false,
                description: 'Matches mod/*/view.php */ evil',
                paramsDescription: 'a */ b',
                returnsDescription: 'c */ d'
            }
        ]);
        expect(code).not.toMatch(/\*\/ (evil|b|d)/);
        expect(code).toContain('mod/*\\/view.php *\\/ evil');
    });
});
