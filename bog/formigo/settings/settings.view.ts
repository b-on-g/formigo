namespace $.$$ {

	export class $bog_formigo_settings extends $.$bog_formigo_settings {

		override company_name(next?: string) {
			if (next !== undefined) {
				this.workspace().title(next)
			}
			return this.workspace().title() || ''
		}

		override hue(next?: number) {
			if (next !== undefined && !isNaN(next)) {
				this.workspace().Hue(next)!.val(next)
			}
			return this.workspace().Hue()?.val() ?? 210
		}

		@ $mol_mem
		override hue_preview_text() {
			const h = this.hue()
			return `Preview: hue ${h}deg`
		}

		@ $mol_mem
		override auth_key_text() {
			try {
				return this.$.$giper_baza_auth.current().pass().lord().str
			} catch {
				return 'Not available'
			}
		}

	}

}
