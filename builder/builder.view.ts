namespace $.$$ {

	export class $bog_formigo_builder extends $.$bog_formigo_builder {

		@ $mol_mem
		fields() {
			return this.template().Fields()?.remote_list() ?? []
		}

		@ $mol_mem
		override form_title() {
			return this.template().title() || 'Untitled Form'
		}

		override form_title_edit(next?: string) {
			if (next !== undefined) {
				this.template().title(next)
			}
			return this.template().title() || ''
		}

		override description(next?: string) {
			if (next !== undefined) {
				this.template().Description(next)!.val(next)
			}
			return this.template().Description()?.val() ?? ''
		}

		override published(next?: boolean) {
			if (next !== undefined) {
				this.template().Published(next)!.val(next)
			}
			return this.template().Published()?.val() ?? false
		}

		@ $mol_mem
		override template_link() {
			return this.template().link().str
		}

		@ $mol_mem
		override field_rows() {
			return this.fields().map((_, i) => this.Field_row(i))
		}

		field_label(index: number) {
			return this.fields()[index]?.Label()?.val() ?? 'Untitled Field'
		}

		field_type(index: number) {
			return this.fields()[index]?.Type()?.val() ?? 'str'
		}

		field_required(index: number) {
			return this.fields()[index]?.Required()?.val() ?? false
		}

		@ $mol_action
		field_select(index: number) {
			this.selected(index)
		}

		@ $mol_action
		field_remove(index: number) {
			const fields = this.template().Fields()!
			const field = this.fields()[index]
			if (field) {
				fields.cut(field.link())
			}
		}

		@ $mol_action
		override add_field() {
			const fields = this.template().Fields(null)!
			const field = fields.make(null)
			field.Label(null)!.val('New Field')
			field.Type(null)!.val('str')
			field.Order(null)!.val(this.fields().length)
		}

		@ $mol_mem
		override selected_field(): $bog_formigo_field_def | null {
			const sel = this.selected()
			if (sel === null || sel === undefined) return null
			return this.fields()[sel as number] ?? null
		}

	}

}
