import { emitBarrelCode } from '../../../src/generator/emitter/barrel-emitter';

describe('Barrel & Declaration Merging Emitter', () => {
    it('should emit index.ts with re-exports, GeneratedMoodleServices and declare module', () => {
        const services = [
            {
                name: 'core_course_get_courses',
                relativeImportPath: './core/course/get_courses.webservice-client',
                hasRequiredParams: false,
                description: 'Return course details'
            },
            {
                name: 'core_user_create_users',
                relativeImportPath: './core/user/create_users.webservice-client',
                hasRequiredParams: true,
                description: 'Create users'
            }
        ];

        const barrelCode = emitBarrelCode(services);

        // Verify module re-exports
        expect(barrelCode).toContain("export * from './core/course/get_courses.webservice-client'");
        expect(barrelCode).toContain("export * from './core/user/create_users.webservice-client'");

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
        expect(barrelCode).toContain("* @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')");
        expect(barrelCode).toContain('* @returns {Promise<MoodleResponse<CoreCourseGetCoursesReturns>>}');
        expect(barrelCode).toContain('* @returns {Promise<MoodleResponse<CoreUserCreateUsersReturns>>}');

        // Verify Declaration Merging
        expect(barrelCode).toContain('declare module "@didactika/moodle-client"');
        expect(barrelCode).toContain('interface MoodleClient extends GeneratedMoodleServices');
    });

    it('should support custom importSource', () => {
        const services = [
            {
                name: 'core_course_get_courses',
                relativeImportPath: './core/course/get_courses.webservice-client',
                hasRequiredParams: false,
                description: 'Return course details'
            }
        ];

        const barrelCode = emitBarrelCode(services, { importSource: '../types/http.types' });
        expect(barrelCode).toContain('import type { MoodleResponse, HttpMethod } from "../types/http.types";');
    });
});
