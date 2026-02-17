namespace $.$$ {
	export class $bog_formigo_filler_step extends $.$bog_formigo_filler_step {
		get_field() {
			return this.field_def() as $bog_formigo_field_def | null
		}

		@$mol_mem
		override label() {
			return this.get_field()?.Label()?.val() ?? ''
		}

		@$mol_mem
		override hint() {
			return this.get_field()?.Hint()?.val() ?? ''
		}

		@$mol_mem
		override required_text() {
			return this.get_field()?.Required()?.val() ? 'Required' : ''
		}

		@$mol_mem
		field_type() {
			return this.get_field()?.Type()?.val() ?? 'str'
		}

		@$mol_mem
		override enum_options() {
			const opts = this.get_field()?.Options()?.items() ?? []
			const dict: Record<string, string> = {}
			for (const opt of opts) {
				if (opt) dict[opt] = opt
			}
			return dict
		}

		override number_value(next?: number) {
			if (next !== undefined) {
				this.value(String(next))
			}
			const v = this.value()
			return v ? Number(v) : NaN
		}

		override file_items(next?: string[]) {
			if (next !== undefined) {
				this.value(next.join(','))
			}
			const v = this.value()
			return v ? v.split(',') : []
		}

		@$mol_mem
		override suggestion_text() {
			const s = this.ai_suggestion()
			return s ? `AI: ${s}` : ''
		}

		@$mol_action
		override apply_click() {
			this.value(this.ai_suggestion())
		}

		@$mol_mem
		input_widget() {
			switch (this.field_type()) {
				case 'text':
					return this.Textarea_input()
				case 'int':
				case 'real':
					return this.Number_input()
				case 'bool':
					return this.Check_input()
				case 'enum':
					return this.Select_input()
				case 'date':
					return this.Date_input()
				case 'file':
					return this.File_input()
				default:
					return this.String_input()
			}
		}

		@$mol_mem
		override content() {
			const rows: any[] = [this.Label()]

			if (this.required_text()) {
				rows.push(this.Required_badge())
			}

			rows.push(this.input_widget())

			if (this.ai_suggestion()) {
				rows.push(this.Suggestion())
			}

			return rows
		}
	}
}
