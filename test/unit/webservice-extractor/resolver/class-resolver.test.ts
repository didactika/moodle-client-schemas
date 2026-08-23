import { resolveClass } from '../../../../src/webservice-extractor/resolver/class-resolver';
import { MoodleService } from '../../../../src/webservice-extractor/interfaces/service-extractor.interfaces';

describe('Unit Test: class-resolver', () => {

    it('should return relative path when legacy class file can be resolved', async () => {
        const service: MoodleService = {
            name: 'enrol_manual_enrol_users',
            classname: 'enrol_manual_external',
            type: 'write',
            methodname: 'enrol_users',
            classpath: 'enrol/manual/externallib.php',
            description: 'Manual enrol users',
        };

        const resolvedPath = await resolveClass(service);
        expect(resolvedPath).toEqual('enrol/manual/externallib.php');
    });

    it('should resolve namespaced class from classes/external.php when classpath is empty', async () => {
        const service: MoodleService = {
            name: 'tool_dataprivacy_mark_complete',
            classname: 'tool_dataprivacy\\external',
            type: 'write',
            methodname: 'mark_complete',
            classpath: '',
            description: "Mark a user's general enquiry as complete",
        };

        const resolvedPath = await resolveClass(service);
        expect(resolvedPath).toEqual(
            'admin/tool/dataprivacy/classes/external.php'
        );
    });

    it('should resolve namespaced class from classes/external.php when classpath is null', async () => {
        const service: MoodleService = {
            name: 'tool_analytics_potential_contexts',
            classname: 'tool_analytics\\external',
            type: 'read',
            methodname: 'potential_contexts',
            classpath: null,
            description: 'List of potential contexts for analytics models',
        };

        const resolvedPath = await resolveClass(service);
        expect(resolvedPath).toEqual(
            'admin/tool/analytics/classes/external.php'
        );
    });

    it('should resolve legacy class file when modern service flags are present', async () => {
        const service: MoodleService = {
            name: 'message_popup_get_unread_popup_notification_count',
            classname: 'message_popup_external',
            type: 'read',
            methodname: 'get_unread_popup_notification_count',
            classpath: 'message/output/popup/externallib.php',
            description: 'Retrieve the count of unread popup notifications for a given user',
        };

        const resolvedPath = await resolveClass(service);
        expect(resolvedPath).toEqual(
            'message/output/popup/externallib.php'
        );
    });

    it('should resolve namespaced public class when login is not required', async () => {
        const service: MoodleService = {
            name: 'tool_policy_get_policy_version',
            classname: 'tool_policy\\external',
            type: 'read',
            methodname: 'get_policy_version',
            classpath: '',
            description: 'Fetch the details of a policy version',
        };

        const resolvedPath = await resolveClass(service);
        expect(resolvedPath).toEqual(
            'admin/tool/policy/classes/external.php'
        );
    });

    it('should resolve dedicated PSR-4 external class file', async () => {
        const service: MoodleService = {
            name: 'aiplacement_editor_generate_image',
            classname: 'aiplacement_editor\\external\\generate_image',
            type: 'write',
            methodname: 'exact',
            classpath: null,
            description: 'Generate image for the HTML Text editor AI Placement',
        };

        const resolvedPath = await resolveClass(service);
        expect(resolvedPath).toEqual(
            'ai/placement/editor/classes/external/generate_image.php'
        );
    });

    it('should resolve deeply nested PSR-4 external class file', async () => {
        const service: MoodleService = {
            name: 'core_check_get_result_admintree',
            classname: 'core\\check\\external\\get_result_admintree',
            type: 'read',
            methodname: 'exact',
            classpath: null,
            description: 'Executes a check stored in the admin tree and returns the result',
        };

        const resolvedPath = await resolveClass(service);
        expect(resolvedPath).toEqual(
            'lib/classes/check/external/get_result_admintree.php'
        );
    });

    it('should resolve dedicated PSR-4 class when methodname is explicitly execute', async () => {
        const service: MoodleService = {
            name: 'core_output_poll_stored_progress',
            classname: 'core\\external\\output\\poll_stored_progress',
            type: 'read',
            methodname: 'execute',
            classpath: null,
            description: 'Polls for the current percentage progress of a stored progress object',
        };

        const resolvedPath = await resolveClass(service);
        expect(resolvedPath).toEqual(
            'lib/classes/external/output/poll_stored_progress.php'
        );
    });

    it('should resolve dedicated PSR-4 class for a minimal service definition', async () => {
        const service: MoodleService = {
            name: 'tool_admin_presets_delete_preset',
            classname: 'tool_admin_presets\\external\\delete_preset',
            type: 'write',
            methodname: 'exact',
            classpath: null,
            description: 'Delete a custom preset',
        };

        const resolvedPath = await resolveClass(service);
        expect(resolvedPath).toEqual(
            'admin/tool/admin_presets/classes/external/delete_preset.php'
        );
    });

    it('should resolve namespaced payment gateway class with empty classpath', async () => {
        const service: MoodleService = {
            name: 'paygw_paypal_create_transaction_complete',
            classname: 'paygw_paypal\\external\\transaction_complete',
            type: 'write',
            methodname: 'exact',
            classpath: '',
            description: 'Takes care of what needs to be done when a PayPal transaction comes back as complete.',
        };

        const resolvedPath = await resolveClass(service);
        expect(resolvedPath).toEqual(
            'payment/gateway/paypal/classes/external/transaction_complete.php'
        );
    });

    it('should resolve legacy class file with multiple capabilities', async () => {
        const service: MoodleService = {
            name: 'core_group_get_activity_allowed_groups',
            classname: 'core_group_external',
            type: 'read',
            methodname: 'get_activity_allowed_groups',
            classpath: 'group/externallib.php',
            description: 'Gets a list of groups that the user is allowed to access within the specified activity.',
        };

        const resolvedPath = await resolveClass(service);
        expect(resolvedPath).toEqual(
            'group/externallib.php'
        );
    });

    it('should resolve corrupt case without classpath and with classname legacy, return null', async () => {
        const service: MoodleService = {
            name: 'enrol_self_enrol_user',
            classname: 'enrol_self_external',
            type: 'write',
            methodname: 'enrol_user',
            description: 'Self enrol the current user in the given course.',
        };

        const resolvedPath = await resolveClass(service);
        expect(resolvedPath).toBeNull();
    });

    it('should resolve corrupt case where classpath is null and with classname legacy, return null', async () => {
        const service: MoodleService = {
            name: 'enrol_self_enrol_user',
            classname: 'enrol_self_external',
            type: 'write',
            methodname: 'enrol_user',
            classpath: null,
            description: 'Self enrol the current user in the given course.',
        };

        const resolvedPath = await resolveClass(service);
        expect(resolvedPath).toBeNull();
    });

    it('should resolve corrupt case where classpath is empty and with classname legacy, return null', async () => {
        const service: MoodleService = {
            name: 'enrol_self_enrol_user',
            classname: 'enrol_self_external',
            type: 'write',
            methodname: 'enrol_user',
            classpath: '',
            description: 'Self enrol the current user in the given course.',
        };

        const resolvedPath = await resolveClass(service);
        expect(resolvedPath).toBeNull();
    });
});