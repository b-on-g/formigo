namespace $.$$ {

	export class $bog_formigo_filler extends $.$bog_formigo_filler {

		@ $mol_mem
		fields() {
			return this.template().Fields()?.remote_list() ?? []
		}

		@ $mol_mem
		override form_title() {
			return this.template().title() || 'Form'
		}

		@ $mol_mem
		total_steps() {
			return this.fields().length
		}

		@ $mol_mem
		override progress_text() {
			const current = Math.min(this.current_step() + 1, this.total_steps())
			return `${current} / ${this.total_steps()}`
		}

		@ $mol_mem
		override step_counter_text() {
			return this.progress_text()
		}

		@ $mol_mem
		override step_rows() {
			const step = this.current_step()
			if (step >= this.total_steps()) return [this.Review()]
			return [this.Step(step)]
		}

		@ $mol_mem_key
		override step_field(index: number) {
			return this.fields()[index] ?? null
		}

		@ $mol_mem_key
		override step_value(index: number, next?: string) {
			const field = this.fields()[index]
			if (!field) return ''
			const key = field.link().str
			if (next !== undefined) {
				this.submission().field_value(key, next)
			}
			return this.submission().field_value(key) ?? ''
		}

		@ $mol_mem_key
		override step_ai_suggestion(index: number) {
			const field = this.fields()[index]
			if (!field) return ''
			const ai_key = field.Ai_key()?.val() ?? ''
			if (!ai_key) return ''
			const suggestions = this.ai_suggestions() as Record<string, string>
			return suggestions[ai_key] ?? ''
		}

		override apply_suggestion(index: number) {
			const suggestion = this.step_ai_suggestion(index)
			if (suggestion) {
				this.step_value(index, suggestion)
			}
		}

		@ $mol_mem
		override next_title() {
			if (this.current_step() >= this.total_steps() - 1) return 'Submit'
			return super.next_title()
		}

		@ $mol_action
		override next() {
			const step = this.current_step()

			if (step >= this.total_steps() - 1) {
				this.submit_form()
				return
			}

			// Validate required
			const field = this.fields()[step]
			if (field?.Required()?.val() && !this.step_value(step)) {
				return // don't advance if required field is empty
			}

			this.current_step(step + 1)
		}

		@ $mol_action
		override back() {
			const step = this.current_step()
			if (step > 0) this.current_step(step - 1)
		}

		@ $mol_action
		submit_form() {
			this.submission().Status(null)!.val('complete')
			this.submission().Created(null)!.val(new $mol_time_moment())
		}

		@ $mol_mem
		Review() {
			return this.Review_page()
		}

	}

}
