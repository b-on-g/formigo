namespace $.$$ {
	export class $bog_formigo_dashboard extends $.$bog_formigo_dashboard {
		@$mol_mem
		templates() {
			return this.workspace().Templates()?.remote_list() ?? []
		}

		@$mol_mem
		override template_rows() {
			const templates = this.templates()
			if (!templates.length) return [this.Empty()]
			return templates.map((_, i) => this.Template_card(i))
		}

		template_title(index: number) {
			return this.templates()[index]?.title() || 'Untitled Form'
		}

		template_description(index: number) {
			return this.templates()[index]?.Description()?.val() || ''
		}

		template_submissions_count(index: number) {
			return this.templates()[index]?.Submissions()?.remote_list()?.length ?? 0
		}

		template_published(index: number) {
			return this.templates()[index]?.Published()?.val() ?? false
		}

		template_link(index: number) {
			return this.templates()[index]?.link().str ?? ''
		}

		@$mol_action
		override add_template() {
			const land = this.$.$giper_baza_glob.land_grab([[null, this.$.$giper_baza_rank_read]])
			const template = land.Data($bog_formigo_template)
			template.title('New Form')
			template.Created(null)!.val(new $mol_time_moment())
			this.workspace().Templates(null)!.remote_add(template)
			this.template_select(template.link().str)
		}
	}

	export class $bog_formigo_dashboard_card extends $.$bog_formigo_dashboard_card {
		@$mol_mem
		override title() {
			return this.template_title()
		}

		@$mol_mem
		override status_text() {
			const count = this.submissions_count()
			const pub = this.published() ? 'Published' : 'Draft'
			return `${pub} · ${count} submission${count !== 1 ? 's' : ''}`
		}
	}
}
