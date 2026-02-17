namespace $ {

	/** Workspace — company/brand settings */
	export class $bog_formigo_workspace extends $giper_baza_entity.with({
		Hue: $giper_baza_atom_real,
		Tier: $giper_baza_atom_text,
		Templates: $giper_baza_list_link_to(() => $bog_formigo_template),
	}, 'Workspace') {}

	/** Form template — schema of a questionnaire */
	export class $bog_formigo_template extends $giper_baza_entity.with({
		Description: $giper_baza_atom_text,
		Fields: $giper_baza_list_link_to(() => $bog_formigo_field_def),
		Submissions: $giper_baza_list_link_to(() => $bog_formigo_submission),
		Published: $giper_baza_atom_bool,
		Created: $giper_baza_atom_time,
	}, 'Template') {}

	/** Field definition — single question in a form */
	export class $bog_formigo_field_def extends $giper_baza_dict.with({
		Label: $giper_baza_atom_text,
		Type: $giper_baza_atom_text,
		Hint: $giper_baza_atom_text,
		Required: $giper_baza_atom_bool,
		Options: $giper_baza_list_str,
		Ai_key: $giper_baza_atom_text,
		Section: $giper_baza_atom_text,
		Order: $giper_baza_atom_real,
	}, 'FieldDef') {}

	/** Submission — filled form */
	export class $bog_formigo_submission extends $giper_baza_entity.with({
		Template: $giper_baza_atom_link_to(() => $bog_formigo_template),
		Status: $giper_baza_atom_text,
		Created: $giper_baza_atom_time,
		Respondent: $giper_baza_atom_text,
		Documents: $giper_baza_list_link_to(() => $bog_formigo_document),
	}, 'Submission') {

		/** Get value for a field key */
		field_value(key: string, next?: string) {
			return this.dive('val:' + key, $giper_baza_atom_text, next)?.val(next) ?? ''
		}

	}

	/** Uploaded document for AI extraction */
	export class $bog_formigo_document extends $giper_baza_dict.with({
		Title: $giper_baza_atom_text,
		Data_uri: $giper_baza_atom_text,
		Extracted: $giper_baza_atom_text,
		Doc_type: $giper_baza_atom_text,
	}, 'Document') {}

}
