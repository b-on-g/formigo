namespace $.$$ {
	export class $bog_formigo_app extends $.$bog_formigo_app {
		@$mol_mem
		override workspace() {
			return this.$.$giper_baza_glob.home($bog_formigo_workspace as any) as $bog_formigo_workspace
		}

		@$mol_mem
		override spread() {
			const template_id = this.$.$mol_state_arg.value('template')
			if (template_id) {
				return [this.menu_page(), this.builder_page(template_id)]
			}

			const fill_id = this.$.$mol_state_arg.value('fill')
			if (fill_id) {
				return [this.filler_page(fill_id), this.ai_panel()]
			}

			const submissions_id = this.$.$mol_state_arg.value('submissions')
			if (submissions_id) {
				return [this.menu_page(), this.submissions_page(submissions_id)]
			}

			const detail_id = this.$.$mol_state_arg.value('submission')
			if (detail_id) {
				return [this.menu_page(), this.detail_page(detail_id)]
			}

			const settings = this.$.$mol_state_arg.value('settings')
			if (settings) {
				return [this.menu_page(), this.settings_page()]
			}

			return [this.menu_page()]
		}

		override template_select(id: string) {
			this.$.$mol_state_arg.value('template', id)
		}

		override template(id: string) {
			const link = new this.$.$giper_baza_link(id)
			return this.$.$giper_baza_glob.Pawn(link, $bog_formigo_template)
		}

		@$mol_mem_key
		override submission(id: string) {
			const template = this.template(id)
			const subs = template.Submissions(null)!
			const sub = subs.make(null)
			sub.Template(null)!.vary(template.link())
			sub.Status(null)!.val('draft')
			sub.Created(null)!.val(new $mol_time_moment())
			return sub
		}

		override detail_submission(id: string) {
			const link = new this.$.$giper_baza_link(id)
			return this.$.$giper_baza_glob.Pawn(link, $bog_formigo_submission)
		}

		@$mol_action
		override ai_apply_all() {
			const fill_id = this.$.$mol_state_arg.value('fill')
			if (!fill_id) return

			const extracted = this.ai_extracted() as Record<string, string>
			const template = this.template(fill_id)
			const submission = this.submission(fill_id)
			const fields = template.Fields()?.remote_list() ?? []

			for (const field of fields) {
				const ai_key = field.Ai_key()?.val() ?? ''
				if (ai_key && extracted[ai_key]) {
					submission.field_value(field.link().str, extracted[ai_key])
				}
			}
		}
	}
}
