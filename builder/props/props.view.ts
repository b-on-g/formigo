namespace $.$$ {
	export class $bog_formigo_builder_props extends $.$bog_formigo_builder_props {
		@$mol_mem
		override form_rows() {
			const field = this.field() as $bog_formigo_field_def | null
			if (!field) return [this.No_field()]

			const rows: any[] = [
				this.Label_field(),
				this.Type_field(),
				this.Hint_field(),
				this.Required_field(),
				this.Ai_key_field(),
				this.Section_field(),
			]

			if (this.type() === 'enum') {
				rows.splice(2, 0, this.Options_field())
			}

			return rows
		}

		get_field() {
			return this.field() as $bog_formigo_field_def | null
		}

		override label(next?: string) {
			const f = this.get_field()
			if (!f) return ''
			if (next !== undefined) f.Label(next)!.val(next)
			return f.Label()?.val() ?? ''
		}

		override type(next?: string) {
			const f = this.get_field()
			if (!f) return 'str'
			if (next !== undefined) f.Type(next)!.val(next)
			return f.Type()?.val() ?? 'str'
		}

		override hint(next?: string) {
			const f = this.get_field()
			if (!f) return ''
			if (next !== undefined) f.Hint(next)!.val(next)
			return f.Hint()?.val() ?? ''
		}

		override required(next?: boolean) {
			const f = this.get_field()
			if (!f) return false
			if (next !== undefined) f.Required(next)!.val(next)
			return f.Required()?.val() ?? false
		}

		override ai_key(next?: string) {
			const f = this.get_field()
			if (!f) return 'none'
			if (next !== undefined) {
				const val = next === 'none' ? '' : next
				f.Ai_key(val)!.val(val)
			}
			return f.Ai_key()?.val() || 'none'
		}

		override options_text(next?: string) {
			const f = this.get_field()
			if (!f) return ''
			if (next !== undefined) {
				const opts = next.split('\n').filter(Boolean)
				f.Options(next)!.items(opts)
			}
			return (f.Options()?.items() ?? []).join('\n')
		}

		override section(next?: string) {
			const f = this.get_field()
			if (!f) return ''
			if (next !== undefined) f.Section(next)!.val(next)
			return f.Section()?.val() ?? ''
		}
	}
}
