import type { MoodleResponse, HttpMethod } from '../types/http.types';
export * from './tool/admin/presets_delete_preset.webservice-client';
export * from './tool/analytics/potential_contexts.webservice-client';
export * from './tool/behat/get_entity_generator.webservice-client';
export * from './tool/dataprivacy/cancel_data_request.webservice-client';
export * from './tool/dataprivacy/contact_dpo.webservice-client';
export * from './tool/dataprivacy/mark_complete.webservice-client';
export * from './tool/dataprivacy/get_data_request.webservice-client';
export * from './tool/dataprivacy/approve_data_request.webservice-client';
export * from './tool/dataprivacy/submit_selected_courses_form.webservice-client';
export * from './tool/dataprivacy/bulk_approve_data_requests.webservice-client';
export * from './tool/dataprivacy/deny_data_request.webservice-client';
export * from './tool/dataprivacy/bulk_deny_data_requests.webservice-client';
export * from './tool/dataprivacy/get_users.webservice-client';
export * from './tool/dataprivacy/create_purpose_form.webservice-client';
export * from './tool/dataprivacy/create_category_form.webservice-client';
export * from './tool/dataprivacy/delete_purpose.webservice-client';
export * from './tool/dataprivacy/delete_category.webservice-client';
export * from './tool/dataprivacy/set_contextlevel_form.webservice-client';
export * from './tool/dataprivacy/set_context_form.webservice-client';
export * from './tool/dataprivacy/tree_extra_branches.webservice-client';
export * from './tool/dataprivacy/confirm_contexts_for_deletion.webservice-client';
export * from './tool/dataprivacy/set_context_defaults.webservice-client';
export * from './tool/dataprivacy/get_category_options.webservice-client';
export * from './tool/dataprivacy/get_purpose_options.webservice-client';
export * from './tool/dataprivacy/get_activity_options.webservice-client';
export * from './tool/dataprivacy/get_access_information.webservice-client';
export * from './tool/dataprivacy/create_data_request.webservice-client';
export * from './tool/dataprivacy/get_data_requests.webservice-client';
export * from './tool/lp/data_for_competency_frameworks_manage_page.webservice-client';
export * from './tool/lp/data_for_competency_summary.webservice-client';
export * from './tool/lp/data_for_competencies_manage_page.webservice-client';
export * from './tool/lp/list_courses_using_competency.webservice-client';
export * from './tool/lp/data_for_course_competencies_page.webservice-client';
export * from './tool/lp/data_for_template_competencies_page.webservice-client';
export * from './tool/lp/data_for_templates_manage_page.webservice-client';
export * from './tool/lp/data_for_plans_page.webservice-client';
export * from './tool/lp/data_for_plan_page.webservice-client';
export * from './tool/lp/data_for_related_competencies_section.webservice-client';
export * from './tool/lp/search_users.webservice-client';
export * from './tool/lp/search_cohorts.webservice-client';
export * from './tool/lp/data_for_user_evidence_list_page.webservice-client';
export * from './tool/lp/data_for_user_evidence_page.webservice-client';
export * from './tool/lp/data_for_user_competency_summary.webservice-client';
export * from './tool/lp/data_for_user_competency_summary_in_plan.webservice-client';
export * from './tool/lp/data_for_user_competency_summary_in_course.webservice-client';
export * from './tool/mobile/get_plugins_supporting_mobile.webservice-client';
export * from './tool/mobile/get_public_config.webservice-client';
export * from './tool/mobile/get_config.webservice-client';
export * from './tool/mobile/get_autologin_key.webservice-client';
export * from './tool/mobile/get_content.webservice-client';
export * from './tool/mobile/call_external_functions.webservice-client';
export * from './tool/mobile/validate_subscription_key.webservice-client';
export * from './tool/mobile/get_tokens_for_qr_login.webservice-client';
export * from './tool/moodlenet/verify_webfinger.webservice-client';
export * from './tool/moodlenet/search_courses.webservice-client';
export * from './tool/policy/get_policy_version.webservice-client';
export * from './tool/policy/submit_accept_on_behalf.webservice-client';
export * from './tool/policy/get_user_acceptances.webservice-client';
export * from './tool/policy/set_acceptances_status.webservice-client';
export * from './tool/templatelibrary/list_templates.webservice-client';
export * from './tool/templatelibrary/load_canonical_template.webservice-client';
export * from './tool/usertours/fetch_and_start_tour.webservice-client';
export * from './tool/usertours/step_shown.webservice-client';
export * from './tool/usertours/complete_tour.webservice-client';
export * from './tool/usertours/reset_tour.webservice-client';
export * from './tool/xmldb/invoke_move_action.webservice-client';
export * from './aiplacement/courseassist/summarise_text.webservice-client';
export * from './aiplacement/editor/generate_image.webservice-client';
export * from './aiplacement/editor/generate_text.webservice-client';
export * from './auth/email/get_signup_settings.webservice-client';
export * from './auth/email/signup_user.webservice-client';
export * from './block/accessreview/get_module_data.webservice-client';
export * from './block/accessreview/get_section_data.webservice-client';
export * from './block/recentlyaccesseditems/get_recent_items.webservice-client';
export * from './block/starredcourses/get_starred_courses.webservice-client';
export * from './customfield/number/recalculate_value.webservice-client';
export * from './enrol/guest/get_instance_info.webservice-client';
export * from './enrol/guest/validate_password.webservice-client';
export * from './enrol/manual/enrol_users.webservice-client';
export * from './enrol/manual/unenrol_users.webservice-client';
export * from './enrol/meta/add_instances.webservice-client';
export * from './enrol/meta/delete_instances.webservice-client';
export * from './enrol/self/get_instance_info.webservice-client';
export * from './enrol/self/enrol_user.webservice-client';
export * from './gradingform/guide/grader_gradingpanel_fetch.webservice-client';
export * from './gradingform/guide/grader_gradingpanel_store.webservice-client';
export * from './gradingform/rubric/grader_gradingpanel_fetch.webservice-client';
export * from './gradingform/rubric/grader_gradingpanel_store.webservice-client';
export * from './gradereport/grader/get_users_in_report.webservice-client';
export * from './gradereport/overview/get_course_grades.webservice-client';
export * from './gradereport/overview/view_grade_report.webservice-client';
export * from './gradereport/singleview/get_grade_items_for_search_widget.webservice-client';
export * from './gradereport/user/get_grades_table.webservice-client';
export * from './gradereport/user/view_grade_report.webservice-client';
export * from './gradereport/user/get_grade_items.webservice-client';
export * from './gradereport/user/get_access_information.webservice-client';
export * from './core/auth/confirm_user.webservice-client';
export * from './core/auth/request_password_reset.webservice-client';
export * from './core/auth/is_minor.webservice-client';
export * from './core/auth/is_age_digital_consent_verification_enabled.webservice-client';
export * from './core/auth/resend_confirmation_email.webservice-client';
export * from './core/backup/get_async_backup_progress.webservice-client';
export * from './core/backup/get_async_backup_links_backup.webservice-client';
export * from './core/backup/get_async_backup_links_restore.webservice-client';
export * from './core/backup/get_copy_progress.webservice-client';
export * from './core/backup/submit_copy_form.webservice-client';
export * from './core/badges/disable_badges.webservice-client';
export * from './core/badges/enable_badges.webservice-client';
export * from './core/badges/get_badge.webservice-client';
export * from './core/badges/get_user_badges.webservice-client';
export * from './core/badges/get_user_badge_by_hash.webservice-client';
export * from './core/blog/get_entries.webservice-client';
export * from './core/blog/view_entries.webservice-client';
export * from './core/blog/get_access_information.webservice-client';
export * from './core/blog/add_entry.webservice-client';
export * from './core/blog/delete_entry.webservice-client';
export * from './core/blog/prepare_entry_for_edition.webservice-client';
export * from './core/blog/update_entry.webservice-client';
export * from './core/calendar/get_calendar_monthly_view.webservice-client';
export * from './core/calendar/get_calendar_day_view.webservice-client';
export * from './core/calendar/get_calendar_upcoming_view.webservice-client';
export * from './core/calendar/update_event_start_day.webservice-client';
export * from './core/calendar/create_calendar_events.webservice-client';
export * from './core/calendar/delete_calendar_events.webservice-client';
export * from './core/calendar/get_calendar_events.webservice-client';
export * from './core/calendar/get_action_events_by_timesort.webservice-client';
export * from './core/calendar/get_action_events_by_course.webservice-client';
export * from './core/calendar/get_action_events_by_courses.webservice-client';
export * from './core/calendar/get_calendar_event_by_id.webservice-client';
export * from './core/calendar/submit_create_update_form.webservice-client';
export * from './core/calendar/get_calendar_access_information.webservice-client';
export * from './core/calendar/get_allowed_event_types.webservice-client';
export * from './core/calendar/get_timestamps.webservice-client';
export * from './core/calendar/get_calendar_export_token.webservice-client';
export * from './core/calendar/delete_subscription.webservice-client';
export * from './core/check/get_result_admintree.webservice-client';
export * from './core/cohort/add_cohort_members.webservice-client';
export * from './core/cohort/create_cohorts.webservice-client';
export * from './core/cohort/delete_cohort_members.webservice-client';
export * from './core/cohort/delete_cohorts.webservice-client';
export * from './core/cohort/get_cohort_members.webservice-client';
export * from './core/cohort/search_cohorts.webservice-client';
export * from './core/cohort/get_cohorts.webservice-client';
export * from './core/cohort/update_cohorts.webservice-client';
export * from './core/comment/get_comments.webservice-client';
export * from './core/comment/add_comments.webservice-client';
export * from './core/comment/delete_comments.webservice-client';
export * from './core/completion/get_activities_completion_status.webservice-client';
export * from './core/completion/get_course_completion_status.webservice-client';
export * from './core/completion/mark_course_self_completed.webservice-client';
export * from './core/completion/update_activity_completion_status_manually.webservice-client';
export * from './core/completion/override_activity_completion_status.webservice-client';
export * from './core/course/create_categories.webservice-client';
export * from './core/course/create_courses.webservice-client';
export * from './core/course/delete_categories.webservice-client';
export * from './core/course/delete_courses.webservice-client';
export * from './core/course/delete_modules.webservice-client';
export * from './core/course/duplicate_course.webservice-client';
export * from './core/course/get_categories.webservice-client';
export * from './core/course/get_contents.webservice-client';
export * from './core/course/get_course_module.webservice-client';
export * from './core/course/get_course_module_by_instance.webservice-client';
export * from './core/course/get_module.webservice-client';
export * from './core/courseformat/file_handlers.webservice-client';
export * from './core/courseformat/get_state.webservice-client';
export * from './core/courseformat/update_course.webservice-client';
export * from './core/courseformat/create_module.webservice-client';
export * from './core/course/edit_module.webservice-client';
export * from './core/course/edit_section.webservice-client';
export * from './core/course/get_courses.webservice-client';
export * from './core/course/import_course.webservice-client';
export * from './core/course/search_courses.webservice-client';
export * from './core/course/update_categories.webservice-client';
export * from './core/course/update_courses.webservice-client';
export * from './core/course/view_course.webservice-client';
export * from './core/course/get_user_navigation_options.webservice-client';
export * from './core/course/get_user_administration_options.webservice-client';
export * from './core/course/get_courses_by_field.webservice-client';
export * from './core/course/check_updates.webservice-client';
export * from './core/course/get_updates_since.webservice-client';
export * from './core/course/get_enrolled_courses_by_timeline_classification.webservice-client';
export * from './core/course/get_enrolled_courses_with_action_events_by_timeline_classification.webservice-client';
export * from './core/course/get_recent_courses.webservice-client';
export * from './core/course/set_favourite_courses.webservice-client';
export * from './core/course/get_enrolled_users_by_cmid.webservice-client';
export * from './core/course/add_content_item_to_user_favourites.webservice-client';
export * from './core/course/remove_content_item_from_user_favourites.webservice-client';
export * from './core/course/get_course_content_items.webservice-client';
export * from './core/course/get_activity_chooser_footer.webservice-client';
export * from './core/course/toggle_activity_recommendation.webservice-client';
export * from './core/enrol/get_course_enrolment_methods.webservice-client';
export * from './core/enrol/get_enrolled_users.webservice-client';
export * from './core/enrol/get_enrolled_users_with_capability.webservice-client';
export * from './core/enrol/get_potential_users.webservice-client';
export * from './core/enrol/search_users.webservice-client';
export * from './core/enrol/get_users_courses.webservice-client';
export * from './core/enrol/submit_user_enrolment_form.webservice-client';
export * from './core/enrol/unenrol_user_enrolment.webservice-client';
export * from './core/fetch/notifications.webservice-client';
export * from './core/session/touch.webservice-client';
export * from './core/session/time_remaining.webservice-client';
export * from './core/files/get_files.webservice-client';
export * from './core/files/upload.webservice-client';
export * from './core/files/delete_draft_files.webservice-client';
export * from './core/files/get_unused_draft_itemid.webservice-client';
export * from './core/form/get_filetypes_browser_data.webservice-client';
export * from './core/form/dynamic_form.webservice-client';
export * from './core/get/component_strings.webservice-client';
export * from './core/get/fragment.webservice-client';
export * from './core/get/string.webservice-client';
export * from './core/get/strings.webservice-client';
export * from './core/get/user_dates.webservice-client';
export * from './core/grades/update_grades.webservice-client';
export * from './core/grades/grader_gradingpanel_point_fetch.webservice-client';
export * from './core/grades/grader_gradingpanel_point_store.webservice-client';
export * from './core/grades/grader_gradingpanel_scale_fetch.webservice-client';
export * from './core/grades/grader_gradingpanel_scale_store.webservice-client';
export * from './core/grades/create_gradecategories.webservice-client';
export * from './core/grades/get_enrolled_users_for_search_widget.webservice-client';
export * from './core/grades/get_enrolled_users_for_selector.webservice-client';
export * from './core/grades/get_groups_for_search_widget.webservice-client';
export * from './core/grades/get_groups_for_selector.webservice-client';
export * from './core/grades/get_feedback.webservice-client';
export * from './core/grades/get_gradeitems.webservice-client';
export * from './core/grades/get_grade_tree.webservice-client';
export * from './core/grades/get_gradable_users.webservice-client';
export * from './core/grading/get_definitions.webservice-client';
export * from './core/grading/get_gradingform_instances.webservice-client';
export * from './core/grading/save_definitions.webservice-client';
export * from './core/group/add_group_members.webservice-client';
export * from './core/group/assign_grouping.webservice-client';
export * from './core/group/create_groupings.webservice-client';
export * from './core/group/create_groups.webservice-client';
export * from './core/group/delete_group_members.webservice-client';
export * from './core/group/delete_groupings.webservice-client';
export * from './core/group/delete_groups.webservice-client';
export * from './core/group/get_activity_allowed_groups.webservice-client';
export * from './core/group/get_activity_groupmode.webservice-client';
export * from './core/group/get_course_groupings.webservice-client';
export * from './core/group/get_course_groups.webservice-client';
export * from './core/group/get_course_user_groups.webservice-client';
export * from './core/group/get_group_members.webservice-client';
export * from './core/group/get_groupings.webservice-client';
export * from './core/group/get_groups.webservice-client';
export * from './core/group/get_groups_for_selector.webservice-client';
export * from './core/group/unassign_grouping.webservice-client';
export * from './core/group/update_groupings.webservice-client';
export * from './core/group/update_groups.webservice-client';
export * from './core/message/mute_conversations.webservice-client';
export * from './core/message/unmute_conversations.webservice-client';
export * from './core/message/block_user.webservice-client';
export * from './core/message/get_contact_requests.webservice-client';
export * from './core/message/create_contact_request.webservice-client';
export * from './core/message/confirm_contact_request.webservice-client';
export * from './core/message/decline_contact_request.webservice-client';
export * from './core/message/get_received_contact_requests_count.webservice-client';
export * from './core/message/delete_contacts.webservice-client';
export * from './core/message/delete_conversations_by_id.webservice-client';
export * from './core/message/delete_message.webservice-client';
export * from './core/message/get_blocked_users.webservice-client';
export * from './core/message/data_for_messagearea_search_messages.webservice-client';
export * from './core/message/message_search_users.webservice-client';
export * from './core/message/get_user_contacts.webservice-client';
export * from './core/message/get_conversations.webservice-client';
export * from './core/message/get_conversation.webservice-client';
export * from './core/message/get_conversation_between_users.webservice-client';
export * from './core/message/get_self_conversation.webservice-client';
export * from './core/message/get_messages.webservice-client';
export * from './core/message/get_conversation_counts.webservice-client';
export * from './core/message/get_unread_conversation_counts.webservice-client';
export * from './core/message/get_conversation_members.webservice-client';
export * from './core/message/get_member_info.webservice-client';
export * from './core/message/get_unread_conversations_count.webservice-client';
export * from './core/message/mark_all_notifications_as_read.webservice-client';
export * from './core/message/mark_all_conversation_messages_as_read.webservice-client';
export * from './core/message/mark_message_read.webservice-client';
export * from './core/message/mark_notification_read.webservice-client';
export * from './core/message/message_processor_config_form.webservice-client';
export * from './core/message/get_message_processor.webservice-client';
export * from './core/message/search_contacts.webservice-client';
export * from './core/message/send_instant_messages.webservice-client';
export * from './core/message/send_messages_to_conversation.webservice-client';
export * from './core/message/get_conversation_messages.webservice-client';
export * from './core/message/unblock_user.webservice-client';
export * from './core/message/get_user_notification_preferences.webservice-client';
export * from './core/message/get_user_message_preferences.webservice-client';
export * from './core/message/set_favourite_conversations.webservice-client';
export * from './core/message/unset_favourite_conversations.webservice-client';
export * from './core/message/delete_message_for_all_users.webservice-client';
export * from './core/message/get_unread_notification_count.webservice-client';
export * from './core/my/view_page.webservice-client';
export * from './core/notes/create_notes.webservice-client';
export * from './core/notes/delete_notes.webservice-client';
export * from './core/notes/get_course_notes.webservice-client';
export * from './core/notes/get_notes.webservice-client';
export * from './core/notes/update_notes.webservice-client';
export * from './core/notes/view_notes.webservice-client';
export * from './core/output/load_template.webservice-client';
export * from './core/output/load_template_with_dependencies.webservice-client';
export * from './core/output/load_fontawesome_icon_map.webservice-client';
export * from './core/output/load_fontawesome_icon_system_map.webservice-client';
export * from './core/question/update_flag.webservice-client';
export * from './core/question/get_random_question_summaries.webservice-client';
export * from './core/rating/get_item_ratings.webservice-client';
export * from './core/rating/add_rating.webservice-client';
export * from './core/role/assign_roles.webservice-client';
export * from './core/role/unassign_roles.webservice-client';
export * from './core/search/get_relevant_users.webservice-client';
export * from './core/search/get_results.webservice-client';
export * from './core/search/get_search_areas_list.webservice-client';
export * from './core/search/view_results.webservice-client';
export * from './core/search/get_top_results.webservice-client';
export * from './core/tag/get_tagindex.webservice-client';
export * from './core/tag/get_tags.webservice-client';
export * from './core/tag/update_tags.webservice-client';
export * from './core/tag/get_tagindex_per_area.webservice-client';
export * from './core/tag/get_tag_areas.webservice-client';
export * from './core/tag/get_tag_collections.webservice-client';
export * from './core/tag/get_tag_cloud.webservice-client';
export * from './core/update/inplace_editable.webservice-client';
export * from './core/user/add_user_device.webservice-client';
export * from './core/user/update_user_device_public_key.webservice-client';
export * from './core/user/add_user_private_files.webservice-client';
export * from './core/user/create_users.webservice-client';
export * from './core/user/delete_users.webservice-client';
export * from './core/user/get_course_user_profiles.webservice-client';
export * from './core/user/get_users.webservice-client';
export * from './core/user/get_users_by_field.webservice-client';
export * from './core/user/search_identity.webservice-client';
export * from './core/user/remove_user_device.webservice-client';
export * from './core/user/update_users.webservice-client';
export * from './core/user/update_user_preferences.webservice-client';
export * from './core/user/view_user_list.webservice-client';
export * from './core/user/view_user_profile.webservice-client';
export * from './core/user/get_user_preferences.webservice-client';
export * from './core/user/update_picture.webservice-client';
export * from './core/user/set_user_preferences.webservice-client';
export * from './core/user/agree_site_policy.webservice-client';
export * from './core/user/get_private_files_info.webservice-client';
export * from './core/user/prepare_private_files_for_edition.webservice-client';
export * from './core/user/update_private_files.webservice-client';
export * from './core/competency/create_competency_framework.webservice-client';
export * from './core/competency/read_competency_framework.webservice-client';
export * from './core/competency/duplicate_competency_framework.webservice-client';
export * from './core/competency/delete_competency_framework.webservice-client';
export * from './core/competency/update_competency_framework.webservice-client';
export * from './core/competency/list_competency_frameworks.webservice-client';
export * from './core/competency/count_competency_frameworks.webservice-client';
export * from './core/competency/competency_framework_viewed.webservice-client';
export * from './core/competency/create_competency.webservice-client';
export * from './core/competency/read_competency.webservice-client';
export * from './core/competency/competency_viewed.webservice-client';
export * from './core/competency/delete_competency.webservice-client';
export * from './core/competency/update_competency.webservice-client';
export * from './core/competency/list_competencies.webservice-client';
export * from './core/competency/list_competencies_in_template.webservice-client';
export * from './core/competency/count_competencies.webservice-client';
export * from './core/competency/count_competencies_in_template.webservice-client';
export * from './core/competency/search_competencies.webservice-client';
export * from './core/competency/set_parent_competency.webservice-client';
export * from './core/competency/move_up_competency.webservice-client';
export * from './core/competency/move_down_competency.webservice-client';
export * from './core/competency/list_course_module_competencies.webservice-client';
export * from './core/competency/count_course_module_competencies.webservice-client';
export * from './core/competency/list_course_competencies.webservice-client';
export * from './core/competency/count_competencies_in_course.webservice-client';
export * from './core/competency/count_courses_using_competency.webservice-client';
export * from './core/competency/add_competency_to_course.webservice-client';
export * from './core/competency/add_competency_to_template.webservice-client';
export * from './core/competency/remove_competency_from_course.webservice-client';
export * from './core/competency/set_course_competency_ruleoutcome.webservice-client';
export * from './core/competency/remove_competency_from_template.webservice-client';
export * from './core/competency/reorder_course_competency.webservice-client';
export * from './core/competency/reorder_template_competency.webservice-client';
export * from './core/competency/create_template.webservice-client';
export * from './core/competency/duplicate_template.webservice-client';
export * from './core/competency/read_template.webservice-client';
export * from './core/competency/delete_template.webservice-client';
export * from './core/competency/update_template.webservice-client';
export * from './core/competency/list_templates.webservice-client';
export * from './core/competency/list_templates_using_competency.webservice-client';
export * from './core/competency/count_templates.webservice-client';
export * from './core/competency/count_templates_using_competency.webservice-client';
export * from './core/competency/create_plan.webservice-client';
export * from './core/competency/update_plan.webservice-client';
export * from './core/competency/complete_plan.webservice-client';
export * from './core/competency/reopen_plan.webservice-client';
export * from './core/competency/read_plan.webservice-client';
export * from './core/competency/delete_plan.webservice-client';
export * from './core/competency/list_user_plans.webservice-client';
export * from './core/competency/list_plan_competencies.webservice-client';
export * from './core/competency/add_competency_to_plan.webservice-client';
export * from './core/competency/remove_competency_from_plan.webservice-client';
export * from './core/competency/reorder_plan_competency.webservice-client';
export * from './core/competency/plan_request_review.webservice-client';
export * from './core/competency/plan_start_review.webservice-client';
export * from './core/competency/plan_stop_review.webservice-client';
export * from './core/competency/plan_cancel_review_request.webservice-client';
export * from './core/competency/approve_plan.webservice-client';
export * from './core/competency/unapprove_plan.webservice-client';
export * from './core/competency/template_has_related_data.webservice-client';
export * from './core/competency/get_scale_values.webservice-client';
export * from './core/competency/add_related_competency.webservice-client';
export * from './core/competency/remove_related_competency.webservice-client';
export * from './core/competency/read_user_evidence.webservice-client';
export * from './core/competency/delete_user_evidence.webservice-client';
export * from './core/competency/create_user_evidence_competency.webservice-client';
export * from './core/competency/delete_user_evidence_competency.webservice-client';
export * from './core/competency/user_competency_cancel_review_request.webservice-client';
export * from './core/competency/user_competency_request_review.webservice-client';
export * from './core/competency/user_competency_start_review.webservice-client';
export * from './core/competency/user_competency_stop_review.webservice-client';
export * from './core/competency/user_competency_viewed.webservice-client';
export * from './core/competency/user_competency_viewed_in_plan.webservice-client';
export * from './core/competency/user_competency_viewed_in_course.webservice-client';
export * from './core/competency/user_competency_plan_viewed.webservice-client';
export * from './core/competency/grade_competency.webservice-client';
export * from './core/competency/grade_competency_in_plan.webservice-client';
export * from './core/competency/grade_competency_in_course.webservice-client';
export * from './core/competency/unlink_plan_from_template.webservice-client';
export * from './core/competency/template_viewed.webservice-client';
export * from './core/competency/request_review_of_user_evidence_linked_competencies.webservice-client';
export * from './core/competency/update_course_competency_settings.webservice-client';
export * from './core/competency/delete_evidence.webservice-client';
export * from './core/webservice/get_site_info.webservice-client';
export * from './core/block/get_course_blocks.webservice-client';
export * from './core/block/get_dashboard_blocks.webservice-client';
export * from './core/block/fetch_addable_blocks.webservice-client';
export * from './core/filters/get_available_in_context.webservice-client';
export * from './core/filters/get_all_states.webservice-client';
export * from './core/customfield/delete_field.webservice-client';
export * from './core/customfield/reload_template.webservice-client';
export * from './core/customfield/create_category.webservice-client';
export * from './core/customfield/delete_category.webservice-client';
export * from './core/customfield/move_field.webservice-client';
export * from './core/customfield/move_category.webservice-client';
export * from './core/h5p/get_trusted_h5p_file.webservice-client';
export * from './core/table/get_dynamic_table_content.webservice-client';
export * from './core/xapi/statement_post.webservice-client';
export * from './core/xapi/post_state.webservice-client';
export * from './core/xapi/get_state.webservice-client';
export * from './core/xapi/get_states.webservice-client';
export * from './core/xapi/delete_state.webservice-client';
export * from './core/xapi/delete_states.webservice-client';
export * from './core/contentbank/delete_content.webservice-client';
export * from './core/contentbank/rename_content.webservice-client';
export * from './core/contentbank/copy_content.webservice-client';
export * from './core/contentbank/set_content_visibility.webservice-client';
export * from './core/create/userfeedback_action_record.webservice-client';
export * from './core/payment/get_available_gateways.webservice-client';
export * from './core/reportbuilder/filters_reset.webservice-client';
export * from './core/reportbuilder/set_filters.webservice-client';
export * from './core/dynamic/tabs_get_content.webservice-client';
export * from './core/change/editmode.webservice-client';
export * from './core/reportbuilder/reports_delete.webservice-client';
export * from './core/reportbuilder/reports_get.webservice-client';
export * from './core/reportbuilder/list_reports.webservice-client';
export * from './core/reportbuilder/retrieve_report.webservice-client';
export * from './core/reportbuilder/retrieve_system_report.webservice-client';
export * from './core/reportbuilder/can_view_system_report.webservice-client';
export * from './core/reportbuilder/view_report.webservice-client';
export * from './core/reportbuilder/columns_add.webservice-client';
export * from './core/reportbuilder/columns_delete.webservice-client';
export * from './core/reportbuilder/columns_reorder.webservice-client';
export * from './core/reportbuilder/columns_sort_get.webservice-client';
export * from './core/reportbuilder/columns_sort_reorder.webservice-client';
export * from './core/reportbuilder/columns_sort_toggle.webservice-client';
export * from './core/reportbuilder/conditions_add.webservice-client';
export * from './core/reportbuilder/conditions_delete.webservice-client';
export * from './core/reportbuilder/conditions_reorder.webservice-client';
export * from './core/reportbuilder/conditions_reset.webservice-client';
export * from './core/reportbuilder/filters_add.webservice-client';
export * from './core/reportbuilder/filters_delete.webservice-client';
export * from './core/reportbuilder/filters_reorder.webservice-client';
export * from './core/reportbuilder/audiences_delete.webservice-client';
export * from './core/reportbuilder/schedules_delete.webservice-client';
export * from './core/reportbuilder/schedules_send.webservice-client';
export * from './core/reportbuilder/schedules_toggle.webservice-client';
export * from './core/admin/set_plugin_state.webservice-client';
export * from './core/admin/set_plugin_order.webservice-client';
export * from './core/admin/set_block_protection.webservice-client';
export * from './core/moodlenet/send_activity.webservice-client';
export * from './core/moodlenet/get_share_info_activity.webservice-client';
export * from './core/moodlenet/auth_check.webservice-client';
export * from './core/moodlenet/get_shared_course_info.webservice-client';
export * from './core/moodlenet/send_course.webservice-client';
export * from './core/output/poll_stored_progress.webservice-client';
export * from './core/ai/set_policy_status.webservice-client';
export * from './core/ai/get_policy_status.webservice-client';
export * from './core/ai/set_action.webservice-client';
export * from './core/sms/set_gateway_status.webservice-client';
export * from './tiny/autosave/resume_session.webservice-client';
export * from './tiny/autosave/reset_session.webservice-client';
export * from './tiny/autosave/update_session.webservice-client';
export * from './tiny/equation/filter.webservice-client';
export * from './tiny/premium/get_api_key.webservice-client';
export * from './media/videojs/get_language.webservice-client';
export * from './message/airnotifier/is_system_configured.webservice-client';
export * from './message/airnotifier/are_notification_preferences_configured.webservice-client';
export * from './message/airnotifier/get_user_devices.webservice-client';
export * from './message/airnotifier/enable_device.webservice-client';
export * from './message/popup/get_popup_notifications.webservice-client';
export * from './message/popup/get_unread_popup_notification_count.webservice-client';
export * from './mod/assign/copy_previous_attempt.webservice-client';
export * from './mod/assign/get_grades.webservice-client';
export * from './mod/assign/get_assignments.webservice-client';
export * from './mod/assign/get_submissions.webservice-client';
export * from './mod/assign/get_user_flags.webservice-client';
export * from './mod/assign/set_user_flags.webservice-client';
export * from './mod/assign/get_user_mappings.webservice-client';
export * from './mod/assign/revert_submissions_to_draft.webservice-client';
export * from './mod/assign/lock_submissions.webservice-client';
export * from './mod/assign/unlock_submissions.webservice-client';
export * from './mod/assign/save_submission.webservice-client';
export * from './mod/assign/submit_for_grading.webservice-client';
export * from './mod/assign/save_grade.webservice-client';
export * from './mod/assign/save_grades.webservice-client';
export * from './mod/assign/save_user_extensions.webservice-client';
export * from './mod/assign/reveal_identities.webservice-client';
export * from './mod/assign/view_grading_table.webservice-client';
export * from './mod/assign/view_submission_status.webservice-client';
export * from './mod/assign/get_submission_status.webservice-client';
export * from './mod/assign/list_participants.webservice-client';
export * from './mod/assign/submit_grading_form.webservice-client';
export * from './mod/assign/get_participant.webservice-client';
export * from './mod/assign/view_assign.webservice-client';
export * from './mod/assign/start_submission.webservice-client';
export * from './mod/assign/remove_submission.webservice-client';
export * from './mod/bigbluebuttonbn/can_join.webservice-client';
export * from './mod/bigbluebuttonbn/get_recordings.webservice-client';
export * from './mod/bigbluebuttonbn/get_recordings_to_import.webservice-client';
export * from './mod/bigbluebuttonbn/update_recording.webservice-client';
export * from './mod/bigbluebuttonbn/end_meeting.webservice-client';
export * from './mod/bigbluebuttonbn/completion_validate.webservice-client';
export * from './mod/bigbluebuttonbn/meeting_info.webservice-client';
export * from './mod/bigbluebuttonbn/get_bigbluebuttonbns_by_courses.webservice-client';
export * from './mod/bigbluebuttonbn/view_bigbluebuttonbn.webservice-client';
export * from './mod/bigbluebuttonbn/get_join_url.webservice-client';
export * from './mod/book/view_book.webservice-client';
export * from './mod/book/get_books_by_courses.webservice-client';
export * from './mod/chat/login_user.webservice-client';
export * from './mod/chat/get_chat_users.webservice-client';
export * from './mod/chat/send_chat_message.webservice-client';
export * from './mod/chat/get_chat_latest_messages.webservice-client';
export * from './mod/chat/view_chat.webservice-client';
export * from './mod/chat/get_chats_by_courses.webservice-client';
export * from './mod/chat/get_sessions.webservice-client';
export * from './mod/chat/get_session_messages.webservice-client';
export * from './mod/chat/view_sessions.webservice-client';
export * from './mod/choice/get_choice_results.webservice-client';
export * from './mod/choice/get_choice_options.webservice-client';
export * from './mod/choice/submit_choice_response.webservice-client';
export * from './mod/choice/view_choice.webservice-client';
export * from './mod/choice/get_choices_by_courses.webservice-client';
export * from './mod/choice/delete_choice_responses.webservice-client';
export * from './mod/data/get_databases_by_courses.webservice-client';
export * from './mod/data/view_database.webservice-client';
export * from './mod/data/get_data_access_information.webservice-client';
export * from './mod/data/get_entries.webservice-client';
export * from './mod/data/get_entry.webservice-client';
export * from './mod/data/get_fields.webservice-client';
export * from './mod/data/search_entries.webservice-client';
export * from './mod/data/approve_entry.webservice-client';
export * from './mod/data/delete_entry.webservice-client';
export * from './mod/data/add_entry.webservice-client';
export * from './mod/data/update_entry.webservice-client';
export * from './mod/data/delete_saved_preset.webservice-client';
export * from './mod/data/get_mapping_information.webservice-client';
export * from './mod/feedback/get_feedbacks_by_courses.webservice-client';
export * from './mod/feedback/get_feedback_access_information.webservice-client';
export * from './mod/feedback/view_feedback.webservice-client';
export * from './mod/feedback/get_current_completed_tmp.webservice-client';
export * from './mod/feedback/get_items.webservice-client';
export * from './mod/feedback/launch_feedback.webservice-client';
export * from './mod/feedback/get_page_items.webservice-client';
export * from './mod/feedback/process_page.webservice-client';
export * from './mod/feedback/get_analysis.webservice-client';
export * from './mod/feedback/get_unfinished_responses.webservice-client';
export * from './mod/feedback/get_finished_responses.webservice-client';
export * from './mod/feedback/get_non_respondents.webservice-client';
export * from './mod/feedback/get_responses_analysis.webservice-client';
export * from './mod/feedback/get_last_completed.webservice-client';
export * from './mod/folder/view_folder.webservice-client';
export * from './mod/folder/get_folders_by_courses.webservice-client';
export * from './mod/forum/get_forums_by_courses.webservice-client';
export * from './mod/forum/get_discussion_posts.webservice-client';
export * from './mod/forum/get_forum_discussions.webservice-client';
export * from './mod/forum/view_forum.webservice-client';
export * from './mod/forum/view_forum_discussion.webservice-client';
export * from './mod/forum/add_discussion_post.webservice-client';
export * from './mod/forum/add_discussion.webservice-client';
export * from './mod/forum/can_add_discussion.webservice-client';
export * from './mod/forum/get_forum_access_information.webservice-client';
export * from './mod/forum/set_subscription_state.webservice-client';
export * from './mod/forum/set_lock_state.webservice-client';
export * from './mod/forum/toggle_favourite_state.webservice-client';
export * from './mod/forum/set_pin_state.webservice-client';
export * from './mod/forum/delete_post.webservice-client';
export * from './mod/forum/get_discussion_posts_by_userid.webservice-client';
export * from './mod/forum/get_discussion_post.webservice-client';
export * from './mod/forum/prepare_draft_area_for_post.webservice-client';
export * from './mod/forum/update_discussion_post.webservice-client';
export * from './mod/glossary/get_glossaries_by_courses.webservice-client';
export * from './mod/glossary/view_glossary.webservice-client';
export * from './mod/glossary/view_entry.webservice-client';
export * from './mod/glossary/get_entries_by_letter.webservice-client';
export * from './mod/glossary/get_entries_by_date.webservice-client';
export * from './mod/glossary/get_categories.webservice-client';
export * from './mod/glossary/get_entries_by_category.webservice-client';
export * from './mod/glossary/get_authors.webservice-client';
export * from './mod/glossary/get_entries_by_author.webservice-client';
export * from './mod/glossary/get_entries_by_author_id.webservice-client';
export * from './mod/glossary/get_entries_by_search.webservice-client';
export * from './mod/glossary/get_entries_by_term.webservice-client';
export * from './mod/glossary/get_entries_to_approve.webservice-client';
export * from './mod/glossary/get_entry_by_id.webservice-client';
export * from './mod/glossary/add_entry.webservice-client';
export * from './mod/glossary/delete_entry.webservice-client';
export * from './mod/glossary/update_entry.webservice-client';
export * from './mod/glossary/prepare_entry_for_edition.webservice-client';
export * from './mod/h5pactivity/get_h5pactivity_access_information.webservice-client';
export * from './mod/h5pactivity/view_h5pactivity.webservice-client';
export * from './mod/h5pactivity/get_attempts.webservice-client';
export * from './mod/h5pactivity/get_results.webservice-client';
export * from './mod/h5pactivity/get_h5pactivities_by_courses.webservice-client';
export * from './mod/h5pactivity/log_report_viewed.webservice-client';
export * from './mod/h5pactivity/get_user_attempts.webservice-client';
export * from './mod/imscp/view_imscp.webservice-client';
export * from './mod/imscp/get_imscps_by_courses.webservice-client';
export * from './mod/label/get_labels_by_courses.webservice-client';
export * from './mod/lesson/get_lessons_by_courses.webservice-client';
export * from './mod/lesson/get_lesson_access_information.webservice-client';
export * from './mod/lesson/view_lesson.webservice-client';
export * from './mod/lesson/get_questions_attempts.webservice-client';
export * from './mod/lesson/get_user_grade.webservice-client';
export * from './mod/lesson/get_user_attempt_grade.webservice-client';
export * from './mod/lesson/get_content_pages_viewed.webservice-client';
export * from './mod/lesson/get_user_timers.webservice-client';
export * from './mod/lesson/get_pages.webservice-client';
export * from './mod/lesson/launch_attempt.webservice-client';
export * from './mod/lesson/get_page_data.webservice-client';
export * from './mod/lesson/process_page.webservice-client';
export * from './mod/lesson/finish_attempt.webservice-client';
export * from './mod/lesson/get_attempts_overview.webservice-client';
export * from './mod/lesson/get_user_attempt.webservice-client';
export * from './mod/lesson/get_pages_possible_jumps.webservice-client';
export * from './mod/lesson/get_lesson.webservice-client';
export * from './mod/lti/get_tool_launch_data.webservice-client';
export * from './mod/lti/get_ltis_by_courses.webservice-client';
export * from './mod/lti/view_lti.webservice-client';
export * from './mod/lti/get_tool_proxies.webservice-client';
export * from './mod/lti/create_tool_proxy.webservice-client';
export * from './mod/lti/delete_tool_proxy.webservice-client';
export * from './mod/lti/get_tool_proxy_registration_request.webservice-client';
export * from './mod/lti/get_tool_types.webservice-client';
export * from './mod/lti/get_tool_types_and_proxies.webservice-client';
export * from './mod/lti/get_tool_types_and_proxies_count.webservice-client';
export * from './mod/lti/create_tool_type.webservice-client';
export * from './mod/lti/update_tool_type.webservice-client';
export * from './mod/lti/delete_tool_type.webservice-client';
export * from './mod/lti/delete_course_tool_type.webservice-client';
export * from './mod/lti/toggle_showinactivitychooser.webservice-client';
export * from './mod/lti/is_cartridge.webservice-client';
export * from './mod/page/view_page.webservice-client';
export * from './mod/page/get_pages_by_courses.webservice-client';
export * from './quizaccess/seb/validate_quiz_keys.webservice-client';
export * from './mod/quiz/get_quizzes_by_courses.webservice-client';
export * from './mod/quiz/view_quiz.webservice-client';
export * from './mod/quiz/get_user_attempts.webservice-client';
export * from './mod/quiz/get_user_best_grade.webservice-client';
export * from './mod/quiz/get_combined_review_options.webservice-client';
export * from './mod/quiz/start_attempt.webservice-client';
export * from './mod/quiz/get_attempt_data.webservice-client';
export * from './mod/quiz/get_attempt_summary.webservice-client';
export * from './mod/quiz/save_attempt.webservice-client';
export * from './mod/quiz/process_attempt.webservice-client';
export * from './mod/quiz/get_attempt_review.webservice-client';
export * from './mod/quiz/view_attempt.webservice-client';
export * from './mod/quiz/view_attempt_summary.webservice-client';
export * from './mod/quiz/view_attempt_review.webservice-client';
export * from './mod/quiz/get_quiz_feedback_for_grade.webservice-client';
export * from './mod/quiz/get_quiz_access_information.webservice-client';
export * from './mod/quiz/get_attempt_access_information.webservice-client';
export * from './mod/quiz/get_quiz_required_qtypes.webservice-client';
export * from './mod/quiz/set_question_version.webservice-client';
export * from './mod/quiz/reopen_attempt.webservice-client';
export * from './mod/quiz/get_reopen_attempt_confirmation.webservice-client';
export * from './mod/quiz/add_random_questions.webservice-client';
export * from './mod/quiz/update_filter_condition.webservice-client';
export * from './mod/quiz/save_overrides.webservice-client';
export * from './mod/quiz/delete_overrides.webservice-client';
export * from './mod/quiz/get_overrides.webservice-client';
export * from './mod/quiz/create_grade_items.webservice-client';
export * from './mod/quiz/delete_grade_items.webservice-client';
export * from './mod/quiz/update_grade_items.webservice-client';
export * from './mod/quiz/update_slots.webservice-client';
export * from './mod/quiz/get_edit_grading_page_data.webservice-client';
export * from './mod/quiz/create_grade_item_per_section.webservice-client';
export * from './mod/resource/view_resource.webservice-client';
export * from './mod/resource/get_resources_by_courses.webservice-client';
export * from './mod/scorm/view_scorm.webservice-client';
export * from './mod/scorm/get_scorm_attempt_count.webservice-client';
export * from './mod/scorm/get_scorm_scoes.webservice-client';
export * from './mod/scorm/get_scorm_user_data.webservice-client';
export * from './mod/scorm/insert_scorm_tracks.webservice-client';
export * from './mod/scorm/get_scorm_sco_tracks.webservice-client';
export * from './mod/scorm/get_scorms_by_courses.webservice-client';
export * from './mod/scorm/launch_sco.webservice-client';
export * from './mod/scorm/get_scorm_access_information.webservice-client';
export * from './mod/survey/get_surveys_by_courses.webservice-client';
export * from './mod/survey/view_survey.webservice-client';
export * from './mod/survey/get_questions.webservice-client';
export * from './mod/survey/submit_answers.webservice-client';
export * from './mod/url/view_url.webservice-client';
export * from './mod/url/get_urls_by_courses.webservice-client';
export * from './mod/wiki/get_wikis_by_courses.webservice-client';
export * from './mod/wiki/view_wiki.webservice-client';
export * from './mod/wiki/view_page.webservice-client';
export * from './mod/wiki/get_subwikis.webservice-client';
export * from './mod/wiki/get_subwiki_pages.webservice-client';
export * from './mod/wiki/get_subwiki_files.webservice-client';
export * from './mod/wiki/get_page_contents.webservice-client';
export * from './mod/wiki/get_page_for_editing.webservice-client';
export * from './mod/wiki/new_page.webservice-client';
export * from './mod/wiki/edit_page.webservice-client';
export * from './mod/workshop/get_workshops_by_courses.webservice-client';
export * from './mod/workshop/get_workshop_access_information.webservice-client';
export * from './mod/workshop/get_user_plan.webservice-client';
export * from './mod/workshop/view_workshop.webservice-client';
export * from './mod/workshop/add_submission.webservice-client';
export * from './mod/workshop/update_submission.webservice-client';
export * from './mod/workshop/delete_submission.webservice-client';
export * from './mod/workshop/get_submissions.webservice-client';
export * from './mod/workshop/get_submission.webservice-client';
export * from './mod/workshop/get_submission_assessments.webservice-client';
export * from './mod/workshop/get_assessment.webservice-client';
export * from './mod/workshop/get_assessment_form_definition.webservice-client';
export * from './mod/workshop/get_reviewer_assessments.webservice-client';
export * from './mod/workshop/update_assessment.webservice-client';
export * from './mod/workshop/get_grades.webservice-client';
export * from './mod/workshop/evaluate_assessment.webservice-client';
export * from './mod/workshop/get_grades_report.webservice-client';
export * from './mod/workshop/view_submission.webservice-client';
export * from './mod/workshop/evaluate_submission.webservice-client';
export * from './paygw/paypal/get_config_for_js.webservice-client';
export * from './paygw/paypal/create_transaction_complete.webservice-client';
export * from './qbank/columnsortorder/set_columnbank_order.webservice-client';
export * from './qbank/columnsortorder/set_hidden_columns.webservice-client';
export * from './qbank/columnsortorder/set_column_size.webservice-client';
export * from './qbank/editquestion/set_status.webservice-client';
export * from './qbank/managecategories/move_category.webservice-client';
export * from './qbank/tagquestion/submit_tags_form.webservice-client';
export * from './qbank/viewquestiontext/set_question_text_format.webservice-client';
export * from './report/competency/data_for_report.webservice-client';
export * from './report/insights/set_notuseful_prediction.webservice-client';
export * from './report/insights/set_fixed_prediction.webservice-client';
export * from './report/insights/action_executed.webservice-client';

import type { ToolAdminPresetsDeletePresetParams, ToolAdminPresetsDeletePresetReturns } from './tool/admin/presets_delete_preset.webservice-client';
import type { ToolAnalyticsPotentialContextsParams, ToolAnalyticsPotentialContextsReturns } from './tool/analytics/potential_contexts.webservice-client';
import type { ToolBehatGetEntityGeneratorParams, ToolBehatGetEntityGeneratorReturns } from './tool/behat/get_entity_generator.webservice-client';
import type { ToolDataprivacyCancelDataRequestParams, ToolDataprivacyCancelDataRequestReturns } from './tool/dataprivacy/cancel_data_request.webservice-client';
import type { ToolDataprivacyContactDpoParams, ToolDataprivacyContactDpoReturns } from './tool/dataprivacy/contact_dpo.webservice-client';
import type { ToolDataprivacyMarkCompleteParams, ToolDataprivacyMarkCompleteReturns } from './tool/dataprivacy/mark_complete.webservice-client';
import type { ToolDataprivacyGetDataRequestParams, ToolDataprivacyGetDataRequestReturns } from './tool/dataprivacy/get_data_request.webservice-client';
import type { ToolDataprivacyApproveDataRequestParams, ToolDataprivacyApproveDataRequestReturns } from './tool/dataprivacy/approve_data_request.webservice-client';
import type { ToolDataprivacySubmitSelectedCoursesFormParams, ToolDataprivacySubmitSelectedCoursesFormReturns } from './tool/dataprivacy/submit_selected_courses_form.webservice-client';
import type { ToolDataprivacyBulkApproveDataRequestsParams, ToolDataprivacyBulkApproveDataRequestsReturns } from './tool/dataprivacy/bulk_approve_data_requests.webservice-client';
import type { ToolDataprivacyDenyDataRequestParams, ToolDataprivacyDenyDataRequestReturns } from './tool/dataprivacy/deny_data_request.webservice-client';
import type { ToolDataprivacyBulkDenyDataRequestsParams, ToolDataprivacyBulkDenyDataRequestsReturns } from './tool/dataprivacy/bulk_deny_data_requests.webservice-client';
import type { ToolDataprivacyGetUsersParams, ToolDataprivacyGetUsersReturns } from './tool/dataprivacy/get_users.webservice-client';
import type { ToolDataprivacyCreatePurposeFormParams, ToolDataprivacyCreatePurposeFormReturns } from './tool/dataprivacy/create_purpose_form.webservice-client';
import type { ToolDataprivacyCreateCategoryFormParams, ToolDataprivacyCreateCategoryFormReturns } from './tool/dataprivacy/create_category_form.webservice-client';
import type { ToolDataprivacyDeletePurposeParams, ToolDataprivacyDeletePurposeReturns } from './tool/dataprivacy/delete_purpose.webservice-client';
import type { ToolDataprivacyDeleteCategoryParams, ToolDataprivacyDeleteCategoryReturns } from './tool/dataprivacy/delete_category.webservice-client';
import type { ToolDataprivacySetContextlevelFormParams, ToolDataprivacySetContextlevelFormReturns } from './tool/dataprivacy/set_contextlevel_form.webservice-client';
import type { ToolDataprivacySetContextFormParams, ToolDataprivacySetContextFormReturns } from './tool/dataprivacy/set_context_form.webservice-client';
import type { ToolDataprivacyTreeExtraBranchesParams, ToolDataprivacyTreeExtraBranchesReturns } from './tool/dataprivacy/tree_extra_branches.webservice-client';
import type { ToolDataprivacyConfirmContextsForDeletionParams, ToolDataprivacyConfirmContextsForDeletionReturns } from './tool/dataprivacy/confirm_contexts_for_deletion.webservice-client';
import type { ToolDataprivacySetContextDefaultsParams, ToolDataprivacySetContextDefaultsReturns } from './tool/dataprivacy/set_context_defaults.webservice-client';
import type { ToolDataprivacyGetCategoryOptionsParams, ToolDataprivacyGetCategoryOptionsReturns } from './tool/dataprivacy/get_category_options.webservice-client';
import type { ToolDataprivacyGetPurposeOptionsParams, ToolDataprivacyGetPurposeOptionsReturns } from './tool/dataprivacy/get_purpose_options.webservice-client';
import type { ToolDataprivacyGetActivityOptionsParams, ToolDataprivacyGetActivityOptionsReturns } from './tool/dataprivacy/get_activity_options.webservice-client';
import type { ToolDataprivacyGetAccessInformationParams, ToolDataprivacyGetAccessInformationReturns } from './tool/dataprivacy/get_access_information.webservice-client';
import type { ToolDataprivacyCreateDataRequestParams, ToolDataprivacyCreateDataRequestReturns } from './tool/dataprivacy/create_data_request.webservice-client';
import type { ToolDataprivacyGetDataRequestsParams, ToolDataprivacyGetDataRequestsReturns } from './tool/dataprivacy/get_data_requests.webservice-client';
import type { ToolLpDataForCompetencyFrameworksManagePageParams, ToolLpDataForCompetencyFrameworksManagePageReturns } from './tool/lp/data_for_competency_frameworks_manage_page.webservice-client';
import type { ToolLpDataForCompetencySummaryParams, ToolLpDataForCompetencySummaryReturns } from './tool/lp/data_for_competency_summary.webservice-client';
import type { ToolLpDataForCompetenciesManagePageParams, ToolLpDataForCompetenciesManagePageReturns } from './tool/lp/data_for_competencies_manage_page.webservice-client';
import type { ToolLpListCoursesUsingCompetencyParams, ToolLpListCoursesUsingCompetencyReturns } from './tool/lp/list_courses_using_competency.webservice-client';
import type { ToolLpDataForCourseCompetenciesPageParams, ToolLpDataForCourseCompetenciesPageReturns } from './tool/lp/data_for_course_competencies_page.webservice-client';
import type { ToolLpDataForTemplateCompetenciesPageParams, ToolLpDataForTemplateCompetenciesPageReturns } from './tool/lp/data_for_template_competencies_page.webservice-client';
import type { ToolLpDataForTemplatesManagePageParams, ToolLpDataForTemplatesManagePageReturns } from './tool/lp/data_for_templates_manage_page.webservice-client';
import type { ToolLpDataForPlansPageParams, ToolLpDataForPlansPageReturns } from './tool/lp/data_for_plans_page.webservice-client';
import type { ToolLpDataForPlanPageParams, ToolLpDataForPlanPageReturns } from './tool/lp/data_for_plan_page.webservice-client';
import type { ToolLpDataForRelatedCompetenciesSectionParams, ToolLpDataForRelatedCompetenciesSectionReturns } from './tool/lp/data_for_related_competencies_section.webservice-client';
import type { ToolLpSearchUsersParams, ToolLpSearchUsersReturns } from './tool/lp/search_users.webservice-client';
import type { ToolLpSearchCohortsParams, ToolLpSearchCohortsReturns } from './tool/lp/search_cohorts.webservice-client';
import type { ToolLpDataForUserEvidenceListPageParams, ToolLpDataForUserEvidenceListPageReturns } from './tool/lp/data_for_user_evidence_list_page.webservice-client';
import type { ToolLpDataForUserEvidencePageParams, ToolLpDataForUserEvidencePageReturns } from './tool/lp/data_for_user_evidence_page.webservice-client';
import type { ToolLpDataForUserCompetencySummaryParams, ToolLpDataForUserCompetencySummaryReturns } from './tool/lp/data_for_user_competency_summary.webservice-client';
import type { ToolLpDataForUserCompetencySummaryInPlanParams, ToolLpDataForUserCompetencySummaryInPlanReturns } from './tool/lp/data_for_user_competency_summary_in_plan.webservice-client';
import type { ToolLpDataForUserCompetencySummaryInCourseParams, ToolLpDataForUserCompetencySummaryInCourseReturns } from './tool/lp/data_for_user_competency_summary_in_course.webservice-client';
import type { ToolMobileGetPluginsSupportingMobileParams, ToolMobileGetPluginsSupportingMobileReturns } from './tool/mobile/get_plugins_supporting_mobile.webservice-client';
import type { ToolMobileGetPublicConfigParams, ToolMobileGetPublicConfigReturns } from './tool/mobile/get_public_config.webservice-client';
import type { ToolMobileGetConfigParams, ToolMobileGetConfigReturns } from './tool/mobile/get_config.webservice-client';
import type { ToolMobileGetAutologinKeyParams, ToolMobileGetAutologinKeyReturns } from './tool/mobile/get_autologin_key.webservice-client';
import type { ToolMobileGetContentParams, ToolMobileGetContentReturns } from './tool/mobile/get_content.webservice-client';
import type { ToolMobileCallExternalFunctionsParams, ToolMobileCallExternalFunctionsReturns } from './tool/mobile/call_external_functions.webservice-client';
import type { ToolMobileValidateSubscriptionKeyParams, ToolMobileValidateSubscriptionKeyReturns } from './tool/mobile/validate_subscription_key.webservice-client';
import type { ToolMobileGetTokensForQrLoginParams, ToolMobileGetTokensForQrLoginReturns } from './tool/mobile/get_tokens_for_qr_login.webservice-client';
import type { ToolMoodlenetVerifyWebfingerParams, ToolMoodlenetVerifyWebfingerReturns } from './tool/moodlenet/verify_webfinger.webservice-client';
import type { ToolMoodlenetSearchCoursesParams, ToolMoodlenetSearchCoursesReturns } from './tool/moodlenet/search_courses.webservice-client';
import type { ToolPolicyGetPolicyVersionParams, ToolPolicyGetPolicyVersionReturns } from './tool/policy/get_policy_version.webservice-client';
import type { ToolPolicySubmitAcceptOnBehalfParams, ToolPolicySubmitAcceptOnBehalfReturns } from './tool/policy/submit_accept_on_behalf.webservice-client';
import type { ToolPolicyGetUserAcceptancesParams, ToolPolicyGetUserAcceptancesReturns } from './tool/policy/get_user_acceptances.webservice-client';
import type { ToolPolicySetAcceptancesStatusParams, ToolPolicySetAcceptancesStatusReturns } from './tool/policy/set_acceptances_status.webservice-client';
import type { ToolTemplatelibraryListTemplatesParams, ToolTemplatelibraryListTemplatesReturns } from './tool/templatelibrary/list_templates.webservice-client';
import type { ToolTemplatelibraryLoadCanonicalTemplateParams, ToolTemplatelibraryLoadCanonicalTemplateReturns } from './tool/templatelibrary/load_canonical_template.webservice-client';
import type { ToolUsertoursFetchAndStartTourParams, ToolUsertoursFetchAndStartTourReturns } from './tool/usertours/fetch_and_start_tour.webservice-client';
import type { ToolUsertoursStepShownParams, ToolUsertoursStepShownReturns } from './tool/usertours/step_shown.webservice-client';
import type { ToolUsertoursCompleteTourParams, ToolUsertoursCompleteTourReturns } from './tool/usertours/complete_tour.webservice-client';
import type { ToolUsertoursResetTourParams, ToolUsertoursResetTourReturns } from './tool/usertours/reset_tour.webservice-client';
import type { ToolXmldbInvokeMoveActionParams, ToolXmldbInvokeMoveActionReturns } from './tool/xmldb/invoke_move_action.webservice-client';
import type { AiplacementCourseassistSummariseTextParams, AiplacementCourseassistSummariseTextReturns } from './aiplacement/courseassist/summarise_text.webservice-client';
import type { AiplacementEditorGenerateImageParams, AiplacementEditorGenerateImageReturns } from './aiplacement/editor/generate_image.webservice-client';
import type { AiplacementEditorGenerateTextParams, AiplacementEditorGenerateTextReturns } from './aiplacement/editor/generate_text.webservice-client';
import type { AuthEmailGetSignupSettingsParams, AuthEmailGetSignupSettingsReturns } from './auth/email/get_signup_settings.webservice-client';
import type { AuthEmailSignupUserParams, AuthEmailSignupUserReturns } from './auth/email/signup_user.webservice-client';
import type { BlockAccessreviewGetModuleDataParams, BlockAccessreviewGetModuleDataReturns } from './block/accessreview/get_module_data.webservice-client';
import type { BlockAccessreviewGetSectionDataParams, BlockAccessreviewGetSectionDataReturns } from './block/accessreview/get_section_data.webservice-client';
import type { BlockRecentlyaccesseditemsGetRecentItemsParams, BlockRecentlyaccesseditemsGetRecentItemsReturns } from './block/recentlyaccesseditems/get_recent_items.webservice-client';
import type { BlockStarredcoursesGetStarredCoursesParams, BlockStarredcoursesGetStarredCoursesReturns } from './block/starredcourses/get_starred_courses.webservice-client';
import type { CustomfieldNumberRecalculateValueParams, CustomfieldNumberRecalculateValueReturns } from './customfield/number/recalculate_value.webservice-client';
import type { EnrolGuestGetInstanceInfoParams, EnrolGuestGetInstanceInfoReturns } from './enrol/guest/get_instance_info.webservice-client';
import type { EnrolGuestValidatePasswordParams, EnrolGuestValidatePasswordReturns } from './enrol/guest/validate_password.webservice-client';
import type { EnrolManualEnrolUsersParams, EnrolManualEnrolUsersReturns } from './enrol/manual/enrol_users.webservice-client';
import type { EnrolManualUnenrolUsersParams, EnrolManualUnenrolUsersReturns } from './enrol/manual/unenrol_users.webservice-client';
import type { EnrolMetaAddInstancesParams, EnrolMetaAddInstancesReturns } from './enrol/meta/add_instances.webservice-client';
import type { EnrolMetaDeleteInstancesParams, EnrolMetaDeleteInstancesReturns } from './enrol/meta/delete_instances.webservice-client';
import type { EnrolSelfGetInstanceInfoParams, EnrolSelfGetInstanceInfoReturns } from './enrol/self/get_instance_info.webservice-client';
import type { EnrolSelfEnrolUserParams, EnrolSelfEnrolUserReturns } from './enrol/self/enrol_user.webservice-client';
import type { GradingformGuideGraderGradingpanelFetchParams, GradingformGuideGraderGradingpanelFetchReturns } from './gradingform/guide/grader_gradingpanel_fetch.webservice-client';
import type { GradingformGuideGraderGradingpanelStoreParams, GradingformGuideGraderGradingpanelStoreReturns } from './gradingform/guide/grader_gradingpanel_store.webservice-client';
import type { GradingformRubricGraderGradingpanelFetchParams, GradingformRubricGraderGradingpanelFetchReturns } from './gradingform/rubric/grader_gradingpanel_fetch.webservice-client';
import type { GradingformRubricGraderGradingpanelStoreParams, GradingformRubricGraderGradingpanelStoreReturns } from './gradingform/rubric/grader_gradingpanel_store.webservice-client';
import type { GradereportGraderGetUsersInReportParams, GradereportGraderGetUsersInReportReturns } from './gradereport/grader/get_users_in_report.webservice-client';
import type { GradereportOverviewGetCourseGradesParams, GradereportOverviewGetCourseGradesReturns } from './gradereport/overview/get_course_grades.webservice-client';
import type { GradereportOverviewViewGradeReportParams, GradereportOverviewViewGradeReportReturns } from './gradereport/overview/view_grade_report.webservice-client';
import type { GradereportSingleviewGetGradeItemsForSearchWidgetParams, GradereportSingleviewGetGradeItemsForSearchWidgetReturns } from './gradereport/singleview/get_grade_items_for_search_widget.webservice-client';
import type { GradereportUserGetGradesTableParams, GradereportUserGetGradesTableReturns } from './gradereport/user/get_grades_table.webservice-client';
import type { GradereportUserViewGradeReportParams, GradereportUserViewGradeReportReturns } from './gradereport/user/view_grade_report.webservice-client';
import type { GradereportUserGetGradeItemsParams, GradereportUserGetGradeItemsReturns } from './gradereport/user/get_grade_items.webservice-client';
import type { GradereportUserGetAccessInformationParams, GradereportUserGetAccessInformationReturns } from './gradereport/user/get_access_information.webservice-client';
import type { CoreAuthConfirmUserParams, CoreAuthConfirmUserReturns } from './core/auth/confirm_user.webservice-client';
import type { CoreAuthRequestPasswordResetParams, CoreAuthRequestPasswordResetReturns } from './core/auth/request_password_reset.webservice-client';
import type { CoreAuthIsMinorParams, CoreAuthIsMinorReturns } from './core/auth/is_minor.webservice-client';
import type { CoreAuthIsAgeDigitalConsentVerificationEnabledParams, CoreAuthIsAgeDigitalConsentVerificationEnabledReturns } from './core/auth/is_age_digital_consent_verification_enabled.webservice-client';
import type { CoreAuthResendConfirmationEmailParams, CoreAuthResendConfirmationEmailReturns } from './core/auth/resend_confirmation_email.webservice-client';
import type { CoreBackupGetAsyncBackupProgressParams, CoreBackupGetAsyncBackupProgressReturns } from './core/backup/get_async_backup_progress.webservice-client';
import type { CoreBackupGetAsyncBackupLinksBackupParams, CoreBackupGetAsyncBackupLinksBackupReturns } from './core/backup/get_async_backup_links_backup.webservice-client';
import type { CoreBackupGetAsyncBackupLinksRestoreParams, CoreBackupGetAsyncBackupLinksRestoreReturns } from './core/backup/get_async_backup_links_restore.webservice-client';
import type { CoreBackupGetCopyProgressParams, CoreBackupGetCopyProgressReturns } from './core/backup/get_copy_progress.webservice-client';
import type { CoreBackupSubmitCopyFormParams, CoreBackupSubmitCopyFormReturns } from './core/backup/submit_copy_form.webservice-client';
import type { CoreBadgesDisableBadgesParams, CoreBadgesDisableBadgesReturns } from './core/badges/disable_badges.webservice-client';
import type { CoreBadgesEnableBadgesParams, CoreBadgesEnableBadgesReturns } from './core/badges/enable_badges.webservice-client';
import type { CoreBadgesGetBadgeParams, CoreBadgesGetBadgeReturns } from './core/badges/get_badge.webservice-client';
import type { CoreBadgesGetUserBadgesParams, CoreBadgesGetUserBadgesReturns } from './core/badges/get_user_badges.webservice-client';
import type { CoreBadgesGetUserBadgeByHashParams, CoreBadgesGetUserBadgeByHashReturns } from './core/badges/get_user_badge_by_hash.webservice-client';
import type { CoreBlogGetEntriesParams, CoreBlogGetEntriesReturns } from './core/blog/get_entries.webservice-client';
import type { CoreBlogViewEntriesParams, CoreBlogViewEntriesReturns } from './core/blog/view_entries.webservice-client';
import type { CoreBlogGetAccessInformationParams, CoreBlogGetAccessInformationReturns } from './core/blog/get_access_information.webservice-client';
import type { CoreBlogAddEntryParams, CoreBlogAddEntryReturns } from './core/blog/add_entry.webservice-client';
import type { CoreBlogDeleteEntryParams, CoreBlogDeleteEntryReturns } from './core/blog/delete_entry.webservice-client';
import type { CoreBlogPrepareEntryForEditionParams, CoreBlogPrepareEntryForEditionReturns } from './core/blog/prepare_entry_for_edition.webservice-client';
import type { CoreBlogUpdateEntryParams, CoreBlogUpdateEntryReturns } from './core/blog/update_entry.webservice-client';
import type { CoreCalendarGetCalendarMonthlyViewParams, CoreCalendarGetCalendarMonthlyViewReturns } from './core/calendar/get_calendar_monthly_view.webservice-client';
import type { CoreCalendarGetCalendarDayViewParams, CoreCalendarGetCalendarDayViewReturns } from './core/calendar/get_calendar_day_view.webservice-client';
import type { CoreCalendarGetCalendarUpcomingViewParams, CoreCalendarGetCalendarUpcomingViewReturns } from './core/calendar/get_calendar_upcoming_view.webservice-client';
import type { CoreCalendarUpdateEventStartDayParams, CoreCalendarUpdateEventStartDayReturns } from './core/calendar/update_event_start_day.webservice-client';
import type { CoreCalendarCreateCalendarEventsParams, CoreCalendarCreateCalendarEventsReturns } from './core/calendar/create_calendar_events.webservice-client';
import type { CoreCalendarDeleteCalendarEventsParams, CoreCalendarDeleteCalendarEventsReturns } from './core/calendar/delete_calendar_events.webservice-client';
import type { CoreCalendarGetCalendarEventsParams, CoreCalendarGetCalendarEventsReturns } from './core/calendar/get_calendar_events.webservice-client';
import type { CoreCalendarGetActionEventsByTimesortParams, CoreCalendarGetActionEventsByTimesortReturns } from './core/calendar/get_action_events_by_timesort.webservice-client';
import type { CoreCalendarGetActionEventsByCourseParams, CoreCalendarGetActionEventsByCourseReturns } from './core/calendar/get_action_events_by_course.webservice-client';
import type { CoreCalendarGetActionEventsByCoursesParams, CoreCalendarGetActionEventsByCoursesReturns } from './core/calendar/get_action_events_by_courses.webservice-client';
import type { CoreCalendarGetCalendarEventByIdParams, CoreCalendarGetCalendarEventByIdReturns } from './core/calendar/get_calendar_event_by_id.webservice-client';
import type { CoreCalendarSubmitCreateUpdateFormParams, CoreCalendarSubmitCreateUpdateFormReturns } from './core/calendar/submit_create_update_form.webservice-client';
import type { CoreCalendarGetCalendarAccessInformationParams, CoreCalendarGetCalendarAccessInformationReturns } from './core/calendar/get_calendar_access_information.webservice-client';
import type { CoreCalendarGetAllowedEventTypesParams, CoreCalendarGetAllowedEventTypesReturns } from './core/calendar/get_allowed_event_types.webservice-client';
import type { CoreCalendarGetTimestampsParams, CoreCalendarGetTimestampsReturns } from './core/calendar/get_timestamps.webservice-client';
import type { CoreCalendarGetCalendarExportTokenParams, CoreCalendarGetCalendarExportTokenReturns } from './core/calendar/get_calendar_export_token.webservice-client';
import type { CoreCalendarDeleteSubscriptionParams, CoreCalendarDeleteSubscriptionReturns } from './core/calendar/delete_subscription.webservice-client';
import type { CoreCheckGetResultAdmintreeParams, CoreCheckGetResultAdmintreeReturns } from './core/check/get_result_admintree.webservice-client';
import type { CoreCohortAddCohortMembersParams, CoreCohortAddCohortMembersReturns } from './core/cohort/add_cohort_members.webservice-client';
import type { CoreCohortCreateCohortsParams, CoreCohortCreateCohortsReturns } from './core/cohort/create_cohorts.webservice-client';
import type { CoreCohortDeleteCohortMembersParams, CoreCohortDeleteCohortMembersReturns } from './core/cohort/delete_cohort_members.webservice-client';
import type { CoreCohortDeleteCohortsParams, CoreCohortDeleteCohortsReturns } from './core/cohort/delete_cohorts.webservice-client';
import type { CoreCohortGetCohortMembersParams, CoreCohortGetCohortMembersReturns } from './core/cohort/get_cohort_members.webservice-client';
import type { CoreCohortSearchCohortsParams, CoreCohortSearchCohortsReturns } from './core/cohort/search_cohorts.webservice-client';
import type { CoreCohortGetCohortsParams, CoreCohortGetCohortsReturns } from './core/cohort/get_cohorts.webservice-client';
import type { CoreCohortUpdateCohortsParams, CoreCohortUpdateCohortsReturns } from './core/cohort/update_cohorts.webservice-client';
import type { CoreCommentGetCommentsParams, CoreCommentGetCommentsReturns } from './core/comment/get_comments.webservice-client';
import type { CoreCommentAddCommentsParams, CoreCommentAddCommentsReturns } from './core/comment/add_comments.webservice-client';
import type { CoreCommentDeleteCommentsParams, CoreCommentDeleteCommentsReturns } from './core/comment/delete_comments.webservice-client';
import type { CoreCompletionGetActivitiesCompletionStatusParams, CoreCompletionGetActivitiesCompletionStatusReturns } from './core/completion/get_activities_completion_status.webservice-client';
import type { CoreCompletionGetCourseCompletionStatusParams, CoreCompletionGetCourseCompletionStatusReturns } from './core/completion/get_course_completion_status.webservice-client';
import type { CoreCompletionMarkCourseSelfCompletedParams, CoreCompletionMarkCourseSelfCompletedReturns } from './core/completion/mark_course_self_completed.webservice-client';
import type { CoreCompletionUpdateActivityCompletionStatusManuallyParams, CoreCompletionUpdateActivityCompletionStatusManuallyReturns } from './core/completion/update_activity_completion_status_manually.webservice-client';
import type { CoreCompletionOverrideActivityCompletionStatusParams, CoreCompletionOverrideActivityCompletionStatusReturns } from './core/completion/override_activity_completion_status.webservice-client';
import type { CoreCourseCreateCategoriesParams, CoreCourseCreateCategoriesReturns } from './core/course/create_categories.webservice-client';
import type { CoreCourseCreateCoursesParams, CoreCourseCreateCoursesReturns } from './core/course/create_courses.webservice-client';
import type { CoreCourseDeleteCategoriesParams, CoreCourseDeleteCategoriesReturns } from './core/course/delete_categories.webservice-client';
import type { CoreCourseDeleteCoursesParams, CoreCourseDeleteCoursesReturns } from './core/course/delete_courses.webservice-client';
import type { CoreCourseDeleteModulesParams, CoreCourseDeleteModulesReturns } from './core/course/delete_modules.webservice-client';
import type { CoreCourseDuplicateCourseParams, CoreCourseDuplicateCourseReturns } from './core/course/duplicate_course.webservice-client';
import type { CoreCourseGetCategoriesParams, CoreCourseGetCategoriesReturns } from './core/course/get_categories.webservice-client';
import type { CoreCourseGetContentsParams, CoreCourseGetContentsReturns } from './core/course/get_contents.webservice-client';
import type { CoreCourseGetCourseModuleParams, CoreCourseGetCourseModuleReturns } from './core/course/get_course_module.webservice-client';
import type { CoreCourseGetCourseModuleByInstanceParams, CoreCourseGetCourseModuleByInstanceReturns } from './core/course/get_course_module_by_instance.webservice-client';
import type { CoreCourseGetModuleParams, CoreCourseGetModuleReturns } from './core/course/get_module.webservice-client';
import type { CoreCourseformatFileHandlersParams, CoreCourseformatFileHandlersReturns } from './core/courseformat/file_handlers.webservice-client';
import type { CoreCourseformatGetStateParams, CoreCourseformatGetStateReturns } from './core/courseformat/get_state.webservice-client';
import type { CoreCourseformatUpdateCourseParams, CoreCourseformatUpdateCourseReturns } from './core/courseformat/update_course.webservice-client';
import type { CoreCourseformatCreateModuleParams, CoreCourseformatCreateModuleReturns } from './core/courseformat/create_module.webservice-client';
import type { CoreCourseEditModuleParams, CoreCourseEditModuleReturns } from './core/course/edit_module.webservice-client';
import type { CoreCourseEditSectionParams, CoreCourseEditSectionReturns } from './core/course/edit_section.webservice-client';
import type { CoreCourseGetCoursesParams, CoreCourseGetCoursesReturns } from './core/course/get_courses.webservice-client';
import type { CoreCourseImportCourseParams, CoreCourseImportCourseReturns } from './core/course/import_course.webservice-client';
import type { CoreCourseSearchCoursesParams, CoreCourseSearchCoursesReturns } from './core/course/search_courses.webservice-client';
import type { CoreCourseUpdateCategoriesParams, CoreCourseUpdateCategoriesReturns } from './core/course/update_categories.webservice-client';
import type { CoreCourseUpdateCoursesParams, CoreCourseUpdateCoursesReturns } from './core/course/update_courses.webservice-client';
import type { CoreCourseViewCourseParams, CoreCourseViewCourseReturns } from './core/course/view_course.webservice-client';
import type { CoreCourseGetUserNavigationOptionsParams, CoreCourseGetUserNavigationOptionsReturns } from './core/course/get_user_navigation_options.webservice-client';
import type { CoreCourseGetUserAdministrationOptionsParams, CoreCourseGetUserAdministrationOptionsReturns } from './core/course/get_user_administration_options.webservice-client';
import type { CoreCourseGetCoursesByFieldParams, CoreCourseGetCoursesByFieldReturns } from './core/course/get_courses_by_field.webservice-client';
import type { CoreCourseCheckUpdatesParams, CoreCourseCheckUpdatesReturns } from './core/course/check_updates.webservice-client';
import type { CoreCourseGetUpdatesSinceParams, CoreCourseGetUpdatesSinceReturns } from './core/course/get_updates_since.webservice-client';
import type { CoreCourseGetEnrolledCoursesByTimelineClassificationParams, CoreCourseGetEnrolledCoursesByTimelineClassificationReturns } from './core/course/get_enrolled_courses_by_timeline_classification.webservice-client';
import type { CoreCourseGetEnrolledCoursesWithActionEventsByTimelineClassificationParams, CoreCourseGetEnrolledCoursesWithActionEventsByTimelineClassificationReturns } from './core/course/get_enrolled_courses_with_action_events_by_timeline_classification.webservice-client';
import type { CoreCourseGetRecentCoursesParams, CoreCourseGetRecentCoursesReturns } from './core/course/get_recent_courses.webservice-client';
import type { CoreCourseSetFavouriteCoursesParams, CoreCourseSetFavouriteCoursesReturns } from './core/course/set_favourite_courses.webservice-client';
import type { CoreCourseGetEnrolledUsersByCmidParams, CoreCourseGetEnrolledUsersByCmidReturns } from './core/course/get_enrolled_users_by_cmid.webservice-client';
import type { CoreCourseAddContentItemToUserFavouritesParams, CoreCourseAddContentItemToUserFavouritesReturns } from './core/course/add_content_item_to_user_favourites.webservice-client';
import type { CoreCourseRemoveContentItemFromUserFavouritesParams, CoreCourseRemoveContentItemFromUserFavouritesReturns } from './core/course/remove_content_item_from_user_favourites.webservice-client';
import type { CoreCourseGetCourseContentItemsParams, CoreCourseGetCourseContentItemsReturns } from './core/course/get_course_content_items.webservice-client';
import type { CoreCourseGetActivityChooserFooterParams, CoreCourseGetActivityChooserFooterReturns } from './core/course/get_activity_chooser_footer.webservice-client';
import type { CoreCourseToggleActivityRecommendationParams, CoreCourseToggleActivityRecommendationReturns } from './core/course/toggle_activity_recommendation.webservice-client';
import type { CoreEnrolGetCourseEnrolmentMethodsParams, CoreEnrolGetCourseEnrolmentMethodsReturns } from './core/enrol/get_course_enrolment_methods.webservice-client';
import type { CoreEnrolGetEnrolledUsersParams, CoreEnrolGetEnrolledUsersReturns } from './core/enrol/get_enrolled_users.webservice-client';
import type { CoreEnrolGetEnrolledUsersWithCapabilityParams, CoreEnrolGetEnrolledUsersWithCapabilityReturns } from './core/enrol/get_enrolled_users_with_capability.webservice-client';
import type { CoreEnrolGetPotentialUsersParams, CoreEnrolGetPotentialUsersReturns } from './core/enrol/get_potential_users.webservice-client';
import type { CoreEnrolSearchUsersParams, CoreEnrolSearchUsersReturns } from './core/enrol/search_users.webservice-client';
import type { CoreEnrolGetUsersCoursesParams, CoreEnrolGetUsersCoursesReturns } from './core/enrol/get_users_courses.webservice-client';
import type { CoreEnrolSubmitUserEnrolmentFormParams, CoreEnrolSubmitUserEnrolmentFormReturns } from './core/enrol/submit_user_enrolment_form.webservice-client';
import type { CoreEnrolUnenrolUserEnrolmentParams, CoreEnrolUnenrolUserEnrolmentReturns } from './core/enrol/unenrol_user_enrolment.webservice-client';
import type { CoreFetchNotificationsParams, CoreFetchNotificationsReturns } from './core/fetch/notifications.webservice-client';
import type { CoreSessionTouchParams, CoreSessionTouchReturns } from './core/session/touch.webservice-client';
import type { CoreSessionTimeRemainingParams, CoreSessionTimeRemainingReturns } from './core/session/time_remaining.webservice-client';
import type { CoreFilesGetFilesParams, CoreFilesGetFilesReturns } from './core/files/get_files.webservice-client';
import type { CoreFilesUploadParams, CoreFilesUploadReturns } from './core/files/upload.webservice-client';
import type { CoreFilesDeleteDraftFilesParams, CoreFilesDeleteDraftFilesReturns } from './core/files/delete_draft_files.webservice-client';
import type { CoreFilesGetUnusedDraftItemidParams, CoreFilesGetUnusedDraftItemidReturns } from './core/files/get_unused_draft_itemid.webservice-client';
import type { CoreFormGetFiletypesBrowserDataParams, CoreFormGetFiletypesBrowserDataReturns } from './core/form/get_filetypes_browser_data.webservice-client';
import type { CoreFormDynamicFormParams, CoreFormDynamicFormReturns } from './core/form/dynamic_form.webservice-client';
import type { CoreGetComponentStringsParams, CoreGetComponentStringsReturns } from './core/get/component_strings.webservice-client';
import type { CoreGetFragmentParams, CoreGetFragmentReturns } from './core/get/fragment.webservice-client';
import type { CoreGetStringParams, CoreGetStringReturns } from './core/get/string.webservice-client';
import type { CoreGetStringsParams, CoreGetStringsReturns } from './core/get/strings.webservice-client';
import type { CoreGetUserDatesParams, CoreGetUserDatesReturns } from './core/get/user_dates.webservice-client';
import type { CoreGradesUpdateGradesParams, CoreGradesUpdateGradesReturns } from './core/grades/update_grades.webservice-client';
import type { CoreGradesGraderGradingpanelPointFetchParams, CoreGradesGraderGradingpanelPointFetchReturns } from './core/grades/grader_gradingpanel_point_fetch.webservice-client';
import type { CoreGradesGraderGradingpanelPointStoreParams, CoreGradesGraderGradingpanelPointStoreReturns } from './core/grades/grader_gradingpanel_point_store.webservice-client';
import type { CoreGradesGraderGradingpanelScaleFetchParams, CoreGradesGraderGradingpanelScaleFetchReturns } from './core/grades/grader_gradingpanel_scale_fetch.webservice-client';
import type { CoreGradesGraderGradingpanelScaleStoreParams, CoreGradesGraderGradingpanelScaleStoreReturns } from './core/grades/grader_gradingpanel_scale_store.webservice-client';
import type { CoreGradesCreateGradecategoriesParams, CoreGradesCreateGradecategoriesReturns } from './core/grades/create_gradecategories.webservice-client';
import type { CoreGradesGetEnrolledUsersForSearchWidgetParams, CoreGradesGetEnrolledUsersForSearchWidgetReturns } from './core/grades/get_enrolled_users_for_search_widget.webservice-client';
import type { CoreGradesGetEnrolledUsersForSelectorParams, CoreGradesGetEnrolledUsersForSelectorReturns } from './core/grades/get_enrolled_users_for_selector.webservice-client';
import type { CoreGradesGetGroupsForSearchWidgetParams, CoreGradesGetGroupsForSearchWidgetReturns } from './core/grades/get_groups_for_search_widget.webservice-client';
import type { CoreGradesGetGroupsForSelectorParams, CoreGradesGetGroupsForSelectorReturns } from './core/grades/get_groups_for_selector.webservice-client';
import type { CoreGradesGetFeedbackParams, CoreGradesGetFeedbackReturns } from './core/grades/get_feedback.webservice-client';
import type { CoreGradesGetGradeitemsParams, CoreGradesGetGradeitemsReturns } from './core/grades/get_gradeitems.webservice-client';
import type { CoreGradesGetGradeTreeParams, CoreGradesGetGradeTreeReturns } from './core/grades/get_grade_tree.webservice-client';
import type { CoreGradesGetGradableUsersParams, CoreGradesGetGradableUsersReturns } from './core/grades/get_gradable_users.webservice-client';
import type { CoreGradingGetDefinitionsParams, CoreGradingGetDefinitionsReturns } from './core/grading/get_definitions.webservice-client';
import type { CoreGradingGetGradingformInstancesParams, CoreGradingGetGradingformInstancesReturns } from './core/grading/get_gradingform_instances.webservice-client';
import type { CoreGradingSaveDefinitionsParams, CoreGradingSaveDefinitionsReturns } from './core/grading/save_definitions.webservice-client';
import type { CoreGroupAddGroupMembersParams, CoreGroupAddGroupMembersReturns } from './core/group/add_group_members.webservice-client';
import type { CoreGroupAssignGroupingParams, CoreGroupAssignGroupingReturns } from './core/group/assign_grouping.webservice-client';
import type { CoreGroupCreateGroupingsParams, CoreGroupCreateGroupingsReturns } from './core/group/create_groupings.webservice-client';
import type { CoreGroupCreateGroupsParams, CoreGroupCreateGroupsReturns } from './core/group/create_groups.webservice-client';
import type { CoreGroupDeleteGroupMembersParams, CoreGroupDeleteGroupMembersReturns } from './core/group/delete_group_members.webservice-client';
import type { CoreGroupDeleteGroupingsParams, CoreGroupDeleteGroupingsReturns } from './core/group/delete_groupings.webservice-client';
import type { CoreGroupDeleteGroupsParams, CoreGroupDeleteGroupsReturns } from './core/group/delete_groups.webservice-client';
import type { CoreGroupGetActivityAllowedGroupsParams, CoreGroupGetActivityAllowedGroupsReturns } from './core/group/get_activity_allowed_groups.webservice-client';
import type { CoreGroupGetActivityGroupmodeParams, CoreGroupGetActivityGroupmodeReturns } from './core/group/get_activity_groupmode.webservice-client';
import type { CoreGroupGetCourseGroupingsParams, CoreGroupGetCourseGroupingsReturns } from './core/group/get_course_groupings.webservice-client';
import type { CoreGroupGetCourseGroupsParams, CoreGroupGetCourseGroupsReturns } from './core/group/get_course_groups.webservice-client';
import type { CoreGroupGetCourseUserGroupsParams, CoreGroupGetCourseUserGroupsReturns } from './core/group/get_course_user_groups.webservice-client';
import type { CoreGroupGetGroupMembersParams, CoreGroupGetGroupMembersReturns } from './core/group/get_group_members.webservice-client';
import type { CoreGroupGetGroupingsParams, CoreGroupGetGroupingsReturns } from './core/group/get_groupings.webservice-client';
import type { CoreGroupGetGroupsParams, CoreGroupGetGroupsReturns } from './core/group/get_groups.webservice-client';
import type { CoreGroupGetGroupsForSelectorParams, CoreGroupGetGroupsForSelectorReturns } from './core/group/get_groups_for_selector.webservice-client';
import type { CoreGroupUnassignGroupingParams, CoreGroupUnassignGroupingReturns } from './core/group/unassign_grouping.webservice-client';
import type { CoreGroupUpdateGroupingsParams, CoreGroupUpdateGroupingsReturns } from './core/group/update_groupings.webservice-client';
import type { CoreGroupUpdateGroupsParams, CoreGroupUpdateGroupsReturns } from './core/group/update_groups.webservice-client';
import type { CoreMessageMuteConversationsParams, CoreMessageMuteConversationsReturns } from './core/message/mute_conversations.webservice-client';
import type { CoreMessageUnmuteConversationsParams, CoreMessageUnmuteConversationsReturns } from './core/message/unmute_conversations.webservice-client';
import type { CoreMessageBlockUserParams, CoreMessageBlockUserReturns } from './core/message/block_user.webservice-client';
import type { CoreMessageGetContactRequestsParams, CoreMessageGetContactRequestsReturns } from './core/message/get_contact_requests.webservice-client';
import type { CoreMessageCreateContactRequestParams, CoreMessageCreateContactRequestReturns } from './core/message/create_contact_request.webservice-client';
import type { CoreMessageConfirmContactRequestParams, CoreMessageConfirmContactRequestReturns } from './core/message/confirm_contact_request.webservice-client';
import type { CoreMessageDeclineContactRequestParams, CoreMessageDeclineContactRequestReturns } from './core/message/decline_contact_request.webservice-client';
import type { CoreMessageGetReceivedContactRequestsCountParams, CoreMessageGetReceivedContactRequestsCountReturns } from './core/message/get_received_contact_requests_count.webservice-client';
import type { CoreMessageDeleteContactsParams, CoreMessageDeleteContactsReturns } from './core/message/delete_contacts.webservice-client';
import type { CoreMessageDeleteConversationsByIdParams, CoreMessageDeleteConversationsByIdReturns } from './core/message/delete_conversations_by_id.webservice-client';
import type { CoreMessageDeleteMessageParams, CoreMessageDeleteMessageReturns } from './core/message/delete_message.webservice-client';
import type { CoreMessageGetBlockedUsersParams, CoreMessageGetBlockedUsersReturns } from './core/message/get_blocked_users.webservice-client';
import type { CoreMessageDataForMessageareaSearchMessagesParams, CoreMessageDataForMessageareaSearchMessagesReturns } from './core/message/data_for_messagearea_search_messages.webservice-client';
import type { CoreMessageMessageSearchUsersParams, CoreMessageMessageSearchUsersReturns } from './core/message/message_search_users.webservice-client';
import type { CoreMessageGetUserContactsParams, CoreMessageGetUserContactsReturns } from './core/message/get_user_contacts.webservice-client';
import type { CoreMessageGetConversationsParams, CoreMessageGetConversationsReturns } from './core/message/get_conversations.webservice-client';
import type { CoreMessageGetConversationParams, CoreMessageGetConversationReturns } from './core/message/get_conversation.webservice-client';
import type { CoreMessageGetConversationBetweenUsersParams, CoreMessageGetConversationBetweenUsersReturns } from './core/message/get_conversation_between_users.webservice-client';
import type { CoreMessageGetSelfConversationParams, CoreMessageGetSelfConversationReturns } from './core/message/get_self_conversation.webservice-client';
import type { CoreMessageGetMessagesParams, CoreMessageGetMessagesReturns } from './core/message/get_messages.webservice-client';
import type { CoreMessageGetConversationCountsParams, CoreMessageGetConversationCountsReturns } from './core/message/get_conversation_counts.webservice-client';
import type { CoreMessageGetUnreadConversationCountsParams, CoreMessageGetUnreadConversationCountsReturns } from './core/message/get_unread_conversation_counts.webservice-client';
import type { CoreMessageGetConversationMembersParams, CoreMessageGetConversationMembersReturns } from './core/message/get_conversation_members.webservice-client';
import type { CoreMessageGetMemberInfoParams, CoreMessageGetMemberInfoReturns } from './core/message/get_member_info.webservice-client';
import type { CoreMessageGetUnreadConversationsCountParams, CoreMessageGetUnreadConversationsCountReturns } from './core/message/get_unread_conversations_count.webservice-client';
import type { CoreMessageMarkAllNotificationsAsReadParams, CoreMessageMarkAllNotificationsAsReadReturns } from './core/message/mark_all_notifications_as_read.webservice-client';
import type { CoreMessageMarkAllConversationMessagesAsReadParams, CoreMessageMarkAllConversationMessagesAsReadReturns } from './core/message/mark_all_conversation_messages_as_read.webservice-client';
import type { CoreMessageMarkMessageReadParams, CoreMessageMarkMessageReadReturns } from './core/message/mark_message_read.webservice-client';
import type { CoreMessageMarkNotificationReadParams, CoreMessageMarkNotificationReadReturns } from './core/message/mark_notification_read.webservice-client';
import type { CoreMessageMessageProcessorConfigFormParams, CoreMessageMessageProcessorConfigFormReturns } from './core/message/message_processor_config_form.webservice-client';
import type { CoreMessageGetMessageProcessorParams, CoreMessageGetMessageProcessorReturns } from './core/message/get_message_processor.webservice-client';
import type { CoreMessageSearchContactsParams, CoreMessageSearchContactsReturns } from './core/message/search_contacts.webservice-client';
import type { CoreMessageSendInstantMessagesParams, CoreMessageSendInstantMessagesReturns } from './core/message/send_instant_messages.webservice-client';
import type { CoreMessageSendMessagesToConversationParams, CoreMessageSendMessagesToConversationReturns } from './core/message/send_messages_to_conversation.webservice-client';
import type { CoreMessageGetConversationMessagesParams, CoreMessageGetConversationMessagesReturns } from './core/message/get_conversation_messages.webservice-client';
import type { CoreMessageUnblockUserParams, CoreMessageUnblockUserReturns } from './core/message/unblock_user.webservice-client';
import type { CoreMessageGetUserNotificationPreferencesParams, CoreMessageGetUserNotificationPreferencesReturns } from './core/message/get_user_notification_preferences.webservice-client';
import type { CoreMessageGetUserMessagePreferencesParams, CoreMessageGetUserMessagePreferencesReturns } from './core/message/get_user_message_preferences.webservice-client';
import type { CoreMessageSetFavouriteConversationsParams, CoreMessageSetFavouriteConversationsReturns } from './core/message/set_favourite_conversations.webservice-client';
import type { CoreMessageUnsetFavouriteConversationsParams, CoreMessageUnsetFavouriteConversationsReturns } from './core/message/unset_favourite_conversations.webservice-client';
import type { CoreMessageDeleteMessageForAllUsersParams, CoreMessageDeleteMessageForAllUsersReturns } from './core/message/delete_message_for_all_users.webservice-client';
import type { CoreMessageGetUnreadNotificationCountParams, CoreMessageGetUnreadNotificationCountReturns } from './core/message/get_unread_notification_count.webservice-client';
import type { CoreMyViewPageParams, CoreMyViewPageReturns } from './core/my/view_page.webservice-client';
import type { CoreNotesCreateNotesParams, CoreNotesCreateNotesReturns } from './core/notes/create_notes.webservice-client';
import type { CoreNotesDeleteNotesParams, CoreNotesDeleteNotesReturns } from './core/notes/delete_notes.webservice-client';
import type { CoreNotesGetCourseNotesParams, CoreNotesGetCourseNotesReturns } from './core/notes/get_course_notes.webservice-client';
import type { CoreNotesGetNotesParams, CoreNotesGetNotesReturns } from './core/notes/get_notes.webservice-client';
import type { CoreNotesUpdateNotesParams, CoreNotesUpdateNotesReturns } from './core/notes/update_notes.webservice-client';
import type { CoreNotesViewNotesParams, CoreNotesViewNotesReturns } from './core/notes/view_notes.webservice-client';
import type { CoreOutputLoadTemplateParams, CoreOutputLoadTemplateReturns } from './core/output/load_template.webservice-client';
import type { CoreOutputLoadTemplateWithDependenciesParams, CoreOutputLoadTemplateWithDependenciesReturns } from './core/output/load_template_with_dependencies.webservice-client';
import type { CoreOutputLoadFontawesomeIconMapParams, CoreOutputLoadFontawesomeIconMapReturns } from './core/output/load_fontawesome_icon_map.webservice-client';
import type { CoreOutputLoadFontawesomeIconSystemMapParams, CoreOutputLoadFontawesomeIconSystemMapReturns } from './core/output/load_fontawesome_icon_system_map.webservice-client';
import type { CoreQuestionUpdateFlagParams, CoreQuestionUpdateFlagReturns } from './core/question/update_flag.webservice-client';
import type { CoreQuestionGetRandomQuestionSummariesParams, CoreQuestionGetRandomQuestionSummariesReturns } from './core/question/get_random_question_summaries.webservice-client';
import type { CoreRatingGetItemRatingsParams, CoreRatingGetItemRatingsReturns } from './core/rating/get_item_ratings.webservice-client';
import type { CoreRatingAddRatingParams, CoreRatingAddRatingReturns } from './core/rating/add_rating.webservice-client';
import type { CoreRoleAssignRolesParams, CoreRoleAssignRolesReturns } from './core/role/assign_roles.webservice-client';
import type { CoreRoleUnassignRolesParams, CoreRoleUnassignRolesReturns } from './core/role/unassign_roles.webservice-client';
import type { CoreSearchGetRelevantUsersParams, CoreSearchGetRelevantUsersReturns } from './core/search/get_relevant_users.webservice-client';
import type { CoreSearchGetResultsParams, CoreSearchGetResultsReturns } from './core/search/get_results.webservice-client';
import type { CoreSearchGetSearchAreasListParams, CoreSearchGetSearchAreasListReturns } from './core/search/get_search_areas_list.webservice-client';
import type { CoreSearchViewResultsParams, CoreSearchViewResultsReturns } from './core/search/view_results.webservice-client';
import type { CoreSearchGetTopResultsParams, CoreSearchGetTopResultsReturns } from './core/search/get_top_results.webservice-client';
import type { CoreTagGetTagindexParams, CoreTagGetTagindexReturns } from './core/tag/get_tagindex.webservice-client';
import type { CoreTagGetTagsParams, CoreTagGetTagsReturns } from './core/tag/get_tags.webservice-client';
import type { CoreTagUpdateTagsParams, CoreTagUpdateTagsReturns } from './core/tag/update_tags.webservice-client';
import type { CoreTagGetTagindexPerAreaParams, CoreTagGetTagindexPerAreaReturns } from './core/tag/get_tagindex_per_area.webservice-client';
import type { CoreTagGetTagAreasParams, CoreTagGetTagAreasReturns } from './core/tag/get_tag_areas.webservice-client';
import type { CoreTagGetTagCollectionsParams, CoreTagGetTagCollectionsReturns } from './core/tag/get_tag_collections.webservice-client';
import type { CoreTagGetTagCloudParams, CoreTagGetTagCloudReturns } from './core/tag/get_tag_cloud.webservice-client';
import type { CoreUpdateInplaceEditableParams, CoreUpdateInplaceEditableReturns } from './core/update/inplace_editable.webservice-client';
import type { CoreUserAddUserDeviceParams, CoreUserAddUserDeviceReturns } from './core/user/add_user_device.webservice-client';
import type { CoreUserUpdateUserDevicePublicKeyParams, CoreUserUpdateUserDevicePublicKeyReturns } from './core/user/update_user_device_public_key.webservice-client';
import type { CoreUserAddUserPrivateFilesParams, CoreUserAddUserPrivateFilesReturns } from './core/user/add_user_private_files.webservice-client';
import type { CoreUserCreateUsersParams, CoreUserCreateUsersReturns } from './core/user/create_users.webservice-client';
import type { CoreUserDeleteUsersParams, CoreUserDeleteUsersReturns } from './core/user/delete_users.webservice-client';
import type { CoreUserGetCourseUserProfilesParams, CoreUserGetCourseUserProfilesReturns } from './core/user/get_course_user_profiles.webservice-client';
import type { CoreUserGetUsersParams, CoreUserGetUsersReturns } from './core/user/get_users.webservice-client';
import type { CoreUserGetUsersByFieldParams, CoreUserGetUsersByFieldReturns } from './core/user/get_users_by_field.webservice-client';
import type { CoreUserSearchIdentityParams, CoreUserSearchIdentityReturns } from './core/user/search_identity.webservice-client';
import type { CoreUserRemoveUserDeviceParams, CoreUserRemoveUserDeviceReturns } from './core/user/remove_user_device.webservice-client';
import type { CoreUserUpdateUsersParams, CoreUserUpdateUsersReturns } from './core/user/update_users.webservice-client';
import type { CoreUserUpdateUserPreferencesParams, CoreUserUpdateUserPreferencesReturns } from './core/user/update_user_preferences.webservice-client';
import type { CoreUserViewUserListParams, CoreUserViewUserListReturns } from './core/user/view_user_list.webservice-client';
import type { CoreUserViewUserProfileParams, CoreUserViewUserProfileReturns } from './core/user/view_user_profile.webservice-client';
import type { CoreUserGetUserPreferencesParams, CoreUserGetUserPreferencesReturns } from './core/user/get_user_preferences.webservice-client';
import type { CoreUserUpdatePictureParams, CoreUserUpdatePictureReturns } from './core/user/update_picture.webservice-client';
import type { CoreUserSetUserPreferencesParams, CoreUserSetUserPreferencesReturns } from './core/user/set_user_preferences.webservice-client';
import type { CoreUserAgreeSitePolicyParams, CoreUserAgreeSitePolicyReturns } from './core/user/agree_site_policy.webservice-client';
import type { CoreUserGetPrivateFilesInfoParams, CoreUserGetPrivateFilesInfoReturns } from './core/user/get_private_files_info.webservice-client';
import type { CoreUserPreparePrivateFilesForEditionParams, CoreUserPreparePrivateFilesForEditionReturns } from './core/user/prepare_private_files_for_edition.webservice-client';
import type { CoreUserUpdatePrivateFilesParams, CoreUserUpdatePrivateFilesReturns } from './core/user/update_private_files.webservice-client';
import type { CoreCompetencyCreateCompetencyFrameworkParams, CoreCompetencyCreateCompetencyFrameworkReturns } from './core/competency/create_competency_framework.webservice-client';
import type { CoreCompetencyReadCompetencyFrameworkParams, CoreCompetencyReadCompetencyFrameworkReturns } from './core/competency/read_competency_framework.webservice-client';
import type { CoreCompetencyDuplicateCompetencyFrameworkParams, CoreCompetencyDuplicateCompetencyFrameworkReturns } from './core/competency/duplicate_competency_framework.webservice-client';
import type { CoreCompetencyDeleteCompetencyFrameworkParams, CoreCompetencyDeleteCompetencyFrameworkReturns } from './core/competency/delete_competency_framework.webservice-client';
import type { CoreCompetencyUpdateCompetencyFrameworkParams, CoreCompetencyUpdateCompetencyFrameworkReturns } from './core/competency/update_competency_framework.webservice-client';
import type { CoreCompetencyListCompetencyFrameworksParams, CoreCompetencyListCompetencyFrameworksReturns } from './core/competency/list_competency_frameworks.webservice-client';
import type { CoreCompetencyCountCompetencyFrameworksParams, CoreCompetencyCountCompetencyFrameworksReturns } from './core/competency/count_competency_frameworks.webservice-client';
import type { CoreCompetencyCompetencyFrameworkViewedParams, CoreCompetencyCompetencyFrameworkViewedReturns } from './core/competency/competency_framework_viewed.webservice-client';
import type { CoreCompetencyCreateCompetencyParams, CoreCompetencyCreateCompetencyReturns } from './core/competency/create_competency.webservice-client';
import type { CoreCompetencyReadCompetencyParams, CoreCompetencyReadCompetencyReturns } from './core/competency/read_competency.webservice-client';
import type { CoreCompetencyCompetencyViewedParams, CoreCompetencyCompetencyViewedReturns } from './core/competency/competency_viewed.webservice-client';
import type { CoreCompetencyDeleteCompetencyParams, CoreCompetencyDeleteCompetencyReturns } from './core/competency/delete_competency.webservice-client';
import type { CoreCompetencyUpdateCompetencyParams, CoreCompetencyUpdateCompetencyReturns } from './core/competency/update_competency.webservice-client';
import type { CoreCompetencyListCompetenciesParams, CoreCompetencyListCompetenciesReturns } from './core/competency/list_competencies.webservice-client';
import type { CoreCompetencyListCompetenciesInTemplateParams, CoreCompetencyListCompetenciesInTemplateReturns } from './core/competency/list_competencies_in_template.webservice-client';
import type { CoreCompetencyCountCompetenciesParams, CoreCompetencyCountCompetenciesReturns } from './core/competency/count_competencies.webservice-client';
import type { CoreCompetencyCountCompetenciesInTemplateParams, CoreCompetencyCountCompetenciesInTemplateReturns } from './core/competency/count_competencies_in_template.webservice-client';
import type { CoreCompetencySearchCompetenciesParams, CoreCompetencySearchCompetenciesReturns } from './core/competency/search_competencies.webservice-client';
import type { CoreCompetencySetParentCompetencyParams, CoreCompetencySetParentCompetencyReturns } from './core/competency/set_parent_competency.webservice-client';
import type { CoreCompetencyMoveUpCompetencyParams, CoreCompetencyMoveUpCompetencyReturns } from './core/competency/move_up_competency.webservice-client';
import type { CoreCompetencyMoveDownCompetencyParams, CoreCompetencyMoveDownCompetencyReturns } from './core/competency/move_down_competency.webservice-client';
import type { CoreCompetencyListCourseModuleCompetenciesParams, CoreCompetencyListCourseModuleCompetenciesReturns } from './core/competency/list_course_module_competencies.webservice-client';
import type { CoreCompetencyCountCourseModuleCompetenciesParams, CoreCompetencyCountCourseModuleCompetenciesReturns } from './core/competency/count_course_module_competencies.webservice-client';
import type { CoreCompetencyListCourseCompetenciesParams, CoreCompetencyListCourseCompetenciesReturns } from './core/competency/list_course_competencies.webservice-client';
import type { CoreCompetencyCountCompetenciesInCourseParams, CoreCompetencyCountCompetenciesInCourseReturns } from './core/competency/count_competencies_in_course.webservice-client';
import type { CoreCompetencyCountCoursesUsingCompetencyParams, CoreCompetencyCountCoursesUsingCompetencyReturns } from './core/competency/count_courses_using_competency.webservice-client';
import type { CoreCompetencyAddCompetencyToCourseParams, CoreCompetencyAddCompetencyToCourseReturns } from './core/competency/add_competency_to_course.webservice-client';
import type { CoreCompetencyAddCompetencyToTemplateParams, CoreCompetencyAddCompetencyToTemplateReturns } from './core/competency/add_competency_to_template.webservice-client';
import type { CoreCompetencyRemoveCompetencyFromCourseParams, CoreCompetencyRemoveCompetencyFromCourseReturns } from './core/competency/remove_competency_from_course.webservice-client';
import type { CoreCompetencySetCourseCompetencyRuleoutcomeParams, CoreCompetencySetCourseCompetencyRuleoutcomeReturns } from './core/competency/set_course_competency_ruleoutcome.webservice-client';
import type { CoreCompetencyRemoveCompetencyFromTemplateParams, CoreCompetencyRemoveCompetencyFromTemplateReturns } from './core/competency/remove_competency_from_template.webservice-client';
import type { CoreCompetencyReorderCourseCompetencyParams, CoreCompetencyReorderCourseCompetencyReturns } from './core/competency/reorder_course_competency.webservice-client';
import type { CoreCompetencyReorderTemplateCompetencyParams, CoreCompetencyReorderTemplateCompetencyReturns } from './core/competency/reorder_template_competency.webservice-client';
import type { CoreCompetencyCreateTemplateParams, CoreCompetencyCreateTemplateReturns } from './core/competency/create_template.webservice-client';
import type { CoreCompetencyDuplicateTemplateParams, CoreCompetencyDuplicateTemplateReturns } from './core/competency/duplicate_template.webservice-client';
import type { CoreCompetencyReadTemplateParams, CoreCompetencyReadTemplateReturns } from './core/competency/read_template.webservice-client';
import type { CoreCompetencyDeleteTemplateParams, CoreCompetencyDeleteTemplateReturns } from './core/competency/delete_template.webservice-client';
import type { CoreCompetencyUpdateTemplateParams, CoreCompetencyUpdateTemplateReturns } from './core/competency/update_template.webservice-client';
import type { CoreCompetencyListTemplatesParams, CoreCompetencyListTemplatesReturns } from './core/competency/list_templates.webservice-client';
import type { CoreCompetencyListTemplatesUsingCompetencyParams, CoreCompetencyListTemplatesUsingCompetencyReturns } from './core/competency/list_templates_using_competency.webservice-client';
import type { CoreCompetencyCountTemplatesParams, CoreCompetencyCountTemplatesReturns } from './core/competency/count_templates.webservice-client';
import type { CoreCompetencyCountTemplatesUsingCompetencyParams, CoreCompetencyCountTemplatesUsingCompetencyReturns } from './core/competency/count_templates_using_competency.webservice-client';
import type { CoreCompetencyCreatePlanParams, CoreCompetencyCreatePlanReturns } from './core/competency/create_plan.webservice-client';
import type { CoreCompetencyUpdatePlanParams, CoreCompetencyUpdatePlanReturns } from './core/competency/update_plan.webservice-client';
import type { CoreCompetencyCompletePlanParams, CoreCompetencyCompletePlanReturns } from './core/competency/complete_plan.webservice-client';
import type { CoreCompetencyReopenPlanParams, CoreCompetencyReopenPlanReturns } from './core/competency/reopen_plan.webservice-client';
import type { CoreCompetencyReadPlanParams, CoreCompetencyReadPlanReturns } from './core/competency/read_plan.webservice-client';
import type { CoreCompetencyDeletePlanParams, CoreCompetencyDeletePlanReturns } from './core/competency/delete_plan.webservice-client';
import type { CoreCompetencyListUserPlansParams, CoreCompetencyListUserPlansReturns } from './core/competency/list_user_plans.webservice-client';
import type { CoreCompetencyListPlanCompetenciesParams, CoreCompetencyListPlanCompetenciesReturns } from './core/competency/list_plan_competencies.webservice-client';
import type { CoreCompetencyAddCompetencyToPlanParams, CoreCompetencyAddCompetencyToPlanReturns } from './core/competency/add_competency_to_plan.webservice-client';
import type { CoreCompetencyRemoveCompetencyFromPlanParams, CoreCompetencyRemoveCompetencyFromPlanReturns } from './core/competency/remove_competency_from_plan.webservice-client';
import type { CoreCompetencyReorderPlanCompetencyParams, CoreCompetencyReorderPlanCompetencyReturns } from './core/competency/reorder_plan_competency.webservice-client';
import type { CoreCompetencyPlanRequestReviewParams, CoreCompetencyPlanRequestReviewReturns } from './core/competency/plan_request_review.webservice-client';
import type { CoreCompetencyPlanStartReviewParams, CoreCompetencyPlanStartReviewReturns } from './core/competency/plan_start_review.webservice-client';
import type { CoreCompetencyPlanStopReviewParams, CoreCompetencyPlanStopReviewReturns } from './core/competency/plan_stop_review.webservice-client';
import type { CoreCompetencyPlanCancelReviewRequestParams, CoreCompetencyPlanCancelReviewRequestReturns } from './core/competency/plan_cancel_review_request.webservice-client';
import type { CoreCompetencyApprovePlanParams, CoreCompetencyApprovePlanReturns } from './core/competency/approve_plan.webservice-client';
import type { CoreCompetencyUnapprovePlanParams, CoreCompetencyUnapprovePlanReturns } from './core/competency/unapprove_plan.webservice-client';
import type { CoreCompetencyTemplateHasRelatedDataParams, CoreCompetencyTemplateHasRelatedDataReturns } from './core/competency/template_has_related_data.webservice-client';
import type { CoreCompetencyGetScaleValuesParams, CoreCompetencyGetScaleValuesReturns } from './core/competency/get_scale_values.webservice-client';
import type { CoreCompetencyAddRelatedCompetencyParams, CoreCompetencyAddRelatedCompetencyReturns } from './core/competency/add_related_competency.webservice-client';
import type { CoreCompetencyRemoveRelatedCompetencyParams, CoreCompetencyRemoveRelatedCompetencyReturns } from './core/competency/remove_related_competency.webservice-client';
import type { CoreCompetencyReadUserEvidenceParams, CoreCompetencyReadUserEvidenceReturns } from './core/competency/read_user_evidence.webservice-client';
import type { CoreCompetencyDeleteUserEvidenceParams, CoreCompetencyDeleteUserEvidenceReturns } from './core/competency/delete_user_evidence.webservice-client';
import type { CoreCompetencyCreateUserEvidenceCompetencyParams, CoreCompetencyCreateUserEvidenceCompetencyReturns } from './core/competency/create_user_evidence_competency.webservice-client';
import type { CoreCompetencyDeleteUserEvidenceCompetencyParams, CoreCompetencyDeleteUserEvidenceCompetencyReturns } from './core/competency/delete_user_evidence_competency.webservice-client';
import type { CoreCompetencyUserCompetencyCancelReviewRequestParams, CoreCompetencyUserCompetencyCancelReviewRequestReturns } from './core/competency/user_competency_cancel_review_request.webservice-client';
import type { CoreCompetencyUserCompetencyRequestReviewParams, CoreCompetencyUserCompetencyRequestReviewReturns } from './core/competency/user_competency_request_review.webservice-client';
import type { CoreCompetencyUserCompetencyStartReviewParams, CoreCompetencyUserCompetencyStartReviewReturns } from './core/competency/user_competency_start_review.webservice-client';
import type { CoreCompetencyUserCompetencyStopReviewParams, CoreCompetencyUserCompetencyStopReviewReturns } from './core/competency/user_competency_stop_review.webservice-client';
import type { CoreCompetencyUserCompetencyViewedParams, CoreCompetencyUserCompetencyViewedReturns } from './core/competency/user_competency_viewed.webservice-client';
import type { CoreCompetencyUserCompetencyViewedInPlanParams, CoreCompetencyUserCompetencyViewedInPlanReturns } from './core/competency/user_competency_viewed_in_plan.webservice-client';
import type { CoreCompetencyUserCompetencyViewedInCourseParams, CoreCompetencyUserCompetencyViewedInCourseReturns } from './core/competency/user_competency_viewed_in_course.webservice-client';
import type { CoreCompetencyUserCompetencyPlanViewedParams, CoreCompetencyUserCompetencyPlanViewedReturns } from './core/competency/user_competency_plan_viewed.webservice-client';
import type { CoreCompetencyGradeCompetencyParams, CoreCompetencyGradeCompetencyReturns } from './core/competency/grade_competency.webservice-client';
import type { CoreCompetencyGradeCompetencyInPlanParams, CoreCompetencyGradeCompetencyInPlanReturns } from './core/competency/grade_competency_in_plan.webservice-client';
import type { CoreCompetencyGradeCompetencyInCourseParams, CoreCompetencyGradeCompetencyInCourseReturns } from './core/competency/grade_competency_in_course.webservice-client';
import type { CoreCompetencyUnlinkPlanFromTemplateParams, CoreCompetencyUnlinkPlanFromTemplateReturns } from './core/competency/unlink_plan_from_template.webservice-client';
import type { CoreCompetencyTemplateViewedParams, CoreCompetencyTemplateViewedReturns } from './core/competency/template_viewed.webservice-client';
import type { CoreCompetencyRequestReviewOfUserEvidenceLinkedCompetenciesParams, CoreCompetencyRequestReviewOfUserEvidenceLinkedCompetenciesReturns } from './core/competency/request_review_of_user_evidence_linked_competencies.webservice-client';
import type { CoreCompetencyUpdateCourseCompetencySettingsParams, CoreCompetencyUpdateCourseCompetencySettingsReturns } from './core/competency/update_course_competency_settings.webservice-client';
import type { CoreCompetencyDeleteEvidenceParams, CoreCompetencyDeleteEvidenceReturns } from './core/competency/delete_evidence.webservice-client';
import type { CoreWebserviceGetSiteInfoParams, CoreWebserviceGetSiteInfoReturns } from './core/webservice/get_site_info.webservice-client';
import type { CoreBlockGetCourseBlocksParams, CoreBlockGetCourseBlocksReturns } from './core/block/get_course_blocks.webservice-client';
import type { CoreBlockGetDashboardBlocksParams, CoreBlockGetDashboardBlocksReturns } from './core/block/get_dashboard_blocks.webservice-client';
import type { CoreBlockFetchAddableBlocksParams, CoreBlockFetchAddableBlocksReturns } from './core/block/fetch_addable_blocks.webservice-client';
import type { CoreFiltersGetAvailableInContextParams, CoreFiltersGetAvailableInContextReturns } from './core/filters/get_available_in_context.webservice-client';
import type { CoreFiltersGetAllStatesParams, CoreFiltersGetAllStatesReturns } from './core/filters/get_all_states.webservice-client';
import type { CoreCustomfieldDeleteFieldParams, CoreCustomfieldDeleteFieldReturns } from './core/customfield/delete_field.webservice-client';
import type { CoreCustomfieldReloadTemplateParams, CoreCustomfieldReloadTemplateReturns } from './core/customfield/reload_template.webservice-client';
import type { CoreCustomfieldCreateCategoryParams, CoreCustomfieldCreateCategoryReturns } from './core/customfield/create_category.webservice-client';
import type { CoreCustomfieldDeleteCategoryParams, CoreCustomfieldDeleteCategoryReturns } from './core/customfield/delete_category.webservice-client';
import type { CoreCustomfieldMoveFieldParams, CoreCustomfieldMoveFieldReturns } from './core/customfield/move_field.webservice-client';
import type { CoreCustomfieldMoveCategoryParams, CoreCustomfieldMoveCategoryReturns } from './core/customfield/move_category.webservice-client';
import type { CoreH5pGetTrustedH5pFileParams, CoreH5pGetTrustedH5pFileReturns } from './core/h5p/get_trusted_h5p_file.webservice-client';
import type { CoreTableGetDynamicTableContentParams, CoreTableGetDynamicTableContentReturns } from './core/table/get_dynamic_table_content.webservice-client';
import type { CoreXapiStatementPostParams, CoreXapiStatementPostReturns } from './core/xapi/statement_post.webservice-client';
import type { CoreXapiPostStateParams, CoreXapiPostStateReturns } from './core/xapi/post_state.webservice-client';
import type { CoreXapiGetStateParams, CoreXapiGetStateReturns } from './core/xapi/get_state.webservice-client';
import type { CoreXapiGetStatesParams, CoreXapiGetStatesReturns } from './core/xapi/get_states.webservice-client';
import type { CoreXapiDeleteStateParams, CoreXapiDeleteStateReturns } from './core/xapi/delete_state.webservice-client';
import type { CoreXapiDeleteStatesParams, CoreXapiDeleteStatesReturns } from './core/xapi/delete_states.webservice-client';
import type { CoreContentbankDeleteContentParams, CoreContentbankDeleteContentReturns } from './core/contentbank/delete_content.webservice-client';
import type { CoreContentbankRenameContentParams, CoreContentbankRenameContentReturns } from './core/contentbank/rename_content.webservice-client';
import type { CoreContentbankCopyContentParams, CoreContentbankCopyContentReturns } from './core/contentbank/copy_content.webservice-client';
import type { CoreContentbankSetContentVisibilityParams, CoreContentbankSetContentVisibilityReturns } from './core/contentbank/set_content_visibility.webservice-client';
import type { CoreCreateUserfeedbackActionRecordParams, CoreCreateUserfeedbackActionRecordReturns } from './core/create/userfeedback_action_record.webservice-client';
import type { CorePaymentGetAvailableGatewaysParams, CorePaymentGetAvailableGatewaysReturns } from './core/payment/get_available_gateways.webservice-client';
import type { CoreReportbuilderFiltersResetParams, CoreReportbuilderFiltersResetReturns } from './core/reportbuilder/filters_reset.webservice-client';
import type { CoreReportbuilderSetFiltersParams, CoreReportbuilderSetFiltersReturns } from './core/reportbuilder/set_filters.webservice-client';
import type { CoreDynamicTabsGetContentParams, CoreDynamicTabsGetContentReturns } from './core/dynamic/tabs_get_content.webservice-client';
import type { CoreChangeEditmodeParams, CoreChangeEditmodeReturns } from './core/change/editmode.webservice-client';
import type { CoreReportbuilderReportsDeleteParams, CoreReportbuilderReportsDeleteReturns } from './core/reportbuilder/reports_delete.webservice-client';
import type { CoreReportbuilderReportsGetParams, CoreReportbuilderReportsGetReturns } from './core/reportbuilder/reports_get.webservice-client';
import type { CoreReportbuilderListReportsParams, CoreReportbuilderListReportsReturns } from './core/reportbuilder/list_reports.webservice-client';
import type { CoreReportbuilderRetrieveReportParams, CoreReportbuilderRetrieveReportReturns } from './core/reportbuilder/retrieve_report.webservice-client';
import type { CoreReportbuilderRetrieveSystemReportParams, CoreReportbuilderRetrieveSystemReportReturns } from './core/reportbuilder/retrieve_system_report.webservice-client';
import type { CoreReportbuilderCanViewSystemReportParams, CoreReportbuilderCanViewSystemReportReturns } from './core/reportbuilder/can_view_system_report.webservice-client';
import type { CoreReportbuilderViewReportParams, CoreReportbuilderViewReportReturns } from './core/reportbuilder/view_report.webservice-client';
import type { CoreReportbuilderColumnsAddParams, CoreReportbuilderColumnsAddReturns } from './core/reportbuilder/columns_add.webservice-client';
import type { CoreReportbuilderColumnsDeleteParams, CoreReportbuilderColumnsDeleteReturns } from './core/reportbuilder/columns_delete.webservice-client';
import type { CoreReportbuilderColumnsReorderParams, CoreReportbuilderColumnsReorderReturns } from './core/reportbuilder/columns_reorder.webservice-client';
import type { CoreReportbuilderColumnsSortGetParams, CoreReportbuilderColumnsSortGetReturns } from './core/reportbuilder/columns_sort_get.webservice-client';
import type { CoreReportbuilderColumnsSortReorderParams, CoreReportbuilderColumnsSortReorderReturns } from './core/reportbuilder/columns_sort_reorder.webservice-client';
import type { CoreReportbuilderColumnsSortToggleParams, CoreReportbuilderColumnsSortToggleReturns } from './core/reportbuilder/columns_sort_toggle.webservice-client';
import type { CoreReportbuilderConditionsAddParams, CoreReportbuilderConditionsAddReturns } from './core/reportbuilder/conditions_add.webservice-client';
import type { CoreReportbuilderConditionsDeleteParams, CoreReportbuilderConditionsDeleteReturns } from './core/reportbuilder/conditions_delete.webservice-client';
import type { CoreReportbuilderConditionsReorderParams, CoreReportbuilderConditionsReorderReturns } from './core/reportbuilder/conditions_reorder.webservice-client';
import type { CoreReportbuilderConditionsResetParams, CoreReportbuilderConditionsResetReturns } from './core/reportbuilder/conditions_reset.webservice-client';
import type { CoreReportbuilderFiltersAddParams, CoreReportbuilderFiltersAddReturns } from './core/reportbuilder/filters_add.webservice-client';
import type { CoreReportbuilderFiltersDeleteParams, CoreReportbuilderFiltersDeleteReturns } from './core/reportbuilder/filters_delete.webservice-client';
import type { CoreReportbuilderFiltersReorderParams, CoreReportbuilderFiltersReorderReturns } from './core/reportbuilder/filters_reorder.webservice-client';
import type { CoreReportbuilderAudiencesDeleteParams, CoreReportbuilderAudiencesDeleteReturns } from './core/reportbuilder/audiences_delete.webservice-client';
import type { CoreReportbuilderSchedulesDeleteParams, CoreReportbuilderSchedulesDeleteReturns } from './core/reportbuilder/schedules_delete.webservice-client';
import type { CoreReportbuilderSchedulesSendParams, CoreReportbuilderSchedulesSendReturns } from './core/reportbuilder/schedules_send.webservice-client';
import type { CoreReportbuilderSchedulesToggleParams, CoreReportbuilderSchedulesToggleReturns } from './core/reportbuilder/schedules_toggle.webservice-client';
import type { CoreAdminSetPluginStateParams, CoreAdminSetPluginStateReturns } from './core/admin/set_plugin_state.webservice-client';
import type { CoreAdminSetPluginOrderParams, CoreAdminSetPluginOrderReturns } from './core/admin/set_plugin_order.webservice-client';
import type { CoreAdminSetBlockProtectionParams, CoreAdminSetBlockProtectionReturns } from './core/admin/set_block_protection.webservice-client';
import type { CoreMoodlenetSendActivityParams, CoreMoodlenetSendActivityReturns } from './core/moodlenet/send_activity.webservice-client';
import type { CoreMoodlenetGetShareInfoActivityParams, CoreMoodlenetGetShareInfoActivityReturns } from './core/moodlenet/get_share_info_activity.webservice-client';
import type { CoreMoodlenetAuthCheckParams, CoreMoodlenetAuthCheckReturns } from './core/moodlenet/auth_check.webservice-client';
import type { CoreMoodlenetGetSharedCourseInfoParams, CoreMoodlenetGetSharedCourseInfoReturns } from './core/moodlenet/get_shared_course_info.webservice-client';
import type { CoreMoodlenetSendCourseParams, CoreMoodlenetSendCourseReturns } from './core/moodlenet/send_course.webservice-client';
import type { CoreOutputPollStoredProgressParams, CoreOutputPollStoredProgressReturns } from './core/output/poll_stored_progress.webservice-client';
import type { CoreAiSetPolicyStatusParams, CoreAiSetPolicyStatusReturns } from './core/ai/set_policy_status.webservice-client';
import type { CoreAiGetPolicyStatusParams, CoreAiGetPolicyStatusReturns } from './core/ai/get_policy_status.webservice-client';
import type { CoreAiSetActionParams, CoreAiSetActionReturns } from './core/ai/set_action.webservice-client';
import type { CoreSmsSetGatewayStatusParams, CoreSmsSetGatewayStatusReturns } from './core/sms/set_gateway_status.webservice-client';
import type { TinyAutosaveResumeSessionParams, TinyAutosaveResumeSessionReturns } from './tiny/autosave/resume_session.webservice-client';
import type { TinyAutosaveResetSessionParams, TinyAutosaveResetSessionReturns } from './tiny/autosave/reset_session.webservice-client';
import type { TinyAutosaveUpdateSessionParams, TinyAutosaveUpdateSessionReturns } from './tiny/autosave/update_session.webservice-client';
import type { TinyEquationFilterParams, TinyEquationFilterReturns } from './tiny/equation/filter.webservice-client';
import type { TinyPremiumGetApiKeyParams, TinyPremiumGetApiKeyReturns } from './tiny/premium/get_api_key.webservice-client';
import type { MediaVideojsGetLanguageParams, MediaVideojsGetLanguageReturns } from './media/videojs/get_language.webservice-client';
import type { MessageAirnotifierIsSystemConfiguredParams, MessageAirnotifierIsSystemConfiguredReturns } from './message/airnotifier/is_system_configured.webservice-client';
import type { MessageAirnotifierAreNotificationPreferencesConfiguredParams, MessageAirnotifierAreNotificationPreferencesConfiguredReturns } from './message/airnotifier/are_notification_preferences_configured.webservice-client';
import type { MessageAirnotifierGetUserDevicesParams, MessageAirnotifierGetUserDevicesReturns } from './message/airnotifier/get_user_devices.webservice-client';
import type { MessageAirnotifierEnableDeviceParams, MessageAirnotifierEnableDeviceReturns } from './message/airnotifier/enable_device.webservice-client';
import type { MessagePopupGetPopupNotificationsParams, MessagePopupGetPopupNotificationsReturns } from './message/popup/get_popup_notifications.webservice-client';
import type { MessagePopupGetUnreadPopupNotificationCountParams, MessagePopupGetUnreadPopupNotificationCountReturns } from './message/popup/get_unread_popup_notification_count.webservice-client';
import type { ModAssignCopyPreviousAttemptParams, ModAssignCopyPreviousAttemptReturns } from './mod/assign/copy_previous_attempt.webservice-client';
import type { ModAssignGetGradesParams, ModAssignGetGradesReturns } from './mod/assign/get_grades.webservice-client';
import type { ModAssignGetAssignmentsParams, ModAssignGetAssignmentsReturns } from './mod/assign/get_assignments.webservice-client';
import type { ModAssignGetSubmissionsParams, ModAssignGetSubmissionsReturns } from './mod/assign/get_submissions.webservice-client';
import type { ModAssignGetUserFlagsParams, ModAssignGetUserFlagsReturns } from './mod/assign/get_user_flags.webservice-client';
import type { ModAssignSetUserFlagsParams, ModAssignSetUserFlagsReturns } from './mod/assign/set_user_flags.webservice-client';
import type { ModAssignGetUserMappingsParams, ModAssignGetUserMappingsReturns } from './mod/assign/get_user_mappings.webservice-client';
import type { ModAssignRevertSubmissionsToDraftParams, ModAssignRevertSubmissionsToDraftReturns } from './mod/assign/revert_submissions_to_draft.webservice-client';
import type { ModAssignLockSubmissionsParams, ModAssignLockSubmissionsReturns } from './mod/assign/lock_submissions.webservice-client';
import type { ModAssignUnlockSubmissionsParams, ModAssignUnlockSubmissionsReturns } from './mod/assign/unlock_submissions.webservice-client';
import type { ModAssignSaveSubmissionParams, ModAssignSaveSubmissionReturns } from './mod/assign/save_submission.webservice-client';
import type { ModAssignSubmitForGradingParams, ModAssignSubmitForGradingReturns } from './mod/assign/submit_for_grading.webservice-client';
import type { ModAssignSaveGradeParams, ModAssignSaveGradeReturns } from './mod/assign/save_grade.webservice-client';
import type { ModAssignSaveGradesParams, ModAssignSaveGradesReturns } from './mod/assign/save_grades.webservice-client';
import type { ModAssignSaveUserExtensionsParams, ModAssignSaveUserExtensionsReturns } from './mod/assign/save_user_extensions.webservice-client';
import type { ModAssignRevealIdentitiesParams, ModAssignRevealIdentitiesReturns } from './mod/assign/reveal_identities.webservice-client';
import type { ModAssignViewGradingTableParams, ModAssignViewGradingTableReturns } from './mod/assign/view_grading_table.webservice-client';
import type { ModAssignViewSubmissionStatusParams, ModAssignViewSubmissionStatusReturns } from './mod/assign/view_submission_status.webservice-client';
import type { ModAssignGetSubmissionStatusParams, ModAssignGetSubmissionStatusReturns } from './mod/assign/get_submission_status.webservice-client';
import type { ModAssignListParticipantsParams, ModAssignListParticipantsReturns } from './mod/assign/list_participants.webservice-client';
import type { ModAssignSubmitGradingFormParams, ModAssignSubmitGradingFormReturns } from './mod/assign/submit_grading_form.webservice-client';
import type { ModAssignGetParticipantParams, ModAssignGetParticipantReturns } from './mod/assign/get_participant.webservice-client';
import type { ModAssignViewAssignParams, ModAssignViewAssignReturns } from './mod/assign/view_assign.webservice-client';
import type { ModAssignStartSubmissionParams, ModAssignStartSubmissionReturns } from './mod/assign/start_submission.webservice-client';
import type { ModAssignRemoveSubmissionParams, ModAssignRemoveSubmissionReturns } from './mod/assign/remove_submission.webservice-client';
import type { ModBigbluebuttonbnCanJoinParams, ModBigbluebuttonbnCanJoinReturns } from './mod/bigbluebuttonbn/can_join.webservice-client';
import type { ModBigbluebuttonbnGetRecordingsParams, ModBigbluebuttonbnGetRecordingsReturns } from './mod/bigbluebuttonbn/get_recordings.webservice-client';
import type { ModBigbluebuttonbnGetRecordingsToImportParams, ModBigbluebuttonbnGetRecordingsToImportReturns } from './mod/bigbluebuttonbn/get_recordings_to_import.webservice-client';
import type { ModBigbluebuttonbnUpdateRecordingParams, ModBigbluebuttonbnUpdateRecordingReturns } from './mod/bigbluebuttonbn/update_recording.webservice-client';
import type { ModBigbluebuttonbnEndMeetingParams, ModBigbluebuttonbnEndMeetingReturns } from './mod/bigbluebuttonbn/end_meeting.webservice-client';
import type { ModBigbluebuttonbnCompletionValidateParams, ModBigbluebuttonbnCompletionValidateReturns } from './mod/bigbluebuttonbn/completion_validate.webservice-client';
import type { ModBigbluebuttonbnMeetingInfoParams, ModBigbluebuttonbnMeetingInfoReturns } from './mod/bigbluebuttonbn/meeting_info.webservice-client';
import type { ModBigbluebuttonbnGetBigbluebuttonbnsByCoursesParams, ModBigbluebuttonbnGetBigbluebuttonbnsByCoursesReturns } from './mod/bigbluebuttonbn/get_bigbluebuttonbns_by_courses.webservice-client';
import type { ModBigbluebuttonbnViewBigbluebuttonbnParams, ModBigbluebuttonbnViewBigbluebuttonbnReturns } from './mod/bigbluebuttonbn/view_bigbluebuttonbn.webservice-client';
import type { ModBigbluebuttonbnGetJoinUrlParams, ModBigbluebuttonbnGetJoinUrlReturns } from './mod/bigbluebuttonbn/get_join_url.webservice-client';
import type { ModBookViewBookParams, ModBookViewBookReturns } from './mod/book/view_book.webservice-client';
import type { ModBookGetBooksByCoursesParams, ModBookGetBooksByCoursesReturns } from './mod/book/get_books_by_courses.webservice-client';
import type { ModChatLoginUserParams, ModChatLoginUserReturns } from './mod/chat/login_user.webservice-client';
import type { ModChatGetChatUsersParams, ModChatGetChatUsersReturns } from './mod/chat/get_chat_users.webservice-client';
import type { ModChatSendChatMessageParams, ModChatSendChatMessageReturns } from './mod/chat/send_chat_message.webservice-client';
import type { ModChatGetChatLatestMessagesParams, ModChatGetChatLatestMessagesReturns } from './mod/chat/get_chat_latest_messages.webservice-client';
import type { ModChatViewChatParams, ModChatViewChatReturns } from './mod/chat/view_chat.webservice-client';
import type { ModChatGetChatsByCoursesParams, ModChatGetChatsByCoursesReturns } from './mod/chat/get_chats_by_courses.webservice-client';
import type { ModChatGetSessionsParams, ModChatGetSessionsReturns } from './mod/chat/get_sessions.webservice-client';
import type { ModChatGetSessionMessagesParams, ModChatGetSessionMessagesReturns } from './mod/chat/get_session_messages.webservice-client';
import type { ModChatViewSessionsParams, ModChatViewSessionsReturns } from './mod/chat/view_sessions.webservice-client';
import type { ModChoiceGetChoiceResultsParams, ModChoiceGetChoiceResultsReturns } from './mod/choice/get_choice_results.webservice-client';
import type { ModChoiceGetChoiceOptionsParams, ModChoiceGetChoiceOptionsReturns } from './mod/choice/get_choice_options.webservice-client';
import type { ModChoiceSubmitChoiceResponseParams, ModChoiceSubmitChoiceResponseReturns } from './mod/choice/submit_choice_response.webservice-client';
import type { ModChoiceViewChoiceParams, ModChoiceViewChoiceReturns } from './mod/choice/view_choice.webservice-client';
import type { ModChoiceGetChoicesByCoursesParams, ModChoiceGetChoicesByCoursesReturns } from './mod/choice/get_choices_by_courses.webservice-client';
import type { ModChoiceDeleteChoiceResponsesParams, ModChoiceDeleteChoiceResponsesReturns } from './mod/choice/delete_choice_responses.webservice-client';
import type { ModDataGetDatabasesByCoursesParams, ModDataGetDatabasesByCoursesReturns } from './mod/data/get_databases_by_courses.webservice-client';
import type { ModDataViewDatabaseParams, ModDataViewDatabaseReturns } from './mod/data/view_database.webservice-client';
import type { ModDataGetDataAccessInformationParams, ModDataGetDataAccessInformationReturns } from './mod/data/get_data_access_information.webservice-client';
import type { ModDataGetEntriesParams, ModDataGetEntriesReturns } from './mod/data/get_entries.webservice-client';
import type { ModDataGetEntryParams, ModDataGetEntryReturns } from './mod/data/get_entry.webservice-client';
import type { ModDataGetFieldsParams, ModDataGetFieldsReturns } from './mod/data/get_fields.webservice-client';
import type { ModDataSearchEntriesParams, ModDataSearchEntriesReturns } from './mod/data/search_entries.webservice-client';
import type { ModDataApproveEntryParams, ModDataApproveEntryReturns } from './mod/data/approve_entry.webservice-client';
import type { ModDataDeleteEntryParams, ModDataDeleteEntryReturns } from './mod/data/delete_entry.webservice-client';
import type { ModDataAddEntryParams, ModDataAddEntryReturns } from './mod/data/add_entry.webservice-client';
import type { ModDataUpdateEntryParams, ModDataUpdateEntryReturns } from './mod/data/update_entry.webservice-client';
import type { ModDataDeleteSavedPresetParams, ModDataDeleteSavedPresetReturns } from './mod/data/delete_saved_preset.webservice-client';
import type { ModDataGetMappingInformationParams, ModDataGetMappingInformationReturns } from './mod/data/get_mapping_information.webservice-client';
import type { ModFeedbackGetFeedbacksByCoursesParams, ModFeedbackGetFeedbacksByCoursesReturns } from './mod/feedback/get_feedbacks_by_courses.webservice-client';
import type { ModFeedbackGetFeedbackAccessInformationParams, ModFeedbackGetFeedbackAccessInformationReturns } from './mod/feedback/get_feedback_access_information.webservice-client';
import type { ModFeedbackViewFeedbackParams, ModFeedbackViewFeedbackReturns } from './mod/feedback/view_feedback.webservice-client';
import type { ModFeedbackGetCurrentCompletedTmpParams, ModFeedbackGetCurrentCompletedTmpReturns } from './mod/feedback/get_current_completed_tmp.webservice-client';
import type { ModFeedbackGetItemsParams, ModFeedbackGetItemsReturns } from './mod/feedback/get_items.webservice-client';
import type { ModFeedbackLaunchFeedbackParams, ModFeedbackLaunchFeedbackReturns } from './mod/feedback/launch_feedback.webservice-client';
import type { ModFeedbackGetPageItemsParams, ModFeedbackGetPageItemsReturns } from './mod/feedback/get_page_items.webservice-client';
import type { ModFeedbackProcessPageParams, ModFeedbackProcessPageReturns } from './mod/feedback/process_page.webservice-client';
import type { ModFeedbackGetAnalysisParams, ModFeedbackGetAnalysisReturns } from './mod/feedback/get_analysis.webservice-client';
import type { ModFeedbackGetUnfinishedResponsesParams, ModFeedbackGetUnfinishedResponsesReturns } from './mod/feedback/get_unfinished_responses.webservice-client';
import type { ModFeedbackGetFinishedResponsesParams, ModFeedbackGetFinishedResponsesReturns } from './mod/feedback/get_finished_responses.webservice-client';
import type { ModFeedbackGetNonRespondentsParams, ModFeedbackGetNonRespondentsReturns } from './mod/feedback/get_non_respondents.webservice-client';
import type { ModFeedbackGetResponsesAnalysisParams, ModFeedbackGetResponsesAnalysisReturns } from './mod/feedback/get_responses_analysis.webservice-client';
import type { ModFeedbackGetLastCompletedParams, ModFeedbackGetLastCompletedReturns } from './mod/feedback/get_last_completed.webservice-client';
import type { ModFolderViewFolderParams, ModFolderViewFolderReturns } from './mod/folder/view_folder.webservice-client';
import type { ModFolderGetFoldersByCoursesParams, ModFolderGetFoldersByCoursesReturns } from './mod/folder/get_folders_by_courses.webservice-client';
import type { ModForumGetForumsByCoursesParams, ModForumGetForumsByCoursesReturns } from './mod/forum/get_forums_by_courses.webservice-client';
import type { ModForumGetDiscussionPostsParams, ModForumGetDiscussionPostsReturns } from './mod/forum/get_discussion_posts.webservice-client';
import type { ModForumGetForumDiscussionsParams, ModForumGetForumDiscussionsReturns } from './mod/forum/get_forum_discussions.webservice-client';
import type { ModForumViewForumParams, ModForumViewForumReturns } from './mod/forum/view_forum.webservice-client';
import type { ModForumViewForumDiscussionParams, ModForumViewForumDiscussionReturns } from './mod/forum/view_forum_discussion.webservice-client';
import type { ModForumAddDiscussionPostParams, ModForumAddDiscussionPostReturns } from './mod/forum/add_discussion_post.webservice-client';
import type { ModForumAddDiscussionParams, ModForumAddDiscussionReturns } from './mod/forum/add_discussion.webservice-client';
import type { ModForumCanAddDiscussionParams, ModForumCanAddDiscussionReturns } from './mod/forum/can_add_discussion.webservice-client';
import type { ModForumGetForumAccessInformationParams, ModForumGetForumAccessInformationReturns } from './mod/forum/get_forum_access_information.webservice-client';
import type { ModForumSetSubscriptionStateParams, ModForumSetSubscriptionStateReturns } from './mod/forum/set_subscription_state.webservice-client';
import type { ModForumSetLockStateParams, ModForumSetLockStateReturns } from './mod/forum/set_lock_state.webservice-client';
import type { ModForumToggleFavouriteStateParams, ModForumToggleFavouriteStateReturns } from './mod/forum/toggle_favourite_state.webservice-client';
import type { ModForumSetPinStateParams, ModForumSetPinStateReturns } from './mod/forum/set_pin_state.webservice-client';
import type { ModForumDeletePostParams, ModForumDeletePostReturns } from './mod/forum/delete_post.webservice-client';
import type { ModForumGetDiscussionPostsByUseridParams, ModForumGetDiscussionPostsByUseridReturns } from './mod/forum/get_discussion_posts_by_userid.webservice-client';
import type { ModForumGetDiscussionPostParams, ModForumGetDiscussionPostReturns } from './mod/forum/get_discussion_post.webservice-client';
import type { ModForumPrepareDraftAreaForPostParams, ModForumPrepareDraftAreaForPostReturns } from './mod/forum/prepare_draft_area_for_post.webservice-client';
import type { ModForumUpdateDiscussionPostParams, ModForumUpdateDiscussionPostReturns } from './mod/forum/update_discussion_post.webservice-client';
import type { ModGlossaryGetGlossariesByCoursesParams, ModGlossaryGetGlossariesByCoursesReturns } from './mod/glossary/get_glossaries_by_courses.webservice-client';
import type { ModGlossaryViewGlossaryParams, ModGlossaryViewGlossaryReturns } from './mod/glossary/view_glossary.webservice-client';
import type { ModGlossaryViewEntryParams, ModGlossaryViewEntryReturns } from './mod/glossary/view_entry.webservice-client';
import type { ModGlossaryGetEntriesByLetterParams, ModGlossaryGetEntriesByLetterReturns } from './mod/glossary/get_entries_by_letter.webservice-client';
import type { ModGlossaryGetEntriesByDateParams, ModGlossaryGetEntriesByDateReturns } from './mod/glossary/get_entries_by_date.webservice-client';
import type { ModGlossaryGetCategoriesParams, ModGlossaryGetCategoriesReturns } from './mod/glossary/get_categories.webservice-client';
import type { ModGlossaryGetEntriesByCategoryParams, ModGlossaryGetEntriesByCategoryReturns } from './mod/glossary/get_entries_by_category.webservice-client';
import type { ModGlossaryGetAuthorsParams, ModGlossaryGetAuthorsReturns } from './mod/glossary/get_authors.webservice-client';
import type { ModGlossaryGetEntriesByAuthorParams, ModGlossaryGetEntriesByAuthorReturns } from './mod/glossary/get_entries_by_author.webservice-client';
import type { ModGlossaryGetEntriesByAuthorIdParams, ModGlossaryGetEntriesByAuthorIdReturns } from './mod/glossary/get_entries_by_author_id.webservice-client';
import type { ModGlossaryGetEntriesBySearchParams, ModGlossaryGetEntriesBySearchReturns } from './mod/glossary/get_entries_by_search.webservice-client';
import type { ModGlossaryGetEntriesByTermParams, ModGlossaryGetEntriesByTermReturns } from './mod/glossary/get_entries_by_term.webservice-client';
import type { ModGlossaryGetEntriesToApproveParams, ModGlossaryGetEntriesToApproveReturns } from './mod/glossary/get_entries_to_approve.webservice-client';
import type { ModGlossaryGetEntryByIdParams, ModGlossaryGetEntryByIdReturns } from './mod/glossary/get_entry_by_id.webservice-client';
import type { ModGlossaryAddEntryParams, ModGlossaryAddEntryReturns } from './mod/glossary/add_entry.webservice-client';
import type { ModGlossaryDeleteEntryParams, ModGlossaryDeleteEntryReturns } from './mod/glossary/delete_entry.webservice-client';
import type { ModGlossaryUpdateEntryParams, ModGlossaryUpdateEntryReturns } from './mod/glossary/update_entry.webservice-client';
import type { ModGlossaryPrepareEntryForEditionParams, ModGlossaryPrepareEntryForEditionReturns } from './mod/glossary/prepare_entry_for_edition.webservice-client';
import type { ModH5pactivityGetH5pactivityAccessInformationParams, ModH5pactivityGetH5pactivityAccessInformationReturns } from './mod/h5pactivity/get_h5pactivity_access_information.webservice-client';
import type { ModH5pactivityViewH5pactivityParams, ModH5pactivityViewH5pactivityReturns } from './mod/h5pactivity/view_h5pactivity.webservice-client';
import type { ModH5pactivityGetAttemptsParams, ModH5pactivityGetAttemptsReturns } from './mod/h5pactivity/get_attempts.webservice-client';
import type { ModH5pactivityGetResultsParams, ModH5pactivityGetResultsReturns } from './mod/h5pactivity/get_results.webservice-client';
import type { ModH5pactivityGetH5pactivitiesByCoursesParams, ModH5pactivityGetH5pactivitiesByCoursesReturns } from './mod/h5pactivity/get_h5pactivities_by_courses.webservice-client';
import type { ModH5pactivityLogReportViewedParams, ModH5pactivityLogReportViewedReturns } from './mod/h5pactivity/log_report_viewed.webservice-client';
import type { ModH5pactivityGetUserAttemptsParams, ModH5pactivityGetUserAttemptsReturns } from './mod/h5pactivity/get_user_attempts.webservice-client';
import type { ModImscpViewImscpParams, ModImscpViewImscpReturns } from './mod/imscp/view_imscp.webservice-client';
import type { ModImscpGetImscpsByCoursesParams, ModImscpGetImscpsByCoursesReturns } from './mod/imscp/get_imscps_by_courses.webservice-client';
import type { ModLabelGetLabelsByCoursesParams, ModLabelGetLabelsByCoursesReturns } from './mod/label/get_labels_by_courses.webservice-client';
import type { ModLessonGetLessonsByCoursesParams, ModLessonGetLessonsByCoursesReturns } from './mod/lesson/get_lessons_by_courses.webservice-client';
import type { ModLessonGetLessonAccessInformationParams, ModLessonGetLessonAccessInformationReturns } from './mod/lesson/get_lesson_access_information.webservice-client';
import type { ModLessonViewLessonParams, ModLessonViewLessonReturns } from './mod/lesson/view_lesson.webservice-client';
import type { ModLessonGetQuestionsAttemptsParams, ModLessonGetQuestionsAttemptsReturns } from './mod/lesson/get_questions_attempts.webservice-client';
import type { ModLessonGetUserGradeParams, ModLessonGetUserGradeReturns } from './mod/lesson/get_user_grade.webservice-client';
import type { ModLessonGetUserAttemptGradeParams, ModLessonGetUserAttemptGradeReturns } from './mod/lesson/get_user_attempt_grade.webservice-client';
import type { ModLessonGetContentPagesViewedParams, ModLessonGetContentPagesViewedReturns } from './mod/lesson/get_content_pages_viewed.webservice-client';
import type { ModLessonGetUserTimersParams, ModLessonGetUserTimersReturns } from './mod/lesson/get_user_timers.webservice-client';
import type { ModLessonGetPagesParams, ModLessonGetPagesReturns } from './mod/lesson/get_pages.webservice-client';
import type { ModLessonLaunchAttemptParams, ModLessonLaunchAttemptReturns } from './mod/lesson/launch_attempt.webservice-client';
import type { ModLessonGetPageDataParams, ModLessonGetPageDataReturns } from './mod/lesson/get_page_data.webservice-client';
import type { ModLessonProcessPageParams, ModLessonProcessPageReturns } from './mod/lesson/process_page.webservice-client';
import type { ModLessonFinishAttemptParams, ModLessonFinishAttemptReturns } from './mod/lesson/finish_attempt.webservice-client';
import type { ModLessonGetAttemptsOverviewParams, ModLessonGetAttemptsOverviewReturns } from './mod/lesson/get_attempts_overview.webservice-client';
import type { ModLessonGetUserAttemptParams, ModLessonGetUserAttemptReturns } from './mod/lesson/get_user_attempt.webservice-client';
import type { ModLessonGetPagesPossibleJumpsParams, ModLessonGetPagesPossibleJumpsReturns } from './mod/lesson/get_pages_possible_jumps.webservice-client';
import type { ModLessonGetLessonParams, ModLessonGetLessonReturns } from './mod/lesson/get_lesson.webservice-client';
import type { ModLtiGetToolLaunchDataParams, ModLtiGetToolLaunchDataReturns } from './mod/lti/get_tool_launch_data.webservice-client';
import type { ModLtiGetLtisByCoursesParams, ModLtiGetLtisByCoursesReturns } from './mod/lti/get_ltis_by_courses.webservice-client';
import type { ModLtiViewLtiParams, ModLtiViewLtiReturns } from './mod/lti/view_lti.webservice-client';
import type { ModLtiGetToolProxiesParams, ModLtiGetToolProxiesReturns } from './mod/lti/get_tool_proxies.webservice-client';
import type { ModLtiCreateToolProxyParams, ModLtiCreateToolProxyReturns } from './mod/lti/create_tool_proxy.webservice-client';
import type { ModLtiDeleteToolProxyParams, ModLtiDeleteToolProxyReturns } from './mod/lti/delete_tool_proxy.webservice-client';
import type { ModLtiGetToolProxyRegistrationRequestParams, ModLtiGetToolProxyRegistrationRequestReturns } from './mod/lti/get_tool_proxy_registration_request.webservice-client';
import type { ModLtiGetToolTypesParams, ModLtiGetToolTypesReturns } from './mod/lti/get_tool_types.webservice-client';
import type { ModLtiGetToolTypesAndProxiesParams, ModLtiGetToolTypesAndProxiesReturns } from './mod/lti/get_tool_types_and_proxies.webservice-client';
import type { ModLtiGetToolTypesAndProxiesCountParams, ModLtiGetToolTypesAndProxiesCountReturns } from './mod/lti/get_tool_types_and_proxies_count.webservice-client';
import type { ModLtiCreateToolTypeParams, ModLtiCreateToolTypeReturns } from './mod/lti/create_tool_type.webservice-client';
import type { ModLtiUpdateToolTypeParams, ModLtiUpdateToolTypeReturns } from './mod/lti/update_tool_type.webservice-client';
import type { ModLtiDeleteToolTypeParams, ModLtiDeleteToolTypeReturns } from './mod/lti/delete_tool_type.webservice-client';
import type { ModLtiDeleteCourseToolTypeParams, ModLtiDeleteCourseToolTypeReturns } from './mod/lti/delete_course_tool_type.webservice-client';
import type { ModLtiToggleShowinactivitychooserParams, ModLtiToggleShowinactivitychooserReturns } from './mod/lti/toggle_showinactivitychooser.webservice-client';
import type { ModLtiIsCartridgeParams, ModLtiIsCartridgeReturns } from './mod/lti/is_cartridge.webservice-client';
import type { ModPageViewPageParams, ModPageViewPageReturns } from './mod/page/view_page.webservice-client';
import type { ModPageGetPagesByCoursesParams, ModPageGetPagesByCoursesReturns } from './mod/page/get_pages_by_courses.webservice-client';
import type { QuizaccessSebValidateQuizKeysParams, QuizaccessSebValidateQuizKeysReturns } from './quizaccess/seb/validate_quiz_keys.webservice-client';
import type { ModQuizGetQuizzesByCoursesParams, ModQuizGetQuizzesByCoursesReturns } from './mod/quiz/get_quizzes_by_courses.webservice-client';
import type { ModQuizViewQuizParams, ModQuizViewQuizReturns } from './mod/quiz/view_quiz.webservice-client';
import type { ModQuizGetUserAttemptsParams, ModQuizGetUserAttemptsReturns } from './mod/quiz/get_user_attempts.webservice-client';
import type { ModQuizGetUserBestGradeParams, ModQuizGetUserBestGradeReturns } from './mod/quiz/get_user_best_grade.webservice-client';
import type { ModQuizGetCombinedReviewOptionsParams, ModQuizGetCombinedReviewOptionsReturns } from './mod/quiz/get_combined_review_options.webservice-client';
import type { ModQuizStartAttemptParams, ModQuizStartAttemptReturns } from './mod/quiz/start_attempt.webservice-client';
import type { ModQuizGetAttemptDataParams, ModQuizGetAttemptDataReturns } from './mod/quiz/get_attempt_data.webservice-client';
import type { ModQuizGetAttemptSummaryParams, ModQuizGetAttemptSummaryReturns } from './mod/quiz/get_attempt_summary.webservice-client';
import type { ModQuizSaveAttemptParams, ModQuizSaveAttemptReturns } from './mod/quiz/save_attempt.webservice-client';
import type { ModQuizProcessAttemptParams, ModQuizProcessAttemptReturns } from './mod/quiz/process_attempt.webservice-client';
import type { ModQuizGetAttemptReviewParams, ModQuizGetAttemptReviewReturns } from './mod/quiz/get_attempt_review.webservice-client';
import type { ModQuizViewAttemptParams, ModQuizViewAttemptReturns } from './mod/quiz/view_attempt.webservice-client';
import type { ModQuizViewAttemptSummaryParams, ModQuizViewAttemptSummaryReturns } from './mod/quiz/view_attempt_summary.webservice-client';
import type { ModQuizViewAttemptReviewParams, ModQuizViewAttemptReviewReturns } from './mod/quiz/view_attempt_review.webservice-client';
import type { ModQuizGetQuizFeedbackForGradeParams, ModQuizGetQuizFeedbackForGradeReturns } from './mod/quiz/get_quiz_feedback_for_grade.webservice-client';
import type { ModQuizGetQuizAccessInformationParams, ModQuizGetQuizAccessInformationReturns } from './mod/quiz/get_quiz_access_information.webservice-client';
import type { ModQuizGetAttemptAccessInformationParams, ModQuizGetAttemptAccessInformationReturns } from './mod/quiz/get_attempt_access_information.webservice-client';
import type { ModQuizGetQuizRequiredQtypesParams, ModQuizGetQuizRequiredQtypesReturns } from './mod/quiz/get_quiz_required_qtypes.webservice-client';
import type { ModQuizSetQuestionVersionParams, ModQuizSetQuestionVersionReturns } from './mod/quiz/set_question_version.webservice-client';
import type { ModQuizReopenAttemptParams, ModQuizReopenAttemptReturns } from './mod/quiz/reopen_attempt.webservice-client';
import type { ModQuizGetReopenAttemptConfirmationParams, ModQuizGetReopenAttemptConfirmationReturns } from './mod/quiz/get_reopen_attempt_confirmation.webservice-client';
import type { ModQuizAddRandomQuestionsParams, ModQuizAddRandomQuestionsReturns } from './mod/quiz/add_random_questions.webservice-client';
import type { ModQuizUpdateFilterConditionParams, ModQuizUpdateFilterConditionReturns } from './mod/quiz/update_filter_condition.webservice-client';
import type { ModQuizSaveOverridesParams, ModQuizSaveOverridesReturns } from './mod/quiz/save_overrides.webservice-client';
import type { ModQuizDeleteOverridesParams, ModQuizDeleteOverridesReturns } from './mod/quiz/delete_overrides.webservice-client';
import type { ModQuizGetOverridesParams, ModQuizGetOverridesReturns } from './mod/quiz/get_overrides.webservice-client';
import type { ModQuizCreateGradeItemsParams, ModQuizCreateGradeItemsReturns } from './mod/quiz/create_grade_items.webservice-client';
import type { ModQuizDeleteGradeItemsParams, ModQuizDeleteGradeItemsReturns } from './mod/quiz/delete_grade_items.webservice-client';
import type { ModQuizUpdateGradeItemsParams, ModQuizUpdateGradeItemsReturns } from './mod/quiz/update_grade_items.webservice-client';
import type { ModQuizUpdateSlotsParams, ModQuizUpdateSlotsReturns } from './mod/quiz/update_slots.webservice-client';
import type { ModQuizGetEditGradingPageDataParams, ModQuizGetEditGradingPageDataReturns } from './mod/quiz/get_edit_grading_page_data.webservice-client';
import type { ModQuizCreateGradeItemPerSectionParams, ModQuizCreateGradeItemPerSectionReturns } from './mod/quiz/create_grade_item_per_section.webservice-client';
import type { ModResourceViewResourceParams, ModResourceViewResourceReturns } from './mod/resource/view_resource.webservice-client';
import type { ModResourceGetResourcesByCoursesParams, ModResourceGetResourcesByCoursesReturns } from './mod/resource/get_resources_by_courses.webservice-client';
import type { ModScormViewScormParams, ModScormViewScormReturns } from './mod/scorm/view_scorm.webservice-client';
import type { ModScormGetScormAttemptCountParams, ModScormGetScormAttemptCountReturns } from './mod/scorm/get_scorm_attempt_count.webservice-client';
import type { ModScormGetScormScoesParams, ModScormGetScormScoesReturns } from './mod/scorm/get_scorm_scoes.webservice-client';
import type { ModScormGetScormUserDataParams, ModScormGetScormUserDataReturns } from './mod/scorm/get_scorm_user_data.webservice-client';
import type { ModScormInsertScormTracksParams, ModScormInsertScormTracksReturns } from './mod/scorm/insert_scorm_tracks.webservice-client';
import type { ModScormGetScormScoTracksParams, ModScormGetScormScoTracksReturns } from './mod/scorm/get_scorm_sco_tracks.webservice-client';
import type { ModScormGetScormsByCoursesParams, ModScormGetScormsByCoursesReturns } from './mod/scorm/get_scorms_by_courses.webservice-client';
import type { ModScormLaunchScoParams, ModScormLaunchScoReturns } from './mod/scorm/launch_sco.webservice-client';
import type { ModScormGetScormAccessInformationParams, ModScormGetScormAccessInformationReturns } from './mod/scorm/get_scorm_access_information.webservice-client';
import type { ModSurveyGetSurveysByCoursesParams, ModSurveyGetSurveysByCoursesReturns } from './mod/survey/get_surveys_by_courses.webservice-client';
import type { ModSurveyViewSurveyParams, ModSurveyViewSurveyReturns } from './mod/survey/view_survey.webservice-client';
import type { ModSurveyGetQuestionsParams, ModSurveyGetQuestionsReturns } from './mod/survey/get_questions.webservice-client';
import type { ModSurveySubmitAnswersParams, ModSurveySubmitAnswersReturns } from './mod/survey/submit_answers.webservice-client';
import type { ModUrlViewUrlParams, ModUrlViewUrlReturns } from './mod/url/view_url.webservice-client';
import type { ModUrlGetUrlsByCoursesParams, ModUrlGetUrlsByCoursesReturns } from './mod/url/get_urls_by_courses.webservice-client';
import type { ModWikiGetWikisByCoursesParams, ModWikiGetWikisByCoursesReturns } from './mod/wiki/get_wikis_by_courses.webservice-client';
import type { ModWikiViewWikiParams, ModWikiViewWikiReturns } from './mod/wiki/view_wiki.webservice-client';
import type { ModWikiViewPageParams, ModWikiViewPageReturns } from './mod/wiki/view_page.webservice-client';
import type { ModWikiGetSubwikisParams, ModWikiGetSubwikisReturns } from './mod/wiki/get_subwikis.webservice-client';
import type { ModWikiGetSubwikiPagesParams, ModWikiGetSubwikiPagesReturns } from './mod/wiki/get_subwiki_pages.webservice-client';
import type { ModWikiGetSubwikiFilesParams, ModWikiGetSubwikiFilesReturns } from './mod/wiki/get_subwiki_files.webservice-client';
import type { ModWikiGetPageContentsParams, ModWikiGetPageContentsReturns } from './mod/wiki/get_page_contents.webservice-client';
import type { ModWikiGetPageForEditingParams, ModWikiGetPageForEditingReturns } from './mod/wiki/get_page_for_editing.webservice-client';
import type { ModWikiNewPageParams, ModWikiNewPageReturns } from './mod/wiki/new_page.webservice-client';
import type { ModWikiEditPageParams, ModWikiEditPageReturns } from './mod/wiki/edit_page.webservice-client';
import type { ModWorkshopGetWorkshopsByCoursesParams, ModWorkshopGetWorkshopsByCoursesReturns } from './mod/workshop/get_workshops_by_courses.webservice-client';
import type { ModWorkshopGetWorkshopAccessInformationParams, ModWorkshopGetWorkshopAccessInformationReturns } from './mod/workshop/get_workshop_access_information.webservice-client';
import type { ModWorkshopGetUserPlanParams, ModWorkshopGetUserPlanReturns } from './mod/workshop/get_user_plan.webservice-client';
import type { ModWorkshopViewWorkshopParams, ModWorkshopViewWorkshopReturns } from './mod/workshop/view_workshop.webservice-client';
import type { ModWorkshopAddSubmissionParams, ModWorkshopAddSubmissionReturns } from './mod/workshop/add_submission.webservice-client';
import type { ModWorkshopUpdateSubmissionParams, ModWorkshopUpdateSubmissionReturns } from './mod/workshop/update_submission.webservice-client';
import type { ModWorkshopDeleteSubmissionParams, ModWorkshopDeleteSubmissionReturns } from './mod/workshop/delete_submission.webservice-client';
import type { ModWorkshopGetSubmissionsParams, ModWorkshopGetSubmissionsReturns } from './mod/workshop/get_submissions.webservice-client';
import type { ModWorkshopGetSubmissionParams, ModWorkshopGetSubmissionReturns } from './mod/workshop/get_submission.webservice-client';
import type { ModWorkshopGetSubmissionAssessmentsParams, ModWorkshopGetSubmissionAssessmentsReturns } from './mod/workshop/get_submission_assessments.webservice-client';
import type { ModWorkshopGetAssessmentParams, ModWorkshopGetAssessmentReturns } from './mod/workshop/get_assessment.webservice-client';
import type { ModWorkshopGetAssessmentFormDefinitionParams, ModWorkshopGetAssessmentFormDefinitionReturns } from './mod/workshop/get_assessment_form_definition.webservice-client';
import type { ModWorkshopGetReviewerAssessmentsParams, ModWorkshopGetReviewerAssessmentsReturns } from './mod/workshop/get_reviewer_assessments.webservice-client';
import type { ModWorkshopUpdateAssessmentParams, ModWorkshopUpdateAssessmentReturns } from './mod/workshop/update_assessment.webservice-client';
import type { ModWorkshopGetGradesParams, ModWorkshopGetGradesReturns } from './mod/workshop/get_grades.webservice-client';
import type { ModWorkshopEvaluateAssessmentParams, ModWorkshopEvaluateAssessmentReturns } from './mod/workshop/evaluate_assessment.webservice-client';
import type { ModWorkshopGetGradesReportParams, ModWorkshopGetGradesReportReturns } from './mod/workshop/get_grades_report.webservice-client';
import type { ModWorkshopViewSubmissionParams, ModWorkshopViewSubmissionReturns } from './mod/workshop/view_submission.webservice-client';
import type { ModWorkshopEvaluateSubmissionParams, ModWorkshopEvaluateSubmissionReturns } from './mod/workshop/evaluate_submission.webservice-client';
import type { PaygwPaypalGetConfigForJsParams, PaygwPaypalGetConfigForJsReturns } from './paygw/paypal/get_config_for_js.webservice-client';
import type { PaygwPaypalCreateTransactionCompleteParams, PaygwPaypalCreateTransactionCompleteReturns } from './paygw/paypal/create_transaction_complete.webservice-client';
import type { QbankColumnsortorderSetColumnbankOrderParams, QbankColumnsortorderSetColumnbankOrderReturns } from './qbank/columnsortorder/set_columnbank_order.webservice-client';
import type { QbankColumnsortorderSetHiddenColumnsParams, QbankColumnsortorderSetHiddenColumnsReturns } from './qbank/columnsortorder/set_hidden_columns.webservice-client';
import type { QbankColumnsortorderSetColumnSizeParams, QbankColumnsortorderSetColumnSizeReturns } from './qbank/columnsortorder/set_column_size.webservice-client';
import type { QbankEditquestionSetStatusParams, QbankEditquestionSetStatusReturns } from './qbank/editquestion/set_status.webservice-client';
import type { QbankManagecategoriesMoveCategoryParams, QbankManagecategoriesMoveCategoryReturns } from './qbank/managecategories/move_category.webservice-client';
import type { QbankTagquestionSubmitTagsFormParams, QbankTagquestionSubmitTagsFormReturns } from './qbank/tagquestion/submit_tags_form.webservice-client';
import type { QbankViewquestiontextSetQuestionTextFormatParams, QbankViewquestiontextSetQuestionTextFormatReturns } from './qbank/viewquestiontext/set_question_text_format.webservice-client';
import type { ReportCompetencyDataForReportParams, ReportCompetencyDataForReportReturns } from './report/competency/data_for_report.webservice-client';
import type { ReportInsightsSetNotusefulPredictionParams, ReportInsightsSetNotusefulPredictionReturns } from './report/insights/set_notuseful_prediction.webservice-client';
import type { ReportInsightsSetFixedPredictionParams, ReportInsightsSetFixedPredictionReturns } from './report/insights/set_fixed_prediction.webservice-client';
import type { ReportInsightsActionExecutedParams, ReportInsightsActionExecutedReturns } from './report/insights/action_executed.webservice-client';

/**
 * Typed Moodle Web Service operations available on MoodleClient.
 */
export interface GeneratedMoodleServices {
    /**
     * Delete a custom preset
     *
     * @param {ToolAdminPresetsDeletePresetParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ToolAdminPresetsDeletePresetReturns>>}
     */
    tool_admin_presets_delete_preset(params: ToolAdminPresetsDeletePresetParams, method?: HttpMethod): Promise<MoodleResponse<ToolAdminPresetsDeletePresetReturns>>;
    /**
     * Retrieve the list of potential contexts for a model.
     *
     * @param {ToolAnalyticsPotentialContextsParams} [params]
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ToolAnalyticsPotentialContextsReturns>>}
     */
    tool_analytics_potential_contexts(params?: ToolAnalyticsPotentialContextsParams, method?: HttpMethod): Promise<MoodleResponse<ToolAnalyticsPotentialContextsReturns>>;
    /**
     * Get the generator details for an entity
     *
     * @param {ToolBehatGetEntityGeneratorParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ToolBehatGetEntityGeneratorReturns>>}
     */
    tool_behat_get_entity_generator(params: ToolBehatGetEntityGeneratorParams, method?: HttpMethod): Promise<MoodleResponse<ToolBehatGetEntityGeneratorReturns>>;
    /**
     * Cancel the data request made by the user
     *
     * @param {ToolDataprivacyCancelDataRequestParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ToolDataprivacyCancelDataRequestReturns>>}
     */
    tool_dataprivacy_cancel_data_request(params: ToolDataprivacyCancelDataRequestParams, method?: HttpMethod): Promise<MoodleResponse<ToolDataprivacyCancelDataRequestReturns>>;
    /**
     * Contact the site Data Protection Officer(s)
     *
     * @param {ToolDataprivacyContactDpoParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ToolDataprivacyContactDpoReturns>>}
     */
    tool_dataprivacy_contact_dpo(params: ToolDataprivacyContactDpoParams, method?: HttpMethod): Promise<MoodleResponse<ToolDataprivacyContactDpoReturns>>;
    /**
     * Mark a user's general enquiry as complete
     *
     * @param {ToolDataprivacyMarkCompleteParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ToolDataprivacyMarkCompleteReturns>>}
     */
    tool_dataprivacy_mark_complete(params: ToolDataprivacyMarkCompleteParams, method?: HttpMethod): Promise<MoodleResponse<ToolDataprivacyMarkCompleteReturns>>;
    /**
     * Fetch the details of a user's data request
     *
     * @param {ToolDataprivacyGetDataRequestParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ToolDataprivacyGetDataRequestReturns>>}
     */
    tool_dataprivacy_get_data_request(params: ToolDataprivacyGetDataRequestParams, method?: HttpMethod): Promise<MoodleResponse<ToolDataprivacyGetDataRequestReturns>>;
    /**
     * Approve a data request
     *
     * @param {ToolDataprivacyApproveDataRequestParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ToolDataprivacyApproveDataRequestReturns>>}
     */
    tool_dataprivacy_approve_data_request(params: ToolDataprivacyApproveDataRequestParams, method?: HttpMethod): Promise<MoodleResponse<ToolDataprivacyApproveDataRequestReturns>>;
    /**
     * Save list of selected courses for export
     *
     * @param {ToolDataprivacySubmitSelectedCoursesFormParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ToolDataprivacySubmitSelectedCoursesFormReturns>>}
     */
    tool_dataprivacy_submit_selected_courses_form(params: ToolDataprivacySubmitSelectedCoursesFormParams, method?: HttpMethod): Promise<MoodleResponse<ToolDataprivacySubmitSelectedCoursesFormReturns>>;
    /**
     * Bulk approve data requests
     *
     * @param {ToolDataprivacyBulkApproveDataRequestsParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ToolDataprivacyBulkApproveDataRequestsReturns>>}
     */
    tool_dataprivacy_bulk_approve_data_requests(params: ToolDataprivacyBulkApproveDataRequestsParams, method?: HttpMethod): Promise<MoodleResponse<ToolDataprivacyBulkApproveDataRequestsReturns>>;
    /**
     * Deny a data request
     *
     * @param {ToolDataprivacyDenyDataRequestParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ToolDataprivacyDenyDataRequestReturns>>}
     */
    tool_dataprivacy_deny_data_request(params: ToolDataprivacyDenyDataRequestParams, method?: HttpMethod): Promise<MoodleResponse<ToolDataprivacyDenyDataRequestReturns>>;
    /**
     * Bulk deny data requests
     *
     * @param {ToolDataprivacyBulkDenyDataRequestsParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ToolDataprivacyBulkDenyDataRequestsReturns>>}
     */
    tool_dataprivacy_bulk_deny_data_requests(params: ToolDataprivacyBulkDenyDataRequestsParams, method?: HttpMethod): Promise<MoodleResponse<ToolDataprivacyBulkDenyDataRequestsReturns>>;
    /**
     * Fetches a list of users
     *
     * @param {ToolDataprivacyGetUsersParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ToolDataprivacyGetUsersReturns>>}
     */
    tool_dataprivacy_get_users(params: ToolDataprivacyGetUsersParams, method?: HttpMethod): Promise<MoodleResponse<ToolDataprivacyGetUsersReturns>>;
    /**
     * Adds a data purpose
     *
     * @param {ToolDataprivacyCreatePurposeFormParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ToolDataprivacyCreatePurposeFormReturns>>}
     */
    tool_dataprivacy_create_purpose_form(params: ToolDataprivacyCreatePurposeFormParams, method?: HttpMethod): Promise<MoodleResponse<ToolDataprivacyCreatePurposeFormReturns>>;
    /**
     * Adds a data category
     *
     * @param {ToolDataprivacyCreateCategoryFormParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ToolDataprivacyCreateCategoryFormReturns>>}
     */
    tool_dataprivacy_create_category_form(params: ToolDataprivacyCreateCategoryFormParams, method?: HttpMethod): Promise<MoodleResponse<ToolDataprivacyCreateCategoryFormReturns>>;
    /**
     * Deletes an existing data purpose
     *
     * @param {ToolDataprivacyDeletePurposeParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ToolDataprivacyDeletePurposeReturns>>}
     */
    tool_dataprivacy_delete_purpose(params: ToolDataprivacyDeletePurposeParams, method?: HttpMethod): Promise<MoodleResponse<ToolDataprivacyDeletePurposeReturns>>;
    /**
     * Deletes an existing data category
     *
     * @param {ToolDataprivacyDeleteCategoryParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ToolDataprivacyDeleteCategoryReturns>>}
     */
    tool_dataprivacy_delete_category(params: ToolDataprivacyDeleteCategoryParams, method?: HttpMethod): Promise<MoodleResponse<ToolDataprivacyDeleteCategoryReturns>>;
    /**
     * Sets purpose and category across a context level
     *
     * @param {ToolDataprivacySetContextlevelFormParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ToolDataprivacySetContextlevelFormReturns>>}
     */
    tool_dataprivacy_set_contextlevel_form(params: ToolDataprivacySetContextlevelFormParams, method?: HttpMethod): Promise<MoodleResponse<ToolDataprivacySetContextlevelFormReturns>>;
    /**
     * Sets purpose and category for a specific context
     *
     * @param {ToolDataprivacySetContextFormParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ToolDataprivacySetContextFormReturns>>}
     */
    tool_dataprivacy_set_context_form(params: ToolDataprivacySetContextFormParams, method?: HttpMethod): Promise<MoodleResponse<ToolDataprivacySetContextFormReturns>>;
    /**
     * Return branches for the context tree
     *
     * @param {ToolDataprivacyTreeExtraBranchesParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ToolDataprivacyTreeExtraBranchesReturns>>}
     */
    tool_dataprivacy_tree_extra_branches(params: ToolDataprivacyTreeExtraBranchesParams, method?: HttpMethod): Promise<MoodleResponse<ToolDataprivacyTreeExtraBranchesReturns>>;
    /**
     * Mark the selected expired contexts as confirmed for deletion
     *
     * @param {ToolDataprivacyConfirmContextsForDeletionParams} [params]
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ToolDataprivacyConfirmContextsForDeletionReturns>>}
     */
    tool_dataprivacy_confirm_contexts_for_deletion(params?: ToolDataprivacyConfirmContextsForDeletionParams, method?: HttpMethod): Promise<MoodleResponse<ToolDataprivacyConfirmContextsForDeletionReturns>>;
    /**
     * Updates the default category and purpose for a given context level (and optionally, a plugin)
     *
     * @param {ToolDataprivacySetContextDefaultsParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ToolDataprivacySetContextDefaultsReturns>>}
     */
    tool_dataprivacy_set_context_defaults(params: ToolDataprivacySetContextDefaultsParams, method?: HttpMethod): Promise<MoodleResponse<ToolDataprivacySetContextDefaultsReturns>>;
    /**
     * Fetches a list of data category options
     *
     * @param {ToolDataprivacyGetCategoryOptionsParams} [params]
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ToolDataprivacyGetCategoryOptionsReturns>>}
     */
    tool_dataprivacy_get_category_options(params?: ToolDataprivacyGetCategoryOptionsParams, method?: HttpMethod): Promise<MoodleResponse<ToolDataprivacyGetCategoryOptionsReturns>>;
    /**
     * Fetches a list of data storage purpose options
     *
     * @param {ToolDataprivacyGetPurposeOptionsParams} [params]
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ToolDataprivacyGetPurposeOptionsReturns>>}
     */
    tool_dataprivacy_get_purpose_options(params?: ToolDataprivacyGetPurposeOptionsParams, method?: HttpMethod): Promise<MoodleResponse<ToolDataprivacyGetPurposeOptionsReturns>>;
    /**
     * Fetches a list of activity options
     *
     * @param {ToolDataprivacyGetActivityOptionsParams} [params]
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ToolDataprivacyGetActivityOptionsReturns>>}
     */
    tool_dataprivacy_get_activity_options(params?: ToolDataprivacyGetActivityOptionsParams, method?: HttpMethod): Promise<MoodleResponse<ToolDataprivacyGetActivityOptionsReturns>>;
    /**
     * Retrieving privacy API access (permissions) information for the current user.
     *
     * @param {ToolDataprivacyGetAccessInformationParams} [params]
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ToolDataprivacyGetAccessInformationReturns>>}
     */
    tool_dataprivacy_get_access_information(params?: ToolDataprivacyGetAccessInformationParams, method?: HttpMethod): Promise<MoodleResponse<ToolDataprivacyGetAccessInformationReturns>>;
    /**
     * Creates a data request.
     *
     * @param {ToolDataprivacyCreateDataRequestParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ToolDataprivacyCreateDataRequestReturns>>}
     */
    tool_dataprivacy_create_data_request(params: ToolDataprivacyCreateDataRequestParams, method?: HttpMethod): Promise<MoodleResponse<ToolDataprivacyCreateDataRequestReturns>>;
    /**
     * Gets data request.
     *
     * @param {ToolDataprivacyGetDataRequestsParams} [params]
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ToolDataprivacyGetDataRequestsReturns>>}
     */
    tool_dataprivacy_get_data_requests(params?: ToolDataprivacyGetDataRequestsParams, method?: HttpMethod): Promise<MoodleResponse<ToolDataprivacyGetDataRequestsReturns>>;
    /**
     * Load the data for the competency frameworks manage page template
     *
     * @param {ToolLpDataForCompetencyFrameworksManagePageParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ToolLpDataForCompetencyFrameworksManagePageReturns>>}
     */
    tool_lp_data_for_competency_frameworks_manage_page(params: ToolLpDataForCompetencyFrameworksManagePageParams, method?: HttpMethod): Promise<MoodleResponse<ToolLpDataForCompetencyFrameworksManagePageReturns>>;
    /**
     * Load competency data for summary template.
     *
     * @param {ToolLpDataForCompetencySummaryParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ToolLpDataForCompetencySummaryReturns>>}
     */
    tool_lp_data_for_competency_summary(params: ToolLpDataForCompetencySummaryParams, method?: HttpMethod): Promise<MoodleResponse<ToolLpDataForCompetencySummaryReturns>>;
    /**
     * Load the data for the competencies manage page template
     *
     * @param {ToolLpDataForCompetenciesManagePageParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ToolLpDataForCompetenciesManagePageReturns>>}
     */
    tool_lp_data_for_competencies_manage_page(params: ToolLpDataForCompetenciesManagePageParams, method?: HttpMethod): Promise<MoodleResponse<ToolLpDataForCompetenciesManagePageReturns>>;
    /**
     * List the courses using a competency
     *
     * @param {ToolLpListCoursesUsingCompetencyParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ToolLpListCoursesUsingCompetencyReturns>>}
     */
    tool_lp_list_courses_using_competency(params: ToolLpListCoursesUsingCompetencyParams, method?: HttpMethod): Promise<MoodleResponse<ToolLpListCoursesUsingCompetencyReturns>>;
    /**
     * Load the data for the course competencies page template.
     *
     * @param {ToolLpDataForCourseCompetenciesPageParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ToolLpDataForCourseCompetenciesPageReturns>>}
     */
    tool_lp_data_for_course_competencies_page(params: ToolLpDataForCourseCompetenciesPageParams, method?: HttpMethod): Promise<MoodleResponse<ToolLpDataForCourseCompetenciesPageReturns>>;
    /**
     * Load the data for the template competencies page template.
     *
     * @param {ToolLpDataForTemplateCompetenciesPageParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ToolLpDataForTemplateCompetenciesPageReturns>>}
     */
    tool_lp_data_for_template_competencies_page(params: ToolLpDataForTemplateCompetenciesPageParams, method?: HttpMethod): Promise<MoodleResponse<ToolLpDataForTemplateCompetenciesPageReturns>>;
    /**
     * Load the data for the learning plan templates manage page template
     *
     * @param {ToolLpDataForTemplatesManagePageParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ToolLpDataForTemplatesManagePageReturns>>}
     */
    tool_lp_data_for_templates_manage_page(params: ToolLpDataForTemplatesManagePageParams, method?: HttpMethod): Promise<MoodleResponse<ToolLpDataForTemplatesManagePageReturns>>;
    /**
     * Load the data for the plans page template
     *
     * @param {ToolLpDataForPlansPageParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ToolLpDataForPlansPageReturns>>}
     */
    tool_lp_data_for_plans_page(params: ToolLpDataForPlansPageParams, method?: HttpMethod): Promise<MoodleResponse<ToolLpDataForPlansPageReturns>>;
    /**
     * Load the data for the plan page template.
     *
     * @param {ToolLpDataForPlanPageParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ToolLpDataForPlanPageReturns>>}
     */
    tool_lp_data_for_plan_page(params: ToolLpDataForPlanPageParams, method?: HttpMethod): Promise<MoodleResponse<ToolLpDataForPlanPageReturns>>;
    /**
     * Load the data for the related competencies template.
     *
     * @param {ToolLpDataForRelatedCompetenciesSectionParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ToolLpDataForRelatedCompetenciesSectionReturns>>}
     */
    tool_lp_data_for_related_competencies_section(params: ToolLpDataForRelatedCompetenciesSectionParams, method?: HttpMethod): Promise<MoodleResponse<ToolLpDataForRelatedCompetenciesSectionReturns>>;
    /**
     * Search for users.
     *
     * @param {ToolLpSearchUsersParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ToolLpSearchUsersReturns>>}
     */
    tool_lp_search_users(params: ToolLpSearchUsersParams, method?: HttpMethod): Promise<MoodleResponse<ToolLpSearchUsersReturns>>;
    /**
     * Search for cohorts. This method is deprecated, please call 'core_cohort_search_cohorts' instead
     *
     * @param {ToolLpSearchCohortsParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ToolLpSearchCohortsReturns>>}
     */
    tool_lp_search_cohorts(params: ToolLpSearchCohortsParams, method?: HttpMethod): Promise<MoodleResponse<ToolLpSearchCohortsReturns>>;
    /**
     * Load the data for the user evidence list page template
     *
     * @param {ToolLpDataForUserEvidenceListPageParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ToolLpDataForUserEvidenceListPageReturns>>}
     */
    tool_lp_data_for_user_evidence_list_page(params: ToolLpDataForUserEvidenceListPageParams, method?: HttpMethod): Promise<MoodleResponse<ToolLpDataForUserEvidenceListPageReturns>>;
    /**
     * Load the data for the user evidence page template
     *
     * @param {ToolLpDataForUserEvidencePageParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ToolLpDataForUserEvidencePageReturns>>}
     */
    tool_lp_data_for_user_evidence_page(params: ToolLpDataForUserEvidencePageParams, method?: HttpMethod): Promise<MoodleResponse<ToolLpDataForUserEvidencePageReturns>>;
    /**
     * Load a summary of a user competency.
     *
     * @param {ToolLpDataForUserCompetencySummaryParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ToolLpDataForUserCompetencySummaryReturns>>}
     */
    tool_lp_data_for_user_competency_summary(params: ToolLpDataForUserCompetencySummaryParams, method?: HttpMethod): Promise<MoodleResponse<ToolLpDataForUserCompetencySummaryReturns>>;
    /**
     * Load a summary of a user competency.
     *
     * @param {ToolLpDataForUserCompetencySummaryInPlanParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ToolLpDataForUserCompetencySummaryInPlanReturns>>}
     */
    tool_lp_data_for_user_competency_summary_in_plan(params: ToolLpDataForUserCompetencySummaryInPlanParams, method?: HttpMethod): Promise<MoodleResponse<ToolLpDataForUserCompetencySummaryInPlanReturns>>;
    /**
     * Load a summary of a user competency.
     *
     * @param {ToolLpDataForUserCompetencySummaryInCourseParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ToolLpDataForUserCompetencySummaryInCourseReturns>>}
     */
    tool_lp_data_for_user_competency_summary_in_course(params: ToolLpDataForUserCompetencySummaryInCourseParams, method?: HttpMethod): Promise<MoodleResponse<ToolLpDataForUserCompetencySummaryInCourseReturns>>;
    /**
     * Returns a list of Moodle plugins supporting the mobile app.
     *
     * @param {ToolMobileGetPluginsSupportingMobileParams} [params]
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ToolMobileGetPluginsSupportingMobileReturns>>}
     */
    tool_mobile_get_plugins_supporting_mobile(params?: ToolMobileGetPluginsSupportingMobileParams, method?: HttpMethod): Promise<MoodleResponse<ToolMobileGetPluginsSupportingMobileReturns>>;
    /**
     * Returns a list of the site public settings, those not requiring authentication.
     *
     * @param {ToolMobileGetPublicConfigParams} [params]
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ToolMobileGetPublicConfigReturns>>}
     */
    tool_mobile_get_public_config(params?: ToolMobileGetPublicConfigParams, method?: HttpMethod): Promise<MoodleResponse<ToolMobileGetPublicConfigReturns>>;
    /**
     * Returns a list of the site configurations, filtering by section.
     *
     * @param {ToolMobileGetConfigParams} [params]
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ToolMobileGetConfigReturns>>}
     */
    tool_mobile_get_config(params?: ToolMobileGetConfigParams, method?: HttpMethod): Promise<MoodleResponse<ToolMobileGetConfigReturns>>;
    /**
     * Creates an auto-login key for the current user. Is created only in https sites and is restricted by time, ip address and only works if the request comes from the Moodle mobile or desktop app.
     *
     * @param {ToolMobileGetAutologinKeyParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ToolMobileGetAutologinKeyReturns>>}
     */
    tool_mobile_get_autologin_key(params: ToolMobileGetAutologinKeyParams, method?: HttpMethod): Promise<MoodleResponse<ToolMobileGetAutologinKeyReturns>>;
    /**
     * Returns a piece of content to be displayed in the Mobile app.
     *
     * @param {ToolMobileGetContentParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ToolMobileGetContentReturns>>}
     */
    tool_mobile_get_content(params: ToolMobileGetContentParams, method?: HttpMethod): Promise<MoodleResponse<ToolMobileGetContentReturns>>;
    /**
     * Call multiple external functions and return all responses.
     *
     * @param {ToolMobileCallExternalFunctionsParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ToolMobileCallExternalFunctionsReturns>>}
     */
    tool_mobile_call_external_functions(params: ToolMobileCallExternalFunctionsParams, method?: HttpMethod): Promise<MoodleResponse<ToolMobileCallExternalFunctionsReturns>>;
    /**
     * Check if the given site subscription key is valid.
     *
     * @param {ToolMobileValidateSubscriptionKeyParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ToolMobileValidateSubscriptionKeyReturns>>}
     */
    tool_mobile_validate_subscription_key(params: ToolMobileValidateSubscriptionKeyParams, method?: HttpMethod): Promise<MoodleResponse<ToolMobileValidateSubscriptionKeyReturns>>;
    /**
     * Returns a WebService token (and private token) for QR login.
     *
     * @param {ToolMobileGetTokensForQrLoginParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ToolMobileGetTokensForQrLoginReturns>>}
     */
    tool_mobile_get_tokens_for_qr_login(params: ToolMobileGetTokensForQrLoginParams, method?: HttpMethod): Promise<MoodleResponse<ToolMobileGetTokensForQrLoginReturns>>;
    /**
     * Verify if the passed information resolves into a WebFinger profile URL
     *
     * @param {ToolMoodlenetVerifyWebfingerParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ToolMoodlenetVerifyWebfingerReturns>>}
     */
    tool_moodlenet_verify_webfinger(params: ToolMoodlenetVerifyWebfingerParams, method?: HttpMethod): Promise<MoodleResponse<ToolMoodlenetVerifyWebfingerReturns>>;
    /**
     * For some given input search for a course that matches
     *
     * @param {ToolMoodlenetSearchCoursesParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ToolMoodlenetSearchCoursesReturns>>}
     */
    tool_moodlenet_search_courses(params: ToolMoodlenetSearchCoursesParams, method?: HttpMethod): Promise<MoodleResponse<ToolMoodlenetSearchCoursesReturns>>;
    /**
     * Fetch the details of a policy version
     *
     * @param {ToolPolicyGetPolicyVersionParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ToolPolicyGetPolicyVersionReturns>>}
     */
    tool_policy_get_policy_version(params: ToolPolicyGetPolicyVersionParams, method?: HttpMethod): Promise<MoodleResponse<ToolPolicyGetPolicyVersionReturns>>;
    /**
     * Accept policies on behalf of other users
     *
     * @param {ToolPolicySubmitAcceptOnBehalfParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ToolPolicySubmitAcceptOnBehalfReturns>>} - success
     */
    tool_policy_submit_accept_on_behalf(params: ToolPolicySubmitAcceptOnBehalfParams, method?: HttpMethod): Promise<MoodleResponse<ToolPolicySubmitAcceptOnBehalfReturns>>;
    /**
     * Get user policies acceptances.
     *
     * @param {ToolPolicyGetUserAcceptancesParams} [params]
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ToolPolicyGetUserAcceptancesReturns>>}
     */
    tool_policy_get_user_acceptances(params?: ToolPolicyGetUserAcceptancesParams, method?: HttpMethod): Promise<MoodleResponse<ToolPolicyGetUserAcceptancesReturns>>;
    /**
     * Set the acceptance status (accept or decline only) for the indicated policies for the given user.
     *
     * @param {ToolPolicySetAcceptancesStatusParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ToolPolicySetAcceptancesStatusReturns>>}
     */
    tool_policy_set_acceptances_status(params: ToolPolicySetAcceptancesStatusParams, method?: HttpMethod): Promise<MoodleResponse<ToolPolicySetAcceptancesStatusReturns>>;
    /**
     * List/search templates by component.
     *
     * @param {ToolTemplatelibraryListTemplatesParams} [params]
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ToolTemplatelibraryListTemplatesReturns>>}
     */
    tool_templatelibrary_list_templates(params?: ToolTemplatelibraryListTemplatesParams, method?: HttpMethod): Promise<MoodleResponse<ToolTemplatelibraryListTemplatesReturns>>;
    /**
     * Load a canonical template by name (not the theme overidden one).
     *
     * @param {ToolTemplatelibraryLoadCanonicalTemplateParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ToolTemplatelibraryLoadCanonicalTemplateReturns>>} - template
     */
    tool_templatelibrary_load_canonical_template(params: ToolTemplatelibraryLoadCanonicalTemplateParams, method?: HttpMethod): Promise<MoodleResponse<ToolTemplatelibraryLoadCanonicalTemplateReturns>>;
    /**
     * Fetch the specified tour
     *
     * @param {ToolUsertoursFetchAndStartTourParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ToolUsertoursFetchAndStartTourReturns>>}
     */
    tool_usertours_fetch_and_start_tour(params: ToolUsertoursFetchAndStartTourParams, method?: HttpMethod): Promise<MoodleResponse<ToolUsertoursFetchAndStartTourReturns>>;
    /**
     * Mark the specified step as completed for the current user
     *
     * @param {ToolUsertoursStepShownParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ToolUsertoursStepShownReturns>>}
     */
    tool_usertours_step_shown(params: ToolUsertoursStepShownParams, method?: HttpMethod): Promise<MoodleResponse<ToolUsertoursStepShownReturns>>;
    /**
     * Mark the specified tour as completed for the current user
     *
     * @param {ToolUsertoursCompleteTourParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ToolUsertoursCompleteTourReturns>>}
     */
    tool_usertours_complete_tour(params: ToolUsertoursCompleteTourParams, method?: HttpMethod): Promise<MoodleResponse<ToolUsertoursCompleteTourReturns>>;
    /**
     * Remove the specified tour
     *
     * @param {ToolUsertoursResetTourParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ToolUsertoursResetTourReturns>>}
     */
    tool_usertours_reset_tour(params: ToolUsertoursResetTourParams, method?: HttpMethod): Promise<MoodleResponse<ToolUsertoursResetTourReturns>>;
    /**
     * moves element up/down
     *
     * @param {ToolXmldbInvokeMoveActionParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ToolXmldbInvokeMoveActionReturns>>}
     */
    tool_xmldb_invoke_move_action(params: ToolXmldbInvokeMoveActionParams, method?: HttpMethod): Promise<MoodleResponse<ToolXmldbInvokeMoveActionReturns>>;
    /**
     * Summarise text for the Course Assistance Placement
     *
     * @param {AiplacementCourseassistSummariseTextParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<AiplacementCourseassistSummariseTextReturns>>}
     */
    aiplacement_courseassist_summarise_text(params: AiplacementCourseassistSummariseTextParams, method?: HttpMethod): Promise<MoodleResponse<AiplacementCourseassistSummariseTextReturns>>;
    /**
     * Generate image for the HTML Text editor AI Placement
     *
     * @param {AiplacementEditorGenerateImageParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<AiplacementEditorGenerateImageReturns>>}
     */
    aiplacement_editor_generate_image(params: AiplacementEditorGenerateImageParams, method?: HttpMethod): Promise<MoodleResponse<AiplacementEditorGenerateImageReturns>>;
    /**
     * Generate text for the HTML Text editor AI Placement
     *
     * @param {AiplacementEditorGenerateTextParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<AiplacementEditorGenerateTextReturns>>}
     */
    aiplacement_editor_generate_text(params: AiplacementEditorGenerateTextParams, method?: HttpMethod): Promise<MoodleResponse<AiplacementEditorGenerateTextReturns>>;
    /**
     * Get the signup required settings and profile fields.
     *
     * @param {AuthEmailGetSignupSettingsParams} [params]
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<AuthEmailGetSignupSettingsReturns>>}
     */
    auth_email_get_signup_settings(params?: AuthEmailGetSignupSettingsParams, method?: HttpMethod): Promise<MoodleResponse<AuthEmailGetSignupSettingsReturns>>;
    /**
     * Adds a new user (pendingto be confirmed) in the site.
     *
     * @param {AuthEmailSignupUserParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<AuthEmailSignupUserReturns>>}
     */
    auth_email_signup_user(params: AuthEmailSignupUserParams, method?: HttpMethod): Promise<MoodleResponse<AuthEmailSignupUserReturns>>;
    /**
     * Gets error data for course modules.
     *
     * @param {BlockAccessreviewGetModuleDataParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<BlockAccessreviewGetModuleDataReturns>>}
     */
    block_accessreview_get_module_data(params: BlockAccessreviewGetModuleDataParams, method?: HttpMethod): Promise<MoodleResponse<BlockAccessreviewGetModuleDataReturns>>;
    /**
     * Gets error data for course sections.
     *
     * @param {BlockAccessreviewGetSectionDataParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<BlockAccessreviewGetSectionDataReturns>>}
     */
    block_accessreview_get_section_data(params: BlockAccessreviewGetSectionDataParams, method?: HttpMethod): Promise<MoodleResponse<BlockAccessreviewGetSectionDataReturns>>;
    /**
     * List of items a user has accessed most recently.
     *
     * @param {BlockRecentlyaccesseditemsGetRecentItemsParams} [params]
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<BlockRecentlyaccesseditemsGetRecentItemsReturns>>} - The most recently accessed activities/resources by the logged user
     */
    block_recentlyaccesseditems_get_recent_items(params?: BlockRecentlyaccesseditemsGetRecentItemsParams, method?: HttpMethod): Promise<MoodleResponse<BlockRecentlyaccesseditemsGetRecentItemsReturns>>;
    /**
     * Get users starred courses.
     *
     * @param {BlockStarredcoursesGetStarredCoursesParams} [params]
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<BlockStarredcoursesGetStarredCoursesReturns>>}
     */
    block_starredcourses_get_starred_courses(params?: BlockStarredcoursesGetStarredCoursesParams, method?: HttpMethod): Promise<MoodleResponse<BlockStarredcoursesGetStarredCoursesReturns>>;
    /**
     * This web service is used to recalculate the value of automatically populated number custom field.
     *
     * @param {CustomfieldNumberRecalculateValueParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CustomfieldNumberRecalculateValueReturns>>}
     */
    customfield_number_recalculate_value(params: CustomfieldNumberRecalculateValueParams, method?: HttpMethod): Promise<MoodleResponse<CustomfieldNumberRecalculateValueReturns>>;
    /**
     * Return guest enrolment instance information.
     *
     * @param {EnrolGuestGetInstanceInfoParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<EnrolGuestGetInstanceInfoReturns>>}
     */
    enrol_guest_get_instance_info(params: EnrolGuestGetInstanceInfoParams, method?: HttpMethod): Promise<MoodleResponse<EnrolGuestGetInstanceInfoReturns>>;
    /**
     * Perform password validation.
     *
     * @param {EnrolGuestValidatePasswordParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<EnrolGuestValidatePasswordReturns>>}
     */
    enrol_guest_validate_password(params: EnrolGuestValidatePasswordParams, method?: HttpMethod): Promise<MoodleResponse<EnrolGuestValidatePasswordReturns>>;
    /**
     * Manual enrol users
     *
     * @param {EnrolManualEnrolUsersParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<EnrolManualEnrolUsersReturns>>}
     */
    enrol_manual_enrol_users(params: EnrolManualEnrolUsersParams, method?: HttpMethod): Promise<MoodleResponse<EnrolManualEnrolUsersReturns>>;
    /**
     * Manual unenrol users
     *
     * @param {EnrolManualUnenrolUsersParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<EnrolManualUnenrolUsersReturns>>}
     */
    enrol_manual_unenrol_users(params: EnrolManualUnenrolUsersParams, method?: HttpMethod): Promise<MoodleResponse<EnrolManualUnenrolUsersReturns>>;
    /**
     * Add meta enrolment instances
     *
     * @param {EnrolMetaAddInstancesParams} [params]
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<EnrolMetaAddInstancesReturns>>} - List of course meta enrolment instances that were created.
     */
    enrol_meta_add_instances(params?: EnrolMetaAddInstancesParams, method?: HttpMethod): Promise<MoodleResponse<EnrolMetaAddInstancesReturns>>;
    /**
     * Delete meta enrolment instances
     *
     * @param {EnrolMetaDeleteInstancesParams} [params]
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<EnrolMetaDeleteInstancesReturns>>} - List of course meta enrolment instances that were deleted.
     */
    enrol_meta_delete_instances(params?: EnrolMetaDeleteInstancesParams, method?: HttpMethod): Promise<MoodleResponse<EnrolMetaDeleteInstancesReturns>>;
    /**
     * self enrolment instance information.
     *
     * @param {EnrolSelfGetInstanceInfoParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<EnrolSelfGetInstanceInfoReturns>>}
     */
    enrol_self_get_instance_info(params: EnrolSelfGetInstanceInfoParams, method?: HttpMethod): Promise<MoodleResponse<EnrolSelfGetInstanceInfoReturns>>;
    /**
     * Self enrol the current user in the given course.
     *
     * @param {EnrolSelfEnrolUserParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<EnrolSelfEnrolUserReturns>>}
     */
    enrol_self_enrol_user(params: EnrolSelfEnrolUserParams, method?: HttpMethod): Promise<MoodleResponse<EnrolSelfEnrolUserReturns>>;
    /**
     * @param {GradingformGuideGraderGradingpanelFetchParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<GradingformGuideGraderGradingpanelFetchReturns>>}
     */
    gradingform_guide_grader_gradingpanel_fetch(params: GradingformGuideGraderGradingpanelFetchParams, method?: HttpMethod): Promise<MoodleResponse<GradingformGuideGraderGradingpanelFetchReturns>>;
    /**
     * Store the grading data for a user from the grader grading panel.
     *
     * @param {GradingformGuideGraderGradingpanelStoreParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<GradingformGuideGraderGradingpanelStoreReturns>>}
     */
    gradingform_guide_grader_gradingpanel_store(params: GradingformGuideGraderGradingpanelStoreParams, method?: HttpMethod): Promise<MoodleResponse<GradingformGuideGraderGradingpanelStoreReturns>>;
    /**
     * @param {GradingformRubricGraderGradingpanelFetchParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<GradingformRubricGraderGradingpanelFetchReturns>>}
     */
    gradingform_rubric_grader_gradingpanel_fetch(params: GradingformRubricGraderGradingpanelFetchParams, method?: HttpMethod): Promise<MoodleResponse<GradingformRubricGraderGradingpanelFetchReturns>>;
    /**
     * Store the grading data for a user from the grader grading panel.
     *
     * @param {GradingformRubricGraderGradingpanelStoreParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<GradingformRubricGraderGradingpanelStoreReturns>>}
     */
    gradingform_rubric_grader_gradingpanel_store(params: GradingformRubricGraderGradingpanelStoreParams, method?: HttpMethod): Promise<MoodleResponse<GradingformRubricGraderGradingpanelStoreReturns>>;
    /**
     * Returns the dataset of users within the report
     *
     * @param {GradereportGraderGetUsersInReportParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<GradereportGraderGetUsersInReportReturns>>}
     */
    gradereport_grader_get_users_in_report(params: GradereportGraderGetUsersInReportParams, method?: HttpMethod): Promise<MoodleResponse<GradereportGraderGetUsersInReportReturns>>;
    /**
     * Get the given user courses final grades
     *
     * @param {GradereportOverviewGetCourseGradesParams} [params]
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<GradereportOverviewGetCourseGradesReturns>>}
     */
    gradereport_overview_get_course_grades(params?: GradereportOverviewGetCourseGradesParams, method?: HttpMethod): Promise<MoodleResponse<GradereportOverviewGetCourseGradesReturns>>;
    /**
     * Trigger the report view event
     *
     * @param {GradereportOverviewViewGradeReportParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<GradereportOverviewViewGradeReportReturns>>}
     */
    gradereport_overview_view_grade_report(params: GradereportOverviewViewGradeReportParams, method?: HttpMethod): Promise<MoodleResponse<GradereportOverviewViewGradeReportReturns>>;
    /**
     * Get the gradeitem/(s) for a course
     *
     * @param {GradereportSingleviewGetGradeItemsForSearchWidgetParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<GradereportSingleviewGetGradeItemsForSearchWidgetReturns>>}
     */
    gradereport_singleview_get_grade_items_for_search_widget(params: GradereportSingleviewGetGradeItemsForSearchWidgetParams, method?: HttpMethod): Promise<MoodleResponse<GradereportSingleviewGetGradeItemsForSearchWidgetReturns>>;
    /**
     * Get the user/s report grades table for a course
     *
     * @param {GradereportUserGetGradesTableParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<GradereportUserGetGradesTableReturns>>}
     */
    gradereport_user_get_grades_table(params: GradereportUserGetGradesTableParams, method?: HttpMethod): Promise<MoodleResponse<GradereportUserGetGradesTableReturns>>;
    /**
     * Trigger the report view event
     *
     * @param {GradereportUserViewGradeReportParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<GradereportUserViewGradeReportReturns>>}
     */
    gradereport_user_view_grade_report(params: GradereportUserViewGradeReportParams, method?: HttpMethod): Promise<MoodleResponse<GradereportUserViewGradeReportReturns>>;
    /**
     * Returns the complete list of grade items for users in a course
     *
     * @param {GradereportUserGetGradeItemsParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<GradereportUserGetGradeItemsReturns>>}
     */
    gradereport_user_get_grade_items(params: GradereportUserGetGradeItemsParams, method?: HttpMethod): Promise<MoodleResponse<GradereportUserGetGradeItemsReturns>>;
    /**
     * Returns user access information for the user grade report.
     *
     * @param {GradereportUserGetAccessInformationParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<GradereportUserGetAccessInformationReturns>>}
     */
    gradereport_user_get_access_information(params: GradereportUserGetAccessInformationParams, method?: HttpMethod): Promise<MoodleResponse<GradereportUserGetAccessInformationReturns>>;
    /**
     * Confirm a user account.
     *
     * @param {CoreAuthConfirmUserParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreAuthConfirmUserReturns>>}
     */
    core_auth_confirm_user(params: CoreAuthConfirmUserParams, method?: HttpMethod): Promise<MoodleResponse<CoreAuthConfirmUserReturns>>;
    /**
     * Requests a password reset.
     *
     * @param {CoreAuthRequestPasswordResetParams} [params]
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreAuthRequestPasswordResetReturns>>}
     */
    core_auth_request_password_reset(params?: CoreAuthRequestPasswordResetParams, method?: HttpMethod): Promise<MoodleResponse<CoreAuthRequestPasswordResetReturns>>;
    /**
     * Requests a check if a user is a digital minor.
     *
     * @param {CoreAuthIsMinorParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreAuthIsMinorReturns>>}
     */
    core_auth_is_minor(params: CoreAuthIsMinorParams, method?: HttpMethod): Promise<MoodleResponse<CoreAuthIsMinorReturns>>;
    /**
     * Checks if age digital consent verification is enabled.
     *
     * @param {CoreAuthIsAgeDigitalConsentVerificationEnabledParams} [params]
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreAuthIsAgeDigitalConsentVerificationEnabledReturns>>}
     */
    core_auth_is_age_digital_consent_verification_enabled(params?: CoreAuthIsAgeDigitalConsentVerificationEnabledParams, method?: HttpMethod): Promise<MoodleResponse<CoreAuthIsAgeDigitalConsentVerificationEnabledReturns>>;
    /**
     * Resend confirmation email.
     *
     * @param {CoreAuthResendConfirmationEmailParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreAuthResendConfirmationEmailReturns>>}
     */
    core_auth_resend_confirmation_email(params: CoreAuthResendConfirmationEmailParams, method?: HttpMethod): Promise<MoodleResponse<CoreAuthResendConfirmationEmailReturns>>;
    /**
     * Get the progress of an Asyncronhous backup.
     *
     * @param {CoreBackupGetAsyncBackupProgressParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreBackupGetAsyncBackupProgressReturns>>} - Backup data
     */
    core_backup_get_async_backup_progress(params: CoreBackupGetAsyncBackupProgressParams, method?: HttpMethod): Promise<MoodleResponse<CoreBackupGetAsyncBackupProgressReturns>>;
    /**
     * Gets the data to use when updating the status table row in the UI for when an async backup completes.
     *
     * @param {CoreBackupGetAsyncBackupLinksBackupParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreBackupGetAsyncBackupLinksBackupReturns>>} - Table row data.
     */
    core_backup_get_async_backup_links_backup(params: CoreBackupGetAsyncBackupLinksBackupParams, method?: HttpMethod): Promise<MoodleResponse<CoreBackupGetAsyncBackupLinksBackupReturns>>;
    /**
     * Gets the data to use when updating the status table row in the UI for when an async restore completes.
     *
     * @param {CoreBackupGetAsyncBackupLinksRestoreParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreBackupGetAsyncBackupLinksRestoreReturns>>} - Table row data.
     */
    core_backup_get_async_backup_links_restore(params: CoreBackupGetAsyncBackupLinksRestoreParams, method?: HttpMethod): Promise<MoodleResponse<CoreBackupGetAsyncBackupLinksRestoreReturns>>;
    /**
     * Gets the progress of course copy operations.
     *
     * @param {CoreBackupGetCopyProgressParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreBackupGetCopyProgressReturns>>} - Copy data
     */
    core_backup_get_copy_progress(params: CoreBackupGetCopyProgressParams, method?: HttpMethod): Promise<MoodleResponse<CoreBackupGetCopyProgressReturns>>;
    /**
     * Handles ajax submission of course copy form.
     *
     * @param {CoreBackupSubmitCopyFormParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreBackupSubmitCopyFormReturns>>} - JSON response.
     */
    core_backup_submit_copy_form(params: CoreBackupSubmitCopyFormParams, method?: HttpMethod): Promise<MoodleResponse<CoreBackupSubmitCopyFormReturns>>;
    /**
     * Disable badges
     *
     * @param {CoreBadgesDisableBadgesParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreBadgesDisableBadgesReturns>>}
     */
    core_badges_disable_badges(params: CoreBadgesDisableBadgesParams, method?: HttpMethod): Promise<MoodleResponse<CoreBadgesDisableBadgesReturns>>;
    /**
     * Enable badges
     *
     * @param {CoreBadgesEnableBadgesParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreBadgesEnableBadgesReturns>>}
     */
    core_badges_enable_badges(params: CoreBadgesEnableBadgesParams, method?: HttpMethod): Promise<MoodleResponse<CoreBadgesEnableBadgesReturns>>;
    /**
     * Retrieves a badge by id.
     *
     * @param {CoreBadgesGetBadgeParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreBadgesGetBadgeReturns>>}
     */
    core_badges_get_badge(params: CoreBadgesGetBadgeParams, method?: HttpMethod): Promise<MoodleResponse<CoreBadgesGetBadgeReturns>>;
    /**
     * Returns the list of badges awarded to a user.
     *
     * @param {CoreBadgesGetUserBadgesParams} [params]
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreBadgesGetUserBadgesReturns>>}
     */
    core_badges_get_user_badges(params?: CoreBadgesGetUserBadgesParams, method?: HttpMethod): Promise<MoodleResponse<CoreBadgesGetUserBadgesReturns>>;
    /**
     * Returns the badge awarded to a user by hash.
     *
     * @param {CoreBadgesGetUserBadgeByHashParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreBadgesGetUserBadgeByHashReturns>>}
     */
    core_badges_get_user_badge_by_hash(params: CoreBadgesGetUserBadgeByHashParams, method?: HttpMethod): Promise<MoodleResponse<CoreBadgesGetUserBadgeByHashReturns>>;
    /**
     * Returns blog entries.
     *
     * @param {CoreBlogGetEntriesParams} [params]
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreBlogGetEntriesReturns>>}
     */
    core_blog_get_entries(params?: CoreBlogGetEntriesParams, method?: HttpMethod): Promise<MoodleResponse<CoreBlogGetEntriesReturns>>;
    /**
     * Trigger the blog_entries_viewed event.
     *
     * @param {CoreBlogViewEntriesParams} [params]
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreBlogViewEntriesReturns>>}
     */
    core_blog_view_entries(params?: CoreBlogViewEntriesParams, method?: HttpMethod): Promise<MoodleResponse<CoreBlogViewEntriesReturns>>;
    /**
     * Retrieves permission information for the current user.
     *
     * @param {CoreBlogGetAccessInformationParams} [params]
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreBlogGetAccessInformationReturns>>}
     */
    core_blog_get_access_information(params?: CoreBlogGetAccessInformationParams, method?: HttpMethod): Promise<MoodleResponse<CoreBlogGetAccessInformationReturns>>;
    /**
     * Creates a new blog post entry.
     *
     * @param {CoreBlogAddEntryParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreBlogAddEntryReturns>>}
     */
    core_blog_add_entry(params: CoreBlogAddEntryParams, method?: HttpMethod): Promise<MoodleResponse<CoreBlogAddEntryReturns>>;
    /**
     * Deletes a blog post entry.
     *
     * @param {CoreBlogDeleteEntryParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreBlogDeleteEntryReturns>>}
     */
    core_blog_delete_entry(params: CoreBlogDeleteEntryParams, method?: HttpMethod): Promise<MoodleResponse<CoreBlogDeleteEntryReturns>>;
    /**
     * Prepare a draft area for editing a blog entry..
     *
     * @param {CoreBlogPrepareEntryForEditionParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreBlogPrepareEntryForEditionReturns>>}
     */
    core_blog_prepare_entry_for_edition(params: CoreBlogPrepareEntryForEditionParams, method?: HttpMethod): Promise<MoodleResponse<CoreBlogPrepareEntryForEditionReturns>>;
    /**
     * Updates a blog entry.
     *
     * @param {CoreBlogUpdateEntryParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreBlogUpdateEntryReturns>>}
     */
    core_blog_update_entry(params: CoreBlogUpdateEntryParams, method?: HttpMethod): Promise<MoodleResponse<CoreBlogUpdateEntryReturns>>;
    /**
     * Fetch the monthly view data for a calendar
     *
     * @param {CoreCalendarGetCalendarMonthlyViewParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCalendarGetCalendarMonthlyViewReturns>>}
     */
    core_calendar_get_calendar_monthly_view(params: CoreCalendarGetCalendarMonthlyViewParams, method?: HttpMethod): Promise<MoodleResponse<CoreCalendarGetCalendarMonthlyViewReturns>>;
    /**
     * Fetch the day view data for a calendar
     *
     * @param {CoreCalendarGetCalendarDayViewParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCalendarGetCalendarDayViewReturns>>}
     */
    core_calendar_get_calendar_day_view(params: CoreCalendarGetCalendarDayViewParams, method?: HttpMethod): Promise<MoodleResponse<CoreCalendarGetCalendarDayViewReturns>>;
    /**
     * Fetch the upcoming view data for a calendar
     *
     * @param {CoreCalendarGetCalendarUpcomingViewParams} [params]
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCalendarGetCalendarUpcomingViewReturns>>}
     */
    core_calendar_get_calendar_upcoming_view(params?: CoreCalendarGetCalendarUpcomingViewParams, method?: HttpMethod): Promise<MoodleResponse<CoreCalendarGetCalendarUpcomingViewReturns>>;
    /**
     * Update the start day (but not time) for an event.
     *
     * @param {CoreCalendarUpdateEventStartDayParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCalendarUpdateEventStartDayReturns>>}
     */
    core_calendar_update_event_start_day(params: CoreCalendarUpdateEventStartDayParams, method?: HttpMethod): Promise<MoodleResponse<CoreCalendarUpdateEventStartDayReturns>>;
    /**
     * Create calendar events
     *
     * @param {CoreCalendarCreateCalendarEventsParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCalendarCreateCalendarEventsReturns>>}
     */
    core_calendar_create_calendar_events(params: CoreCalendarCreateCalendarEventsParams, method?: HttpMethod): Promise<MoodleResponse<CoreCalendarCreateCalendarEventsReturns>>;
    /**
     * Delete calendar events
     *
     * @param {CoreCalendarDeleteCalendarEventsParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCalendarDeleteCalendarEventsReturns>>}
     */
    core_calendar_delete_calendar_events(params: CoreCalendarDeleteCalendarEventsParams, method?: HttpMethod): Promise<MoodleResponse<CoreCalendarDeleteCalendarEventsReturns>>;
    /**
     * Get calendar events
     *
     * @param {CoreCalendarGetCalendarEventsParams} [params]
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCalendarGetCalendarEventsReturns>>}
     */
    core_calendar_get_calendar_events(params?: CoreCalendarGetCalendarEventsParams, method?: HttpMethod): Promise<MoodleResponse<CoreCalendarGetCalendarEventsReturns>>;
    /**
     * Get calendar action events by tiemsort
     *
     * @param {CoreCalendarGetActionEventsByTimesortParams} [params]
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCalendarGetActionEventsByTimesortReturns>>}
     */
    core_calendar_get_action_events_by_timesort(params?: CoreCalendarGetActionEventsByTimesortParams, method?: HttpMethod): Promise<MoodleResponse<CoreCalendarGetActionEventsByTimesortReturns>>;
    /**
     * Get calendar action events by course
     *
     * @param {CoreCalendarGetActionEventsByCourseParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCalendarGetActionEventsByCourseReturns>>}
     */
    core_calendar_get_action_events_by_course(params: CoreCalendarGetActionEventsByCourseParams, method?: HttpMethod): Promise<MoodleResponse<CoreCalendarGetActionEventsByCourseReturns>>;
    /**
     * Get calendar action events by courses
     *
     * @param {CoreCalendarGetActionEventsByCoursesParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCalendarGetActionEventsByCoursesReturns>>}
     */
    core_calendar_get_action_events_by_courses(params: CoreCalendarGetActionEventsByCoursesParams, method?: HttpMethod): Promise<MoodleResponse<CoreCalendarGetActionEventsByCoursesReturns>>;
    /**
     * Get calendar event by id
     *
     * @param {CoreCalendarGetCalendarEventByIdParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCalendarGetCalendarEventByIdReturns>>}
     */
    core_calendar_get_calendar_event_by_id(params: CoreCalendarGetCalendarEventByIdParams, method?: HttpMethod): Promise<MoodleResponse<CoreCalendarGetCalendarEventByIdReturns>>;
    /**
     * Submit form data for event form
     *
     * @param {CoreCalendarSubmitCreateUpdateFormParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCalendarSubmitCreateUpdateFormReturns>>}
     */
    core_calendar_submit_create_update_form(params: CoreCalendarSubmitCreateUpdateFormParams, method?: HttpMethod): Promise<MoodleResponse<CoreCalendarSubmitCreateUpdateFormReturns>>;
    /**
     * Convenience function to retrieve some permissions/access information for the given course calendar.
     *
     * @param {CoreCalendarGetCalendarAccessInformationParams} [params]
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCalendarGetCalendarAccessInformationReturns>>}
     */
    core_calendar_get_calendar_access_information(params?: CoreCalendarGetCalendarAccessInformationParams, method?: HttpMethod): Promise<MoodleResponse<CoreCalendarGetCalendarAccessInformationReturns>>;
    /**
     * Get the type of events a user can create in the given course.
     *
     * @param {CoreCalendarGetAllowedEventTypesParams} [params]
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCalendarGetAllowedEventTypesReturns>>}
     */
    core_calendar_get_allowed_event_types(params?: CoreCalendarGetAllowedEventTypesParams, method?: HttpMethod): Promise<MoodleResponse<CoreCalendarGetAllowedEventTypesReturns>>;
    /**
     * Fetch unix timestamps for given date times.
     *
     * @param {CoreCalendarGetTimestampsParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCalendarGetTimestampsReturns>>}
     */
    core_calendar_get_timestamps(params: CoreCalendarGetTimestampsParams, method?: HttpMethod): Promise<MoodleResponse<CoreCalendarGetTimestampsReturns>>;
    /**
     * Return the auth token required for exporting a calendar.
     *
     * @param {CoreCalendarGetCalendarExportTokenParams} [params]
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCalendarGetCalendarExportTokenReturns>>}
     */
    core_calendar_get_calendar_export_token(params?: CoreCalendarGetCalendarExportTokenParams, method?: HttpMethod): Promise<MoodleResponse<CoreCalendarGetCalendarExportTokenReturns>>;
    /**
     * Delete the calendar subscription
     *
     * @param {CoreCalendarDeleteSubscriptionParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCalendarDeleteSubscriptionReturns>>}
     */
    core_calendar_delete_subscription(params: CoreCalendarDeleteSubscriptionParams, method?: HttpMethod): Promise<MoodleResponse<CoreCalendarDeleteSubscriptionReturns>>;
    /**
     * Executes a check stored in the admin tree and returns the result
     *
     * @param {CoreCheckGetResultAdmintreeParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCheckGetResultAdmintreeReturns>>}
     */
    core_check_get_result_admintree(params: CoreCheckGetResultAdmintreeParams, method?: HttpMethod): Promise<MoodleResponse<CoreCheckGetResultAdmintreeReturns>>;
    /**
     * Adds cohort members.
     *
     * @param {CoreCohortAddCohortMembersParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCohortAddCohortMembersReturns>>}
     */
    core_cohort_add_cohort_members(params: CoreCohortAddCohortMembersParams, method?: HttpMethod): Promise<MoodleResponse<CoreCohortAddCohortMembersReturns>>;
    /**
     * Creates new cohorts.
     *
     * @param {CoreCohortCreateCohortsParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCohortCreateCohortsReturns>>}
     */
    core_cohort_create_cohorts(params: CoreCohortCreateCohortsParams, method?: HttpMethod): Promise<MoodleResponse<CoreCohortCreateCohortsReturns>>;
    /**
     * Deletes cohort members.
     *
     * @param {CoreCohortDeleteCohortMembersParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCohortDeleteCohortMembersReturns>>}
     */
    core_cohort_delete_cohort_members(params: CoreCohortDeleteCohortMembersParams, method?: HttpMethod): Promise<MoodleResponse<CoreCohortDeleteCohortMembersReturns>>;
    /**
     * Deletes all specified cohorts.
     *
     * @param {CoreCohortDeleteCohortsParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCohortDeleteCohortsReturns>>}
     */
    core_cohort_delete_cohorts(params: CoreCohortDeleteCohortsParams, method?: HttpMethod): Promise<MoodleResponse<CoreCohortDeleteCohortsReturns>>;
    /**
     * Returns cohort members.
     *
     * @param {CoreCohortGetCohortMembersParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCohortGetCohortMembersReturns>>}
     */
    core_cohort_get_cohort_members(params: CoreCohortGetCohortMembersParams, method?: HttpMethod): Promise<MoodleResponse<CoreCohortGetCohortMembersReturns>>;
    /**
     * Search for cohorts.
     *
     * @param {CoreCohortSearchCohortsParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCohortSearchCohortsReturns>>}
     */
    core_cohort_search_cohorts(params: CoreCohortSearchCohortsParams, method?: HttpMethod): Promise<MoodleResponse<CoreCohortSearchCohortsReturns>>;
    /**
     * Returns cohort details.
     *
     * @param {CoreCohortGetCohortsParams} [params]
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCohortGetCohortsReturns>>}
     */
    core_cohort_get_cohorts(params?: CoreCohortGetCohortsParams, method?: HttpMethod): Promise<MoodleResponse<CoreCohortGetCohortsReturns>>;
    /**
     * Updates existing cohorts.
     *
     * @param {CoreCohortUpdateCohortsParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCohortUpdateCohortsReturns>>}
     */
    core_cohort_update_cohorts(params: CoreCohortUpdateCohortsParams, method?: HttpMethod): Promise<MoodleResponse<CoreCohortUpdateCohortsReturns>>;
    /**
     * Returns comments.
     *
     * @param {CoreCommentGetCommentsParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCommentGetCommentsReturns>>}
     */
    core_comment_get_comments(params: CoreCommentGetCommentsParams, method?: HttpMethod): Promise<MoodleResponse<CoreCommentGetCommentsReturns>>;
    /**
     * Adds a comment or comments.
     *
     * @param {CoreCommentAddCommentsParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCommentAddCommentsReturns>>}
     */
    core_comment_add_comments(params: CoreCommentAddCommentsParams, method?: HttpMethod): Promise<MoodleResponse<CoreCommentAddCommentsReturns>>;
    /**
     * Deletes a comment or comments.
     *
     * @param {CoreCommentDeleteCommentsParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCommentDeleteCommentsReturns>>} - list of warnings
     */
    core_comment_delete_comments(params: CoreCommentDeleteCommentsParams, method?: HttpMethod): Promise<MoodleResponse<CoreCommentDeleteCommentsReturns>>;
    /**
     * Return the activities completion status for a user in a course.
     *
     * @param {CoreCompletionGetActivitiesCompletionStatusParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCompletionGetActivitiesCompletionStatusReturns>>}
     */
    core_completion_get_activities_completion_status(params: CoreCompletionGetActivitiesCompletionStatusParams, method?: HttpMethod): Promise<MoodleResponse<CoreCompletionGetActivitiesCompletionStatusReturns>>;
    /**
     * Returns course completion status.
     *
     * @param {CoreCompletionGetCourseCompletionStatusParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCompletionGetCourseCompletionStatusReturns>>} - Course completion status
     */
    core_completion_get_course_completion_status(params: CoreCompletionGetCourseCompletionStatusParams, method?: HttpMethod): Promise<MoodleResponse<CoreCompletionGetCourseCompletionStatusReturns>>;
    /**
     * Update the course completion status for the current user (if course self-completion is enabled).
     *
     * @param {CoreCompletionMarkCourseSelfCompletedParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCompletionMarkCourseSelfCompletedReturns>>}
     */
    core_completion_mark_course_self_completed(params: CoreCompletionMarkCourseSelfCompletedParams, method?: HttpMethod): Promise<MoodleResponse<CoreCompletionMarkCourseSelfCompletedReturns>>;
    /**
     * Update completion status for the current user in an activity, only for activities with manual tracking.
     *
     * @param {CoreCompletionUpdateActivityCompletionStatusManuallyParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCompletionUpdateActivityCompletionStatusManuallyReturns>>}
     */
    core_completion_update_activity_completion_status_manually(params: CoreCompletionUpdateActivityCompletionStatusManuallyParams, method?: HttpMethod): Promise<MoodleResponse<CoreCompletionUpdateActivityCompletionStatusManuallyReturns>>;
    /**
     * Update completion status for a user in an activity by overriding it.
     *
     * @param {CoreCompletionOverrideActivityCompletionStatusParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCompletionOverrideActivityCompletionStatusReturns>>}
     */
    core_completion_override_activity_completion_status(params: CoreCompletionOverrideActivityCompletionStatusParams, method?: HttpMethod): Promise<MoodleResponse<CoreCompletionOverrideActivityCompletionStatusReturns>>;
    /**
     * Create course categories
     *
     * @param {CoreCourseCreateCategoriesParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCourseCreateCategoriesReturns>>}
     */
    core_course_create_categories(params: CoreCourseCreateCategoriesParams, method?: HttpMethod): Promise<MoodleResponse<CoreCourseCreateCategoriesReturns>>;
    /**
     * Create new courses
     *
     * @param {CoreCourseCreateCoursesParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCourseCreateCoursesReturns>>}
     */
    core_course_create_courses(params: CoreCourseCreateCoursesParams, method?: HttpMethod): Promise<MoodleResponse<CoreCourseCreateCoursesReturns>>;
    /**
     * Delete course categories
     *
     * @param {CoreCourseDeleteCategoriesParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCourseDeleteCategoriesReturns>>}
     */
    core_course_delete_categories(params: CoreCourseDeleteCategoriesParams, method?: HttpMethod): Promise<MoodleResponse<CoreCourseDeleteCategoriesReturns>>;
    /**
     * Deletes all specified courses
     *
     * @param {CoreCourseDeleteCoursesParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCourseDeleteCoursesReturns>>}
     */
    core_course_delete_courses(params: CoreCourseDeleteCoursesParams, method?: HttpMethod): Promise<MoodleResponse<CoreCourseDeleteCoursesReturns>>;
    /**
     * Deletes all specified module instances
     *
     * @param {CoreCourseDeleteModulesParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCourseDeleteModulesReturns>>}
     */
    core_course_delete_modules(params: CoreCourseDeleteModulesParams, method?: HttpMethod): Promise<MoodleResponse<CoreCourseDeleteModulesReturns>>;
    /**
     * Duplicate an existing course (creating a new one).
     *
     * @param {CoreCourseDuplicateCourseParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCourseDuplicateCourseReturns>>}
     */
    core_course_duplicate_course(params: CoreCourseDuplicateCourseParams, method?: HttpMethod): Promise<MoodleResponse<CoreCourseDuplicateCourseReturns>>;
    /**
     * Return category details
     *
     * @param {CoreCourseGetCategoriesParams} [params]
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCourseGetCategoriesReturns>>}
     */
    core_course_get_categories(params?: CoreCourseGetCategoriesParams, method?: HttpMethod): Promise<MoodleResponse<CoreCourseGetCategoriesReturns>>;
    /**
     * Get course contents
     *
     * @param {CoreCourseGetContentsParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCourseGetContentsReturns>>}
     */
    core_course_get_contents(params: CoreCourseGetContentsParams, method?: HttpMethod): Promise<MoodleResponse<CoreCourseGetContentsReturns>>;
    /**
     * Return information about a course module
     *
     * @param {CoreCourseGetCourseModuleParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCourseGetCourseModuleReturns>>}
     */
    core_course_get_course_module(params: CoreCourseGetCourseModuleParams, method?: HttpMethod): Promise<MoodleResponse<CoreCourseGetCourseModuleReturns>>;
    /**
     * Return information about a given module name and instance id
     *
     * @param {CoreCourseGetCourseModuleByInstanceParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCourseGetCourseModuleByInstanceReturns>>}
     */
    core_course_get_course_module_by_instance(params: CoreCourseGetCourseModuleByInstanceParams, method?: HttpMethod): Promise<MoodleResponse<CoreCourseGetCourseModuleByInstanceReturns>>;
    /**
     * Returns html with one activity module on course page
     *
     * @param {CoreCourseGetModuleParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCourseGetModuleReturns>>} - html to replace the current module with
     */
    core_course_get_module(params: CoreCourseGetModuleParams, method?: HttpMethod): Promise<MoodleResponse<CoreCourseGetModuleReturns>>;
    /**
     * Get the current course file hanlders.
     *
     * @param {CoreCourseformatFileHandlersParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCourseformatFileHandlersReturns>>}
     */
    core_courseformat_file_handlers(params: CoreCourseformatFileHandlersParams, method?: HttpMethod): Promise<MoodleResponse<CoreCourseformatFileHandlersReturns>>;
    /**
     * Get the current course state.
     *
     * @param {CoreCourseformatGetStateParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCourseformatGetStateReturns>>} - Encoded course state JSON
     */
    core_courseformat_get_state(params: CoreCourseformatGetStateParams, method?: HttpMethod): Promise<MoodleResponse<CoreCourseformatGetStateReturns>>;
    /**
     * Update course contents.
     *
     * @param {CoreCourseformatUpdateCourseParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCourseformatUpdateCourseReturns>>} - Encoded course update JSON
     */
    core_courseformat_update_course(params: CoreCourseformatUpdateCourseParams, method?: HttpMethod): Promise<MoodleResponse<CoreCourseformatUpdateCourseReturns>>;
    /**
     * Add module to course.
     *
     * @param {CoreCourseformatCreateModuleParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCourseformatCreateModuleReturns>>} - Encoded course update JSON
     */
    core_courseformat_create_module(params: CoreCourseformatCreateModuleParams, method?: HttpMethod): Promise<MoodleResponse<CoreCourseformatCreateModuleReturns>>;
    /**
     * Performs an action on course module (change visibility, duplicate, delete, etc.)
     *
     * @param {CoreCourseEditModuleParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCourseEditModuleReturns>>} - html to replace the current module with
     */
    core_course_edit_module(params: CoreCourseEditModuleParams, method?: HttpMethod): Promise<MoodleResponse<CoreCourseEditModuleReturns>>;
    /**
     * Performs an action on course section (change visibility, set marker, delete)
     *
     * @param {CoreCourseEditSectionParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCourseEditSectionReturns>>} - Additional data for javascript (JSON-encoded string)
     */
    core_course_edit_section(params: CoreCourseEditSectionParams, method?: HttpMethod): Promise<MoodleResponse<CoreCourseEditSectionReturns>>;
    /**
     * Return course details
     *
     * @param {CoreCourseGetCoursesParams} [params]
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCourseGetCoursesReturns>>}
     */
    core_course_get_courses(params?: CoreCourseGetCoursesParams, method?: HttpMethod): Promise<MoodleResponse<CoreCourseGetCoursesReturns>>;
    /**
     * Import course data from a course into another course. Does not include any user data.
     *
     * @param {CoreCourseImportCourseParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCourseImportCourseReturns>>}
     */
    core_course_import_course(params: CoreCourseImportCourseParams, method?: HttpMethod): Promise<MoodleResponse<CoreCourseImportCourseReturns>>;
    /**
     * Search courses by (name, module, block, tag)
     *
     * @param {CoreCourseSearchCoursesParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCourseSearchCoursesReturns>>}
     */
    core_course_search_courses(params: CoreCourseSearchCoursesParams, method?: HttpMethod): Promise<MoodleResponse<CoreCourseSearchCoursesReturns>>;
    /**
     * Update categories
     *
     * @param {CoreCourseUpdateCategoriesParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCourseUpdateCategoriesReturns>>}
     */
    core_course_update_categories(params: CoreCourseUpdateCategoriesParams, method?: HttpMethod): Promise<MoodleResponse<CoreCourseUpdateCategoriesReturns>>;
    /**
     * Update courses
     *
     * @param {CoreCourseUpdateCoursesParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCourseUpdateCoursesReturns>>}
     */
    core_course_update_courses(params: CoreCourseUpdateCoursesParams, method?: HttpMethod): Promise<MoodleResponse<CoreCourseUpdateCoursesReturns>>;
    /**
     * Log that the course was viewed
     *
     * @param {CoreCourseViewCourseParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCourseViewCourseReturns>>}
     */
    core_course_view_course(params: CoreCourseViewCourseParams, method?: HttpMethod): Promise<MoodleResponse<CoreCourseViewCourseReturns>>;
    /**
     * Return a list of navigation options in a set of courses that are avaialable or not for the current user.
     *
     * @param {CoreCourseGetUserNavigationOptionsParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCourseGetUserNavigationOptionsReturns>>}
     */
    core_course_get_user_navigation_options(params: CoreCourseGetUserNavigationOptionsParams, method?: HttpMethod): Promise<MoodleResponse<CoreCourseGetUserNavigationOptionsReturns>>;
    /**
     * Return a list of administration options in a set of courses that are avaialable or not for the current user.
     *
     * @param {CoreCourseGetUserAdministrationOptionsParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCourseGetUserAdministrationOptionsReturns>>}
     */
    core_course_get_user_administration_options(params: CoreCourseGetUserAdministrationOptionsParams, method?: HttpMethod): Promise<MoodleResponse<CoreCourseGetUserAdministrationOptionsReturns>>;
    /**
     * Get courses matching a specific field (id/s, shortname, idnumber, category)
     *
     * @param {CoreCourseGetCoursesByFieldParams} [params]
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCourseGetCoursesByFieldReturns>>}
     */
    core_course_get_courses_by_field(params?: CoreCourseGetCoursesByFieldParams, method?: HttpMethod): Promise<MoodleResponse<CoreCourseGetCoursesByFieldReturns>>;
    /**
     * Check if there is updates affecting the user for the given course and contexts.
     *
     * @param {CoreCourseCheckUpdatesParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCourseCheckUpdatesReturns>>}
     */
    core_course_check_updates(params: CoreCourseCheckUpdatesParams, method?: HttpMethod): Promise<MoodleResponse<CoreCourseCheckUpdatesReturns>>;
    /**
     * Check if there are updates affecting the user for the given course since the given time stamp.
     *
     * @param {CoreCourseGetUpdatesSinceParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCourseGetUpdatesSinceReturns>>}
     */
    core_course_get_updates_since(params: CoreCourseGetUpdatesSinceParams, method?: HttpMethod): Promise<MoodleResponse<CoreCourseGetUpdatesSinceReturns>>;
    /**
     * List of enrolled courses for the given timeline classification (past, inprogress, or future).
     *
     * @param {CoreCourseGetEnrolledCoursesByTimelineClassificationParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCourseGetEnrolledCoursesByTimelineClassificationReturns>>}
     */
    core_course_get_enrolled_courses_by_timeline_classification(params: CoreCourseGetEnrolledCoursesByTimelineClassificationParams, method?: HttpMethod): Promise<MoodleResponse<CoreCourseGetEnrolledCoursesByTimelineClassificationReturns>>;
    /**
     * List of enrolled courses with action events in a given timeframe, for the given timeline classification.
     *
     * @param {CoreCourseGetEnrolledCoursesWithActionEventsByTimelineClassificationParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCourseGetEnrolledCoursesWithActionEventsByTimelineClassificationReturns>>}
     */
    core_course_get_enrolled_courses_with_action_events_by_timeline_classification(params: CoreCourseGetEnrolledCoursesWithActionEventsByTimelineClassificationParams, method?: HttpMethod): Promise<MoodleResponse<CoreCourseGetEnrolledCoursesWithActionEventsByTimelineClassificationReturns>>;
    /**
     * List of courses a user has accessed most recently.
     *
     * @param {CoreCourseGetRecentCoursesParams} [params]
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCourseGetRecentCoursesReturns>>} - Courses
     */
    core_course_get_recent_courses(params?: CoreCourseGetRecentCoursesParams, method?: HttpMethod): Promise<MoodleResponse<CoreCourseGetRecentCoursesReturns>>;
    /**
     * Add a list of courses to the list of favourite courses.
     *
     * @param {CoreCourseSetFavouriteCoursesParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCourseSetFavouriteCoursesReturns>>}
     */
    core_course_set_favourite_courses(params: CoreCourseSetFavouriteCoursesParams, method?: HttpMethod): Promise<MoodleResponse<CoreCourseSetFavouriteCoursesReturns>>;
    /**
     * List users by course module id, filter by group and active enrolment status.
     *
     * @param {CoreCourseGetEnrolledUsersByCmidParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCourseGetEnrolledUsersByCmidReturns>>}
     */
    core_course_get_enrolled_users_by_cmid(params: CoreCourseGetEnrolledUsersByCmidParams, method?: HttpMethod): Promise<MoodleResponse<CoreCourseGetEnrolledUsersByCmidReturns>>;
    /**
     * Adds a content item (activity, resource or their subtypes) to the favourites for the user.
     *
     * @param {CoreCourseAddContentItemToUserFavouritesParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCourseAddContentItemToUserFavouritesReturns>>}
     */
    core_course_add_content_item_to_user_favourites(params: CoreCourseAddContentItemToUserFavouritesParams, method?: HttpMethod): Promise<MoodleResponse<CoreCourseAddContentItemToUserFavouritesReturns>>;
    /**
     * Removes a content item (activity, resource or their subtypes) from the favourites for the user.
     *
     * @param {CoreCourseRemoveContentItemFromUserFavouritesParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCourseRemoveContentItemFromUserFavouritesReturns>>}
     */
    core_course_remove_content_item_from_user_favourites(params: CoreCourseRemoveContentItemFromUserFavouritesParams, method?: HttpMethod): Promise<MoodleResponse<CoreCourseRemoveContentItemFromUserFavouritesReturns>>;
    /**
     * Fetch all the content items (activities, resources and their subtypes) for the activity picker
     *
     * @param {CoreCourseGetCourseContentItemsParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCourseGetCourseContentItemsReturns>>}
     */
    core_course_get_course_content_items(params: CoreCourseGetCourseContentItemsParams, method?: HttpMethod): Promise<MoodleResponse<CoreCourseGetCourseContentItemsReturns>>;
    /**
     * Fetch the data for the activity chooser footer.
     *
     * @param {CoreCourseGetActivityChooserFooterParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCourseGetActivityChooserFooterReturns>>}
     */
    core_course_get_activity_chooser_footer(params: CoreCourseGetActivityChooserFooterParams, method?: HttpMethod): Promise<MoodleResponse<CoreCourseGetActivityChooserFooterReturns>>;
    /**
     * Adds or removes an activity as a recommendation in the activity chooser.
     *
     * @param {CoreCourseToggleActivityRecommendationParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCourseToggleActivityRecommendationReturns>>}
     */
    core_course_toggle_activity_recommendation(params: CoreCourseToggleActivityRecommendationParams, method?: HttpMethod): Promise<MoodleResponse<CoreCourseToggleActivityRecommendationReturns>>;
    /**
     * Get the list of course enrolment methods
     *
     * @param {CoreEnrolGetCourseEnrolmentMethodsParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreEnrolGetCourseEnrolmentMethodsReturns>>}
     */
    core_enrol_get_course_enrolment_methods(params: CoreEnrolGetCourseEnrolmentMethodsParams, method?: HttpMethod): Promise<MoodleResponse<CoreEnrolGetCourseEnrolmentMethodsReturns>>;
    /**
     * Get enrolled users by course id.
     *
     * @param {CoreEnrolGetEnrolledUsersParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreEnrolGetEnrolledUsersReturns>>}
     */
    core_enrol_get_enrolled_users(params: CoreEnrolGetEnrolledUsersParams, method?: HttpMethod): Promise<MoodleResponse<CoreEnrolGetEnrolledUsersReturns>>;
    /**
     * For each course and capability specified, return a list of the users that are enrolled in the course and have that capability
     *
     * @param {CoreEnrolGetEnrolledUsersWithCapabilityParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreEnrolGetEnrolledUsersWithCapabilityReturns>>}
     */
    core_enrol_get_enrolled_users_with_capability(params: CoreEnrolGetEnrolledUsersWithCapabilityParams, method?: HttpMethod): Promise<MoodleResponse<CoreEnrolGetEnrolledUsersWithCapabilityReturns>>;
    /**
     * Get the list of potential users to enrol
     *
     * @param {CoreEnrolGetPotentialUsersParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreEnrolGetPotentialUsersReturns>>}
     */
    core_enrol_get_potential_users(params: CoreEnrolGetPotentialUsersParams, method?: HttpMethod): Promise<MoodleResponse<CoreEnrolGetPotentialUsersReturns>>;
    /**
     * Search within the list of course participants
     *
     * @param {CoreEnrolSearchUsersParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreEnrolSearchUsersReturns>>}
     */
    core_enrol_search_users(params: CoreEnrolSearchUsersParams, method?: HttpMethod): Promise<MoodleResponse<CoreEnrolSearchUsersReturns>>;
    /**
     * Get the list of courses where a user is enrolled in
     *
     * @param {CoreEnrolGetUsersCoursesParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreEnrolGetUsersCoursesReturns>>}
     */
    core_enrol_get_users_courses(params: CoreEnrolGetUsersCoursesParams, method?: HttpMethod): Promise<MoodleResponse<CoreEnrolGetUsersCoursesReturns>>;
    /**
     * Submit form data for enrolment form
     *
     * @param {CoreEnrolSubmitUserEnrolmentFormParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreEnrolSubmitUserEnrolmentFormReturns>>}
     */
    core_enrol_submit_user_enrolment_form(params: CoreEnrolSubmitUserEnrolmentFormParams, method?: HttpMethod): Promise<MoodleResponse<CoreEnrolSubmitUserEnrolmentFormReturns>>;
    /**
     * External function that unenrols a given user enrolment
     *
     * @param {CoreEnrolUnenrolUserEnrolmentParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreEnrolUnenrolUserEnrolmentReturns>>}
     */
    core_enrol_unenrol_user_enrolment(params: CoreEnrolUnenrolUserEnrolmentParams, method?: HttpMethod): Promise<MoodleResponse<CoreEnrolUnenrolUserEnrolmentReturns>>;
    /**
     * Return a list of notifications for the current session
     *
     * @param {CoreFetchNotificationsParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreFetchNotificationsReturns>>}
     */
    core_fetch_notifications(params: CoreFetchNotificationsParams, method?: HttpMethod): Promise<MoodleResponse<CoreFetchNotificationsReturns>>;
    /**
     * Keep the users session alive
     *
     * @param {CoreSessionTouchParams} [params]
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreSessionTouchReturns>>} - result
     */
    core_session_touch(params?: CoreSessionTouchParams, method?: HttpMethod): Promise<MoodleResponse<CoreSessionTouchReturns>>;
    /**
     * Count the seconds remaining in this session
     *
     * @param {CoreSessionTimeRemainingParams} [params]
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreSessionTimeRemainingReturns>>}
     */
    core_session_time_remaining(params?: CoreSessionTimeRemainingParams, method?: HttpMethod): Promise<MoodleResponse<CoreSessionTimeRemainingReturns>>;
    /**
     * browse moodle files
     *
     * @param {CoreFilesGetFilesParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreFilesGetFilesReturns>>}
     */
    core_files_get_files(params: CoreFilesGetFilesParams, method?: HttpMethod): Promise<MoodleResponse<CoreFilesGetFilesReturns>>;
    /**
     * upload a file to moodle
     *
     * @param {CoreFilesUploadParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreFilesUploadReturns>>}
     */
    core_files_upload(params: CoreFilesUploadParams, method?: HttpMethod): Promise<MoodleResponse<CoreFilesUploadReturns>>;
    /**
     * Delete the indicated files (or directories) from a user draft file area.
     *
     * @param {CoreFilesDeleteDraftFilesParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreFilesDeleteDraftFilesReturns>>}
     */
    core_files_delete_draft_files(params: CoreFilesDeleteDraftFilesParams, method?: HttpMethod): Promise<MoodleResponse<CoreFilesDeleteDraftFilesReturns>>;
    /**
     * Generate a new draft itemid for the current user.
     *
     * @param {CoreFilesGetUnusedDraftItemidParams} [params]
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreFilesGetUnusedDraftItemidReturns>>}
     */
    core_files_get_unused_draft_itemid(params?: CoreFilesGetUnusedDraftItemidParams, method?: HttpMethod): Promise<MoodleResponse<CoreFilesGetUnusedDraftItemidReturns>>;
    /**
     * Provides data for the filetypes element browser.
     *
     * @param {CoreFormGetFiletypesBrowserDataParams} [params]
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreFormGetFiletypesBrowserDataReturns>>}
     */
    core_form_get_filetypes_browser_data(params?: CoreFormGetFiletypesBrowserDataParams, method?: HttpMethod): Promise<MoodleResponse<CoreFormGetFiletypesBrowserDataReturns>>;
    /**
     * Process submission of a dynamic (modal) form
     *
     * @param {CoreFormDynamicFormParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreFormDynamicFormReturns>>}
     */
    core_form_dynamic_form(params: CoreFormDynamicFormParams, method?: HttpMethod): Promise<MoodleResponse<CoreFormDynamicFormReturns>>;
    /**
     * @param {CoreGetComponentStringsParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreGetComponentStringsReturns>>}
     */
    core_get_component_strings(params: CoreGetComponentStringsParams, method?: HttpMethod): Promise<MoodleResponse<CoreGetComponentStringsReturns>>;
    /**
     * Return a fragment for inclusion, such as a JavaScript page.
     *
     * @param {CoreGetFragmentParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreGetFragmentReturns>>}
     */
    core_get_fragment(params: CoreGetFragmentParams, method?: HttpMethod): Promise<MoodleResponse<CoreGetFragmentReturns>>;
    /**
     * Return a translated string - similar to core get_string(), call
     *
     * @param {CoreGetStringParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreGetStringReturns>>} - translated string
     */
    core_get_string(params: CoreGetStringParams, method?: HttpMethod): Promise<MoodleResponse<CoreGetStringReturns>>;
    /**
     * Return some translated strings - like several core get_string(), calls
     *
     * @param {CoreGetStringsParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreGetStringsReturns>>}
     */
    core_get_strings(params: CoreGetStringsParams, method?: HttpMethod): Promise<MoodleResponse<CoreGetStringsReturns>>;
    /**
     * Return formatted timestamps
     *
     * @param {CoreGetUserDatesParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreGetUserDatesReturns>>}
     */
    core_get_user_dates(params: CoreGetUserDatesParams, method?: HttpMethod): Promise<MoodleResponse<CoreGetUserDatesReturns>>;
    /**
     * Update a grade item and associated student grades.
     *
     * @param {CoreGradesUpdateGradesParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreGradesUpdateGradesReturns>>} - A value like 0 => OK, 1 => FAILED as defined in lib/grade/constants.php
     */
    core_grades_update_grades(params: CoreGradesUpdateGradesParams, method?: HttpMethod): Promise<MoodleResponse<CoreGradesUpdateGradesReturns>>;
    /**
     * @param {CoreGradesGraderGradingpanelPointFetchParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreGradesGraderGradingpanelPointFetchReturns>>}
     */
    core_grades_grader_gradingpanel_point_fetch(params: CoreGradesGraderGradingpanelPointFetchParams, method?: HttpMethod): Promise<MoodleResponse<CoreGradesGraderGradingpanelPointFetchReturns>>;
    /**
     * Store the data required to display the grader grading panel for simple grading
     *
     * @param {CoreGradesGraderGradingpanelPointStoreParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreGradesGraderGradingpanelPointStoreReturns>>}
     */
    core_grades_grader_gradingpanel_point_store(params: CoreGradesGraderGradingpanelPointStoreParams, method?: HttpMethod): Promise<MoodleResponse<CoreGradesGraderGradingpanelPointStoreReturns>>;
    /**
     * @param {CoreGradesGraderGradingpanelScaleFetchParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreGradesGraderGradingpanelScaleFetchReturns>>}
     */
    core_grades_grader_gradingpanel_scale_fetch(params: CoreGradesGraderGradingpanelScaleFetchParams, method?: HttpMethod): Promise<MoodleResponse<CoreGradesGraderGradingpanelScaleFetchReturns>>;
    /**
     * Store the data required to display the grader grading panel for scale-based grading
     *
     * @param {CoreGradesGraderGradingpanelScaleStoreParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreGradesGraderGradingpanelScaleStoreReturns>>}
     */
    core_grades_grader_gradingpanel_scale_store(params: CoreGradesGraderGradingpanelScaleStoreParams, method?: HttpMethod): Promise<MoodleResponse<CoreGradesGraderGradingpanelScaleStoreReturns>>;
    /**
     * Create grade categories inside a course gradebook.
     *
     * @param {CoreGradesCreateGradecategoriesParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreGradesCreateGradecategoriesReturns>>}
     */
    core_grades_create_gradecategories(params: CoreGradesCreateGradecategoriesParams, method?: HttpMethod): Promise<MoodleResponse<CoreGradesCreateGradecategoriesReturns>>;
    /**
     * @param {CoreGradesGetEnrolledUsersForSearchWidgetParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreGradesGetEnrolledUsersForSearchWidgetReturns>>}
     */
    core_grades_get_enrolled_users_for_search_widget(params: CoreGradesGetEnrolledUsersForSearchWidgetParams, method?: HttpMethod): Promise<MoodleResponse<CoreGradesGetEnrolledUsersForSearchWidgetReturns>>;
    /**
     * Returns the enrolled users within and map some fields to the returned array of user objects.
     *
     * @param {CoreGradesGetEnrolledUsersForSelectorParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreGradesGetEnrolledUsersForSelectorReturns>>}
     */
    core_grades_get_enrolled_users_for_selector(params: CoreGradesGetEnrolledUsersForSelectorParams, method?: HttpMethod): Promise<MoodleResponse<CoreGradesGetEnrolledUsersForSelectorReturns>>;
    /**
     * @param {CoreGradesGetGroupsForSearchWidgetParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreGradesGetGroupsForSearchWidgetReturns>>}
     */
    core_grades_get_groups_for_search_widget(params: CoreGradesGetGroupsForSearchWidgetParams, method?: HttpMethod): Promise<MoodleResponse<CoreGradesGetGroupsForSearchWidgetReturns>>;
    /**
     * @param {CoreGradesGetGroupsForSelectorParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreGradesGetGroupsForSelectorReturns>>}
     */
    core_grades_get_groups_for_selector(params: CoreGradesGetGroupsForSelectorParams, method?: HttpMethod): Promise<MoodleResponse<CoreGradesGetGroupsForSelectorReturns>>;
    /**
     * Get the feedback data for a grade item
     *
     * @param {CoreGradesGetFeedbackParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreGradesGetFeedbackReturns>>}
     */
    core_grades_get_feedback(params: CoreGradesGetFeedbackParams, method?: HttpMethod): Promise<MoodleResponse<CoreGradesGetFeedbackReturns>>;
    /**
     * Get the gradeitems for a course
     *
     * @param {CoreGradesGetGradeitemsParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreGradesGetGradeitemsReturns>>}
     */
    core_grades_get_gradeitems(params: CoreGradesGetGradeitemsParams, method?: HttpMethod): Promise<MoodleResponse<CoreGradesGetGradeitemsReturns>>;
    /**
     * Get the grade tree structure for a course
     *
     * @param {CoreGradesGetGradeTreeParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreGradesGetGradeTreeReturns>>} - JSON encoded data representing the course grade tree structure.
     */
    core_grades_get_grade_tree(params: CoreGradesGetGradeTreeParams, method?: HttpMethod): Promise<MoodleResponse<CoreGradesGetGradeTreeReturns>>;
    /**
     * Returns the gradable users in a course
     *
     * @param {CoreGradesGetGradableUsersParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreGradesGetGradableUsersReturns>>}
     */
    core_grades_get_gradable_users(params: CoreGradesGetGradableUsersParams, method?: HttpMethod): Promise<MoodleResponse<CoreGradesGetGradableUsersReturns>>;
    /**
     * Get grading definitions
     *
     * @param {CoreGradingGetDefinitionsParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreGradingGetDefinitionsReturns>>}
     */
    core_grading_get_definitions(params: CoreGradingGetDefinitionsParams, method?: HttpMethod): Promise<MoodleResponse<CoreGradingGetDefinitionsReturns>>;
    /**
     * Get grading form instances
     *
     * @param {CoreGradingGetGradingformInstancesParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreGradingGetGradingformInstancesReturns>>}
     */
    core_grading_get_gradingform_instances(params: CoreGradingGetGradingformInstancesParams, method?: HttpMethod): Promise<MoodleResponse<CoreGradingGetGradingformInstancesReturns>>;
    /**
     * Save grading definitions
     *
     * @param {CoreGradingSaveDefinitionsParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreGradingSaveDefinitionsReturns>>}
     */
    core_grading_save_definitions(params: CoreGradingSaveDefinitionsParams, method?: HttpMethod): Promise<MoodleResponse<CoreGradingSaveDefinitionsReturns>>;
    /**
     * Adds group members.
     *
     * @param {CoreGroupAddGroupMembersParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreGroupAddGroupMembersReturns>>}
     */
    core_group_add_group_members(params: CoreGroupAddGroupMembersParams, method?: HttpMethod): Promise<MoodleResponse<CoreGroupAddGroupMembersReturns>>;
    /**
     * Assing groups from groupings
     *
     * @param {CoreGroupAssignGroupingParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreGroupAssignGroupingReturns>>}
     */
    core_group_assign_grouping(params: CoreGroupAssignGroupingParams, method?: HttpMethod): Promise<MoodleResponse<CoreGroupAssignGroupingReturns>>;
    /**
     * Creates new groupings
     *
     * @param {CoreGroupCreateGroupingsParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreGroupCreateGroupingsReturns>>} - List of grouping object. A grouping has an id, a courseid, a name and a description.
     */
    core_group_create_groupings(params: CoreGroupCreateGroupingsParams, method?: HttpMethod): Promise<MoodleResponse<CoreGroupCreateGroupingsReturns>>;
    /**
     * Creates new groups.
     *
     * @param {CoreGroupCreateGroupsParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreGroupCreateGroupsReturns>>} - List of group object. A group has an id, a courseid, a name, a description and an enrolment key.
     */
    core_group_create_groups(params: CoreGroupCreateGroupsParams, method?: HttpMethod): Promise<MoodleResponse<CoreGroupCreateGroupsReturns>>;
    /**
     * Deletes group members.
     *
     * @param {CoreGroupDeleteGroupMembersParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreGroupDeleteGroupMembersReturns>>}
     */
    core_group_delete_group_members(params: CoreGroupDeleteGroupMembersParams, method?: HttpMethod): Promise<MoodleResponse<CoreGroupDeleteGroupMembersReturns>>;
    /**
     * Deletes all specified groupings.
     *
     * @param {CoreGroupDeleteGroupingsParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreGroupDeleteGroupingsReturns>>}
     */
    core_group_delete_groupings(params: CoreGroupDeleteGroupingsParams, method?: HttpMethod): Promise<MoodleResponse<CoreGroupDeleteGroupingsReturns>>;
    /**
     * Deletes all specified groups.
     *
     * @param {CoreGroupDeleteGroupsParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreGroupDeleteGroupsReturns>>}
     */
    core_group_delete_groups(params: CoreGroupDeleteGroupsParams, method?: HttpMethod): Promise<MoodleResponse<CoreGroupDeleteGroupsReturns>>;
    /**
     * Gets a list of groups that the user is allowed to access within the specified activity.
     *
     * @param {CoreGroupGetActivityAllowedGroupsParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreGroupGetActivityAllowedGroupsReturns>>}
     */
    core_group_get_activity_allowed_groups(params: CoreGroupGetActivityAllowedGroupsParams, method?: HttpMethod): Promise<MoodleResponse<CoreGroupGetActivityAllowedGroupsReturns>>;
    /**
     * Returns effective groupmode used in a given activity.
     *
     * @param {CoreGroupGetActivityGroupmodeParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreGroupGetActivityGroupmodeReturns>>}
     */
    core_group_get_activity_groupmode(params: CoreGroupGetActivityGroupmodeParams, method?: HttpMethod): Promise<MoodleResponse<CoreGroupGetActivityGroupmodeReturns>>;
    /**
     * Returns all groupings in specified course.
     *
     * @param {CoreGroupGetCourseGroupingsParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreGroupGetCourseGroupingsReturns>>}
     */
    core_group_get_course_groupings(params: CoreGroupGetCourseGroupingsParams, method?: HttpMethod): Promise<MoodleResponse<CoreGroupGetCourseGroupingsReturns>>;
    /**
     * Returns all groups in specified course.
     *
     * @param {CoreGroupGetCourseGroupsParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreGroupGetCourseGroupsReturns>>}
     */
    core_group_get_course_groups(params: CoreGroupGetCourseGroupsParams, method?: HttpMethod): Promise<MoodleResponse<CoreGroupGetCourseGroupsReturns>>;
    /**
     * Returns all groups in specified course for the specified user.
     *
     * @param {CoreGroupGetCourseUserGroupsParams} [params]
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreGroupGetCourseUserGroupsReturns>>}
     */
    core_group_get_course_user_groups(params?: CoreGroupGetCourseUserGroupsParams, method?: HttpMethod): Promise<MoodleResponse<CoreGroupGetCourseUserGroupsReturns>>;
    /**
     * Returns group members.
     *
     * @param {CoreGroupGetGroupMembersParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreGroupGetGroupMembersReturns>>}
     */
    core_group_get_group_members(params: CoreGroupGetGroupMembersParams, method?: HttpMethod): Promise<MoodleResponse<CoreGroupGetGroupMembersReturns>>;
    /**
     * Returns groupings details.
     *
     * @param {CoreGroupGetGroupingsParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreGroupGetGroupingsReturns>>}
     */
    core_group_get_groupings(params: CoreGroupGetGroupingsParams, method?: HttpMethod): Promise<MoodleResponse<CoreGroupGetGroupingsReturns>>;
    /**
     * Returns group details.
     *
     * @param {CoreGroupGetGroupsParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreGroupGetGroupsReturns>>}
     */
    core_group_get_groups(params: CoreGroupGetGroupsParams, method?: HttpMethod): Promise<MoodleResponse<CoreGroupGetGroupsReturns>>;
    /**
     * Get the group/(s) for a course
     *
     * @param {CoreGroupGetGroupsForSelectorParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreGroupGetGroupsForSelectorReturns>>}
     */
    core_group_get_groups_for_selector(params: CoreGroupGetGroupsForSelectorParams, method?: HttpMethod): Promise<MoodleResponse<CoreGroupGetGroupsForSelectorReturns>>;
    /**
     * Unassing groups from groupings
     *
     * @param {CoreGroupUnassignGroupingParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreGroupUnassignGroupingReturns>>}
     */
    core_group_unassign_grouping(params: CoreGroupUnassignGroupingParams, method?: HttpMethod): Promise<MoodleResponse<CoreGroupUnassignGroupingReturns>>;
    /**
     * Updates existing groupings
     *
     * @param {CoreGroupUpdateGroupingsParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreGroupUpdateGroupingsReturns>>}
     */
    core_group_update_groupings(params: CoreGroupUpdateGroupingsParams, method?: HttpMethod): Promise<MoodleResponse<CoreGroupUpdateGroupingsReturns>>;
    /**
     * Updates existing groups.
     *
     * @param {CoreGroupUpdateGroupsParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreGroupUpdateGroupsReturns>>}
     */
    core_group_update_groups(params: CoreGroupUpdateGroupsParams, method?: HttpMethod): Promise<MoodleResponse<CoreGroupUpdateGroupsReturns>>;
    /**
     * Mutes a list of conversations
     *
     * @param {CoreMessageMuteConversationsParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreMessageMuteConversationsReturns>>} - list of warnings
     */
    core_message_mute_conversations(params: CoreMessageMuteConversationsParams, method?: HttpMethod): Promise<MoodleResponse<CoreMessageMuteConversationsReturns>>;
    /**
     * Unmutes a list of conversations
     *
     * @param {CoreMessageUnmuteConversationsParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreMessageUnmuteConversationsReturns>>} - list of warnings
     */
    core_message_unmute_conversations(params: CoreMessageUnmuteConversationsParams, method?: HttpMethod): Promise<MoodleResponse<CoreMessageUnmuteConversationsReturns>>;
    /**
     * Blocks a user
     *
     * @param {CoreMessageBlockUserParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreMessageBlockUserReturns>>} - list of warnings
     */
    core_message_block_user(params: CoreMessageBlockUserParams, method?: HttpMethod): Promise<MoodleResponse<CoreMessageBlockUserReturns>>;
    /**
     * Returns contact requests for a user
     *
     * @param {CoreMessageGetContactRequestsParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreMessageGetContactRequestsReturns>>}
     */
    core_message_get_contact_requests(params: CoreMessageGetContactRequestsParams, method?: HttpMethod): Promise<MoodleResponse<CoreMessageGetContactRequestsReturns>>;
    /**
     * Creates a contact request
     *
     * @param {CoreMessageCreateContactRequestParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreMessageCreateContactRequestReturns>>}
     */
    core_message_create_contact_request(params: CoreMessageCreateContactRequestParams, method?: HttpMethod): Promise<MoodleResponse<CoreMessageCreateContactRequestReturns>>;
    /**
     * Confirms a contact request
     *
     * @param {CoreMessageConfirmContactRequestParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreMessageConfirmContactRequestReturns>>} - list of warnings
     */
    core_message_confirm_contact_request(params: CoreMessageConfirmContactRequestParams, method?: HttpMethod): Promise<MoodleResponse<CoreMessageConfirmContactRequestReturns>>;
    /**
     * Declines a contact request
     *
     * @param {CoreMessageDeclineContactRequestParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreMessageDeclineContactRequestReturns>>} - list of warnings
     */
    core_message_decline_contact_request(params: CoreMessageDeclineContactRequestParams, method?: HttpMethod): Promise<MoodleResponse<CoreMessageDeclineContactRequestReturns>>;
    /**
     * Gets the number of received contact requests
     *
     * @param {CoreMessageGetReceivedContactRequestsCountParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreMessageGetReceivedContactRequestsCountReturns>>} - The number of received contact requests
     */
    core_message_get_received_contact_requests_count(params: CoreMessageGetReceivedContactRequestsCountParams, method?: HttpMethod): Promise<MoodleResponse<CoreMessageGetReceivedContactRequestsCountReturns>>;
    /**
     * Remove contacts from the contact list
     *
     * @param {CoreMessageDeleteContactsParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreMessageDeleteContactsReturns>>}
     */
    core_message_delete_contacts(params: CoreMessageDeleteContactsParams, method?: HttpMethod): Promise<MoodleResponse<CoreMessageDeleteContactsReturns>>;
    /**
     * Deletes a list of conversations.
     *
     * @param {CoreMessageDeleteConversationsByIdParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreMessageDeleteConversationsByIdReturns>>} - list of warnings
     */
    core_message_delete_conversations_by_id(params: CoreMessageDeleteConversationsByIdParams, method?: HttpMethod): Promise<MoodleResponse<CoreMessageDeleteConversationsByIdReturns>>;
    /**
     * Deletes a message.
     *
     * @param {CoreMessageDeleteMessageParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreMessageDeleteMessageReturns>>}
     */
    core_message_delete_message(params: CoreMessageDeleteMessageParams, method?: HttpMethod): Promise<MoodleResponse<CoreMessageDeleteMessageReturns>>;
    /**
     * Retrieve a list of users blocked
     *
     * @param {CoreMessageGetBlockedUsersParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreMessageGetBlockedUsersReturns>>}
     */
    core_message_get_blocked_users(params: CoreMessageGetBlockedUsersParams, method?: HttpMethod): Promise<MoodleResponse<CoreMessageGetBlockedUsersReturns>>;
    /**
     * Retrieve the template data for searching for messages
     *
     * @param {CoreMessageDataForMessageareaSearchMessagesParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreMessageDataForMessageareaSearchMessagesReturns>>}
     */
    core_message_data_for_messagearea_search_messages(params: CoreMessageDataForMessageareaSearchMessagesParams, method?: HttpMethod): Promise<MoodleResponse<CoreMessageDataForMessageareaSearchMessagesReturns>>;
    /**
     * Retrieve the data for searching for people
     *
     * @param {CoreMessageMessageSearchUsersParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreMessageMessageSearchUsersReturns>>}
     */
    core_message_message_search_users(params: CoreMessageMessageSearchUsersParams, method?: HttpMethod): Promise<MoodleResponse<CoreMessageMessageSearchUsersReturns>>;
    /**
     * Retrieve the contact list
     *
     * @param {CoreMessageGetUserContactsParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreMessageGetUserContactsReturns>>}
     */
    core_message_get_user_contacts(params: CoreMessageGetUserContactsParams, method?: HttpMethod): Promise<MoodleResponse<CoreMessageGetUserContactsReturns>>;
    /**
     * Retrieve a list of conversations for a user
     *
     * @param {CoreMessageGetConversationsParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreMessageGetConversationsReturns>>}
     */
    core_message_get_conversations(params: CoreMessageGetConversationsParams, method?: HttpMethod): Promise<MoodleResponse<CoreMessageGetConversationsReturns>>;
    /**
     * Retrieve a conversation for a user
     *
     * @param {CoreMessageGetConversationParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreMessageGetConversationReturns>>}
     */
    core_message_get_conversation(params: CoreMessageGetConversationParams, method?: HttpMethod): Promise<MoodleResponse<CoreMessageGetConversationReturns>>;
    /**
     * Retrieve a conversation for a user between another user
     *
     * @param {CoreMessageGetConversationBetweenUsersParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreMessageGetConversationBetweenUsersReturns>>}
     */
    core_message_get_conversation_between_users(params: CoreMessageGetConversationBetweenUsersParams, method?: HttpMethod): Promise<MoodleResponse<CoreMessageGetConversationBetweenUsersReturns>>;
    /**
     * Retrieve a self-conversation for a user
     *
     * @param {CoreMessageGetSelfConversationParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreMessageGetSelfConversationReturns>>}
     */
    core_message_get_self_conversation(params: CoreMessageGetSelfConversationParams, method?: HttpMethod): Promise<MoodleResponse<CoreMessageGetSelfConversationReturns>>;
    /**
     * Retrieve a list of messages sent and received by a user (conversations, notifications or both)
     *
     * @param {CoreMessageGetMessagesParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreMessageGetMessagesReturns>>}
     */
    core_message_get_messages(params: CoreMessageGetMessagesParams, method?: HttpMethod): Promise<MoodleResponse<CoreMessageGetMessagesReturns>>;
    /**
     * Retrieve a list of conversation counts, indexed by type.
     *
     * @param {CoreMessageGetConversationCountsParams} [params]
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreMessageGetConversationCountsReturns>>}
     */
    core_message_get_conversation_counts(params?: CoreMessageGetConversationCountsParams, method?: HttpMethod): Promise<MoodleResponse<CoreMessageGetConversationCountsReturns>>;
    /**
     * Retrieve a list of unread conversation counts, indexed by type.
     *
     * @param {CoreMessageGetUnreadConversationCountsParams} [params]
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreMessageGetUnreadConversationCountsReturns>>}
     */
    core_message_get_unread_conversation_counts(params?: CoreMessageGetUnreadConversationCountsParams, method?: HttpMethod): Promise<MoodleResponse<CoreMessageGetUnreadConversationCountsReturns>>;
    /**
     * Retrieve a list of members in a conversation
     *
     * @param {CoreMessageGetConversationMembersParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreMessageGetConversationMembersReturns>>}
     */
    core_message_get_conversation_members(params: CoreMessageGetConversationMembersParams, method?: HttpMethod): Promise<MoodleResponse<CoreMessageGetConversationMembersReturns>>;
    /**
     * Retrieve a user message profiles
     *
     * @param {CoreMessageGetMemberInfoParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreMessageGetMemberInfoReturns>>}
     */
    core_message_get_member_info(params: CoreMessageGetMemberInfoParams, method?: HttpMethod): Promise<MoodleResponse<CoreMessageGetMemberInfoReturns>>;
    /**
     * Retrieve the count of unread conversations for a given user
     *
     * @param {CoreMessageGetUnreadConversationsCountParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreMessageGetUnreadConversationsCountReturns>>} - The count of unread messages for the user
     */
    core_message_get_unread_conversations_count(params: CoreMessageGetUnreadConversationsCountParams, method?: HttpMethod): Promise<MoodleResponse<CoreMessageGetUnreadConversationsCountReturns>>;
    /**
     * Mark all notifications as read for a given user
     *
     * @param {CoreMessageMarkAllNotificationsAsReadParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreMessageMarkAllNotificationsAsReadReturns>>} - True if the messages were marked read, false otherwise
     */
    core_message_mark_all_notifications_as_read(params: CoreMessageMarkAllNotificationsAsReadParams, method?: HttpMethod): Promise<MoodleResponse<CoreMessageMarkAllNotificationsAsReadReturns>>;
    /**
     * Mark all conversation messages as read for a given user
     *
     * @param {CoreMessageMarkAllConversationMessagesAsReadParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreMessageMarkAllConversationMessagesAsReadReturns>>}
     */
    core_message_mark_all_conversation_messages_as_read(params: CoreMessageMarkAllConversationMessagesAsReadParams, method?: HttpMethod): Promise<MoodleResponse<CoreMessageMarkAllConversationMessagesAsReadReturns>>;
    /**
     * Mark a single message as read, trigger message_viewed event.
     *
     * @param {CoreMessageMarkMessageReadParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreMessageMarkMessageReadReturns>>}
     */
    core_message_mark_message_read(params: CoreMessageMarkMessageReadParams, method?: HttpMethod): Promise<MoodleResponse<CoreMessageMarkMessageReadReturns>>;
    /**
     * Mark a single notification as read, trigger notification_viewed event.
     *
     * @param {CoreMessageMarkNotificationReadParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreMessageMarkNotificationReadReturns>>}
     */
    core_message_mark_notification_read(params: CoreMessageMarkNotificationReadParams, method?: HttpMethod): Promise<MoodleResponse<CoreMessageMarkNotificationReadReturns>>;
    /**
     * Process the message processor config form
     *
     * @param {CoreMessageMessageProcessorConfigFormParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreMessageMessageProcessorConfigFormReturns>>}
     */
    core_message_message_processor_config_form(params: CoreMessageMessageProcessorConfigFormParams, method?: HttpMethod): Promise<MoodleResponse<CoreMessageMessageProcessorConfigFormReturns>>;
    /**
     * Get a message processor
     *
     * @param {CoreMessageGetMessageProcessorParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreMessageGetMessageProcessorReturns>>}
     */
    core_message_get_message_processor(params: CoreMessageGetMessageProcessorParams, method?: HttpMethod): Promise<MoodleResponse<CoreMessageGetMessageProcessorReturns>>;
    /**
     * Search for contacts
     *
     * @param {CoreMessageSearchContactsParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreMessageSearchContactsReturns>>} - List of contacts
     */
    core_message_search_contacts(params: CoreMessageSearchContactsParams, method?: HttpMethod): Promise<MoodleResponse<CoreMessageSearchContactsReturns>>;
    /**
     * Send instant messages
     *
     * @param {CoreMessageSendInstantMessagesParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreMessageSendInstantMessagesReturns>>}
     */
    core_message_send_instant_messages(params: CoreMessageSendInstantMessagesParams, method?: HttpMethod): Promise<MoodleResponse<CoreMessageSendInstantMessagesReturns>>;
    /**
     * Send messages to an existing conversation between users
     *
     * @param {CoreMessageSendMessagesToConversationParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreMessageSendMessagesToConversationReturns>>}
     */
    core_message_send_messages_to_conversation(params: CoreMessageSendMessagesToConversationParams, method?: HttpMethod): Promise<MoodleResponse<CoreMessageSendMessagesToConversationReturns>>;
    /**
     * Retrieve the conversation messages and relevant member information
     *
     * @param {CoreMessageGetConversationMessagesParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreMessageGetConversationMessagesReturns>>}
     */
    core_message_get_conversation_messages(params: CoreMessageGetConversationMessagesParams, method?: HttpMethod): Promise<MoodleResponse<CoreMessageGetConversationMessagesReturns>>;
    /**
     * Unblocks a user
     *
     * @param {CoreMessageUnblockUserParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreMessageUnblockUserReturns>>} - list of warnings
     */
    core_message_unblock_user(params: CoreMessageUnblockUserParams, method?: HttpMethod): Promise<MoodleResponse<CoreMessageUnblockUserReturns>>;
    /**
     * Get the notification preferences for a given user.
     *
     * @param {CoreMessageGetUserNotificationPreferencesParams} [params]
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreMessageGetUserNotificationPreferencesReturns>>}
     */
    core_message_get_user_notification_preferences(params?: CoreMessageGetUserNotificationPreferencesParams, method?: HttpMethod): Promise<MoodleResponse<CoreMessageGetUserNotificationPreferencesReturns>>;
    /**
     * Get the message preferences for a given user.
     *
     * @param {CoreMessageGetUserMessagePreferencesParams} [params]
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreMessageGetUserMessagePreferencesReturns>>}
     */
    core_message_get_user_message_preferences(params?: CoreMessageGetUserMessagePreferencesParams, method?: HttpMethod): Promise<MoodleResponse<CoreMessageGetUserMessagePreferencesReturns>>;
    /**
     * Mark a conversation or group of conversations as favourites/starred conversations.
     *
     * @param {CoreMessageSetFavouriteConversationsParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreMessageSetFavouriteConversationsReturns>>} - list of warnings
     */
    core_message_set_favourite_conversations(params: CoreMessageSetFavouriteConversationsParams, method?: HttpMethod): Promise<MoodleResponse<CoreMessageSetFavouriteConversationsReturns>>;
    /**
     * Unset a conversation or group of conversations as favourites/starred conversations.
     *
     * @param {CoreMessageUnsetFavouriteConversationsParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreMessageUnsetFavouriteConversationsReturns>>} - list of warnings
     */
    core_message_unset_favourite_conversations(params: CoreMessageUnsetFavouriteConversationsParams, method?: HttpMethod): Promise<MoodleResponse<CoreMessageUnsetFavouriteConversationsReturns>>;
    /**
     * Deletes a message for all users.
     *
     * @param {CoreMessageDeleteMessageForAllUsersParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreMessageDeleteMessageForAllUsersReturns>>} - list of warnings
     */
    core_message_delete_message_for_all_users(params: CoreMessageDeleteMessageForAllUsersParams, method?: HttpMethod): Promise<MoodleResponse<CoreMessageDeleteMessageForAllUsersReturns>>;
    /**
     * Get number of unread notifications.
     *
     * @param {CoreMessageGetUnreadNotificationCountParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreMessageGetUnreadNotificationCountReturns>>} - The count of unread notifications.
     */
    core_message_get_unread_notification_count(params: CoreMessageGetUnreadNotificationCountParams, method?: HttpMethod): Promise<MoodleResponse<CoreMessageGetUnreadNotificationCountReturns>>;
    /**
     * Trigger the My or Dashboard viewed event.
     *
     * @param {CoreMyViewPageParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreMyViewPageReturns>>}
     */
    core_my_view_page(params: CoreMyViewPageParams, method?: HttpMethod): Promise<MoodleResponse<CoreMyViewPageReturns>>;
    /**
     * Create notes
     *
     * @param {CoreNotesCreateNotesParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreNotesCreateNotesReturns>>}
     */
    core_notes_create_notes(params: CoreNotesCreateNotesParams, method?: HttpMethod): Promise<MoodleResponse<CoreNotesCreateNotesReturns>>;
    /**
     * Delete notes
     *
     * @param {CoreNotesDeleteNotesParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreNotesDeleteNotesReturns>>} - list of warnings
     */
    core_notes_delete_notes(params: CoreNotesDeleteNotesParams, method?: HttpMethod): Promise<MoodleResponse<CoreNotesDeleteNotesReturns>>;
    /**
     * Returns all notes in specified course (or site), for the specified user.
     *
     * @param {CoreNotesGetCourseNotesParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreNotesGetCourseNotesReturns>>} - notes
     */
    core_notes_get_course_notes(params: CoreNotesGetCourseNotesParams, method?: HttpMethod): Promise<MoodleResponse<CoreNotesGetCourseNotesReturns>>;
    /**
     * Get notes
     *
     * @param {CoreNotesGetNotesParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreNotesGetNotesReturns>>}
     */
    core_notes_get_notes(params: CoreNotesGetNotesParams, method?: HttpMethod): Promise<MoodleResponse<CoreNotesGetNotesReturns>>;
    /**
     * Update notes
     *
     * @param {CoreNotesUpdateNotesParams} [params]
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreNotesUpdateNotesReturns>>} - list of warnings
     */
    core_notes_update_notes(params?: CoreNotesUpdateNotesParams, method?: HttpMethod): Promise<MoodleResponse<CoreNotesUpdateNotesReturns>>;
    /**
     * Simulates the web interface view of notes/index.php: trigger events.
     *
     * @param {CoreNotesViewNotesParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreNotesViewNotesReturns>>}
     */
    core_notes_view_notes(params: CoreNotesViewNotesParams, method?: HttpMethod): Promise<MoodleResponse<CoreNotesViewNotesReturns>>;
    /**
     * Load a template for a renderable
     *
     * @param {CoreOutputLoadTemplateParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreOutputLoadTemplateReturns>>} - template
     */
    core_output_load_template(params: CoreOutputLoadTemplateParams, method?: HttpMethod): Promise<MoodleResponse<CoreOutputLoadTemplateReturns>>;
    /**
     * Load a template and its dependencies for a renderable
     *
     * @param {CoreOutputLoadTemplateWithDependenciesParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreOutputLoadTemplateWithDependenciesReturns>>}
     */
    core_output_load_template_with_dependencies(params: CoreOutputLoadTemplateWithDependenciesParams, method?: HttpMethod): Promise<MoodleResponse<CoreOutputLoadTemplateWithDependenciesReturns>>;
    /**
     * Load the mapping of names to icons
     *
     * @param {CoreOutputLoadFontawesomeIconMapParams} [params]
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreOutputLoadFontawesomeIconMapReturns>>}
     */
    core_output_load_fontawesome_icon_map(params?: CoreOutputLoadFontawesomeIconMapParams, method?: HttpMethod): Promise<MoodleResponse<CoreOutputLoadFontawesomeIconMapReturns>>;
    /**
     * Load the mapping of moodle pix names to fontawesome icon names
     *
     * @param {CoreOutputLoadFontawesomeIconSystemMapParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreOutputLoadFontawesomeIconSystemMapReturns>>}
     */
    core_output_load_fontawesome_icon_system_map(params: CoreOutputLoadFontawesomeIconSystemMapParams, method?: HttpMethod): Promise<MoodleResponse<CoreOutputLoadFontawesomeIconSystemMapReturns>>;
    /**
     * Update the flag state of a question attempt.
     *
     * @param {CoreQuestionUpdateFlagParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreQuestionUpdateFlagReturns>>}
     */
    core_question_update_flag(params: CoreQuestionUpdateFlagParams, method?: HttpMethod): Promise<MoodleResponse<CoreQuestionUpdateFlagReturns>>;
    /**
     * Get the random question set for a criteria
     *
     * @param {CoreQuestionGetRandomQuestionSummariesParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreQuestionGetRandomQuestionSummariesReturns>>}
     */
    core_question_get_random_question_summaries(params: CoreQuestionGetRandomQuestionSummariesParams, method?: HttpMethod): Promise<MoodleResponse<CoreQuestionGetRandomQuestionSummariesReturns>>;
    /**
     * Retrieve all the ratings for an item.
     *
     * @param {CoreRatingGetItemRatingsParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreRatingGetItemRatingsReturns>>}
     */
    core_rating_get_item_ratings(params: CoreRatingGetItemRatingsParams, method?: HttpMethod): Promise<MoodleResponse<CoreRatingGetItemRatingsReturns>>;
    /**
     * Rates an item.
     *
     * @param {CoreRatingAddRatingParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreRatingAddRatingReturns>>}
     */
    core_rating_add_rating(params: CoreRatingAddRatingParams, method?: HttpMethod): Promise<MoodleResponse<CoreRatingAddRatingReturns>>;
    /**
     * Manual role assignments.
     *
     * @param {CoreRoleAssignRolesParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreRoleAssignRolesReturns>>}
     */
    core_role_assign_roles(params: CoreRoleAssignRolesParams, method?: HttpMethod): Promise<MoodleResponse<CoreRoleAssignRolesReturns>>;
    /**
     * Manual role unassignments.
     *
     * @param {CoreRoleUnassignRolesParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreRoleUnassignRolesReturns>>}
     */
    core_role_unassign_roles(params: CoreRoleUnassignRolesParams, method?: HttpMethod): Promise<MoodleResponse<CoreRoleUnassignRolesReturns>>;
    /**
     * Gets relevant users for a search request.
     *
     * @param {CoreSearchGetRelevantUsersParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreSearchGetRelevantUsersReturns>>}
     */
    core_search_get_relevant_users(params: CoreSearchGetRelevantUsersParams, method?: HttpMethod): Promise<MoodleResponse<CoreSearchGetRelevantUsersReturns>>;
    /**
     * Get search results.
     *
     * @param {CoreSearchGetResultsParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreSearchGetResultsReturns>>}
     */
    core_search_get_results(params: CoreSearchGetResultsParams, method?: HttpMethod): Promise<MoodleResponse<CoreSearchGetResultsReturns>>;
    /**
     * Get search areas.
     *
     * @param {CoreSearchGetSearchAreasListParams} [params]
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreSearchGetSearchAreasListReturns>>}
     */
    core_search_get_search_areas_list(params?: CoreSearchGetSearchAreasListParams, method?: HttpMethod): Promise<MoodleResponse<CoreSearchGetSearchAreasListReturns>>;
    /**
     * Trigger view search results event.
     *
     * @param {CoreSearchViewResultsParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreSearchViewResultsReturns>>}
     */
    core_search_view_results(params: CoreSearchViewResultsParams, method?: HttpMethod): Promise<MoodleResponse<CoreSearchViewResultsReturns>>;
    /**
     * Get top search results.
     *
     * @param {CoreSearchGetTopResultsParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreSearchGetTopResultsReturns>>}
     */
    core_search_get_top_results(params: CoreSearchGetTopResultsParams, method?: HttpMethod): Promise<MoodleResponse<CoreSearchGetTopResultsReturns>>;
    /**
     * Gets tag index page for one tag and one tag area
     *
     * @param {CoreTagGetTagindexParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreTagGetTagindexReturns>>} - tag index
     */
    core_tag_get_tagindex(params: CoreTagGetTagindexParams, method?: HttpMethod): Promise<MoodleResponse<CoreTagGetTagindexReturns>>;
    /**
     * Gets tags by their ids
     *
     * @param {CoreTagGetTagsParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreTagGetTagsReturns>>}
     */
    core_tag_get_tags(params: CoreTagGetTagsParams, method?: HttpMethod): Promise<MoodleResponse<CoreTagGetTagsReturns>>;
    /**
     * Updates tags
     *
     * @param {CoreTagUpdateTagsParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreTagUpdateTagsReturns>>}
     */
    core_tag_update_tags(params: CoreTagUpdateTagsParams, method?: HttpMethod): Promise<MoodleResponse<CoreTagUpdateTagsReturns>>;
    /**
     * Gets tag index page per different areas.
     *
     * @param {CoreTagGetTagindexPerAreaParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreTagGetTagindexPerAreaReturns>>}
     */
    core_tag_get_tagindex_per_area(params: CoreTagGetTagindexPerAreaParams, method?: HttpMethod): Promise<MoodleResponse<CoreTagGetTagindexPerAreaReturns>>;
    /**
     * Retrieves existing tag areas.
     *
     * @param {CoreTagGetTagAreasParams} [params]
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreTagGetTagAreasReturns>>}
     */
    core_tag_get_tag_areas(params?: CoreTagGetTagAreasParams, method?: HttpMethod): Promise<MoodleResponse<CoreTagGetTagAreasReturns>>;
    /**
     * Retrieves existing tag collections.
     *
     * @param {CoreTagGetTagCollectionsParams} [params]
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreTagGetTagCollectionsReturns>>}
     */
    core_tag_get_tag_collections(params?: CoreTagGetTagCollectionsParams, method?: HttpMethod): Promise<MoodleResponse<CoreTagGetTagCollectionsReturns>>;
    /**
     * Retrieves a tag cloud for the given collection and/or query search.
     *
     * @param {CoreTagGetTagCloudParams} [params]
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreTagGetTagCloudReturns>>}
     */
    core_tag_get_tag_cloud(params?: CoreTagGetTagCloudParams, method?: HttpMethod): Promise<MoodleResponse<CoreTagGetTagCloudReturns>>;
    /**
     * Generic service to update title
     *
     * @param {CoreUpdateInplaceEditableParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreUpdateInplaceEditableReturns>>}
     */
    core_update_inplace_editable(params: CoreUpdateInplaceEditableParams, method?: HttpMethod): Promise<MoodleResponse<CoreUpdateInplaceEditableReturns>>;
    /**
     * Store mobile user devices information for PUSH Notifications.
     *
     * @param {CoreUserAddUserDeviceParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreUserAddUserDeviceReturns>>}
     */
    core_user_add_user_device(params: CoreUserAddUserDeviceParams, method?: HttpMethod): Promise<MoodleResponse<CoreUserAddUserDeviceReturns>>;
    /**
     * Store mobile user public key.
     *
     * @param {CoreUserUpdateUserDevicePublicKeyParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreUserUpdateUserDevicePublicKeyReturns>>}
     */
    core_user_update_user_device_public_key(params: CoreUserUpdateUserDevicePublicKeyParams, method?: HttpMethod): Promise<MoodleResponse<CoreUserUpdateUserDevicePublicKeyReturns>>;
    /**
     * Copy files from a draft area to users private files area.
     *
     * @param {CoreUserAddUserPrivateFilesParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreUserAddUserPrivateFilesReturns>>}
     */
    core_user_add_user_private_files(params: CoreUserAddUserPrivateFilesParams, method?: HttpMethod): Promise<MoodleResponse<CoreUserAddUserPrivateFilesReturns>>;
    /**
     * Create users.
     *
     * @param {CoreUserCreateUsersParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreUserCreateUsersReturns>>}
     */
    core_user_create_users(params: CoreUserCreateUsersParams, method?: HttpMethod): Promise<MoodleResponse<CoreUserCreateUsersReturns>>;
    /**
     * Delete users.
     *
     * @param {CoreUserDeleteUsersParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreUserDeleteUsersReturns>>}
     */
    core_user_delete_users(params: CoreUserDeleteUsersParams, method?: HttpMethod): Promise<MoodleResponse<CoreUserDeleteUsersReturns>>;
    /**
     * Get course user profiles (each of the profils matching a course id and a user id),.
     *
     * @param {CoreUserGetCourseUserProfilesParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreUserGetCourseUserProfilesReturns>>}
     */
    core_user_get_course_user_profiles(params: CoreUserGetCourseUserProfilesParams, method?: HttpMethod): Promise<MoodleResponse<CoreUserGetCourseUserProfilesReturns>>;
    /**
     * search for users matching the parameters
     *
     * @param {CoreUserGetUsersParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreUserGetUsersReturns>>}
     */
    core_user_get_users(params: CoreUserGetUsersParams, method?: HttpMethod): Promise<MoodleResponse<CoreUserGetUsersReturns>>;
    /**
     * @param {CoreUserGetUsersByFieldParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreUserGetUsersByFieldReturns>>}
     */
    core_user_get_users_by_field(params: CoreUserGetUsersByFieldParams, method?: HttpMethod): Promise<MoodleResponse<CoreUserGetUsersByFieldReturns>>;
    /**
     * Return list of users identities matching the given criteria in their name or other identity fields.
     *
     * @param {CoreUserSearchIdentityParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreUserSearchIdentityReturns>>}
     */
    core_user_search_identity(params: CoreUserSearchIdentityParams, method?: HttpMethod): Promise<MoodleResponse<CoreUserSearchIdentityReturns>>;
    /**
     * Remove a user device from the Moodle database.
     *
     * @param {CoreUserRemoveUserDeviceParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreUserRemoveUserDeviceReturns>>}
     */
    core_user_remove_user_device(params: CoreUserRemoveUserDeviceParams, method?: HttpMethod): Promise<MoodleResponse<CoreUserRemoveUserDeviceReturns>>;
    /**
     * Update users.
     *
     * @param {CoreUserUpdateUsersParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreUserUpdateUsersReturns>>}
     */
    core_user_update_users(params: CoreUserUpdateUsersParams, method?: HttpMethod): Promise<MoodleResponse<CoreUserUpdateUsersReturns>>;
    /**
     * Update a user's preferences
     *
     * @param {CoreUserUpdateUserPreferencesParams} [params]
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreUserUpdateUserPreferencesReturns>>}
     */
    core_user_update_user_preferences(params?: CoreUserUpdateUserPreferencesParams, method?: HttpMethod): Promise<MoodleResponse<CoreUserUpdateUserPreferencesReturns>>;
    /**
     * Simulates the web-interface view of user/index.php (triggering events),.
     *
     * @param {CoreUserViewUserListParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreUserViewUserListReturns>>}
     */
    core_user_view_user_list(params: CoreUserViewUserListParams, method?: HttpMethod): Promise<MoodleResponse<CoreUserViewUserListReturns>>;
    /**
     * Simulates the web-interface view of user/view.php and user/profile.php (triggering events),.
     *
     * @param {CoreUserViewUserProfileParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreUserViewUserProfileReturns>>}
     */
    core_user_view_user_profile(params: CoreUserViewUserProfileParams, method?: HttpMethod): Promise<MoodleResponse<CoreUserViewUserProfileReturns>>;
    /**
     * Return user preferences.
     *
     * @param {CoreUserGetUserPreferencesParams} [params]
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreUserGetUserPreferencesReturns>>}
     */
    core_user_get_user_preferences(params?: CoreUserGetUserPreferencesParams, method?: HttpMethod): Promise<MoodleResponse<CoreUserGetUserPreferencesReturns>>;
    /**
     * Update or delete the user picture in the site
     *
     * @param {CoreUserUpdatePictureParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreUserUpdatePictureReturns>>}
     */
    core_user_update_picture(params: CoreUserUpdatePictureParams, method?: HttpMethod): Promise<MoodleResponse<CoreUserUpdatePictureReturns>>;
    /**
     * Set user preferences.
     *
     * @param {CoreUserSetUserPreferencesParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreUserSetUserPreferencesReturns>>}
     */
    core_user_set_user_preferences(params: CoreUserSetUserPreferencesParams, method?: HttpMethod): Promise<MoodleResponse<CoreUserSetUserPreferencesReturns>>;
    /**
     * Agree the site policy for the current user.
     *
     * @param {CoreUserAgreeSitePolicyParams} [params]
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreUserAgreeSitePolicyReturns>>}
     */
    core_user_agree_site_policy(params?: CoreUserAgreeSitePolicyParams, method?: HttpMethod): Promise<MoodleResponse<CoreUserAgreeSitePolicyReturns>>;
    /**
     * Returns general information about files in the user private files area.
     *
     * @param {CoreUserGetPrivateFilesInfoParams} [params]
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreUserGetPrivateFilesInfoReturns>>}
     */
    core_user_get_private_files_info(params?: CoreUserGetPrivateFilesInfoParams, method?: HttpMethod): Promise<MoodleResponse<CoreUserGetPrivateFilesInfoReturns>>;
    /**
     * Prepares the draft area for user private files.
     *
     * @param {CoreUserPreparePrivateFilesForEditionParams} [params]
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreUserPreparePrivateFilesForEditionReturns>>}
     */
    core_user_prepare_private_files_for_edition(params?: CoreUserPreparePrivateFilesForEditionParams, method?: HttpMethod): Promise<MoodleResponse<CoreUserPreparePrivateFilesForEditionReturns>>;
    /**
     * Copy files from a draft area to users private files area.
     *
     * @param {CoreUserUpdatePrivateFilesParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreUserUpdatePrivateFilesReturns>>}
     */
    core_user_update_private_files(params: CoreUserUpdatePrivateFilesParams, method?: HttpMethod): Promise<MoodleResponse<CoreUserUpdatePrivateFilesReturns>>;
    /**
     * Creates new competency frameworks.
     *
     * @param {CoreCompetencyCreateCompetencyFrameworkParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCompetencyCreateCompetencyFrameworkReturns>>}
     */
    core_competency_create_competency_framework(params: CoreCompetencyCreateCompetencyFrameworkParams, method?: HttpMethod): Promise<MoodleResponse<CoreCompetencyCreateCompetencyFrameworkReturns>>;
    /**
     * Load a summary of a competency framework.
     *
     * @param {CoreCompetencyReadCompetencyFrameworkParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCompetencyReadCompetencyFrameworkReturns>>}
     */
    core_competency_read_competency_framework(params: CoreCompetencyReadCompetencyFrameworkParams, method?: HttpMethod): Promise<MoodleResponse<CoreCompetencyReadCompetencyFrameworkReturns>>;
    /**
     * Duplicate a competency framework.
     *
     * @param {CoreCompetencyDuplicateCompetencyFrameworkParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCompetencyDuplicateCompetencyFrameworkReturns>>}
     */
    core_competency_duplicate_competency_framework(params: CoreCompetencyDuplicateCompetencyFrameworkParams, method?: HttpMethod): Promise<MoodleResponse<CoreCompetencyDuplicateCompetencyFrameworkReturns>>;
    /**
     * Delete a competency framework.
     *
     * @param {CoreCompetencyDeleteCompetencyFrameworkParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCompetencyDeleteCompetencyFrameworkReturns>>} - True if the delete was successful
     */
    core_competency_delete_competency_framework(params: CoreCompetencyDeleteCompetencyFrameworkParams, method?: HttpMethod): Promise<MoodleResponse<CoreCompetencyDeleteCompetencyFrameworkReturns>>;
    /**
     * Update a competency framework.
     *
     * @param {CoreCompetencyUpdateCompetencyFrameworkParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCompetencyUpdateCompetencyFrameworkReturns>>} - True if the update was successful
     */
    core_competency_update_competency_framework(params: CoreCompetencyUpdateCompetencyFrameworkParams, method?: HttpMethod): Promise<MoodleResponse<CoreCompetencyUpdateCompetencyFrameworkReturns>>;
    /**
     * Load a list of a competency frameworks.
     *
     * @param {CoreCompetencyListCompetencyFrameworksParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCompetencyListCompetencyFrameworksReturns>>}
     */
    core_competency_list_competency_frameworks(params: CoreCompetencyListCompetencyFrameworksParams, method?: HttpMethod): Promise<MoodleResponse<CoreCompetencyListCompetencyFrameworksReturns>>;
    /**
     * Count a list of a competency frameworks.
     *
     * @param {CoreCompetencyCountCompetencyFrameworksParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCompetencyCountCompetencyFrameworksReturns>>} - The number of competency frameworks found.
     */
    core_competency_count_competency_frameworks(params: CoreCompetencyCountCompetencyFrameworksParams, method?: HttpMethod): Promise<MoodleResponse<CoreCompetencyCountCompetencyFrameworksReturns>>;
    /**
     * Log event competency framework viewed
     *
     * @param {CoreCompetencyCompetencyFrameworkViewedParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCompetencyCompetencyFrameworkViewedReturns>>} - True if the event competency framework was logged
     */
    core_competency_competency_framework_viewed(params: CoreCompetencyCompetencyFrameworkViewedParams, method?: HttpMethod): Promise<MoodleResponse<CoreCompetencyCompetencyFrameworkViewedReturns>>;
    /**
     * Creates new competencies.
     *
     * @param {CoreCompetencyCreateCompetencyParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCompetencyCreateCompetencyReturns>>}
     */
    core_competency_create_competency(params: CoreCompetencyCreateCompetencyParams, method?: HttpMethod): Promise<MoodleResponse<CoreCompetencyCreateCompetencyReturns>>;
    /**
     * Load a summary of a competency.
     *
     * @param {CoreCompetencyReadCompetencyParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCompetencyReadCompetencyReturns>>}
     */
    core_competency_read_competency(params: CoreCompetencyReadCompetencyParams, method?: HttpMethod): Promise<MoodleResponse<CoreCompetencyReadCompetencyReturns>>;
    /**
     * Log event competency viewed
     *
     * @param {CoreCompetencyCompetencyViewedParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCompetencyCompetencyViewedReturns>>} - True if the event competency viewed was logged
     */
    core_competency_competency_viewed(params: CoreCompetencyCompetencyViewedParams, method?: HttpMethod): Promise<MoodleResponse<CoreCompetencyCompetencyViewedReturns>>;
    /**
     * Delete a competency.
     *
     * @param {CoreCompetencyDeleteCompetencyParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCompetencyDeleteCompetencyReturns>>} - True if the delete was successful
     */
    core_competency_delete_competency(params: CoreCompetencyDeleteCompetencyParams, method?: HttpMethod): Promise<MoodleResponse<CoreCompetencyDeleteCompetencyReturns>>;
    /**
     * Update a competency.
     *
     * @param {CoreCompetencyUpdateCompetencyParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCompetencyUpdateCompetencyReturns>>} - True if the update was successful
     */
    core_competency_update_competency(params: CoreCompetencyUpdateCompetencyParams, method?: HttpMethod): Promise<MoodleResponse<CoreCompetencyUpdateCompetencyReturns>>;
    /**
     * Load a list of a competencies.
     *
     * @param {CoreCompetencyListCompetenciesParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCompetencyListCompetenciesReturns>>}
     */
    core_competency_list_competencies(params: CoreCompetencyListCompetenciesParams, method?: HttpMethod): Promise<MoodleResponse<CoreCompetencyListCompetenciesReturns>>;
    /**
     * Load a list of a competencies for a given template.
     *
     * @param {CoreCompetencyListCompetenciesInTemplateParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCompetencyListCompetenciesInTemplateReturns>>}
     */
    core_competency_list_competencies_in_template(params: CoreCompetencyListCompetenciesInTemplateParams, method?: HttpMethod): Promise<MoodleResponse<CoreCompetencyListCompetenciesInTemplateReturns>>;
    /**
     * Count a list of a competencies.
     *
     * @param {CoreCompetencyCountCompetenciesParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCompetencyCountCompetenciesReturns>>} - The number of competencies found.
     */
    core_competency_count_competencies(params: CoreCompetencyCountCompetenciesParams, method?: HttpMethod): Promise<MoodleResponse<CoreCompetencyCountCompetenciesReturns>>;
    /**
     * Count a list of a competencies for a given template.
     *
     * @param {CoreCompetencyCountCompetenciesInTemplateParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCompetencyCountCompetenciesInTemplateReturns>>} - The number of competencies in this learning plan template.
     */
    core_competency_count_competencies_in_template(params: CoreCompetencyCountCompetenciesInTemplateParams, method?: HttpMethod): Promise<MoodleResponse<CoreCompetencyCountCompetenciesInTemplateReturns>>;
    /**
     * Search a list of a competencies.
     *
     * @param {CoreCompetencySearchCompetenciesParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCompetencySearchCompetenciesReturns>>}
     */
    core_competency_search_competencies(params: CoreCompetencySearchCompetenciesParams, method?: HttpMethod): Promise<MoodleResponse<CoreCompetencySearchCompetenciesReturns>>;
    /**
     * Set a new parent for a competency.
     *
     * @param {CoreCompetencySetParentCompetencyParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCompetencySetParentCompetencyReturns>>} - True if the update was successful
     */
    core_competency_set_parent_competency(params: CoreCompetencySetParentCompetencyParams, method?: HttpMethod): Promise<MoodleResponse<CoreCompetencySetParentCompetencyReturns>>;
    /**
     * Re-order a competency.
     *
     * @param {CoreCompetencyMoveUpCompetencyParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCompetencyMoveUpCompetencyReturns>>} - True if the update was successful
     */
    core_competency_move_up_competency(params: CoreCompetencyMoveUpCompetencyParams, method?: HttpMethod): Promise<MoodleResponse<CoreCompetencyMoveUpCompetencyReturns>>;
    /**
     * Re-order a competency.
     *
     * @param {CoreCompetencyMoveDownCompetencyParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCompetencyMoveDownCompetencyReturns>>} - True if the update was successful
     */
    core_competency_move_down_competency(params: CoreCompetencyMoveDownCompetencyParams, method?: HttpMethod): Promise<MoodleResponse<CoreCompetencyMoveDownCompetencyReturns>>;
    /**
     * List the competencies in a course module
     *
     * @param {CoreCompetencyListCourseModuleCompetenciesParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCompetencyListCourseModuleCompetenciesReturns>>}
     */
    core_competency_list_course_module_competencies(params: CoreCompetencyListCourseModuleCompetenciesParams, method?: HttpMethod): Promise<MoodleResponse<CoreCompetencyListCourseModuleCompetenciesReturns>>;
    /**
     * Count the competencies in a course module
     *
     * @param {CoreCompetencyCountCourseModuleCompetenciesParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCompetencyCountCourseModuleCompetenciesReturns>>} - The number of competencies found.
     */
    core_competency_count_course_module_competencies(params: CoreCompetencyCountCourseModuleCompetenciesParams, method?: HttpMethod): Promise<MoodleResponse<CoreCompetencyCountCourseModuleCompetenciesReturns>>;
    /**
     * List the competencies in a course
     *
     * @param {CoreCompetencyListCourseCompetenciesParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCompetencyListCourseCompetenciesReturns>>}
     */
    core_competency_list_course_competencies(params: CoreCompetencyListCourseCompetenciesParams, method?: HttpMethod): Promise<MoodleResponse<CoreCompetencyListCourseCompetenciesReturns>>;
    /**
     * List the competencies in a course
     *
     * @param {CoreCompetencyCountCompetenciesInCourseParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCompetencyCountCompetenciesInCourseReturns>>} - The number of competencies in this course.
     */
    core_competency_count_competencies_in_course(params: CoreCompetencyCountCompetenciesInCourseParams, method?: HttpMethod): Promise<MoodleResponse<CoreCompetencyCountCompetenciesInCourseReturns>>;
    /**
     * List the courses using a competency
     *
     * @param {CoreCompetencyCountCoursesUsingCompetencyParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCompetencyCountCoursesUsingCompetencyReturns>>} - The number of courses using this competency
     */
    core_competency_count_courses_using_competency(params: CoreCompetencyCountCoursesUsingCompetencyParams, method?: HttpMethod): Promise<MoodleResponse<CoreCompetencyCountCoursesUsingCompetencyReturns>>;
    /**
     * Add the competency to a course
     *
     * @param {CoreCompetencyAddCompetencyToCourseParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCompetencyAddCompetencyToCourseReturns>>} - True if successful.
     */
    core_competency_add_competency_to_course(params: CoreCompetencyAddCompetencyToCourseParams, method?: HttpMethod): Promise<MoodleResponse<CoreCompetencyAddCompetencyToCourseReturns>>;
    /**
     * Add the competency to a template
     *
     * @param {CoreCompetencyAddCompetencyToTemplateParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCompetencyAddCompetencyToTemplateReturns>>} - True if successful.
     */
    core_competency_add_competency_to_template(params: CoreCompetencyAddCompetencyToTemplateParams, method?: HttpMethod): Promise<MoodleResponse<CoreCompetencyAddCompetencyToTemplateReturns>>;
    /**
     * Remove a competency from a course
     *
     * @param {CoreCompetencyRemoveCompetencyFromCourseParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCompetencyRemoveCompetencyFromCourseReturns>>} - True if successful.
     */
    core_competency_remove_competency_from_course(params: CoreCompetencyRemoveCompetencyFromCourseParams, method?: HttpMethod): Promise<MoodleResponse<CoreCompetencyRemoveCompetencyFromCourseReturns>>;
    /**
     * Modify the ruleoutcome value for course competency
     *
     * @param {CoreCompetencySetCourseCompetencyRuleoutcomeParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCompetencySetCourseCompetencyRuleoutcomeReturns>>} - True if the update was successful
     */
    core_competency_set_course_competency_ruleoutcome(params: CoreCompetencySetCourseCompetencyRuleoutcomeParams, method?: HttpMethod): Promise<MoodleResponse<CoreCompetencySetCourseCompetencyRuleoutcomeReturns>>;
    /**
     * Remove a competency from a template
     *
     * @param {CoreCompetencyRemoveCompetencyFromTemplateParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCompetencyRemoveCompetencyFromTemplateReturns>>} - True if successful.
     */
    core_competency_remove_competency_from_template(params: CoreCompetencyRemoveCompetencyFromTemplateParams, method?: HttpMethod): Promise<MoodleResponse<CoreCompetencyRemoveCompetencyFromTemplateReturns>>;
    /**
     * Move a course competency to a new relative sort order.
     *
     * @param {CoreCompetencyReorderCourseCompetencyParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCompetencyReorderCourseCompetencyReturns>>} - True if successful.
     */
    core_competency_reorder_course_competency(params: CoreCompetencyReorderCourseCompetencyParams, method?: HttpMethod): Promise<MoodleResponse<CoreCompetencyReorderCourseCompetencyReturns>>;
    /**
     * Move a template competency to a new relative sort order.
     *
     * @param {CoreCompetencyReorderTemplateCompetencyParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCompetencyReorderTemplateCompetencyReturns>>} - True if successful.
     */
    core_competency_reorder_template_competency(params: CoreCompetencyReorderTemplateCompetencyParams, method?: HttpMethod): Promise<MoodleResponse<CoreCompetencyReorderTemplateCompetencyReturns>>;
    /**
     * Creates new learning plan templates.
     *
     * @param {CoreCompetencyCreateTemplateParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCompetencyCreateTemplateReturns>>}
     */
    core_competency_create_template(params: CoreCompetencyCreateTemplateParams, method?: HttpMethod): Promise<MoodleResponse<CoreCompetencyCreateTemplateReturns>>;
    /**
     * Duplicate learning plan template.
     *
     * @param {CoreCompetencyDuplicateTemplateParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCompetencyDuplicateTemplateReturns>>}
     */
    core_competency_duplicate_template(params: CoreCompetencyDuplicateTemplateParams, method?: HttpMethod): Promise<MoodleResponse<CoreCompetencyDuplicateTemplateReturns>>;
    /**
     * Load a summary of a learning plan template.
     *
     * @param {CoreCompetencyReadTemplateParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCompetencyReadTemplateReturns>>}
     */
    core_competency_read_template(params: CoreCompetencyReadTemplateParams, method?: HttpMethod): Promise<MoodleResponse<CoreCompetencyReadTemplateReturns>>;
    /**
     * Delete a learning plan template.
     *
     * @param {CoreCompetencyDeleteTemplateParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCompetencyDeleteTemplateReturns>>} - True if the delete was successful
     */
    core_competency_delete_template(params: CoreCompetencyDeleteTemplateParams, method?: HttpMethod): Promise<MoodleResponse<CoreCompetencyDeleteTemplateReturns>>;
    /**
     * Update a learning plan template.
     *
     * @param {CoreCompetencyUpdateTemplateParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCompetencyUpdateTemplateReturns>>} - True if the update was successful
     */
    core_competency_update_template(params: CoreCompetencyUpdateTemplateParams, method?: HttpMethod): Promise<MoodleResponse<CoreCompetencyUpdateTemplateReturns>>;
    /**
     * Load a list of a learning plan templates.
     *
     * @param {CoreCompetencyListTemplatesParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCompetencyListTemplatesReturns>>}
     */
    core_competency_list_templates(params: CoreCompetencyListTemplatesParams, method?: HttpMethod): Promise<MoodleResponse<CoreCompetencyListTemplatesReturns>>;
    /**
     * Load a list of a learning plan templates for a given competency.
     *
     * @param {CoreCompetencyListTemplatesUsingCompetencyParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCompetencyListTemplatesUsingCompetencyReturns>>}
     */
    core_competency_list_templates_using_competency(params: CoreCompetencyListTemplatesUsingCompetencyParams, method?: HttpMethod): Promise<MoodleResponse<CoreCompetencyListTemplatesUsingCompetencyReturns>>;
    /**
     * Count a list of a learning plan templates.
     *
     * @param {CoreCompetencyCountTemplatesParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCompetencyCountTemplatesReturns>>} - The number of learning plan templates found.
     */
    core_competency_count_templates(params: CoreCompetencyCountTemplatesParams, method?: HttpMethod): Promise<MoodleResponse<CoreCompetencyCountTemplatesReturns>>;
    /**
     * Count a list of a learning plan templates for a given competency.
     *
     * @param {CoreCompetencyCountTemplatesUsingCompetencyParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCompetencyCountTemplatesUsingCompetencyReturns>>} - The number of learning plan templates using this competency
     */
    core_competency_count_templates_using_competency(params: CoreCompetencyCountTemplatesUsingCompetencyParams, method?: HttpMethod): Promise<MoodleResponse<CoreCompetencyCountTemplatesUsingCompetencyReturns>>;
    /**
     * Creates a learning plan.
     *
     * @param {CoreCompetencyCreatePlanParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCompetencyCreatePlanReturns>>}
     */
    core_competency_create_plan(params: CoreCompetencyCreatePlanParams, method?: HttpMethod): Promise<MoodleResponse<CoreCompetencyCreatePlanReturns>>;
    /**
     * Updates a learning plan.
     *
     * @param {CoreCompetencyUpdatePlanParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCompetencyUpdatePlanReturns>>}
     */
    core_competency_update_plan(params: CoreCompetencyUpdatePlanParams, method?: HttpMethod): Promise<MoodleResponse<CoreCompetencyUpdatePlanReturns>>;
    /**
     * Complete learning plan.
     *
     * @param {CoreCompetencyCompletePlanParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCompetencyCompletePlanReturns>>} - True if completing learning plan was successful
     */
    core_competency_complete_plan(params: CoreCompetencyCompletePlanParams, method?: HttpMethod): Promise<MoodleResponse<CoreCompetencyCompletePlanReturns>>;
    /**
     * Reopen learning plan.
     *
     * @param {CoreCompetencyReopenPlanParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCompetencyReopenPlanReturns>>} - True if reopening learning plan was successful
     */
    core_competency_reopen_plan(params: CoreCompetencyReopenPlanParams, method?: HttpMethod): Promise<MoodleResponse<CoreCompetencyReopenPlanReturns>>;
    /**
     * Load a learning plan.
     *
     * @param {CoreCompetencyReadPlanParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCompetencyReadPlanReturns>>}
     */
    core_competency_read_plan(params: CoreCompetencyReadPlanParams, method?: HttpMethod): Promise<MoodleResponse<CoreCompetencyReadPlanReturns>>;
    /**
     * Delete a learning plan.
     *
     * @param {CoreCompetencyDeletePlanParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCompetencyDeletePlanReturns>>} - True if the delete was successful
     */
    core_competency_delete_plan(params: CoreCompetencyDeletePlanParams, method?: HttpMethod): Promise<MoodleResponse<CoreCompetencyDeletePlanReturns>>;
    /**
     * List a user's learning plans.
     *
     * @param {CoreCompetencyListUserPlansParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCompetencyListUserPlansReturns>>}
     */
    core_competency_list_user_plans(params: CoreCompetencyListUserPlansParams, method?: HttpMethod): Promise<MoodleResponse<CoreCompetencyListUserPlansReturns>>;
    /**
     * List the competencies in a plan
     *
     * @param {CoreCompetencyListPlanCompetenciesParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCompetencyListPlanCompetenciesReturns>>}
     */
    core_competency_list_plan_competencies(params: CoreCompetencyListPlanCompetenciesParams, method?: HttpMethod): Promise<MoodleResponse<CoreCompetencyListPlanCompetenciesReturns>>;
    /**
     * Add the competency to a learning plan
     *
     * @param {CoreCompetencyAddCompetencyToPlanParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCompetencyAddCompetencyToPlanReturns>>} - True if successful.
     */
    core_competency_add_competency_to_plan(params: CoreCompetencyAddCompetencyToPlanParams, method?: HttpMethod): Promise<MoodleResponse<CoreCompetencyAddCompetencyToPlanReturns>>;
    /**
     * Remove the competency from a learning plan
     *
     * @param {CoreCompetencyRemoveCompetencyFromPlanParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCompetencyRemoveCompetencyFromPlanReturns>>} - True if successful.
     */
    core_competency_remove_competency_from_plan(params: CoreCompetencyRemoveCompetencyFromPlanParams, method?: HttpMethod): Promise<MoodleResponse<CoreCompetencyRemoveCompetencyFromPlanReturns>>;
    /**
     * Move a plan competency to a new relative sort order.
     *
     * @param {CoreCompetencyReorderPlanCompetencyParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCompetencyReorderPlanCompetencyReturns>>} - True if successful.
     */
    core_competency_reorder_plan_competency(params: CoreCompetencyReorderPlanCompetencyParams, method?: HttpMethod): Promise<MoodleResponse<CoreCompetencyReorderPlanCompetencyReturns>>;
    /**
     * Request for a plan to be reviewed.
     *
     * @param {CoreCompetencyPlanRequestReviewParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCompetencyPlanRequestReviewReturns>>} - The success
     */
    core_competency_plan_request_review(params: CoreCompetencyPlanRequestReviewParams, method?: HttpMethod): Promise<MoodleResponse<CoreCompetencyPlanRequestReviewReturns>>;
    /**
     * Start the review of a plan.
     *
     * @param {CoreCompetencyPlanStartReviewParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCompetencyPlanStartReviewReturns>>} - The success
     */
    core_competency_plan_start_review(params: CoreCompetencyPlanStartReviewParams, method?: HttpMethod): Promise<MoodleResponse<CoreCompetencyPlanStartReviewReturns>>;
    /**
     * Stop the review of a plan.
     *
     * @param {CoreCompetencyPlanStopReviewParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCompetencyPlanStopReviewReturns>>} - The success
     */
    core_competency_plan_stop_review(params: CoreCompetencyPlanStopReviewParams, method?: HttpMethod): Promise<MoodleResponse<CoreCompetencyPlanStopReviewReturns>>;
    /**
     * Cancel the review of a plan.
     *
     * @param {CoreCompetencyPlanCancelReviewRequestParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCompetencyPlanCancelReviewRequestReturns>>} - The success
     */
    core_competency_plan_cancel_review_request(params: CoreCompetencyPlanCancelReviewRequestParams, method?: HttpMethod): Promise<MoodleResponse<CoreCompetencyPlanCancelReviewRequestReturns>>;
    /**
     * Approve a plan.
     *
     * @param {CoreCompetencyApprovePlanParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCompetencyApprovePlanReturns>>} - The success
     */
    core_competency_approve_plan(params: CoreCompetencyApprovePlanParams, method?: HttpMethod): Promise<MoodleResponse<CoreCompetencyApprovePlanReturns>>;
    /**
     * Unapprove a plan.
     *
     * @param {CoreCompetencyUnapprovePlanParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCompetencyUnapprovePlanReturns>>} - The success
     */
    core_competency_unapprove_plan(params: CoreCompetencyUnapprovePlanParams, method?: HttpMethod): Promise<MoodleResponse<CoreCompetencyUnapprovePlanReturns>>;
    /**
     * Check if a template has related data
     *
     * @param {CoreCompetencyTemplateHasRelatedDataParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCompetencyTemplateHasRelatedDataReturns>>} - True if the template has related data
     */
    core_competency_template_has_related_data(params: CoreCompetencyTemplateHasRelatedDataParams, method?: HttpMethod): Promise<MoodleResponse<CoreCompetencyTemplateHasRelatedDataReturns>>;
    /**
     * Fetch the values for a specific scale
     *
     * @param {CoreCompetencyGetScaleValuesParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCompetencyGetScaleValuesReturns>>}
     */
    core_competency_get_scale_values(params: CoreCompetencyGetScaleValuesParams, method?: HttpMethod): Promise<MoodleResponse<CoreCompetencyGetScaleValuesReturns>>;
    /**
     * Adds a related competency
     *
     * @param {CoreCompetencyAddRelatedCompetencyParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCompetencyAddRelatedCompetencyReturns>>} - True if successful.
     */
    core_competency_add_related_competency(params: CoreCompetencyAddRelatedCompetencyParams, method?: HttpMethod): Promise<MoodleResponse<CoreCompetencyAddRelatedCompetencyReturns>>;
    /**
     * Remove a related competency
     *
     * @param {CoreCompetencyRemoveRelatedCompetencyParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCompetencyRemoveRelatedCompetencyReturns>>} - True if successful.
     */
    core_competency_remove_related_competency(params: CoreCompetencyRemoveRelatedCompetencyParams, method?: HttpMethod): Promise<MoodleResponse<CoreCompetencyRemoveRelatedCompetencyReturns>>;
    /**
     * Read an evidence of prior learning.
     *
     * @param {CoreCompetencyReadUserEvidenceParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCompetencyReadUserEvidenceReturns>>}
     */
    core_competency_read_user_evidence(params: CoreCompetencyReadUserEvidenceParams, method?: HttpMethod): Promise<MoodleResponse<CoreCompetencyReadUserEvidenceReturns>>;
    /**
     * Delete an evidence of prior learning.
     *
     * @param {CoreCompetencyDeleteUserEvidenceParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCompetencyDeleteUserEvidenceReturns>>} - True if the delete was successful
     */
    core_competency_delete_user_evidence(params: CoreCompetencyDeleteUserEvidenceParams, method?: HttpMethod): Promise<MoodleResponse<CoreCompetencyDeleteUserEvidenceReturns>>;
    /**
     * Create an evidence of prior learning relationship with a competency.
     *
     * @param {CoreCompetencyCreateUserEvidenceCompetencyParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCompetencyCreateUserEvidenceCompetencyReturns>>}
     */
    core_competency_create_user_evidence_competency(params: CoreCompetencyCreateUserEvidenceCompetencyParams, method?: HttpMethod): Promise<MoodleResponse<CoreCompetencyCreateUserEvidenceCompetencyReturns>>;
    /**
     * Delete an evidence of prior learning relationship with a competency.
     *
     * @param {CoreCompetencyDeleteUserEvidenceCompetencyParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCompetencyDeleteUserEvidenceCompetencyReturns>>} - True if the delete was successful
     */
    core_competency_delete_user_evidence_competency(params: CoreCompetencyDeleteUserEvidenceCompetencyParams, method?: HttpMethod): Promise<MoodleResponse<CoreCompetencyDeleteUserEvidenceCompetencyReturns>>;
    /**
     * Cancel a review request.
     *
     * @param {CoreCompetencyUserCompetencyCancelReviewRequestParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCompetencyUserCompetencyCancelReviewRequestReturns>>} - The success
     */
    core_competency_user_competency_cancel_review_request(params: CoreCompetencyUserCompetencyCancelReviewRequestParams, method?: HttpMethod): Promise<MoodleResponse<CoreCompetencyUserCompetencyCancelReviewRequestReturns>>;
    /**
     * Request a review.
     *
     * @param {CoreCompetencyUserCompetencyRequestReviewParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCompetencyUserCompetencyRequestReviewReturns>>} - The success
     */
    core_competency_user_competency_request_review(params: CoreCompetencyUserCompetencyRequestReviewParams, method?: HttpMethod): Promise<MoodleResponse<CoreCompetencyUserCompetencyRequestReviewReturns>>;
    /**
     * Start a review.
     *
     * @param {CoreCompetencyUserCompetencyStartReviewParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCompetencyUserCompetencyStartReviewReturns>>} - The success
     */
    core_competency_user_competency_start_review(params: CoreCompetencyUserCompetencyStartReviewParams, method?: HttpMethod): Promise<MoodleResponse<CoreCompetencyUserCompetencyStartReviewReturns>>;
    /**
     * Stop a review.
     *
     * @param {CoreCompetencyUserCompetencyStopReviewParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCompetencyUserCompetencyStopReviewReturns>>} - The success
     */
    core_competency_user_competency_stop_review(params: CoreCompetencyUserCompetencyStopReviewParams, method?: HttpMethod): Promise<MoodleResponse<CoreCompetencyUserCompetencyStopReviewReturns>>;
    /**
     * Log the user competency viewed event.
     *
     * @param {CoreCompetencyUserCompetencyViewedParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCompetencyUserCompetencyViewedReturns>>} - True if the event user competency viewed was logged
     */
    core_competency_user_competency_viewed(params: CoreCompetencyUserCompetencyViewedParams, method?: HttpMethod): Promise<MoodleResponse<CoreCompetencyUserCompetencyViewedReturns>>;
    /**
     * Log the user competency viewed in plan event.
     *
     * @param {CoreCompetencyUserCompetencyViewedInPlanParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCompetencyUserCompetencyViewedInPlanReturns>>} - True if the event user competency viewed in plan was logged
     */
    core_competency_user_competency_viewed_in_plan(params: CoreCompetencyUserCompetencyViewedInPlanParams, method?: HttpMethod): Promise<MoodleResponse<CoreCompetencyUserCompetencyViewedInPlanReturns>>;
    /**
     * Log the user competency viewed in course event
     *
     * @param {CoreCompetencyUserCompetencyViewedInCourseParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCompetencyUserCompetencyViewedInCourseReturns>>} - True if the event user competency viewed in course was logged
     */
    core_competency_user_competency_viewed_in_course(params: CoreCompetencyUserCompetencyViewedInCourseParams, method?: HttpMethod): Promise<MoodleResponse<CoreCompetencyUserCompetencyViewedInCourseReturns>>;
    /**
     * Log the user competency plan viewed event.
     *
     * @param {CoreCompetencyUserCompetencyPlanViewedParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCompetencyUserCompetencyPlanViewedReturns>>} - True if the event user competency plan viewed was logged
     */
    core_competency_user_competency_plan_viewed(params: CoreCompetencyUserCompetencyPlanViewedParams, method?: HttpMethod): Promise<MoodleResponse<CoreCompetencyUserCompetencyPlanViewedReturns>>;
    /**
     * Grade a competency.
     *
     * @param {CoreCompetencyGradeCompetencyParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCompetencyGradeCompetencyReturns>>}
     */
    core_competency_grade_competency(params: CoreCompetencyGradeCompetencyParams, method?: HttpMethod): Promise<MoodleResponse<CoreCompetencyGradeCompetencyReturns>>;
    /**
     * Grade a competency from the user plan page.
     *
     * @param {CoreCompetencyGradeCompetencyInPlanParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCompetencyGradeCompetencyInPlanReturns>>}
     */
    core_competency_grade_competency_in_plan(params: CoreCompetencyGradeCompetencyInPlanParams, method?: HttpMethod): Promise<MoodleResponse<CoreCompetencyGradeCompetencyInPlanReturns>>;
    /**
     * Grade a competency from the course page.
     *
     * @param {CoreCompetencyGradeCompetencyInCourseParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCompetencyGradeCompetencyInCourseReturns>>}
     */
    core_competency_grade_competency_in_course(params: CoreCompetencyGradeCompetencyInCourseParams, method?: HttpMethod): Promise<MoodleResponse<CoreCompetencyGradeCompetencyInCourseReturns>>;
    /**
     * Unlink a plan form it template.
     *
     * @param {CoreCompetencyUnlinkPlanFromTemplateParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCompetencyUnlinkPlanFromTemplateReturns>>} - True if the unlink was successful
     */
    core_competency_unlink_plan_from_template(params: CoreCompetencyUnlinkPlanFromTemplateParams, method?: HttpMethod): Promise<MoodleResponse<CoreCompetencyUnlinkPlanFromTemplateReturns>>;
    /**
     * Log event template viewed
     *
     * @param {CoreCompetencyTemplateViewedParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCompetencyTemplateViewedReturns>>} - True if the log of the view was successful
     */
    core_competency_template_viewed(params: CoreCompetencyTemplateViewedParams, method?: HttpMethod): Promise<MoodleResponse<CoreCompetencyTemplateViewedReturns>>;
    /**
     * Send user evidence competencies in review
     *
     * @param {CoreCompetencyRequestReviewOfUserEvidenceLinkedCompetenciesParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCompetencyRequestReviewOfUserEvidenceLinkedCompetenciesReturns>>} - True if all competencies were send to review
     */
    core_competency_request_review_of_user_evidence_linked_competencies(params: CoreCompetencyRequestReviewOfUserEvidenceLinkedCompetenciesParams, method?: HttpMethod): Promise<MoodleResponse<CoreCompetencyRequestReviewOfUserEvidenceLinkedCompetenciesReturns>>;
    /**
     * Update the course competency settings
     *
     * @param {CoreCompetencyUpdateCourseCompetencySettingsParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCompetencyUpdateCourseCompetencySettingsReturns>>} - True if the update was successful.
     */
    core_competency_update_course_competency_settings(params: CoreCompetencyUpdateCourseCompetencySettingsParams, method?: HttpMethod): Promise<MoodleResponse<CoreCompetencyUpdateCourseCompetencySettingsReturns>>;
    /**
     * Delete an evidence
     *
     * @param {CoreCompetencyDeleteEvidenceParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCompetencyDeleteEvidenceReturns>>} - The success
     */
    core_competency_delete_evidence(params: CoreCompetencyDeleteEvidenceParams, method?: HttpMethod): Promise<MoodleResponse<CoreCompetencyDeleteEvidenceReturns>>;
    /**
     * Return some site info / user info / list web service functions
     *
     * @param {CoreWebserviceGetSiteInfoParams} [params]
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreWebserviceGetSiteInfoReturns>>}
     */
    core_webservice_get_site_info(params?: CoreWebserviceGetSiteInfoParams, method?: HttpMethod): Promise<MoodleResponse<CoreWebserviceGetSiteInfoReturns>>;
    /**
     * Returns blocks information for a course.
     *
     * @param {CoreBlockGetCourseBlocksParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreBlockGetCourseBlocksReturns>>}
     */
    core_block_get_course_blocks(params: CoreBlockGetCourseBlocksParams, method?: HttpMethod): Promise<MoodleResponse<CoreBlockGetCourseBlocksReturns>>;
    /**
     * Returns blocks information for the given user dashboard.
     *
     * @param {CoreBlockGetDashboardBlocksParams} [params]
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreBlockGetDashboardBlocksReturns>>}
     */
    core_block_get_dashboard_blocks(params?: CoreBlockGetDashboardBlocksParams, method?: HttpMethod): Promise<MoodleResponse<CoreBlockGetDashboardBlocksReturns>>;
    /**
     * Returns all addable blocks in a given page.
     *
     * @param {CoreBlockFetchAddableBlocksParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreBlockFetchAddableBlocksReturns>>} - List of addable blocks in a given page.
     */
    core_block_fetch_addable_blocks(params: CoreBlockFetchAddableBlocksParams, method?: HttpMethod): Promise<MoodleResponse<CoreBlockFetchAddableBlocksReturns>>;
    /**
     * Returns the filters available in the given contexts.
     *
     * @param {CoreFiltersGetAvailableInContextParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreFiltersGetAvailableInContextReturns>>}
     */
    core_filters_get_available_in_context(params: CoreFiltersGetAvailableInContextParams, method?: HttpMethod): Promise<MoodleResponse<CoreFiltersGetAvailableInContextReturns>>;
    /**
     * Retrieve all the filters and their states (including overridden ones in any context).
     *
     * @param {CoreFiltersGetAllStatesParams} [params]
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreFiltersGetAllStatesReturns>>}
     */
    core_filters_get_all_states(params?: CoreFiltersGetAllStatesParams, method?: HttpMethod): Promise<MoodleResponse<CoreFiltersGetAllStatesReturns>>;
    /**
     * Deletes an entry
     *
     * @param {CoreCustomfieldDeleteFieldParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCustomfieldDeleteFieldReturns>>}
     */
    core_customfield_delete_field(params: CoreCustomfieldDeleteFieldParams, method?: HttpMethod): Promise<MoodleResponse<CoreCustomfieldDeleteFieldReturns>>;
    /**
     * Reloads template
     *
     * @param {CoreCustomfieldReloadTemplateParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCustomfieldReloadTemplateReturns>>}
     */
    core_customfield_reload_template(params: CoreCustomfieldReloadTemplateParams, method?: HttpMethod): Promise<MoodleResponse<CoreCustomfieldReloadTemplateReturns>>;
    /**
     * Creates a new category
     *
     * @param {CoreCustomfieldCreateCategoryParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCustomfieldCreateCategoryReturns>>} - Id of the category
     */
    core_customfield_create_category(params: CoreCustomfieldCreateCategoryParams, method?: HttpMethod): Promise<MoodleResponse<CoreCustomfieldCreateCategoryReturns>>;
    /**
     * Deletes a category
     *
     * @param {CoreCustomfieldDeleteCategoryParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCustomfieldDeleteCategoryReturns>>}
     */
    core_customfield_delete_category(params: CoreCustomfieldDeleteCategoryParams, method?: HttpMethod): Promise<MoodleResponse<CoreCustomfieldDeleteCategoryReturns>>;
    /**
     * Drag and drop
     *
     * @param {CoreCustomfieldMoveFieldParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCustomfieldMoveFieldReturns>>}
     */
    core_customfield_move_field(params: CoreCustomfieldMoveFieldParams, method?: HttpMethod): Promise<MoodleResponse<CoreCustomfieldMoveFieldReturns>>;
    /**
     * Drag and drop categories
     *
     * @param {CoreCustomfieldMoveCategoryParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCustomfieldMoveCategoryReturns>>}
     */
    core_customfield_move_category(params: CoreCustomfieldMoveCategoryParams, method?: HttpMethod): Promise<MoodleResponse<CoreCustomfieldMoveCategoryReturns>>;
    /**
     * Get the H5P file cleaned for Mobile App.
     *
     * @param {CoreH5pGetTrustedH5pFileParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreH5pGetTrustedH5pFileReturns>>}
     */
    core_h5p_get_trusted_h5p_file(params: CoreH5pGetTrustedH5pFileParams, method?: HttpMethod): Promise<MoodleResponse<CoreH5pGetTrustedH5pFileReturns>>;
    /**
     * Get the dynamic table content raw html
     *
     * @param {CoreTableGetDynamicTableContentParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreTableGetDynamicTableContentReturns>>}
     */
    core_table_get_dynamic_table_content(params: CoreTableGetDynamicTableContentParams, method?: HttpMethod): Promise<MoodleResponse<CoreTableGetDynamicTableContentReturns>>;
    /**
     * Post an xAPI statement.
     *
     * @param {CoreXapiStatementPostParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreXapiStatementPostReturns>>} - List of statements storing acceptance results
     */
    core_xapi_statement_post(params: CoreXapiStatementPostParams, method?: HttpMethod): Promise<MoodleResponse<CoreXapiStatementPostReturns>>;
    /**
     * Post an xAPI state into an activityId.
     *
     * @param {CoreXapiPostStateParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreXapiPostStateReturns>>} - If the state is accepted
     */
    core_xapi_post_state(params: CoreXapiPostStateParams, method?: HttpMethod): Promise<MoodleResponse<CoreXapiPostStateReturns>>;
    /**
     * Get an xAPI state data from an activityId.
     *
     * @param {CoreXapiGetStateParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreXapiGetStateReturns>>} - The state data json
     */
    core_xapi_get_state(params: CoreXapiGetStateParams, method?: HttpMethod): Promise<MoodleResponse<CoreXapiGetStateReturns>>;
    /**
     * Get all state ID from an activityId.
     *
     * @param {CoreXapiGetStatesParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreXapiGetStatesReturns>>} - List of state Ids
     */
    core_xapi_get_states(params: CoreXapiGetStatesParams, method?: HttpMethod): Promise<MoodleResponse<CoreXapiGetStatesReturns>>;
    /**
     * Delete an xAPI state data from an activityId.
     *
     * @param {CoreXapiDeleteStateParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreXapiDeleteStateReturns>>} - If the state data is deleted
     */
    core_xapi_delete_state(params: CoreXapiDeleteStateParams, method?: HttpMethod): Promise<MoodleResponse<CoreXapiDeleteStateReturns>>;
    /**
     * Delete all xAPI state data from an activityId.
     *
     * @param {CoreXapiDeleteStatesParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreXapiDeleteStatesReturns>>}
     */
    core_xapi_delete_states(params: CoreXapiDeleteStatesParams, method?: HttpMethod): Promise<MoodleResponse<CoreXapiDeleteStatesReturns>>;
    /**
     * Delete a content from the content bank.
     *
     * @param {CoreContentbankDeleteContentParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreContentbankDeleteContentReturns>>}
     */
    core_contentbank_delete_content(params: CoreContentbankDeleteContentParams, method?: HttpMethod): Promise<MoodleResponse<CoreContentbankDeleteContentReturns>>;
    /**
     * Rename a content in the content bank.
     *
     * @param {CoreContentbankRenameContentParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreContentbankRenameContentReturns>>}
     */
    core_contentbank_rename_content(params: CoreContentbankRenameContentParams, method?: HttpMethod): Promise<MoodleResponse<CoreContentbankRenameContentReturns>>;
    /**
     * Copy a content in the content bank.
     *
     * @param {CoreContentbankCopyContentParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreContentbankCopyContentReturns>>}
     */
    core_contentbank_copy_content(params: CoreContentbankCopyContentParams, method?: HttpMethod): Promise<MoodleResponse<CoreContentbankCopyContentReturns>>;
    /**
     * Set the visibility of a content in the content bank.
     *
     * @param {CoreContentbankSetContentVisibilityParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreContentbankSetContentVisibilityReturns>>}
     */
    core_contentbank_set_content_visibility(params: CoreContentbankSetContentVisibilityParams, method?: HttpMethod): Promise<MoodleResponse<CoreContentbankSetContentVisibilityReturns>>;
    /**
     * Record the action that the user takes in the user feedback notification for future use.
     *
     * @param {CoreCreateUserfeedbackActionRecordParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreCreateUserfeedbackActionRecordReturns>>}
     */
    core_create_userfeedback_action_record(params: CoreCreateUserfeedbackActionRecordParams, method?: HttpMethod): Promise<MoodleResponse<CoreCreateUserfeedbackActionRecordReturns>>;
    /**
     * Get the list of payment gateways that support the given component/area
     *
     * @param {CorePaymentGetAvailableGatewaysParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CorePaymentGetAvailableGatewaysReturns>>}
     */
    core_payment_get_available_gateways(params: CorePaymentGetAvailableGatewaysParams, method?: HttpMethod): Promise<MoodleResponse<CorePaymentGetAvailableGatewaysReturns>>;
    /**
     * Reset filters for given report
     *
     * @param {CoreReportbuilderFiltersResetParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreReportbuilderFiltersResetReturns>>} - Success
     */
    core_reportbuilder_filters_reset(params: CoreReportbuilderFiltersResetParams, method?: HttpMethod): Promise<MoodleResponse<CoreReportbuilderFiltersResetReturns>>;
    /**
     * Set filter values for given report
     *
     * @param {CoreReportbuilderSetFiltersParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreReportbuilderSetFiltersReturns>>} - Success
     */
    core_reportbuilder_set_filters(params: CoreReportbuilderSetFiltersParams, method?: HttpMethod): Promise<MoodleResponse<CoreReportbuilderSetFiltersReturns>>;
    /**
     * Returns the content for a dynamic tab
     *
     * @param {CoreDynamicTabsGetContentParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreDynamicTabsGetContentReturns>>}
     */
    core_dynamic_tabs_get_content(params: CoreDynamicTabsGetContentParams, method?: HttpMethod): Promise<MoodleResponse<CoreDynamicTabsGetContentReturns>>;
    /**
     * Change the editing mode
     *
     * @param {CoreChangeEditmodeParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreChangeEditmodeReturns>>} - editmode
     */
    core_change_editmode(params: CoreChangeEditmodeParams, method?: HttpMethod): Promise<MoodleResponse<CoreChangeEditmodeReturns>>;
    /**
     * Delete report
     *
     * @param {CoreReportbuilderReportsDeleteParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreReportbuilderReportsDeleteReturns>>} - Success
     */
    core_reportbuilder_reports_delete(params: CoreReportbuilderReportsDeleteParams, method?: HttpMethod): Promise<MoodleResponse<CoreReportbuilderReportsDeleteReturns>>;
    /**
     * Get custom report
     *
     * @param {CoreReportbuilderReportsGetParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreReportbuilderReportsGetReturns>>}
     */
    core_reportbuilder_reports_get(params: CoreReportbuilderReportsGetParams, method?: HttpMethod): Promise<MoodleResponse<CoreReportbuilderReportsGetReturns>>;
    /**
     * List custom reports for current user
     *
     * @param {CoreReportbuilderListReportsParams} [params]
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreReportbuilderListReportsReturns>>}
     */
    core_reportbuilder_list_reports(params?: CoreReportbuilderListReportsParams, method?: HttpMethod): Promise<MoodleResponse<CoreReportbuilderListReportsReturns>>;
    /**
     * Retrieve custom report content
     *
     * @param {CoreReportbuilderRetrieveReportParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreReportbuilderRetrieveReportReturns>>}
     */
    core_reportbuilder_retrieve_report(params: CoreReportbuilderRetrieveReportParams, method?: HttpMethod): Promise<MoodleResponse<CoreReportbuilderRetrieveReportReturns>>;
    /**
     * Retrieve system report content
     *
     * @param {CoreReportbuilderRetrieveSystemReportParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreReportbuilderRetrieveSystemReportReturns>>}
     */
    core_reportbuilder_retrieve_system_report(params: CoreReportbuilderRetrieveSystemReportParams, method?: HttpMethod): Promise<MoodleResponse<CoreReportbuilderRetrieveSystemReportReturns>>;
    /**
     * Determine access to a system report
     *
     * @param {CoreReportbuilderCanViewSystemReportParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreReportbuilderCanViewSystemReportReturns>>}
     */
    core_reportbuilder_can_view_system_report(params: CoreReportbuilderCanViewSystemReportParams, method?: HttpMethod): Promise<MoodleResponse<CoreReportbuilderCanViewSystemReportReturns>>;
    /**
     * Trigger custom report viewed
     *
     * @param {CoreReportbuilderViewReportParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreReportbuilderViewReportReturns>>}
     */
    core_reportbuilder_view_report(params: CoreReportbuilderViewReportParams, method?: HttpMethod): Promise<MoodleResponse<CoreReportbuilderViewReportReturns>>;
    /**
     * Add column to report
     *
     * @param {CoreReportbuilderColumnsAddParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreReportbuilderColumnsAddReturns>>}
     */
    core_reportbuilder_columns_add(params: CoreReportbuilderColumnsAddParams, method?: HttpMethod): Promise<MoodleResponse<CoreReportbuilderColumnsAddReturns>>;
    /**
     * Delete column from report
     *
     * @param {CoreReportbuilderColumnsDeleteParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreReportbuilderColumnsDeleteReturns>>}
     */
    core_reportbuilder_columns_delete(params: CoreReportbuilderColumnsDeleteParams, method?: HttpMethod): Promise<MoodleResponse<CoreReportbuilderColumnsDeleteReturns>>;
    /**
     * Re-order column within report
     *
     * @param {CoreReportbuilderColumnsReorderParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreReportbuilderColumnsReorderReturns>>} - Success
     */
    core_reportbuilder_columns_reorder(params: CoreReportbuilderColumnsReorderParams, method?: HttpMethod): Promise<MoodleResponse<CoreReportbuilderColumnsReorderReturns>>;
    /**
     * Retrieve column sorting for report
     *
     * @param {CoreReportbuilderColumnsSortGetParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreReportbuilderColumnsSortGetReturns>>}
     */
    core_reportbuilder_columns_sort_get(params: CoreReportbuilderColumnsSortGetParams, method?: HttpMethod): Promise<MoodleResponse<CoreReportbuilderColumnsSortGetReturns>>;
    /**
     * Re-order column sorting within report
     *
     * @param {CoreReportbuilderColumnsSortReorderParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreReportbuilderColumnsSortReorderReturns>>}
     */
    core_reportbuilder_columns_sort_reorder(params: CoreReportbuilderColumnsSortReorderParams, method?: HttpMethod): Promise<MoodleResponse<CoreReportbuilderColumnsSortReorderReturns>>;
    /**
     * Toggle sorting of column within report
     *
     * @param {CoreReportbuilderColumnsSortToggleParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreReportbuilderColumnsSortToggleReturns>>}
     */
    core_reportbuilder_columns_sort_toggle(params: CoreReportbuilderColumnsSortToggleParams, method?: HttpMethod): Promise<MoodleResponse<CoreReportbuilderColumnsSortToggleReturns>>;
    /**
     * Add condition to report
     *
     * @param {CoreReportbuilderConditionsAddParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreReportbuilderConditionsAddReturns>>}
     */
    core_reportbuilder_conditions_add(params: CoreReportbuilderConditionsAddParams, method?: HttpMethod): Promise<MoodleResponse<CoreReportbuilderConditionsAddReturns>>;
    /**
     * Delete condition from report
     *
     * @param {CoreReportbuilderConditionsDeleteParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreReportbuilderConditionsDeleteReturns>>}
     */
    core_reportbuilder_conditions_delete(params: CoreReportbuilderConditionsDeleteParams, method?: HttpMethod): Promise<MoodleResponse<CoreReportbuilderConditionsDeleteReturns>>;
    /**
     * Re-order condition within report
     *
     * @param {CoreReportbuilderConditionsReorderParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreReportbuilderConditionsReorderReturns>>}
     */
    core_reportbuilder_conditions_reorder(params: CoreReportbuilderConditionsReorderParams, method?: HttpMethod): Promise<MoodleResponse<CoreReportbuilderConditionsReorderReturns>>;
    /**
     * Reset conditions for given report
     *
     * @param {CoreReportbuilderConditionsResetParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreReportbuilderConditionsResetReturns>>}
     */
    core_reportbuilder_conditions_reset(params: CoreReportbuilderConditionsResetParams, method?: HttpMethod): Promise<MoodleResponse<CoreReportbuilderConditionsResetReturns>>;
    /**
     * Add filter to report
     *
     * @param {CoreReportbuilderFiltersAddParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreReportbuilderFiltersAddReturns>>}
     */
    core_reportbuilder_filters_add(params: CoreReportbuilderFiltersAddParams, method?: HttpMethod): Promise<MoodleResponse<CoreReportbuilderFiltersAddReturns>>;
    /**
     * Delete filter from report
     *
     * @param {CoreReportbuilderFiltersDeleteParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreReportbuilderFiltersDeleteReturns>>}
     */
    core_reportbuilder_filters_delete(params: CoreReportbuilderFiltersDeleteParams, method?: HttpMethod): Promise<MoodleResponse<CoreReportbuilderFiltersDeleteReturns>>;
    /**
     * Re-order filter within report
     *
     * @param {CoreReportbuilderFiltersReorderParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreReportbuilderFiltersReorderReturns>>}
     */
    core_reportbuilder_filters_reorder(params: CoreReportbuilderFiltersReorderParams, method?: HttpMethod): Promise<MoodleResponse<CoreReportbuilderFiltersReorderReturns>>;
    /**
     * Delete audience from report
     *
     * @param {CoreReportbuilderAudiencesDeleteParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreReportbuilderAudiencesDeleteReturns>>}
     */
    core_reportbuilder_audiences_delete(params: CoreReportbuilderAudiencesDeleteParams, method?: HttpMethod): Promise<MoodleResponse<CoreReportbuilderAudiencesDeleteReturns>>;
    /**
     * Delete schedule from report
     *
     * @param {CoreReportbuilderSchedulesDeleteParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreReportbuilderSchedulesDeleteReturns>>}
     */
    core_reportbuilder_schedules_delete(params: CoreReportbuilderSchedulesDeleteParams, method?: HttpMethod): Promise<MoodleResponse<CoreReportbuilderSchedulesDeleteReturns>>;
    /**
     * Send report schedule
     *
     * @param {CoreReportbuilderSchedulesSendParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreReportbuilderSchedulesSendReturns>>}
     */
    core_reportbuilder_schedules_send(params: CoreReportbuilderSchedulesSendParams, method?: HttpMethod): Promise<MoodleResponse<CoreReportbuilderSchedulesSendReturns>>;
    /**
     * Toggle state of report schedule
     *
     * @param {CoreReportbuilderSchedulesToggleParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreReportbuilderSchedulesToggleReturns>>}
     */
    core_reportbuilder_schedules_toggle(params: CoreReportbuilderSchedulesToggleParams, method?: HttpMethod): Promise<MoodleResponse<CoreReportbuilderSchedulesToggleReturns>>;
    /**
     * Set the state of a plugin
     *
     * @param {CoreAdminSetPluginStateParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreAdminSetPluginStateReturns>>}
     */
    core_admin_set_plugin_state(params: CoreAdminSetPluginStateParams, method?: HttpMethod): Promise<MoodleResponse<CoreAdminSetPluginStateReturns>>;
    /**
     * Set the order of a plugin
     *
     * @param {CoreAdminSetPluginOrderParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreAdminSetPluginOrderReturns>>}
     */
    core_admin_set_plugin_order(params: CoreAdminSetPluginOrderParams, method?: HttpMethod): Promise<MoodleResponse<CoreAdminSetPluginOrderReturns>>;
    /**
     * Set the protection state for a block plugin
     *
     * @param {CoreAdminSetBlockProtectionParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreAdminSetBlockProtectionReturns>>}
     */
    core_admin_set_block_protection(params: CoreAdminSetBlockProtectionParams, method?: HttpMethod): Promise<MoodleResponse<CoreAdminSetBlockProtectionReturns>>;
    /**
     * Send activity to MoodleNet
     *
     * @param {CoreMoodlenetSendActivityParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreMoodlenetSendActivityReturns>>}
     */
    core_moodlenet_send_activity(params: CoreMoodlenetSendActivityParams, method?: HttpMethod): Promise<MoodleResponse<CoreMoodlenetSendActivityReturns>>;
    /**
     * Get information about an activity being shared
     *
     * @param {CoreMoodlenetGetShareInfoActivityParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreMoodlenetGetShareInfoActivityReturns>>}
     */
    core_moodlenet_get_share_info_activity(params: CoreMoodlenetGetShareInfoActivityParams, method?: HttpMethod): Promise<MoodleResponse<CoreMoodlenetGetShareInfoActivityReturns>>;
    /**
     * Check a user has authorized for a given MoodleNet site
     *
     * @param {CoreMoodlenetAuthCheckParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreMoodlenetAuthCheckReturns>>}
     */
    core_moodlenet_auth_check(params: CoreMoodlenetAuthCheckParams, method?: HttpMethod): Promise<MoodleResponse<CoreMoodlenetAuthCheckReturns>>;
    /**
     * Get information about an course being shared
     *
     * @param {CoreMoodlenetGetSharedCourseInfoParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreMoodlenetGetSharedCourseInfoReturns>>}
     */
    core_moodlenet_get_shared_course_info(params: CoreMoodlenetGetSharedCourseInfoParams, method?: HttpMethod): Promise<MoodleResponse<CoreMoodlenetGetSharedCourseInfoReturns>>;
    /**
     * Send course to MoodleNet
     *
     * @param {CoreMoodlenetSendCourseParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreMoodlenetSendCourseReturns>>}
     */
    core_moodlenet_send_course(params: CoreMoodlenetSendCourseParams, method?: HttpMethod): Promise<MoodleResponse<CoreMoodlenetSendCourseReturns>>;
    /**
     * Polls for the current percentage progress of a stored progress object
     *
     * @param {CoreOutputPollStoredProgressParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreOutputPollStoredProgressReturns>>}
     */
    core_output_poll_stored_progress(params: CoreOutputPollStoredProgressParams, method?: HttpMethod): Promise<MoodleResponse<CoreOutputPollStoredProgressReturns>>;
    /**
     * Set a users AI policy acceptance
     *
     * @param {CoreAiSetPolicyStatusParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreAiSetPolicyStatusReturns>>}
     */
    core_ai_set_policy_status(params: CoreAiSetPolicyStatusParams, method?: HttpMethod): Promise<MoodleResponse<CoreAiSetPolicyStatusReturns>>;
    /**
     * Get a users AI policy acceptance
     *
     * @param {CoreAiGetPolicyStatusParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreAiGetPolicyStatusReturns>>}
     */
    core_ai_get_policy_status(params: CoreAiGetPolicyStatusParams, method?: HttpMethod): Promise<MoodleResponse<CoreAiGetPolicyStatusReturns>>;
    /**
     * Update action
     *
     * @param {CoreAiSetActionParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreAiSetActionReturns>>}
     */
    core_ai_set_action(params: CoreAiSetActionParams, method?: HttpMethod): Promise<MoodleResponse<CoreAiSetActionReturns>>;
    /**
     * Set the sms gateway status
     *
     * @param {CoreSmsSetGatewayStatusParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<CoreSmsSetGatewayStatusReturns>>}
     */
    core_sms_set_gateway_status(params: CoreSmsSetGatewayStatusParams, method?: HttpMethod): Promise<MoodleResponse<CoreSmsSetGatewayStatusReturns>>;
    /**
     * Resume an autosave session
     *
     * @param {TinyAutosaveResumeSessionParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<TinyAutosaveResumeSessionReturns>>}
     */
    tiny_autosave_resume_session(params: TinyAutosaveResumeSessionParams, method?: HttpMethod): Promise<MoodleResponse<TinyAutosaveResumeSessionReturns>>;
    /**
     * Reset an autosave session
     *
     * @param {TinyAutosaveResetSessionParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<TinyAutosaveResetSessionReturns>>}
     */
    tiny_autosave_reset_session(params: TinyAutosaveResetSessionParams, method?: HttpMethod): Promise<MoodleResponse<TinyAutosaveResetSessionReturns>>;
    /**
     * Update an autosave session
     *
     * @param {TinyAutosaveUpdateSessionParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<TinyAutosaveUpdateSessionReturns>>}
     */
    tiny_autosave_update_session(params: TinyAutosaveUpdateSessionParams, method?: HttpMethod): Promise<MoodleResponse<TinyAutosaveUpdateSessionReturns>>;
    /**
     * Filter the equation
     *
     * @param {TinyEquationFilterParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<TinyEquationFilterReturns>>}
     */
    tiny_equation_filter(params: TinyEquationFilterParams, method?: HttpMethod): Promise<MoodleResponse<TinyEquationFilterReturns>>;
    /**
     * Get the Tiny Premium API key from Moodle
     *
     * @param {TinyPremiumGetApiKeyParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<TinyPremiumGetApiKeyReturns>>}
     */
    tiny_premium_get_api_key(params: TinyPremiumGetApiKeyParams, method?: HttpMethod): Promise<MoodleResponse<TinyPremiumGetApiKeyReturns>>;
    /**
     * get language.
     *
     * @param {MediaVideojsGetLanguageParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<MediaVideojsGetLanguageReturns>>} - language pack json
     */
    media_videojs_get_language(params: MediaVideojsGetLanguageParams, method?: HttpMethod): Promise<MoodleResponse<MediaVideojsGetLanguageReturns>>;
    /**
     * Check whether the airnotifier settings have been configured
     *
     * @param {MessageAirnotifierIsSystemConfiguredParams} [params]
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<MessageAirnotifierIsSystemConfiguredReturns>>} - 0 if the system is not configured, 1 otherwise
     */
    message_airnotifier_is_system_configured(params?: MessageAirnotifierIsSystemConfiguredParams, method?: HttpMethod): Promise<MoodleResponse<MessageAirnotifierIsSystemConfiguredReturns>>;
    /**
     * Check if the users have notification preferences configured yet
     *
     * @param {MessageAirnotifierAreNotificationPreferencesConfiguredParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<MessageAirnotifierAreNotificationPreferencesConfiguredReturns>>}
     */
    message_airnotifier_are_notification_preferences_configured(params: MessageAirnotifierAreNotificationPreferencesConfiguredParams, method?: HttpMethod): Promise<MoodleResponse<MessageAirnotifierAreNotificationPreferencesConfiguredReturns>>;
    /**
     * Return the list of mobile devices that are registered in Moodle for the given user
     *
     * @param {MessageAirnotifierGetUserDevicesParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<MessageAirnotifierGetUserDevicesReturns>>}
     */
    message_airnotifier_get_user_devices(params: MessageAirnotifierGetUserDevicesParams, method?: HttpMethod): Promise<MoodleResponse<MessageAirnotifierGetUserDevicesReturns>>;
    /**
     * Enables or disables a registered user device so it can receive Push notifications
     *
     * @param {MessageAirnotifierEnableDeviceParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<MessageAirnotifierEnableDeviceReturns>>}
     */
    message_airnotifier_enable_device(params: MessageAirnotifierEnableDeviceParams, method?: HttpMethod): Promise<MoodleResponse<MessageAirnotifierEnableDeviceReturns>>;
    /**
     * Retrieve a list of popup notifications for a user
     *
     * @param {MessagePopupGetPopupNotificationsParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<MessagePopupGetPopupNotificationsReturns>>}
     */
    message_popup_get_popup_notifications(params: MessagePopupGetPopupNotificationsParams, method?: HttpMethod): Promise<MoodleResponse<MessagePopupGetPopupNotificationsReturns>>;
    /**
     * Retrieve the count of unread popup notifications for a given user
     *
     * @param {MessagePopupGetUnreadPopupNotificationCountParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<MessagePopupGetUnreadPopupNotificationCountReturns>>} - The count of unread popup notifications
     */
    message_popup_get_unread_popup_notification_count(params: MessagePopupGetUnreadPopupNotificationCountParams, method?: HttpMethod): Promise<MoodleResponse<MessagePopupGetUnreadPopupNotificationCountReturns>>;
    /**
     * Copy a students previous attempt to a new attempt.
     *
     * @param {ModAssignCopyPreviousAttemptParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModAssignCopyPreviousAttemptReturns>>} - list of warnings
     */
    mod_assign_copy_previous_attempt(params: ModAssignCopyPreviousAttemptParams, method?: HttpMethod): Promise<MoodleResponse<ModAssignCopyPreviousAttemptReturns>>;
    /**
     * Returns grades from the assignment
     *
     * @param {ModAssignGetGradesParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModAssignGetGradesReturns>>}
     */
    mod_assign_get_grades(params: ModAssignGetGradesParams, method?: HttpMethod): Promise<MoodleResponse<ModAssignGetGradesReturns>>;
    /**
     * Returns the courses and assignments for the users capability
     *
     * @param {ModAssignGetAssignmentsParams} [params]
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModAssignGetAssignmentsReturns>>}
     */
    mod_assign_get_assignments(params?: ModAssignGetAssignmentsParams, method?: HttpMethod): Promise<MoodleResponse<ModAssignGetAssignmentsReturns>>;
    /**
     * Returns the submissions for assignments
     *
     * @param {ModAssignGetSubmissionsParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModAssignGetSubmissionsReturns>>}
     */
    mod_assign_get_submissions(params: ModAssignGetSubmissionsParams, method?: HttpMethod): Promise<MoodleResponse<ModAssignGetSubmissionsReturns>>;
    /**
     * Returns the user flags for assignments
     *
     * @param {ModAssignGetUserFlagsParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModAssignGetUserFlagsReturns>>}
     */
    mod_assign_get_user_flags(params: ModAssignGetUserFlagsParams, method?: HttpMethod): Promise<MoodleResponse<ModAssignGetUserFlagsReturns>>;
    /**
     * Creates or updates user flags
     *
     * @param {ModAssignSetUserFlagsParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModAssignSetUserFlagsReturns>>}
     */
    mod_assign_set_user_flags(params: ModAssignSetUserFlagsParams, method?: HttpMethod): Promise<MoodleResponse<ModAssignSetUserFlagsReturns>>;
    /**
     * Returns the blind marking mappings for assignments
     *
     * @param {ModAssignGetUserMappingsParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModAssignGetUserMappingsReturns>>}
     */
    mod_assign_get_user_mappings(params: ModAssignGetUserMappingsParams, method?: HttpMethod): Promise<MoodleResponse<ModAssignGetUserMappingsReturns>>;
    /**
     * Reverts the list of submissions to draft status
     *
     * @param {ModAssignRevertSubmissionsToDraftParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModAssignRevertSubmissionsToDraftReturns>>} - list of warnings
     */
    mod_assign_revert_submissions_to_draft(params: ModAssignRevertSubmissionsToDraftParams, method?: HttpMethod): Promise<MoodleResponse<ModAssignRevertSubmissionsToDraftReturns>>;
    /**
     * Prevent students from making changes to a list of submissions
     *
     * @param {ModAssignLockSubmissionsParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModAssignLockSubmissionsReturns>>} - list of warnings
     */
    mod_assign_lock_submissions(params: ModAssignLockSubmissionsParams, method?: HttpMethod): Promise<MoodleResponse<ModAssignLockSubmissionsReturns>>;
    /**
     * Allow students to make changes to a list of submissions
     *
     * @param {ModAssignUnlockSubmissionsParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModAssignUnlockSubmissionsReturns>>} - list of warnings
     */
    mod_assign_unlock_submissions(params: ModAssignUnlockSubmissionsParams, method?: HttpMethod): Promise<MoodleResponse<ModAssignUnlockSubmissionsReturns>>;
    /**
     * Update the current students submission
     *
     * @param {ModAssignSaveSubmissionParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModAssignSaveSubmissionReturns>>} - list of warnings
     */
    mod_assign_save_submission(params: ModAssignSaveSubmissionParams, method?: HttpMethod): Promise<MoodleResponse<ModAssignSaveSubmissionReturns>>;
    /**
     * Submit the current students assignment for grading
     *
     * @param {ModAssignSubmitForGradingParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModAssignSubmitForGradingReturns>>} - list of warnings
     */
    mod_assign_submit_for_grading(params: ModAssignSubmitForGradingParams, method?: HttpMethod): Promise<MoodleResponse<ModAssignSubmitForGradingReturns>>;
    /**
     * Save a grade update for a single student.
     *
     * @param {ModAssignSaveGradeParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModAssignSaveGradeReturns>>}
     */
    mod_assign_save_grade(params: ModAssignSaveGradeParams, method?: HttpMethod): Promise<MoodleResponse<ModAssignSaveGradeReturns>>;
    /**
     * Save multiple grade updates for an assignment.
     *
     * @param {ModAssignSaveGradesParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModAssignSaveGradesReturns>>}
     */
    mod_assign_save_grades(params: ModAssignSaveGradesParams, method?: HttpMethod): Promise<MoodleResponse<ModAssignSaveGradesReturns>>;
    /**
     * Save a list of assignment extensions
     *
     * @param {ModAssignSaveUserExtensionsParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModAssignSaveUserExtensionsReturns>>} - list of warnings
     */
    mod_assign_save_user_extensions(params: ModAssignSaveUserExtensionsParams, method?: HttpMethod): Promise<MoodleResponse<ModAssignSaveUserExtensionsReturns>>;
    /**
     * Reveal the identities for a blind marking assignment
     *
     * @param {ModAssignRevealIdentitiesParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModAssignRevealIdentitiesReturns>>} - list of warnings
     */
    mod_assign_reveal_identities(params: ModAssignRevealIdentitiesParams, method?: HttpMethod): Promise<MoodleResponse<ModAssignRevealIdentitiesReturns>>;
    /**
     * Trigger the grading_table_viewed event.
     *
     * @param {ModAssignViewGradingTableParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModAssignViewGradingTableReturns>>}
     */
    mod_assign_view_grading_table(params: ModAssignViewGradingTableParams, method?: HttpMethod): Promise<MoodleResponse<ModAssignViewGradingTableReturns>>;
    /**
     * Trigger the submission status viewed event.
     *
     * @param {ModAssignViewSubmissionStatusParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModAssignViewSubmissionStatusReturns>>}
     */
    mod_assign_view_submission_status(params: ModAssignViewSubmissionStatusParams, method?: HttpMethod): Promise<MoodleResponse<ModAssignViewSubmissionStatusReturns>>;
    /**
     * Returns information about an assignment submission status for a given user.
     *
     * @param {ModAssignGetSubmissionStatusParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModAssignGetSubmissionStatusReturns>>}
     */
    mod_assign_get_submission_status(params: ModAssignGetSubmissionStatusParams, method?: HttpMethod): Promise<MoodleResponse<ModAssignGetSubmissionStatusReturns>>;
    /**
     * List the participants for a single assignment, with some summary info about their submissions.
     *
     * @param {ModAssignListParticipantsParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModAssignListParticipantsReturns>>}
     */
    mod_assign_list_participants(params: ModAssignListParticipantsParams, method?: HttpMethod): Promise<MoodleResponse<ModAssignListParticipantsReturns>>;
    /**
     * Submit the grading form data via ajax
     *
     * @param {ModAssignSubmitGradingFormParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModAssignSubmitGradingFormReturns>>} - list of warnings
     */
    mod_assign_submit_grading_form(params: ModAssignSubmitGradingFormParams, method?: HttpMethod): Promise<MoodleResponse<ModAssignSubmitGradingFormReturns>>;
    /**
     * Get a participant for an assignment, with some summary info about their submissions.
     *
     * @param {ModAssignGetParticipantParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModAssignGetParticipantReturns>>}
     */
    mod_assign_get_participant(params: ModAssignGetParticipantParams, method?: HttpMethod): Promise<MoodleResponse<ModAssignGetParticipantReturns>>;
    /**
     * Update the module completion status.
     *
     * @param {ModAssignViewAssignParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModAssignViewAssignReturns>>}
     */
    mod_assign_view_assign(params: ModAssignViewAssignParams, method?: HttpMethod): Promise<MoodleResponse<ModAssignViewAssignReturns>>;
    /**
     * Start a submission for user if assignment has a time limit.
     *
     * @param {ModAssignStartSubmissionParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModAssignStartSubmissionReturns>>}
     */
    mod_assign_start_submission(params: ModAssignStartSubmissionParams, method?: HttpMethod): Promise<MoodleResponse<ModAssignStartSubmissionReturns>>;
    /**
     * Remove submission.
     *
     * @param {ModAssignRemoveSubmissionParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModAssignRemoveSubmissionReturns>>}
     */
    mod_assign_remove_submission(params: ModAssignRemoveSubmissionParams, method?: HttpMethod): Promise<MoodleResponse<ModAssignRemoveSubmissionReturns>>;
    /**
     * Returns information if the current user can join or not.
     *
     * @param {ModBigbluebuttonbnCanJoinParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModBigbluebuttonbnCanJoinReturns>>}
     */
    mod_bigbluebuttonbn_can_join(params: ModBigbluebuttonbnCanJoinParams, method?: HttpMethod): Promise<MoodleResponse<ModBigbluebuttonbnCanJoinReturns>>;
    /**
     * Returns a list of recordings ready to be processed by a datatable.
     *
     * @param {ModBigbluebuttonbnGetRecordingsParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModBigbluebuttonbnGetRecordingsReturns>>}
     */
    mod_bigbluebuttonbn_get_recordings(params: ModBigbluebuttonbnGetRecordingsParams, method?: HttpMethod): Promise<MoodleResponse<ModBigbluebuttonbnGetRecordingsReturns>>;
    /**
     * Returns a list of recordings ready to import to be processed by a datatable.
     *
     * @param {ModBigbluebuttonbnGetRecordingsToImportParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModBigbluebuttonbnGetRecordingsToImportReturns>>}
     */
    mod_bigbluebuttonbn_get_recordings_to_import(params: ModBigbluebuttonbnGetRecordingsToImportParams, method?: HttpMethod): Promise<MoodleResponse<ModBigbluebuttonbnGetRecordingsToImportReturns>>;
    /**
     * Update a single recording
     *
     * @param {ModBigbluebuttonbnUpdateRecordingParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModBigbluebuttonbnUpdateRecordingReturns>>}
     */
    mod_bigbluebuttonbn_update_recording(params: ModBigbluebuttonbnUpdateRecordingParams, method?: HttpMethod): Promise<MoodleResponse<ModBigbluebuttonbnUpdateRecordingReturns>>;
    /**
     * End a meeting
     *
     * @param {ModBigbluebuttonbnEndMeetingParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModBigbluebuttonbnEndMeetingReturns>>}
     */
    mod_bigbluebuttonbn_end_meeting(params: ModBigbluebuttonbnEndMeetingParams, method?: HttpMethod): Promise<MoodleResponse<ModBigbluebuttonbnEndMeetingReturns>>;
    /**
     * Validate completion
     *
     * @param {ModBigbluebuttonbnCompletionValidateParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModBigbluebuttonbnCompletionValidateReturns>>}
     */
    mod_bigbluebuttonbn_completion_validate(params: ModBigbluebuttonbnCompletionValidateParams, method?: HttpMethod): Promise<MoodleResponse<ModBigbluebuttonbnCompletionValidateReturns>>;
    /**
     * Get displayable information on the meeting
     *
     * @param {ModBigbluebuttonbnMeetingInfoParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModBigbluebuttonbnMeetingInfoReturns>>}
     */
    mod_bigbluebuttonbn_meeting_info(params: ModBigbluebuttonbnMeetingInfoParams, method?: HttpMethod): Promise<MoodleResponse<ModBigbluebuttonbnMeetingInfoReturns>>;
    /**
     * Returns a list of bigbluebuttonbns in a provided list of courses, if no list is provided all bigbluebuttonbns that the user can view will be returned.
     *
     * @param {ModBigbluebuttonbnGetBigbluebuttonbnsByCoursesParams} [params]
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModBigbluebuttonbnGetBigbluebuttonbnsByCoursesReturns>>}
     */
    mod_bigbluebuttonbn_get_bigbluebuttonbns_by_courses(params?: ModBigbluebuttonbnGetBigbluebuttonbnsByCoursesParams, method?: HttpMethod): Promise<MoodleResponse<ModBigbluebuttonbnGetBigbluebuttonbnsByCoursesReturns>>;
    /**
     * Trigger the course module viewed event and update the module completion status.
     *
     * @param {ModBigbluebuttonbnViewBigbluebuttonbnParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModBigbluebuttonbnViewBigbluebuttonbnReturns>>}
     */
    mod_bigbluebuttonbn_view_bigbluebuttonbn(params: ModBigbluebuttonbnViewBigbluebuttonbnParams, method?: HttpMethod): Promise<MoodleResponse<ModBigbluebuttonbnViewBigbluebuttonbnReturns>>;
    /**
     * Get the join URL for the meeting and create if it does not exist.
     *
     * @param {ModBigbluebuttonbnGetJoinUrlParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModBigbluebuttonbnGetJoinUrlReturns>>}
     */
    mod_bigbluebuttonbn_get_join_url(params: ModBigbluebuttonbnGetJoinUrlParams, method?: HttpMethod): Promise<MoodleResponse<ModBigbluebuttonbnGetJoinUrlReturns>>;
    /**
     * Simulate the view.php web interface book: trigger events, completion, etc...
     *
     * @param {ModBookViewBookParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModBookViewBookReturns>>}
     */
    mod_book_view_book(params: ModBookViewBookParams, method?: HttpMethod): Promise<MoodleResponse<ModBookViewBookReturns>>;
    /**
     * Returns a list of book instances in a provided set of courses, if no courses are provided then all the book instances the user has access to will be returned.
     *
     * @param {ModBookGetBooksByCoursesParams} [params]
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModBookGetBooksByCoursesReturns>>}
     */
    mod_book_get_books_by_courses(params?: ModBookGetBooksByCoursesParams, method?: HttpMethod): Promise<MoodleResponse<ModBookGetBooksByCoursesReturns>>;
    /**
     * Log a user into a chat room in the given chat.
     *
     * @param {ModChatLoginUserParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModChatLoginUserReturns>>}
     */
    mod_chat_login_user(params: ModChatLoginUserParams, method?: HttpMethod): Promise<MoodleResponse<ModChatLoginUserReturns>>;
    /**
     * Get the list of users in the given chat session.
     *
     * @param {ModChatGetChatUsersParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModChatGetChatUsersReturns>>}
     */
    mod_chat_get_chat_users(params: ModChatGetChatUsersParams, method?: HttpMethod): Promise<MoodleResponse<ModChatGetChatUsersReturns>>;
    /**
     * Send a message on the given chat session.
     *
     * @param {ModChatSendChatMessageParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModChatSendChatMessageReturns>>}
     */
    mod_chat_send_chat_message(params: ModChatSendChatMessageParams, method?: HttpMethod): Promise<MoodleResponse<ModChatSendChatMessageReturns>>;
    /**
     * Get the latest messages from the given chat session.
     *
     * @param {ModChatGetChatLatestMessagesParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModChatGetChatLatestMessagesReturns>>}
     */
    mod_chat_get_chat_latest_messages(params: ModChatGetChatLatestMessagesParams, method?: HttpMethod): Promise<MoodleResponse<ModChatGetChatLatestMessagesReturns>>;
    /**
     * Trigger the course module viewed event and update the module completion status.
     *
     * @param {ModChatViewChatParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModChatViewChatReturns>>}
     */
    mod_chat_view_chat(params: ModChatViewChatParams, method?: HttpMethod): Promise<MoodleResponse<ModChatViewChatReturns>>;
    /**
     * Returns a list of chat instances in a provided set of courses, if no courses are provided then all the chat instances the user has access to will be returned.
     *
     * @param {ModChatGetChatsByCoursesParams} [params]
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModChatGetChatsByCoursesReturns>>}
     */
    mod_chat_get_chats_by_courses(params?: ModChatGetChatsByCoursesParams, method?: HttpMethod): Promise<MoodleResponse<ModChatGetChatsByCoursesReturns>>;
    /**
     * Retrieves chat sessions for a given chat.
     *
     * @param {ModChatGetSessionsParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModChatGetSessionsReturns>>}
     */
    mod_chat_get_sessions(params: ModChatGetSessionsParams, method?: HttpMethod): Promise<MoodleResponse<ModChatGetSessionsReturns>>;
    /**
     * Retrieves messages of the given chat session.
     *
     * @param {ModChatGetSessionMessagesParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModChatGetSessionMessagesReturns>>}
     */
    mod_chat_get_session_messages(params: ModChatGetSessionMessagesParams, method?: HttpMethod): Promise<MoodleResponse<ModChatGetSessionMessagesReturns>>;
    /**
     * Trigger the chat session viewed event.
     *
     * @param {ModChatViewSessionsParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModChatViewSessionsReturns>>}
     */
    mod_chat_view_sessions(params: ModChatViewSessionsParams, method?: HttpMethod): Promise<MoodleResponse<ModChatViewSessionsReturns>>;
    /**
     * Retrieve users results for a given choice.
     *
     * @param {ModChoiceGetChoiceResultsParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModChoiceGetChoiceResultsReturns>>}
     */
    mod_choice_get_choice_results(params: ModChoiceGetChoiceResultsParams, method?: HttpMethod): Promise<MoodleResponse<ModChoiceGetChoiceResultsReturns>>;
    /**
     * Retrieve options for a specific choice.
     *
     * @param {ModChoiceGetChoiceOptionsParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModChoiceGetChoiceOptionsReturns>>}
     */
    mod_choice_get_choice_options(params: ModChoiceGetChoiceOptionsParams, method?: HttpMethod): Promise<MoodleResponse<ModChoiceGetChoiceOptionsReturns>>;
    /**
     * Submit responses to a specific choice item.
     *
     * @param {ModChoiceSubmitChoiceResponseParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModChoiceSubmitChoiceResponseReturns>>}
     */
    mod_choice_submit_choice_response(params: ModChoiceSubmitChoiceResponseParams, method?: HttpMethod): Promise<MoodleResponse<ModChoiceSubmitChoiceResponseReturns>>;
    /**
     * Trigger the course module viewed event and update the module completion status.
     *
     * @param {ModChoiceViewChoiceParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModChoiceViewChoiceReturns>>}
     */
    mod_choice_view_choice(params: ModChoiceViewChoiceParams, method?: HttpMethod): Promise<MoodleResponse<ModChoiceViewChoiceReturns>>;
    /**
     * Returns a list of choice instances in a provided set of courses, if no courses are provided then all the choice instances the user has access to will be returned.
     *
     * @param {ModChoiceGetChoicesByCoursesParams} [params]
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModChoiceGetChoicesByCoursesReturns>>}
     */
    mod_choice_get_choices_by_courses(params?: ModChoiceGetChoicesByCoursesParams, method?: HttpMethod): Promise<MoodleResponse<ModChoiceGetChoicesByCoursesReturns>>;
    /**
     * Delete the given submitted responses in a choice
     *
     * @param {ModChoiceDeleteChoiceResponsesParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModChoiceDeleteChoiceResponsesReturns>>}
     */
    mod_choice_delete_choice_responses(params: ModChoiceDeleteChoiceResponsesParams, method?: HttpMethod): Promise<MoodleResponse<ModChoiceDeleteChoiceResponsesReturns>>;
    /**
     * Returns a list of database instances in a provided set of courses, if no courses are provided then all the database instances the user has access to will be returned.
     *
     * @param {ModDataGetDatabasesByCoursesParams} [params]
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModDataGetDatabasesByCoursesReturns>>}
     */
    mod_data_get_databases_by_courses(params?: ModDataGetDatabasesByCoursesParams, method?: HttpMethod): Promise<MoodleResponse<ModDataGetDatabasesByCoursesReturns>>;
    /**
     * Simulate the view.php web interface data: trigger events, completion, etc...
     *
     * @param {ModDataViewDatabaseParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModDataViewDatabaseReturns>>}
     */
    mod_data_view_database(params: ModDataViewDatabaseParams, method?: HttpMethod): Promise<MoodleResponse<ModDataViewDatabaseReturns>>;
    /**
     * Return access information for a given database.
     *
     * @param {ModDataGetDataAccessInformationParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModDataGetDataAccessInformationReturns>>}
     */
    mod_data_get_data_access_information(params: ModDataGetDataAccessInformationParams, method?: HttpMethod): Promise<MoodleResponse<ModDataGetDataAccessInformationReturns>>;
    /**
     * Return the complete list of entries of the given database.
     *
     * @param {ModDataGetEntriesParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModDataGetEntriesReturns>>}
     */
    mod_data_get_entries(params: ModDataGetEntriesParams, method?: HttpMethod): Promise<MoodleResponse<ModDataGetEntriesReturns>>;
    /**
     * Return one entry record from the database, including contents optionally.
     *
     * @param {ModDataGetEntryParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModDataGetEntryReturns>>}
     */
    mod_data_get_entry(params: ModDataGetEntryParams, method?: HttpMethod): Promise<MoodleResponse<ModDataGetEntryReturns>>;
    /**
     * Return the list of configured fields for the given database.
     *
     * @param {ModDataGetFieldsParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModDataGetFieldsReturns>>}
     */
    mod_data_get_fields(params: ModDataGetFieldsParams, method?: HttpMethod): Promise<MoodleResponse<ModDataGetFieldsReturns>>;
    /**
     * Search for entries in the given database.
     *
     * @param {ModDataSearchEntriesParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModDataSearchEntriesReturns>>}
     */
    mod_data_search_entries(params: ModDataSearchEntriesParams, method?: HttpMethod): Promise<MoodleResponse<ModDataSearchEntriesReturns>>;
    /**
     * Approves or unapproves an entry.
     *
     * @param {ModDataApproveEntryParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModDataApproveEntryReturns>>}
     */
    mod_data_approve_entry(params: ModDataApproveEntryParams, method?: HttpMethod): Promise<MoodleResponse<ModDataApproveEntryReturns>>;
    /**
     * Deletes an entry.
     *
     * @param {ModDataDeleteEntryParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModDataDeleteEntryReturns>>}
     */
    mod_data_delete_entry(params: ModDataDeleteEntryParams, method?: HttpMethod): Promise<MoodleResponse<ModDataDeleteEntryReturns>>;
    /**
     * Adds a new entry.
     *
     * @param {ModDataAddEntryParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModDataAddEntryReturns>>}
     */
    mod_data_add_entry(params: ModDataAddEntryParams, method?: HttpMethod): Promise<MoodleResponse<ModDataAddEntryReturns>>;
    /**
     * Updates an existing entry.
     *
     * @param {ModDataUpdateEntryParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModDataUpdateEntryReturns>>}
     */
    mod_data_update_entry(params: ModDataUpdateEntryParams, method?: HttpMethod): Promise<MoodleResponse<ModDataUpdateEntryReturns>>;
    /**
     * Delete site user preset.
     *
     * @param {ModDataDeleteSavedPresetParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModDataDeleteSavedPresetReturns>>}
     */
    mod_data_delete_saved_preset(params: ModDataDeleteSavedPresetParams, method?: HttpMethod): Promise<MoodleResponse<ModDataDeleteSavedPresetReturns>>;
    /**
     * Get importing information
     *
     * @param {ModDataGetMappingInformationParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModDataGetMappingInformationReturns>>}
     */
    mod_data_get_mapping_information(params: ModDataGetMappingInformationParams, method?: HttpMethod): Promise<MoodleResponse<ModDataGetMappingInformationReturns>>;
    /**
     * Returns a list of feedbacks in a provided list of courses, if no list is provided all feedbacks that the user can view will be returned.
     *
     * @param {ModFeedbackGetFeedbacksByCoursesParams} [params]
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModFeedbackGetFeedbacksByCoursesReturns>>}
     */
    mod_feedback_get_feedbacks_by_courses(params?: ModFeedbackGetFeedbacksByCoursesParams, method?: HttpMethod): Promise<MoodleResponse<ModFeedbackGetFeedbacksByCoursesReturns>>;
    /**
     * Return access information for a given feedback.
     *
     * @param {ModFeedbackGetFeedbackAccessInformationParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModFeedbackGetFeedbackAccessInformationReturns>>}
     */
    mod_feedback_get_feedback_access_information(params: ModFeedbackGetFeedbackAccessInformationParams, method?: HttpMethod): Promise<MoodleResponse<ModFeedbackGetFeedbackAccessInformationReturns>>;
    /**
     * Trigger the course module viewed event and update the module completion status.
     *
     * @param {ModFeedbackViewFeedbackParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModFeedbackViewFeedbackReturns>>}
     */
    mod_feedback_view_feedback(params: ModFeedbackViewFeedbackParams, method?: HttpMethod): Promise<MoodleResponse<ModFeedbackViewFeedbackReturns>>;
    /**
     * Returns the temporary completion record for the current user.
     *
     * @param {ModFeedbackGetCurrentCompletedTmpParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModFeedbackGetCurrentCompletedTmpReturns>>}
     */
    mod_feedback_get_current_completed_tmp(params: ModFeedbackGetCurrentCompletedTmpParams, method?: HttpMethod): Promise<MoodleResponse<ModFeedbackGetCurrentCompletedTmpReturns>>;
    /**
     * Returns the items (questions) in the given feedback.
     *
     * @param {ModFeedbackGetItemsParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModFeedbackGetItemsReturns>>}
     */
    mod_feedback_get_items(params: ModFeedbackGetItemsParams, method?: HttpMethod): Promise<MoodleResponse<ModFeedbackGetItemsReturns>>;
    /**
     * Starts or continues a feedback submission.
     *
     * @param {ModFeedbackLaunchFeedbackParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModFeedbackLaunchFeedbackReturns>>}
     */
    mod_feedback_launch_feedback(params: ModFeedbackLaunchFeedbackParams, method?: HttpMethod): Promise<MoodleResponse<ModFeedbackLaunchFeedbackReturns>>;
    /**
     * Get a single feedback page items.
     *
     * @param {ModFeedbackGetPageItemsParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModFeedbackGetPageItemsReturns>>}
     */
    mod_feedback_get_page_items(params: ModFeedbackGetPageItemsParams, method?: HttpMethod): Promise<MoodleResponse<ModFeedbackGetPageItemsReturns>>;
    /**
     * Process a jump between pages.
     *
     * @param {ModFeedbackProcessPageParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModFeedbackProcessPageReturns>>}
     */
    mod_feedback_process_page(params: ModFeedbackProcessPageParams, method?: HttpMethod): Promise<MoodleResponse<ModFeedbackProcessPageReturns>>;
    /**
     * Retrieves the feedback analysis.
     *
     * @param {ModFeedbackGetAnalysisParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModFeedbackGetAnalysisReturns>>}
     */
    mod_feedback_get_analysis(params: ModFeedbackGetAnalysisParams, method?: HttpMethod): Promise<MoodleResponse<ModFeedbackGetAnalysisReturns>>;
    /**
     * Retrieves responses from the current unfinished attempt.
     *
     * @param {ModFeedbackGetUnfinishedResponsesParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModFeedbackGetUnfinishedResponsesReturns>>}
     */
    mod_feedback_get_unfinished_responses(params: ModFeedbackGetUnfinishedResponsesParams, method?: HttpMethod): Promise<MoodleResponse<ModFeedbackGetUnfinishedResponsesReturns>>;
    /**
     * Retrieves responses from the last finished attempt.
     *
     * @param {ModFeedbackGetFinishedResponsesParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModFeedbackGetFinishedResponsesReturns>>}
     */
    mod_feedback_get_finished_responses(params: ModFeedbackGetFinishedResponsesParams, method?: HttpMethod): Promise<MoodleResponse<ModFeedbackGetFinishedResponsesReturns>>;
    /**
     * Retrieves a list of students who didn't submit the feedback.
     *
     * @param {ModFeedbackGetNonRespondentsParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModFeedbackGetNonRespondentsReturns>>}
     */
    mod_feedback_get_non_respondents(params: ModFeedbackGetNonRespondentsParams, method?: HttpMethod): Promise<MoodleResponse<ModFeedbackGetNonRespondentsReturns>>;
    /**
     * Return the feedback user responses analysis.
     *
     * @param {ModFeedbackGetResponsesAnalysisParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModFeedbackGetResponsesAnalysisReturns>>}
     */
    mod_feedback_get_responses_analysis(params: ModFeedbackGetResponsesAnalysisParams, method?: HttpMethod): Promise<MoodleResponse<ModFeedbackGetResponsesAnalysisReturns>>;
    /**
     * Retrieves the last completion record for the current user.
     *
     * @param {ModFeedbackGetLastCompletedParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModFeedbackGetLastCompletedReturns>>}
     */
    mod_feedback_get_last_completed(params: ModFeedbackGetLastCompletedParams, method?: HttpMethod): Promise<MoodleResponse<ModFeedbackGetLastCompletedReturns>>;
    /**
     * Simulate the view.php web interface folder: trigger events, completion, etc...
     *
     * @param {ModFolderViewFolderParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModFolderViewFolderReturns>>}
     */
    mod_folder_view_folder(params: ModFolderViewFolderParams, method?: HttpMethod): Promise<MoodleResponse<ModFolderViewFolderReturns>>;
    /**
     * Returns a list of folders in a provided list of courses, if no list is provided all folders that the user can view will be returned. Please note that this WS is not returning the folder contents.
     *
     * @param {ModFolderGetFoldersByCoursesParams} [params]
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModFolderGetFoldersByCoursesReturns>>}
     */
    mod_folder_get_folders_by_courses(params?: ModFolderGetFoldersByCoursesParams, method?: HttpMethod): Promise<MoodleResponse<ModFolderGetFoldersByCoursesReturns>>;
    /**
     * Returns a list of forum instances in a provided set of courses, if no courses are provided then all the forum instances the user has access to will be returned.
     *
     * @param {ModForumGetForumsByCoursesParams} [params]
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModForumGetForumsByCoursesReturns>>}
     */
    mod_forum_get_forums_by_courses(params?: ModForumGetForumsByCoursesParams, method?: HttpMethod): Promise<MoodleResponse<ModForumGetForumsByCoursesReturns>>;
    /**
     * Returns a list of forum posts for a discussion.
     *
     * @param {ModForumGetDiscussionPostsParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModForumGetDiscussionPostsReturns>>}
     */
    mod_forum_get_discussion_posts(params: ModForumGetDiscussionPostsParams, method?: HttpMethod): Promise<MoodleResponse<ModForumGetDiscussionPostsReturns>>;
    /**
     * Returns a list of forum discussions optionally sorted and paginated.
     *
     * @param {ModForumGetForumDiscussionsParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModForumGetForumDiscussionsReturns>>}
     */
    mod_forum_get_forum_discussions(params: ModForumGetForumDiscussionsParams, method?: HttpMethod): Promise<MoodleResponse<ModForumGetForumDiscussionsReturns>>;
    /**
     * Trigger the course module viewed event and update the module completion status.
     *
     * @param {ModForumViewForumParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModForumViewForumReturns>>}
     */
    mod_forum_view_forum(params: ModForumViewForumParams, method?: HttpMethod): Promise<MoodleResponse<ModForumViewForumReturns>>;
    /**
     * Trigger the forum discussion viewed event.
     *
     * @param {ModForumViewForumDiscussionParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModForumViewForumDiscussionReturns>>}
     */
    mod_forum_view_forum_discussion(params: ModForumViewForumDiscussionParams, method?: HttpMethod): Promise<MoodleResponse<ModForumViewForumDiscussionReturns>>;
    /**
     * Create new posts into an existing discussion.
     *
     * @param {ModForumAddDiscussionPostParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModForumAddDiscussionPostReturns>>}
     */
    mod_forum_add_discussion_post(params: ModForumAddDiscussionPostParams, method?: HttpMethod): Promise<MoodleResponse<ModForumAddDiscussionPostReturns>>;
    /**
     * Add a new discussion into an existing forum.
     *
     * @param {ModForumAddDiscussionParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModForumAddDiscussionReturns>>}
     */
    mod_forum_add_discussion(params: ModForumAddDiscussionParams, method?: HttpMethod): Promise<MoodleResponse<ModForumAddDiscussionReturns>>;
    /**
     * Check if the current user can add discussions in the given forum (and optionally for the given group).
     *
     * @param {ModForumCanAddDiscussionParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModForumCanAddDiscussionReturns>>}
     */
    mod_forum_can_add_discussion(params: ModForumCanAddDiscussionParams, method?: HttpMethod): Promise<MoodleResponse<ModForumCanAddDiscussionReturns>>;
    /**
     * Return capabilities information for a given forum.
     *
     * @param {ModForumGetForumAccessInformationParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModForumGetForumAccessInformationReturns>>}
     */
    mod_forum_get_forum_access_information(params: ModForumGetForumAccessInformationParams, method?: HttpMethod): Promise<MoodleResponse<ModForumGetForumAccessInformationReturns>>;
    /**
     * Set the subscription state
     *
     * @param {ModForumSetSubscriptionStateParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModForumSetSubscriptionStateReturns>>}
     */
    mod_forum_set_subscription_state(params: ModForumSetSubscriptionStateParams, method?: HttpMethod): Promise<MoodleResponse<ModForumSetSubscriptionStateReturns>>;
    /**
     * Set the lock state for the discussion
     *
     * @param {ModForumSetLockStateParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModForumSetLockStateReturns>>}
     */
    mod_forum_set_lock_state(params: ModForumSetLockStateParams, method?: HttpMethod): Promise<MoodleResponse<ModForumSetLockStateReturns>>;
    /**
     * Toggle the favourite state
     *
     * @param {ModForumToggleFavouriteStateParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModForumToggleFavouriteStateReturns>>}
     */
    mod_forum_toggle_favourite_state(params: ModForumToggleFavouriteStateParams, method?: HttpMethod): Promise<MoodleResponse<ModForumToggleFavouriteStateReturns>>;
    /**
     * Set the pin state
     *
     * @param {ModForumSetPinStateParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModForumSetPinStateReturns>>}
     */
    mod_forum_set_pin_state(params: ModForumSetPinStateParams, method?: HttpMethod): Promise<MoodleResponse<ModForumSetPinStateReturns>>;
    /**
     * Deletes a post or a discussion completely when the post is the discussion topic.
     *
     * @param {ModForumDeletePostParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModForumDeletePostReturns>>}
     */
    mod_forum_delete_post(params: ModForumDeletePostParams, method?: HttpMethod): Promise<MoodleResponse<ModForumDeletePostReturns>>;
    /**
     * Returns a list of forum posts for a discussion for a user.
     *
     * @param {ModForumGetDiscussionPostsByUseridParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModForumGetDiscussionPostsByUseridReturns>>}
     */
    mod_forum_get_discussion_posts_by_userid(params: ModForumGetDiscussionPostsByUseridParams, method?: HttpMethod): Promise<MoodleResponse<ModForumGetDiscussionPostsByUseridReturns>>;
    /**
     * Get a particular discussion post.
     *
     * @param {ModForumGetDiscussionPostParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModForumGetDiscussionPostReturns>>}
     */
    mod_forum_get_discussion_post(params: ModForumGetDiscussionPostParams, method?: HttpMethod): Promise<MoodleResponse<ModForumGetDiscussionPostReturns>>;
    /**
     * Prepares a draft area for editing a post.
     *
     * @param {ModForumPrepareDraftAreaForPostParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModForumPrepareDraftAreaForPostReturns>>}
     */
    mod_forum_prepare_draft_area_for_post(params: ModForumPrepareDraftAreaForPostParams, method?: HttpMethod): Promise<MoodleResponse<ModForumPrepareDraftAreaForPostReturns>>;
    /**
     * Updates a post or a discussion topic post.
     *
     * @param {ModForumUpdateDiscussionPostParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModForumUpdateDiscussionPostReturns>>}
     */
    mod_forum_update_discussion_post(params: ModForumUpdateDiscussionPostParams, method?: HttpMethod): Promise<MoodleResponse<ModForumUpdateDiscussionPostReturns>>;
    /**
     * Retrieve a list of glossaries from several courses.
     *
     * @param {ModGlossaryGetGlossariesByCoursesParams} [params]
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModGlossaryGetGlossariesByCoursesReturns>>}
     */
    mod_glossary_get_glossaries_by_courses(params?: ModGlossaryGetGlossariesByCoursesParams, method?: HttpMethod): Promise<MoodleResponse<ModGlossaryGetGlossariesByCoursesReturns>>;
    /**
     * Notify the glossary as being viewed.
     *
     * @param {ModGlossaryViewGlossaryParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModGlossaryViewGlossaryReturns>>}
     */
    mod_glossary_view_glossary(params: ModGlossaryViewGlossaryParams, method?: HttpMethod): Promise<MoodleResponse<ModGlossaryViewGlossaryReturns>>;
    /**
     * Notify a glossary entry as being viewed.
     *
     * @param {ModGlossaryViewEntryParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModGlossaryViewEntryReturns>>}
     */
    mod_glossary_view_entry(params: ModGlossaryViewEntryParams, method?: HttpMethod): Promise<MoodleResponse<ModGlossaryViewEntryReturns>>;
    /**
     * Browse entries by letter.
     *
     * @param {ModGlossaryGetEntriesByLetterParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModGlossaryGetEntriesByLetterReturns>>}
     */
    mod_glossary_get_entries_by_letter(params: ModGlossaryGetEntriesByLetterParams, method?: HttpMethod): Promise<MoodleResponse<ModGlossaryGetEntriesByLetterReturns>>;
    /**
     * Browse entries by date.
     *
     * @param {ModGlossaryGetEntriesByDateParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModGlossaryGetEntriesByDateReturns>>}
     */
    mod_glossary_get_entries_by_date(params: ModGlossaryGetEntriesByDateParams, method?: HttpMethod): Promise<MoodleResponse<ModGlossaryGetEntriesByDateReturns>>;
    /**
     * Get the categories.
     *
     * @param {ModGlossaryGetCategoriesParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModGlossaryGetCategoriesReturns>>}
     */
    mod_glossary_get_categories(params: ModGlossaryGetCategoriesParams, method?: HttpMethod): Promise<MoodleResponse<ModGlossaryGetCategoriesReturns>>;
    /**
     * Browse entries by category.
     *
     * @param {ModGlossaryGetEntriesByCategoryParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModGlossaryGetEntriesByCategoryReturns>>}
     */
    mod_glossary_get_entries_by_category(params: ModGlossaryGetEntriesByCategoryParams, method?: HttpMethod): Promise<MoodleResponse<ModGlossaryGetEntriesByCategoryReturns>>;
    /**
     * Get the authors.
     *
     * @param {ModGlossaryGetAuthorsParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModGlossaryGetAuthorsReturns>>}
     */
    mod_glossary_get_authors(params: ModGlossaryGetAuthorsParams, method?: HttpMethod): Promise<MoodleResponse<ModGlossaryGetAuthorsReturns>>;
    /**
     * Browse entries by author.
     *
     * @param {ModGlossaryGetEntriesByAuthorParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModGlossaryGetEntriesByAuthorReturns>>}
     */
    mod_glossary_get_entries_by_author(params: ModGlossaryGetEntriesByAuthorParams, method?: HttpMethod): Promise<MoodleResponse<ModGlossaryGetEntriesByAuthorReturns>>;
    /**
     * Browse entries by author ID.
     *
     * @param {ModGlossaryGetEntriesByAuthorIdParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModGlossaryGetEntriesByAuthorIdReturns>>}
     */
    mod_glossary_get_entries_by_author_id(params: ModGlossaryGetEntriesByAuthorIdParams, method?: HttpMethod): Promise<MoodleResponse<ModGlossaryGetEntriesByAuthorIdReturns>>;
    /**
     * Browse entries by search query.
     *
     * @param {ModGlossaryGetEntriesBySearchParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModGlossaryGetEntriesBySearchReturns>>}
     */
    mod_glossary_get_entries_by_search(params: ModGlossaryGetEntriesBySearchParams, method?: HttpMethod): Promise<MoodleResponse<ModGlossaryGetEntriesBySearchReturns>>;
    /**
     * Browse entries by term (concept or alias).
     *
     * @param {ModGlossaryGetEntriesByTermParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModGlossaryGetEntriesByTermReturns>>}
     */
    mod_glossary_get_entries_by_term(params: ModGlossaryGetEntriesByTermParams, method?: HttpMethod): Promise<MoodleResponse<ModGlossaryGetEntriesByTermReturns>>;
    /**
     * Browse entries to be approved.
     *
     * @param {ModGlossaryGetEntriesToApproveParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModGlossaryGetEntriesToApproveReturns>>}
     */
    mod_glossary_get_entries_to_approve(params: ModGlossaryGetEntriesToApproveParams, method?: HttpMethod): Promise<MoodleResponse<ModGlossaryGetEntriesToApproveReturns>>;
    /**
     * Get an entry by ID
     *
     * @param {ModGlossaryGetEntryByIdParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModGlossaryGetEntryByIdReturns>>}
     */
    mod_glossary_get_entry_by_id(params: ModGlossaryGetEntryByIdParams, method?: HttpMethod): Promise<MoodleResponse<ModGlossaryGetEntryByIdReturns>>;
    /**
     * Add a new entry to a given glossary
     *
     * @param {ModGlossaryAddEntryParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModGlossaryAddEntryReturns>>}
     */
    mod_glossary_add_entry(params: ModGlossaryAddEntryParams, method?: HttpMethod): Promise<MoodleResponse<ModGlossaryAddEntryReturns>>;
    /**
     * Delete the given entry from the glossary.
     *
     * @param {ModGlossaryDeleteEntryParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModGlossaryDeleteEntryReturns>>}
     */
    mod_glossary_delete_entry(params: ModGlossaryDeleteEntryParams, method?: HttpMethod): Promise<MoodleResponse<ModGlossaryDeleteEntryReturns>>;
    /**
     * Updates the given glossary entry.
     *
     * @param {ModGlossaryUpdateEntryParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModGlossaryUpdateEntryReturns>>}
     */
    mod_glossary_update_entry(params: ModGlossaryUpdateEntryParams, method?: HttpMethod): Promise<MoodleResponse<ModGlossaryUpdateEntryReturns>>;
    /**
     * Prepares the given entry for edition returning draft item areas and file areas information.
     *
     * @param {ModGlossaryPrepareEntryForEditionParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModGlossaryPrepareEntryForEditionReturns>>}
     */
    mod_glossary_prepare_entry_for_edition(params: ModGlossaryPrepareEntryForEditionParams, method?: HttpMethod): Promise<MoodleResponse<ModGlossaryPrepareEntryForEditionReturns>>;
    /**
     * Return access information for a given h5p activity.
     *
     * @param {ModH5pactivityGetH5pactivityAccessInformationParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModH5pactivityGetH5pactivityAccessInformationReturns>>}
     */
    mod_h5pactivity_get_h5pactivity_access_information(params: ModH5pactivityGetH5pactivityAccessInformationParams, method?: HttpMethod): Promise<MoodleResponse<ModH5pactivityGetH5pactivityAccessInformationReturns>>;
    /**
     * Trigger the course module viewed event and update the module completion status.
     *
     * @param {ModH5pactivityViewH5pactivityParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModH5pactivityViewH5pactivityReturns>>}
     */
    mod_h5pactivity_view_h5pactivity(params: ModH5pactivityViewH5pactivityParams, method?: HttpMethod): Promise<MoodleResponse<ModH5pactivityViewH5pactivityReturns>>;
    /**
     * Return the information needed to list a user attempts.
     *
     * @param {ModH5pactivityGetAttemptsParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModH5pactivityGetAttemptsReturns>>} - Activity attempts data
     */
    mod_h5pactivity_get_attempts(params: ModH5pactivityGetAttemptsParams, method?: HttpMethod): Promise<MoodleResponse<ModH5pactivityGetAttemptsReturns>>;
    /**
     * Return the information needed to list a user attempt results.
     *
     * @param {ModH5pactivityGetResultsParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModH5pactivityGetResultsReturns>>} - Activity attempts results data
     */
    mod_h5pactivity_get_results(params: ModH5pactivityGetResultsParams, method?: HttpMethod): Promise<MoodleResponse<ModH5pactivityGetResultsReturns>>;
    /**
     * Returns a list of h5p activities in a list of provided courses, if no list is provided all h5p activities that the user can view will be returned.
     *
     * @param {ModH5pactivityGetH5pactivitiesByCoursesParams} [params]
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModH5pactivityGetH5pactivitiesByCoursesReturns>>}
     */
    mod_h5pactivity_get_h5pactivities_by_courses(params?: ModH5pactivityGetH5pactivitiesByCoursesParams, method?: HttpMethod): Promise<MoodleResponse<ModH5pactivityGetH5pactivitiesByCoursesReturns>>;
    /**
     * Log that the h5pactivity was viewed.
     *
     * @param {ModH5pactivityLogReportViewedParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModH5pactivityLogReportViewedReturns>>}
     */
    mod_h5pactivity_log_report_viewed(params: ModH5pactivityLogReportViewedParams, method?: HttpMethod): Promise<MoodleResponse<ModH5pactivityLogReportViewedReturns>>;
    /**
     * Return the information needed to list all enrolled user attempts.
     *
     * @param {ModH5pactivityGetUserAttemptsParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModH5pactivityGetUserAttemptsReturns>>} - Activity attempts data
     */
    mod_h5pactivity_get_user_attempts(params: ModH5pactivityGetUserAttemptsParams, method?: HttpMethod): Promise<MoodleResponse<ModH5pactivityGetUserAttemptsReturns>>;
    /**
     * Simulate the view.php web interface imscp: trigger events, completion, etc...
     *
     * @param {ModImscpViewImscpParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModImscpViewImscpReturns>>}
     */
    mod_imscp_view_imscp(params: ModImscpViewImscpParams, method?: HttpMethod): Promise<MoodleResponse<ModImscpViewImscpReturns>>;
    /**
     * Returns a list of IMSCP instances in a provided set of courses, if no courses are provided then all the IMSCP instances the user has access to will be returned.
     *
     * @param {ModImscpGetImscpsByCoursesParams} [params]
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModImscpGetImscpsByCoursesReturns>>}
     */
    mod_imscp_get_imscps_by_courses(params?: ModImscpGetImscpsByCoursesParams, method?: HttpMethod): Promise<MoodleResponse<ModImscpGetImscpsByCoursesReturns>>;
    /**
     * Returns a list of labels in a provided list of courses, if no list is provided all labels that the user can view will be returned.
     *
     * @param {ModLabelGetLabelsByCoursesParams} [params]
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModLabelGetLabelsByCoursesReturns>>}
     */
    mod_label_get_labels_by_courses(params?: ModLabelGetLabelsByCoursesParams, method?: HttpMethod): Promise<MoodleResponse<ModLabelGetLabelsByCoursesReturns>>;
    /**
     * Returns a list of lessons in a provided list of courses, if no list is provided all lessons that the user can view will be returned.
     *
     * @param {ModLessonGetLessonsByCoursesParams} [params]
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModLessonGetLessonsByCoursesReturns>>}
     */
    mod_lesson_get_lessons_by_courses(params?: ModLessonGetLessonsByCoursesParams, method?: HttpMethod): Promise<MoodleResponse<ModLessonGetLessonsByCoursesReturns>>;
    /**
     * Return access information for a given lesson.
     *
     * @param {ModLessonGetLessonAccessInformationParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModLessonGetLessonAccessInformationReturns>>}
     */
    mod_lesson_get_lesson_access_information(params: ModLessonGetLessonAccessInformationParams, method?: HttpMethod): Promise<MoodleResponse<ModLessonGetLessonAccessInformationReturns>>;
    /**
     * Trigger the course module viewed event and update the module completion status.
     *
     * @param {ModLessonViewLessonParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModLessonViewLessonReturns>>}
     */
    mod_lesson_view_lesson(params: ModLessonViewLessonParams, method?: HttpMethod): Promise<MoodleResponse<ModLessonViewLessonReturns>>;
    /**
     * Return the list of questions attempts in a given lesson.
     *
     * @param {ModLessonGetQuestionsAttemptsParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModLessonGetQuestionsAttemptsReturns>>}
     */
    mod_lesson_get_questions_attempts(params: ModLessonGetQuestionsAttemptsParams, method?: HttpMethod): Promise<MoodleResponse<ModLessonGetQuestionsAttemptsReturns>>;
    /**
     * Return the final grade in the lesson for the given user.
     *
     * @param {ModLessonGetUserGradeParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModLessonGetUserGradeReturns>>}
     */
    mod_lesson_get_user_grade(params: ModLessonGetUserGradeParams, method?: HttpMethod): Promise<MoodleResponse<ModLessonGetUserGradeReturns>>;
    /**
     * Return grade information in the attempt for a given user.
     *
     * @param {ModLessonGetUserAttemptGradeParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModLessonGetUserAttemptGradeReturns>>}
     */
    mod_lesson_get_user_attempt_grade(params: ModLessonGetUserAttemptGradeParams, method?: HttpMethod): Promise<MoodleResponse<ModLessonGetUserAttemptGradeReturns>>;
    /**
     * Return the list of content pages viewed by a user during a lesson attempt.
     *
     * @param {ModLessonGetContentPagesViewedParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModLessonGetContentPagesViewedReturns>>}
     */
    mod_lesson_get_content_pages_viewed(params: ModLessonGetContentPagesViewedParams, method?: HttpMethod): Promise<MoodleResponse<ModLessonGetContentPagesViewedReturns>>;
    /**
     * Return the timers in the current lesson for the given user.
     *
     * @param {ModLessonGetUserTimersParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModLessonGetUserTimersReturns>>}
     */
    mod_lesson_get_user_timers(params: ModLessonGetUserTimersParams, method?: HttpMethod): Promise<MoodleResponse<ModLessonGetUserTimersReturns>>;
    /**
     * Return the list of pages in a lesson (based on the user permissions).
     *
     * @param {ModLessonGetPagesParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModLessonGetPagesReturns>>}
     */
    mod_lesson_get_pages(params: ModLessonGetPagesParams, method?: HttpMethod): Promise<MoodleResponse<ModLessonGetPagesReturns>>;
    /**
     * Starts a new attempt or continues an existing one.
     *
     * @param {ModLessonLaunchAttemptParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModLessonLaunchAttemptReturns>>}
     */
    mod_lesson_launch_attempt(params: ModLessonLaunchAttemptParams, method?: HttpMethod): Promise<MoodleResponse<ModLessonLaunchAttemptReturns>>;
    /**
     * Return information of a given page, including its contents.
     *
     * @param {ModLessonGetPageDataParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModLessonGetPageDataReturns>>}
     */
    mod_lesson_get_page_data(params: ModLessonGetPageDataParams, method?: HttpMethod): Promise<MoodleResponse<ModLessonGetPageDataReturns>>;
    /**
     * Processes page responses.
     *
     * @param {ModLessonProcessPageParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModLessonProcessPageReturns>>}
     */
    mod_lesson_process_page(params: ModLessonProcessPageParams, method?: HttpMethod): Promise<MoodleResponse<ModLessonProcessPageReturns>>;
    /**
     * Finishes the current attempt.
     *
     * @param {ModLessonFinishAttemptParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModLessonFinishAttemptReturns>>}
     */
    mod_lesson_finish_attempt(params: ModLessonFinishAttemptParams, method?: HttpMethod): Promise<MoodleResponse<ModLessonFinishAttemptReturns>>;
    /**
     * Get a list of all the attempts made by users in a lesson.
     *
     * @param {ModLessonGetAttemptsOverviewParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModLessonGetAttemptsOverviewReturns>>}
     */
    mod_lesson_get_attempts_overview(params: ModLessonGetAttemptsOverviewParams, method?: HttpMethod): Promise<MoodleResponse<ModLessonGetAttemptsOverviewReturns>>;
    /**
     * Return information about the given user attempt (including answers).
     *
     * @param {ModLessonGetUserAttemptParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModLessonGetUserAttemptReturns>>}
     */
    mod_lesson_get_user_attempt(params: ModLessonGetUserAttemptParams, method?: HttpMethod): Promise<MoodleResponse<ModLessonGetUserAttemptReturns>>;
    /**
     * Return all the possible jumps for the pages in a given lesson.
     *
     * @param {ModLessonGetPagesPossibleJumpsParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModLessonGetPagesPossibleJumpsReturns>>}
     */
    mod_lesson_get_pages_possible_jumps(params: ModLessonGetPagesPossibleJumpsParams, method?: HttpMethod): Promise<MoodleResponse<ModLessonGetPagesPossibleJumpsReturns>>;
    /**
     * Return information of a given lesson.
     *
     * @param {ModLessonGetLessonParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModLessonGetLessonReturns>>}
     */
    mod_lesson_get_lesson(params: ModLessonGetLessonParams, method?: HttpMethod): Promise<MoodleResponse<ModLessonGetLessonReturns>>;
    /**
     * Return the launch data for a given external tool.
     *
     * @param {ModLtiGetToolLaunchDataParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModLtiGetToolLaunchDataReturns>>}
     */
    mod_lti_get_tool_launch_data(params: ModLtiGetToolLaunchDataParams, method?: HttpMethod): Promise<MoodleResponse<ModLtiGetToolLaunchDataReturns>>;
    /**
     * Returns a list of external tool instances in a provided set of courses, if no courses are provided then all the external tool instances the user has access to will be returned.
     *
     * @param {ModLtiGetLtisByCoursesParams} [params]
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModLtiGetLtisByCoursesReturns>>}
     */
    mod_lti_get_ltis_by_courses(params?: ModLtiGetLtisByCoursesParams, method?: HttpMethod): Promise<MoodleResponse<ModLtiGetLtisByCoursesReturns>>;
    /**
     * Trigger the course module viewed event and update the module completion status.
     *
     * @param {ModLtiViewLtiParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModLtiViewLtiReturns>>}
     */
    mod_lti_view_lti(params: ModLtiViewLtiParams, method?: HttpMethod): Promise<MoodleResponse<ModLtiViewLtiReturns>>;
    /**
     * Get a list of the tool proxies
     *
     * @param {ModLtiGetToolProxiesParams} [params]
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModLtiGetToolProxiesReturns>>}
     */
    mod_lti_get_tool_proxies(params?: ModLtiGetToolProxiesParams, method?: HttpMethod): Promise<MoodleResponse<ModLtiGetToolProxiesReturns>>;
    /**
     * Create a tool proxy
     *
     * @param {ModLtiCreateToolProxyParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModLtiCreateToolProxyReturns>>}
     */
    mod_lti_create_tool_proxy(params: ModLtiCreateToolProxyParams, method?: HttpMethod): Promise<MoodleResponse<ModLtiCreateToolProxyReturns>>;
    /**
     * Delete a tool proxy
     *
     * @param {ModLtiDeleteToolProxyParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModLtiDeleteToolProxyReturns>>}
     */
    mod_lti_delete_tool_proxy(params: ModLtiDeleteToolProxyParams, method?: HttpMethod): Promise<MoodleResponse<ModLtiDeleteToolProxyReturns>>;
    /**
     * Get a registration request for a tool proxy
     *
     * @param {ModLtiGetToolProxyRegistrationRequestParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModLtiGetToolProxyRegistrationRequestReturns>>}
     */
    mod_lti_get_tool_proxy_registration_request(params: ModLtiGetToolProxyRegistrationRequestParams, method?: HttpMethod): Promise<MoodleResponse<ModLtiGetToolProxyRegistrationRequestReturns>>;
    /**
     * Get a list of the tool types
     *
     * @param {ModLtiGetToolTypesParams} [params]
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModLtiGetToolTypesReturns>>}
     */
    mod_lti_get_tool_types(params?: ModLtiGetToolTypesParams, method?: HttpMethod): Promise<MoodleResponse<ModLtiGetToolTypesReturns>>;
    /**
     * Get a list of the tool types and tool proxies
     *
     * @param {ModLtiGetToolTypesAndProxiesParams} [params]
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModLtiGetToolTypesAndProxiesReturns>>}
     */
    mod_lti_get_tool_types_and_proxies(params?: ModLtiGetToolTypesAndProxiesParams, method?: HttpMethod): Promise<MoodleResponse<ModLtiGetToolTypesAndProxiesReturns>>;
    /**
     * Get total number of the tool types and tool proxies
     *
     * @param {ModLtiGetToolTypesAndProxiesCountParams} [params]
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModLtiGetToolTypesAndProxiesCountReturns>>}
     */
    mod_lti_get_tool_types_and_proxies_count(params?: ModLtiGetToolTypesAndProxiesCountParams, method?: HttpMethod): Promise<MoodleResponse<ModLtiGetToolTypesAndProxiesCountReturns>>;
    /**
     * Create a tool type
     *
     * @param {ModLtiCreateToolTypeParams} [params]
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModLtiCreateToolTypeReturns>>} - Tool
     */
    mod_lti_create_tool_type(params?: ModLtiCreateToolTypeParams, method?: HttpMethod): Promise<MoodleResponse<ModLtiCreateToolTypeReturns>>;
    /**
     * Update a tool type
     *
     * @param {ModLtiUpdateToolTypeParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModLtiUpdateToolTypeReturns>>} - Tool
     */
    mod_lti_update_tool_type(params: ModLtiUpdateToolTypeParams, method?: HttpMethod): Promise<MoodleResponse<ModLtiUpdateToolTypeReturns>>;
    /**
     * Delete a tool type
     *
     * @param {ModLtiDeleteToolTypeParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModLtiDeleteToolTypeReturns>>}
     */
    mod_lti_delete_tool_type(params: ModLtiDeleteToolTypeParams, method?: HttpMethod): Promise<MoodleResponse<ModLtiDeleteToolTypeReturns>>;
    /**
     * Delete a course tool type
     *
     * @param {ModLtiDeleteCourseToolTypeParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModLtiDeleteCourseToolTypeReturns>>} - Success
     */
    mod_lti_delete_course_tool_type(params: ModLtiDeleteCourseToolTypeParams, method?: HttpMethod): Promise<MoodleResponse<ModLtiDeleteCourseToolTypeReturns>>;
    /**
     * Toggle showinactivitychooser for a tool type in a course
     *
     * @param {ModLtiToggleShowinactivitychooserParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModLtiToggleShowinactivitychooserReturns>>} - Success
     */
    mod_lti_toggle_showinactivitychooser(params: ModLtiToggleShowinactivitychooserParams, method?: HttpMethod): Promise<MoodleResponse<ModLtiToggleShowinactivitychooserReturns>>;
    /**
     * Determine if the given url is for a cartridge
     *
     * @param {ModLtiIsCartridgeParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModLtiIsCartridgeReturns>>}
     */
    mod_lti_is_cartridge(params: ModLtiIsCartridgeParams, method?: HttpMethod): Promise<MoodleResponse<ModLtiIsCartridgeReturns>>;
    /**
     * Simulate the view.php web interface page: trigger events, completion, etc...
     *
     * @param {ModPageViewPageParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModPageViewPageReturns>>}
     */
    mod_page_view_page(params: ModPageViewPageParams, method?: HttpMethod): Promise<MoodleResponse<ModPageViewPageReturns>>;
    /**
     * Returns a list of pages in a provided list of courses, if no list is provided all pages that the user can view will be returned.
     *
     * @param {ModPageGetPagesByCoursesParams} [params]
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModPageGetPagesByCoursesReturns>>}
     */
    mod_page_get_pages_by_courses(params?: ModPageGetPagesByCoursesParams, method?: HttpMethod): Promise<MoodleResponse<ModPageGetPagesByCoursesReturns>>;
    /**
     * Validate a Safe Exam Browser config key or a browser exam key.
     *
     * @param {QuizaccessSebValidateQuizKeysParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<QuizaccessSebValidateQuizKeysReturns>>}
     */
    quizaccess_seb_validate_quiz_keys(params: QuizaccessSebValidateQuizKeysParams, method?: HttpMethod): Promise<MoodleResponse<QuizaccessSebValidateQuizKeysReturns>>;
    /**
     * Returns a list of quizzes in a provided list of courses, if no list is provided all quizzes that the user can view will be returned.
     *
     * @param {ModQuizGetQuizzesByCoursesParams} [params]
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModQuizGetQuizzesByCoursesReturns>>}
     */
    mod_quiz_get_quizzes_by_courses(params?: ModQuizGetQuizzesByCoursesParams, method?: HttpMethod): Promise<MoodleResponse<ModQuizGetQuizzesByCoursesReturns>>;
    /**
     * Trigger the course module viewed event and update the module completion status.
     *
     * @param {ModQuizViewQuizParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModQuizViewQuizReturns>>}
     */
    mod_quiz_view_quiz(params: ModQuizViewQuizParams, method?: HttpMethod): Promise<MoodleResponse<ModQuizViewQuizReturns>>;
    /**
     * Return a list of attempts for the given quiz and user.
     *
     * @param {ModQuizGetUserAttemptsParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModQuizGetUserAttemptsReturns>>}
     */
    mod_quiz_get_user_attempts(params: ModQuizGetUserAttemptsParams, method?: HttpMethod): Promise<MoodleResponse<ModQuizGetUserAttemptsReturns>>;
    /**
     * Get the best current grade for the given user on a quiz.
     *
     * @param {ModQuizGetUserBestGradeParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModQuizGetUserBestGradeReturns>>}
     */
    mod_quiz_get_user_best_grade(params: ModQuizGetUserBestGradeParams, method?: HttpMethod): Promise<MoodleResponse<ModQuizGetUserBestGradeReturns>>;
    /**
     * Combines the review options from a number of different quiz attempts.
     *
     * @param {ModQuizGetCombinedReviewOptionsParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModQuizGetCombinedReviewOptionsReturns>>}
     */
    mod_quiz_get_combined_review_options(params: ModQuizGetCombinedReviewOptionsParams, method?: HttpMethod): Promise<MoodleResponse<ModQuizGetCombinedReviewOptionsReturns>>;
    /**
     * Starts a new attempt at a quiz.
     *
     * @param {ModQuizStartAttemptParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModQuizStartAttemptReturns>>}
     */
    mod_quiz_start_attempt(params: ModQuizStartAttemptParams, method?: HttpMethod): Promise<MoodleResponse<ModQuizStartAttemptReturns>>;
    /**
     * Returns information for the given attempt page for a quiz attempt in progress.
     *
     * @param {ModQuizGetAttemptDataParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModQuizGetAttemptDataReturns>>}
     */
    mod_quiz_get_attempt_data(params: ModQuizGetAttemptDataParams, method?: HttpMethod): Promise<MoodleResponse<ModQuizGetAttemptDataReturns>>;
    /**
     * Returns a summary of a quiz attempt before it is submitted.
     *
     * @param {ModQuizGetAttemptSummaryParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModQuizGetAttemptSummaryReturns>>}
     */
    mod_quiz_get_attempt_summary(params: ModQuizGetAttemptSummaryParams, method?: HttpMethod): Promise<MoodleResponse<ModQuizGetAttemptSummaryReturns>>;
    /**
     * Processes save requests during the quiz. This function is intended for the quiz auto-save feature.
     *
     * @param {ModQuizSaveAttemptParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModQuizSaveAttemptReturns>>}
     */
    mod_quiz_save_attempt(params: ModQuizSaveAttemptParams, method?: HttpMethod): Promise<MoodleResponse<ModQuizSaveAttemptReturns>>;
    /**
     * Process responses during an attempt at a quiz and also deals with attempts finishing.
     *
     * @param {ModQuizProcessAttemptParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModQuizProcessAttemptReturns>>}
     */
    mod_quiz_process_attempt(params: ModQuizProcessAttemptParams, method?: HttpMethod): Promise<MoodleResponse<ModQuizProcessAttemptReturns>>;
    /**
     * Returns review information for the given finished attempt, can be used by users or teachers.
     *
     * @param {ModQuizGetAttemptReviewParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModQuizGetAttemptReviewReturns>>}
     */
    mod_quiz_get_attempt_review(params: ModQuizGetAttemptReviewParams, method?: HttpMethod): Promise<MoodleResponse<ModQuizGetAttemptReviewReturns>>;
    /**
     * Trigger the attempt viewed event.
     *
     * @param {ModQuizViewAttemptParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModQuizViewAttemptReturns>>}
     */
    mod_quiz_view_attempt(params: ModQuizViewAttemptParams, method?: HttpMethod): Promise<MoodleResponse<ModQuizViewAttemptReturns>>;
    /**
     * Trigger the attempt summary viewed event.
     *
     * @param {ModQuizViewAttemptSummaryParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModQuizViewAttemptSummaryReturns>>}
     */
    mod_quiz_view_attempt_summary(params: ModQuizViewAttemptSummaryParams, method?: HttpMethod): Promise<MoodleResponse<ModQuizViewAttemptSummaryReturns>>;
    /**
     * Trigger the attempt reviewed event.
     *
     * @param {ModQuizViewAttemptReviewParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModQuizViewAttemptReviewReturns>>}
     */
    mod_quiz_view_attempt_review(params: ModQuizViewAttemptReviewParams, method?: HttpMethod): Promise<MoodleResponse<ModQuizViewAttemptReviewReturns>>;
    /**
     * Get the feedback text that should be show to a student who got the given grade in the given quiz.
     *
     * @param {ModQuizGetQuizFeedbackForGradeParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModQuizGetQuizFeedbackForGradeReturns>>}
     */
    mod_quiz_get_quiz_feedback_for_grade(params: ModQuizGetQuizFeedbackForGradeParams, method?: HttpMethod): Promise<MoodleResponse<ModQuizGetQuizFeedbackForGradeReturns>>;
    /**
     * Return access information for a given quiz.
     *
     * @param {ModQuizGetQuizAccessInformationParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModQuizGetQuizAccessInformationReturns>>}
     */
    mod_quiz_get_quiz_access_information(params: ModQuizGetQuizAccessInformationParams, method?: HttpMethod): Promise<MoodleResponse<ModQuizGetQuizAccessInformationReturns>>;
    /**
     * Return access information for a given attempt in a quiz.
     *
     * @param {ModQuizGetAttemptAccessInformationParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModQuizGetAttemptAccessInformationReturns>>}
     */
    mod_quiz_get_attempt_access_information(params: ModQuizGetAttemptAccessInformationParams, method?: HttpMethod): Promise<MoodleResponse<ModQuizGetAttemptAccessInformationReturns>>;
    /**
     * Return the potential question types that would be required for a given quiz.
     *
     * @param {ModQuizGetQuizRequiredQtypesParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModQuizGetQuizRequiredQtypesReturns>>}
     */
    mod_quiz_get_quiz_required_qtypes(params: ModQuizGetQuizRequiredQtypesParams, method?: HttpMethod): Promise<MoodleResponse<ModQuizGetQuizRequiredQtypesReturns>>;
    /**
     * Set the version of question that would be required for a given quiz.
     *
     * @param {ModQuizSetQuestionVersionParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModQuizSetQuestionVersionReturns>>}
     */
    mod_quiz_set_question_version(params: ModQuizSetQuestionVersionParams, method?: HttpMethod): Promise<MoodleResponse<ModQuizSetQuestionVersionReturns>>;
    /**
     * Re-open an attempt that is currently in the never submitted state.
     *
     * @param {ModQuizReopenAttemptParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModQuizReopenAttemptReturns>>}
     */
    mod_quiz_reopen_attempt(params: ModQuizReopenAttemptParams, method?: HttpMethod): Promise<MoodleResponse<ModQuizReopenAttemptReturns>>;
    /**
     * Verify it is OK to re-open a given quiz attempt, and if so, return a suitable confirmation message.
     *
     * @param {ModQuizGetReopenAttemptConfirmationParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModQuizGetReopenAttemptConfirmationReturns>>} - Confirmation to show the user before the attempt is reopened.
     */
    mod_quiz_get_reopen_attempt_confirmation(params: ModQuizGetReopenAttemptConfirmationParams, method?: HttpMethod): Promise<MoodleResponse<ModQuizGetReopenAttemptConfirmationReturns>>;
    /**
     * Add a number of random questions to a quiz.
     *
     * @param {ModQuizAddRandomQuestionsParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModQuizAddRandomQuestionsReturns>>}
     */
    mod_quiz_add_random_questions(params: ModQuizAddRandomQuestionsParams, method?: HttpMethod): Promise<MoodleResponse<ModQuizAddRandomQuestionsReturns>>;
    /**
     * Update filter condition for a random question slot.
     *
     * @param {ModQuizUpdateFilterConditionParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModQuizUpdateFilterConditionReturns>>}
     */
    mod_quiz_update_filter_condition(params: ModQuizUpdateFilterConditionParams, method?: HttpMethod): Promise<MoodleResponse<ModQuizUpdateFilterConditionReturns>>;
    /**
     * Update or insert quiz overrides
     *
     * @param {ModQuizSaveOverridesParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModQuizSaveOverridesReturns>>}
     */
    mod_quiz_save_overrides(params: ModQuizSaveOverridesParams, method?: HttpMethod): Promise<MoodleResponse<ModQuizSaveOverridesReturns>>;
    /**
     * Delete quiz overrides
     *
     * @param {ModQuizDeleteOverridesParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModQuizDeleteOverridesReturns>>}
     */
    mod_quiz_delete_overrides(params: ModQuizDeleteOverridesParams, method?: HttpMethod): Promise<MoodleResponse<ModQuizDeleteOverridesReturns>>;
    /**
     * Get quiz overrides
     *
     * @param {ModQuizGetOverridesParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModQuizGetOverridesReturns>>}
     */
    mod_quiz_get_overrides(params: ModQuizGetOverridesParams, method?: HttpMethod): Promise<MoodleResponse<ModQuizGetOverridesReturns>>;
    /**
     * Create quiz grade items. All grade items must belong to the same quiz.
     *
     * @param {ModQuizCreateGradeItemsParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModQuizCreateGradeItemsReturns>>}
     */
    mod_quiz_create_grade_items(params: ModQuizCreateGradeItemsParams, method?: HttpMethod): Promise<MoodleResponse<ModQuizCreateGradeItemsReturns>>;
    /**
     * Delete quiz grade items. All grade items must belong to the same quiz.
     *
     * @param {ModQuizDeleteGradeItemsParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModQuizDeleteGradeItemsReturns>>}
     */
    mod_quiz_delete_grade_items(params: ModQuizDeleteGradeItemsParams, method?: HttpMethod): Promise<MoodleResponse<ModQuizDeleteGradeItemsReturns>>;
    /**
     * Update quiz grade items. All grade items must belong to the same quiz.
     *
     * @param {ModQuizUpdateGradeItemsParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModQuizUpdateGradeItemsReturns>>}
     */
    mod_quiz_update_grade_items(params: ModQuizUpdateGradeItemsParams, method?: HttpMethod): Promise<MoodleResponse<ModQuizUpdateGradeItemsReturns>>;
    /**
     * Update the properties of slots in a quiz. All slots must belong to the same quiz.
     *
     * @param {ModQuizUpdateSlotsParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModQuizUpdateSlotsReturns>>}
     */
    mod_quiz_update_slots(params: ModQuizUpdateSlotsParams, method?: HttpMethod): Promise<MoodleResponse<ModQuizUpdateSlotsReturns>>;
    /**
     * Get the data required to re-render the Quiz grading setup page
     *
     * @param {ModQuizGetEditGradingPageDataParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModQuizGetEditGradingPageDataReturns>>} - JSON-encoded data required to render the mod_quiz/edit_grading_page template.
     */
    mod_quiz_get_edit_grading_page_data(params: ModQuizGetEditGradingPageDataParams, method?: HttpMethod): Promise<MoodleResponse<ModQuizGetEditGradingPageDataReturns>>;
    /**
     * For a quiz with no grade items yet, create a grade item for each section, with the questions in that section assigned.
     *
     * @param {ModQuizCreateGradeItemPerSectionParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModQuizCreateGradeItemPerSectionReturns>>}
     */
    mod_quiz_create_grade_item_per_section(params: ModQuizCreateGradeItemPerSectionParams, method?: HttpMethod): Promise<MoodleResponse<ModQuizCreateGradeItemPerSectionReturns>>;
    /**
     * Simulate the view.php web interface resource: trigger events, completion, etc...
     *
     * @param {ModResourceViewResourceParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModResourceViewResourceReturns>>}
     */
    mod_resource_view_resource(params: ModResourceViewResourceParams, method?: HttpMethod): Promise<MoodleResponse<ModResourceViewResourceReturns>>;
    /**
     * Returns a list of files in a provided list of courses, if no list is provided all files that the user can view will be returned.
     *
     * @param {ModResourceGetResourcesByCoursesParams} [params]
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModResourceGetResourcesByCoursesReturns>>}
     */
    mod_resource_get_resources_by_courses(params?: ModResourceGetResourcesByCoursesParams, method?: HttpMethod): Promise<MoodleResponse<ModResourceGetResourcesByCoursesReturns>>;
    /**
     * Trigger the course module viewed event.
     *
     * @param {ModScormViewScormParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModScormViewScormReturns>>}
     */
    mod_scorm_view_scorm(params: ModScormViewScormParams, method?: HttpMethod): Promise<MoodleResponse<ModScormViewScormReturns>>;
    /**
     * Return the number of attempts done by a user in the given SCORM.
     *
     * @param {ModScormGetScormAttemptCountParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModScormGetScormAttemptCountReturns>>}
     */
    mod_scorm_get_scorm_attempt_count(params: ModScormGetScormAttemptCountParams, method?: HttpMethod): Promise<MoodleResponse<ModScormGetScormAttemptCountReturns>>;
    /**
     * Returns a list containing all the scoes data related to the given scorm id
     *
     * @param {ModScormGetScormScoesParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModScormGetScormScoesReturns>>}
     */
    mod_scorm_get_scorm_scoes(params: ModScormGetScormScoesParams, method?: HttpMethod): Promise<MoodleResponse<ModScormGetScormScoesReturns>>;
    /**
     * Retrieves user tracking and SCO data and default SCORM values
     *
     * @param {ModScormGetScormUserDataParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModScormGetScormUserDataReturns>>}
     */
    mod_scorm_get_scorm_user_data(params: ModScormGetScormUserDataParams, method?: HttpMethod): Promise<MoodleResponse<ModScormGetScormUserDataReturns>>;
    /**
     * Saves a scorm tracking record. It will overwrite any existing tracking data for this attempt. Validation should be performed before running the function to ensure the user will not lose any existing attempt data.
     *
     * @param {ModScormInsertScormTracksParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModScormInsertScormTracksReturns>>}
     */
    mod_scorm_insert_scorm_tracks(params: ModScormInsertScormTracksParams, method?: HttpMethod): Promise<MoodleResponse<ModScormInsertScormTracksReturns>>;
    /**
     * Retrieves SCO tracking data for the given user id and attempt number
     *
     * @param {ModScormGetScormScoTracksParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModScormGetScormScoTracksReturns>>}
     */
    mod_scorm_get_scorm_sco_tracks(params: ModScormGetScormScoTracksParams, method?: HttpMethod): Promise<MoodleResponse<ModScormGetScormScoTracksReturns>>;
    /**
     * Returns a list of scorm instances in a provided set of courses, if no courses are provided then all the scorm instances the user has access to will be returned.
     *
     * @param {ModScormGetScormsByCoursesParams} [params]
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModScormGetScormsByCoursesReturns>>}
     */
    mod_scorm_get_scorms_by_courses(params?: ModScormGetScormsByCoursesParams, method?: HttpMethod): Promise<MoodleResponse<ModScormGetScormsByCoursesReturns>>;
    /**
     * Trigger the SCO launched event.
     *
     * @param {ModScormLaunchScoParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModScormLaunchScoReturns>>}
     */
    mod_scorm_launch_sco(params: ModScormLaunchScoParams, method?: HttpMethod): Promise<MoodleResponse<ModScormLaunchScoReturns>>;
    /**
     * Return capabilities information for a given scorm.
     *
     * @param {ModScormGetScormAccessInformationParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModScormGetScormAccessInformationReturns>>}
     */
    mod_scorm_get_scorm_access_information(params: ModScormGetScormAccessInformationParams, method?: HttpMethod): Promise<MoodleResponse<ModScormGetScormAccessInformationReturns>>;
    /**
     * Returns a list of survey instances in a provided set of courses, if no courses are provided then all the survey instances the user has access to will be returned.
     *
     * @param {ModSurveyGetSurveysByCoursesParams} [params]
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModSurveyGetSurveysByCoursesReturns>>}
     */
    mod_survey_get_surveys_by_courses(params?: ModSurveyGetSurveysByCoursesParams, method?: HttpMethod): Promise<MoodleResponse<ModSurveyGetSurveysByCoursesReturns>>;
    /**
     * Trigger the course module viewed event and update the module completion status.
     *
     * @param {ModSurveyViewSurveyParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModSurveyViewSurveyReturns>>}
     */
    mod_survey_view_survey(params: ModSurveyViewSurveyParams, method?: HttpMethod): Promise<MoodleResponse<ModSurveyViewSurveyReturns>>;
    /**
     * Get the complete list of questions for the survey, including subquestions.
     *
     * @param {ModSurveyGetQuestionsParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModSurveyGetQuestionsReturns>>}
     */
    mod_survey_get_questions(params: ModSurveyGetQuestionsParams, method?: HttpMethod): Promise<MoodleResponse<ModSurveyGetQuestionsReturns>>;
    /**
     * Submit the answers for a given survey.
     *
     * @param {ModSurveySubmitAnswersParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModSurveySubmitAnswersReturns>>}
     */
    mod_survey_submit_answers(params: ModSurveySubmitAnswersParams, method?: HttpMethod): Promise<MoodleResponse<ModSurveySubmitAnswersReturns>>;
    /**
     * Trigger the course module viewed event and update the module completion status.
     *
     * @param {ModUrlViewUrlParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModUrlViewUrlReturns>>}
     */
    mod_url_view_url(params: ModUrlViewUrlParams, method?: HttpMethod): Promise<MoodleResponse<ModUrlViewUrlReturns>>;
    /**
     * Returns a list of urls in a provided list of courses, if no list is provided all urls that the user can view will be returned.
     *
     * @param {ModUrlGetUrlsByCoursesParams} [params]
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModUrlGetUrlsByCoursesReturns>>}
     */
    mod_url_get_urls_by_courses(params?: ModUrlGetUrlsByCoursesParams, method?: HttpMethod): Promise<MoodleResponse<ModUrlGetUrlsByCoursesReturns>>;
    /**
     * @param {ModWikiGetWikisByCoursesParams} [params]
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModWikiGetWikisByCoursesReturns>>}
     */
    mod_wiki_get_wikis_by_courses(params?: ModWikiGetWikisByCoursesParams, method?: HttpMethod): Promise<MoodleResponse<ModWikiGetWikisByCoursesReturns>>;
    /**
     * Trigger the course module viewed event and update the module completion status.
     *
     * @param {ModWikiViewWikiParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModWikiViewWikiReturns>>}
     */
    mod_wiki_view_wiki(params: ModWikiViewWikiParams, method?: HttpMethod): Promise<MoodleResponse<ModWikiViewWikiReturns>>;
    /**
     * Trigger the page viewed event and update the module completion status.
     *
     * @param {ModWikiViewPageParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModWikiViewPageReturns>>}
     */
    mod_wiki_view_page(params: ModWikiViewPageParams, method?: HttpMethod): Promise<MoodleResponse<ModWikiViewPageReturns>>;
    /**
     * Returns the list of subwikis the user can see in a specific wiki.
     *
     * @param {ModWikiGetSubwikisParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModWikiGetSubwikisReturns>>}
     */
    mod_wiki_get_subwikis(params: ModWikiGetSubwikisParams, method?: HttpMethod): Promise<MoodleResponse<ModWikiGetSubwikisReturns>>;
    /**
     * Returns the list of pages for a specific subwiki.
     *
     * @param {ModWikiGetSubwikiPagesParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModWikiGetSubwikiPagesReturns>>}
     */
    mod_wiki_get_subwiki_pages(params: ModWikiGetSubwikiPagesParams, method?: HttpMethod): Promise<MoodleResponse<ModWikiGetSubwikiPagesReturns>>;
    /**
     * Returns the list of files for a specific subwiki.
     *
     * @param {ModWikiGetSubwikiFilesParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModWikiGetSubwikiFilesReturns>>}
     */
    mod_wiki_get_subwiki_files(params: ModWikiGetSubwikiFilesParams, method?: HttpMethod): Promise<MoodleResponse<ModWikiGetSubwikiFilesReturns>>;
    /**
     * Returns the contents of a page.
     *
     * @param {ModWikiGetPageContentsParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModWikiGetPageContentsReturns>>}
     */
    mod_wiki_get_page_contents(params: ModWikiGetPageContentsParams, method?: HttpMethod): Promise<MoodleResponse<ModWikiGetPageContentsReturns>>;
    /**
     * Locks and retrieves info of page-section to be edited.
     *
     * @param {ModWikiGetPageForEditingParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModWikiGetPageForEditingReturns>>}
     */
    mod_wiki_get_page_for_editing(params: ModWikiGetPageForEditingParams, method?: HttpMethod): Promise<MoodleResponse<ModWikiGetPageForEditingReturns>>;
    /**
     * Create a new page in a subwiki.
     *
     * @param {ModWikiNewPageParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModWikiNewPageReturns>>}
     */
    mod_wiki_new_page(params: ModWikiNewPageParams, method?: HttpMethod): Promise<MoodleResponse<ModWikiNewPageReturns>>;
    /**
     * Save the contents of a page.
     *
     * @param {ModWikiEditPageParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModWikiEditPageReturns>>}
     */
    mod_wiki_edit_page(params: ModWikiEditPageParams, method?: HttpMethod): Promise<MoodleResponse<ModWikiEditPageReturns>>;
    /**
     * Returns a list of workshops in a provided list of courses, if no list is provided all workshops that the user can view will be returned.
     *
     * @param {ModWorkshopGetWorkshopsByCoursesParams} [params]
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModWorkshopGetWorkshopsByCoursesReturns>>}
     */
    mod_workshop_get_workshops_by_courses(params?: ModWorkshopGetWorkshopsByCoursesParams, method?: HttpMethod): Promise<MoodleResponse<ModWorkshopGetWorkshopsByCoursesReturns>>;
    /**
     * Return access information for a given workshop.
     *
     * @param {ModWorkshopGetWorkshopAccessInformationParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModWorkshopGetWorkshopAccessInformationReturns>>}
     */
    mod_workshop_get_workshop_access_information(params: ModWorkshopGetWorkshopAccessInformationParams, method?: HttpMethod): Promise<MoodleResponse<ModWorkshopGetWorkshopAccessInformationReturns>>;
    /**
     * Return the planner information for the given user.
     *
     * @param {ModWorkshopGetUserPlanParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModWorkshopGetUserPlanReturns>>}
     */
    mod_workshop_get_user_plan(params: ModWorkshopGetUserPlanParams, method?: HttpMethod): Promise<MoodleResponse<ModWorkshopGetUserPlanReturns>>;
    /**
     * Trigger the course module viewed event and update the module completion status.
     *
     * @param {ModWorkshopViewWorkshopParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModWorkshopViewWorkshopReturns>>}
     */
    mod_workshop_view_workshop(params: ModWorkshopViewWorkshopParams, method?: HttpMethod): Promise<MoodleResponse<ModWorkshopViewWorkshopReturns>>;
    /**
     * Add a new submission to a given workshop.
     *
     * @param {ModWorkshopAddSubmissionParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModWorkshopAddSubmissionReturns>>}
     */
    mod_workshop_add_submission(params: ModWorkshopAddSubmissionParams, method?: HttpMethod): Promise<MoodleResponse<ModWorkshopAddSubmissionReturns>>;
    /**
     * Update the given submission.
     *
     * @param {ModWorkshopUpdateSubmissionParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModWorkshopUpdateSubmissionReturns>>}
     */
    mod_workshop_update_submission(params: ModWorkshopUpdateSubmissionParams, method?: HttpMethod): Promise<MoodleResponse<ModWorkshopUpdateSubmissionReturns>>;
    /**
     * Deletes the given submission.
     *
     * @param {ModWorkshopDeleteSubmissionParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModWorkshopDeleteSubmissionReturns>>}
     */
    mod_workshop_delete_submission(params: ModWorkshopDeleteSubmissionParams, method?: HttpMethod): Promise<MoodleResponse<ModWorkshopDeleteSubmissionReturns>>;
    /**
     * Retrieves all the workshop submissions or the one done by the given user (except example submissions).
     *
     * @param {ModWorkshopGetSubmissionsParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModWorkshopGetSubmissionsReturns>>}
     */
    mod_workshop_get_submissions(params: ModWorkshopGetSubmissionsParams, method?: HttpMethod): Promise<MoodleResponse<ModWorkshopGetSubmissionsReturns>>;
    /**
     * Retrieves the given submission.
     *
     * @param {ModWorkshopGetSubmissionParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModWorkshopGetSubmissionReturns>>}
     */
    mod_workshop_get_submission(params: ModWorkshopGetSubmissionParams, method?: HttpMethod): Promise<MoodleResponse<ModWorkshopGetSubmissionReturns>>;
    /**
     * Retrieves all the assessments of the given submission.
     *
     * @param {ModWorkshopGetSubmissionAssessmentsParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModWorkshopGetSubmissionAssessmentsReturns>>}
     */
    mod_workshop_get_submission_assessments(params: ModWorkshopGetSubmissionAssessmentsParams, method?: HttpMethod): Promise<MoodleResponse<ModWorkshopGetSubmissionAssessmentsReturns>>;
    /**
     * Retrieves the given assessment.
     *
     * @param {ModWorkshopGetAssessmentParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModWorkshopGetAssessmentReturns>>}
     */
    mod_workshop_get_assessment(params: ModWorkshopGetAssessmentParams, method?: HttpMethod): Promise<MoodleResponse<ModWorkshopGetAssessmentReturns>>;
    /**
     * Retrieves the assessment form definition.
     *
     * @param {ModWorkshopGetAssessmentFormDefinitionParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModWorkshopGetAssessmentFormDefinitionReturns>>}
     */
    mod_workshop_get_assessment_form_definition(params: ModWorkshopGetAssessmentFormDefinitionParams, method?: HttpMethod): Promise<MoodleResponse<ModWorkshopGetAssessmentFormDefinitionReturns>>;
    /**
     * Retrieves all the assessments reviewed by the given user.
     *
     * @param {ModWorkshopGetReviewerAssessmentsParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModWorkshopGetReviewerAssessmentsReturns>>}
     */
    mod_workshop_get_reviewer_assessments(params: ModWorkshopGetReviewerAssessmentsParams, method?: HttpMethod): Promise<MoodleResponse<ModWorkshopGetReviewerAssessmentsReturns>>;
    /**
     * Add information to an allocated assessment.
     *
     * @param {ModWorkshopUpdateAssessmentParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModWorkshopUpdateAssessmentReturns>>}
     */
    mod_workshop_update_assessment(params: ModWorkshopUpdateAssessmentParams, method?: HttpMethod): Promise<MoodleResponse<ModWorkshopUpdateAssessmentReturns>>;
    /**
     * Returns the assessment and submission grade for the given user.
     *
     * @param {ModWorkshopGetGradesParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModWorkshopGetGradesReturns>>}
     */
    mod_workshop_get_grades(params: ModWorkshopGetGradesParams, method?: HttpMethod): Promise<MoodleResponse<ModWorkshopGetGradesReturns>>;
    /**
     * Evaluates an assessment (used by teachers for provide feedback to the reviewer).
     *
     * @param {ModWorkshopEvaluateAssessmentParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModWorkshopEvaluateAssessmentReturns>>}
     */
    mod_workshop_evaluate_assessment(params: ModWorkshopEvaluateAssessmentParams, method?: HttpMethod): Promise<MoodleResponse<ModWorkshopEvaluateAssessmentReturns>>;
    /**
     * Retrieves the assessment grades report.
     *
     * @param {ModWorkshopGetGradesReportParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModWorkshopGetGradesReportReturns>>}
     */
    mod_workshop_get_grades_report(params: ModWorkshopGetGradesReportParams, method?: HttpMethod): Promise<MoodleResponse<ModWorkshopGetGradesReportReturns>>;
    /**
     * Trigger the submission viewed event.
     *
     * @param {ModWorkshopViewSubmissionParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModWorkshopViewSubmissionReturns>>}
     */
    mod_workshop_view_submission(params: ModWorkshopViewSubmissionParams, method?: HttpMethod): Promise<MoodleResponse<ModWorkshopViewSubmissionReturns>>;
    /**
     * Evaluates a submission (used by teachers for provide feedback or override the submission grade).
     *
     * @param {ModWorkshopEvaluateSubmissionParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ModWorkshopEvaluateSubmissionReturns>>}
     */
    mod_workshop_evaluate_submission(params: ModWorkshopEvaluateSubmissionParams, method?: HttpMethod): Promise<MoodleResponse<ModWorkshopEvaluateSubmissionReturns>>;
    /**
     * Returns the configuration settings to be used in js
     *
     * @param {PaygwPaypalGetConfigForJsParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<PaygwPaypalGetConfigForJsReturns>>}
     */
    paygw_paypal_get_config_for_js(params: PaygwPaypalGetConfigForJsParams, method?: HttpMethod): Promise<MoodleResponse<PaygwPaypalGetConfigForJsReturns>>;
    /**
     * Takes care of what needs to be done when a PayPal transaction comes back as complete.
     *
     * @param {PaygwPaypalCreateTransactionCompleteParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<PaygwPaypalCreateTransactionCompleteReturns>>}
     */
    paygw_paypal_create_transaction_complete(params: PaygwPaypalCreateTransactionCompleteParams, method?: HttpMethod): Promise<MoodleResponse<PaygwPaypalCreateTransactionCompleteReturns>>;
    /**
     * Sets question columns order in database
     *
     * @param {QbankColumnsortorderSetColumnbankOrderParams} [params]
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<QbankColumnsortorderSetColumnbankOrderReturns>>}
     */
    qbank_columnsortorder_set_columnbank_order(params?: QbankColumnsortorderSetColumnbankOrderParams, method?: HttpMethod): Promise<MoodleResponse<QbankColumnsortorderSetColumnbankOrderReturns>>;
    /**
     * Hidden Columns
     *
     * @param {QbankColumnsortorderSetHiddenColumnsParams} [params]
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<QbankColumnsortorderSetHiddenColumnsReturns>>}
     */
    qbank_columnsortorder_set_hidden_columns(params?: QbankColumnsortorderSetHiddenColumnsParams, method?: HttpMethod): Promise<MoodleResponse<QbankColumnsortorderSetHiddenColumnsReturns>>;
    /**
     * Column size
     *
     * @param {QbankColumnsortorderSetColumnSizeParams} [params]
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<QbankColumnsortorderSetColumnSizeReturns>>}
     */
    qbank_columnsortorder_set_column_size(params?: QbankColumnsortorderSetColumnSizeParams, method?: HttpMethod): Promise<MoodleResponse<QbankColumnsortorderSetColumnSizeReturns>>;
    /**
     * Update the question status.
     *
     * @param {QbankEditquestionSetStatusParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<QbankEditquestionSetStatusReturns>>}
     */
    qbank_editquestion_set_status(params: QbankEditquestionSetStatusParams, method?: HttpMethod): Promise<MoodleResponse<QbankEditquestionSetStatusReturns>>;
    /**
     * Move a question category
     *
     * @param {QbankManagecategoriesMoveCategoryParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<QbankManagecategoriesMoveCategoryReturns>>} - Category state updates
     */
    qbank_managecategories_move_category(params: QbankManagecategoriesMoveCategoryParams, method?: HttpMethod): Promise<MoodleResponse<QbankManagecategoriesMoveCategoryReturns>>;
    /**
     * Update the question tags.
     *
     * @param {QbankTagquestionSubmitTagsFormParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<QbankTagquestionSubmitTagsFormReturns>>}
     */
    qbank_tagquestion_submit_tags_form(params: QbankTagquestionSubmitTagsFormParams, method?: HttpMethod): Promise<MoodleResponse<QbankTagquestionSubmitTagsFormReturns>>;
    /**
     * Sets the preference for displaying and formatting the question text
     *
     * @param {QbankViewquestiontextSetQuestionTextFormatParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<QbankViewquestiontextSetQuestionTextFormatReturns>>}
     */
    qbank_viewquestiontext_set_question_text_format(params: QbankViewquestiontextSetQuestionTextFormatParams, method?: HttpMethod): Promise<MoodleResponse<QbankViewquestiontextSetQuestionTextFormatReturns>>;
    /**
     * Load the data for the competency report in a course.
     *
     * @param {ReportCompetencyDataForReportParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ReportCompetencyDataForReportReturns>>}
     */
    report_competency_data_for_report(params: ReportCompetencyDataForReportParams, method?: HttpMethod): Promise<MoodleResponse<ReportCompetencyDataForReportReturns>>;
    /**
     * Flags the prediction as not useful.
     *
     * @param {ReportInsightsSetNotusefulPredictionParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ReportInsightsSetNotusefulPredictionReturns>>}
     */
    report_insights_set_notuseful_prediction(params: ReportInsightsSetNotusefulPredictionParams, method?: HttpMethod): Promise<MoodleResponse<ReportInsightsSetNotusefulPredictionReturns>>;
    /**
     * Flags a prediction as fixed.
     *
     * @param {ReportInsightsSetFixedPredictionParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ReportInsightsSetFixedPredictionReturns>>}
     */
    report_insights_set_fixed_prediction(params: ReportInsightsSetFixedPredictionParams, method?: HttpMethod): Promise<MoodleResponse<ReportInsightsSetFixedPredictionReturns>>;
    /**
     * Stores an action executed over a group of predictions.
     *
     * @param {ReportInsightsActionExecutedParams} params
     * @param {HttpMethod} [method] - Optional HTTP method override ('GET' | 'POST')
     * @returns {Promise<MoodleResponse<ReportInsightsActionExecutedReturns>>}
     */
    report_insights_action_executed(params: ReportInsightsActionExecutedParams, method?: HttpMethod): Promise<MoodleResponse<ReportInsightsActionExecutedReturns>>;
}

declare module "@didactika/moodle-client" {
    interface MoodleClient extends GeneratedMoodleServices {}
}
