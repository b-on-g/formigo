namespace $.$$ {

	const ai_key_labels: Record<string, string> = {
		full_name: 'Full Name',
		first_name: 'First Name',
		last_name: 'Last Name',
		date_of_birth: 'Date of Birth',
		nationality: 'Nationality',
		passport_number: 'Passport Number',
		id_number: 'ID Number',
		address: 'Address',
		city: 'City',
		postal_code: 'Postal Code',
		country: 'Country',
		phone: 'Phone',
		email: 'Email',
		company: 'Company',
	}

	export class $bog_formigo_ai extends $.$bog_formigo_ai {

		@ $mol_mem
		override content() {
			const rows: any[] = [
				this.Title(),
				this.Docs(),
				this.Extract(),
			]

			const extracted = this.extracted()
			const keys = Object.keys(extracted as any)

			if (keys.length) {
				rows.push(this.Results())
				rows.push(this.Apply_all())
			}

			return rows
		}

		@ $mol_mem
		override result_rows() {
			const extracted = this.extracted() as Record<string, string>
			return Object.keys(extracted).map((_, i) => this.Result_row(i))
		}

		@ $mol_mem
		extracted_entries() {
			const extracted = this.extracted() as Record<string, string>
			return Object.entries(extracted)
		}

		override result_key(index: number) {
			const entries = this.extracted_entries()
			const key = entries[index]?.[0] ?? ''
			return ai_key_labels[key] ?? key
		}

		override result_val(index: number) {
			const entries = this.extracted_entries()
			return entries[index]?.[1] ?? ''
		}

		@ $mol_action
		override extract() {
			const docs = this.doc_items()
			if (!docs.length) return

			const model = this.Model().fork()

			const chunks: any[] = [...docs, 'Extract all personal data from this document.']
			model.ask(chunks)

			try {
				const resp = model.response()
				if (resp && typeof resp === 'object') {
					this.extracted(resp as any)
				}
			} catch (error: any) {
				if ($mol_promise_like(error)) $mol_fail_hidden(error)
				$mol_fail_log(error)
			}
		}

		@ $mol_action
		override apply_all() {
			// Parent component should override this
		}

	}

}
