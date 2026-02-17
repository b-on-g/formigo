namespace $.$$ {
	export class $bog_formigo_submissions extends $.$bog_formigo_submissions {
		@$mol_mem
		submissions() {
			return this.template().Submissions()?.remote_list() ?? []
		}

		@$mol_mem
		override template_link() {
			return this.template().link().str
		}

		@$mol_mem
		override page_title() {
			const name = this.template().title() || 'Form'
			return `${name} — Submissions`
		}

		@$mol_mem
		override submission_rows() {
			const subs = this.submissions()
			if (!subs.length) return [this.Empty()]
			return subs.map((_: any, i: number) => this.Submission_card(i))
		}

		override submission_link(index: number) {
			return this.submissions()[index]?.link().str ?? ''
		}

		override submission_respondent(index: number) {
			return this.submissions()[index]?.Respondent()?.val() || 'Anonymous'
		}

		override submission_status(index: number) {
			return this.submissions()[index]?.Status()?.val() || 'draft'
		}

		override submission_date(index: number) {
			const time = this.submissions()[index]?.Created()?.val()
			return time?.toString('YYYY-MM-DD') ?? ''
		}
	}
}
