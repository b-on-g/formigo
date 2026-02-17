namespace $.$$ {

	export class $bog_formigo_submissions_detail extends $.$bog_formigo_submissions_detail {

		@ $mol_mem
		template() {
			return this.submission().Template()?.remote() ?? null
		}

		@ $mol_mem
		fields() {
			return this.template()?.Fields()?.remote_list() ?? []
		}

		@ $mol_mem
		override respondent() {
			return this.submission().Respondent()?.val() || 'Anonymous'
		}

		@ $mol_mem
		override status() {
			return this.submission().Status()?.val() || 'draft'
		}

		@ $mol_mem
		override date_text() {
			const time = this.submission().Created()?.val()
			return time?.toString('YYYY-MM-DD HH:mm') ?? ''
		}

		@ $mol_mem
		override info_rows() {
			return [
				this.Respondent_label(),
				this.Status_label(),
				this.Date_label(),
			]
		}

		@ $mol_mem
		override field_rows() {
			return this.fields().map((_, i) => this.Field_row(i))
		}

		override field_label(index: number) {
			return this.fields()[index]?.Label()?.val() ?? ''
		}

		override field_value(index: number) {
			const field = this.fields()[index]
			if (!field) return ''
			return this.submission().field_value(field.link().str)
		}

		@ $mol_mem
		override export_name() {
			const title = this.template()?.title() || 'form'
			return `${title}.doc`
		}

		@ $mol_mem
		override export_blob() {
			const items = this.fields().map((field, i) => ({
				label: this.field_label(i),
				value: this.field_value(i),
			}))

			const workspace_name = this.workspace().title() || 'Formigo'
			const title = this.template()?.title() || 'Form'

			return $bog_formigo_export_doc(title, workspace_name, items)
		}

	}

}
