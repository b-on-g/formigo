namespace $.$$ {

	export class $bog_formigo_builder_field extends $.$bog_formigo_builder_field {

		@ $mol_mem
		override required_mark() {
			return this.field_required() ? '*' : ''
		}

		@ $mol_action
		override select_click() {
			this.field_select(this.field_index())
		}

		@ $mol_action
		override remove_click() {
			this.field_remove(this.field_index())
		}

	}

}
