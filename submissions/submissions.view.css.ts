namespace $.$$ {

	$mol_style_define($bog_formigo_submissions, {

		body: {
			padding: $mol_gap.block,
		},

		Submission_card: {
			flex: {
				direction: 'row',
			},
			padding: $mol_gap.block,
			margin: {
				bottom: '.25rem',
			},
			background: {
				color: $mol_theme.card,
			},
			border: {
				radius: $mol_gap.round,
			},
			gap: '1rem',
			align: {
				items: 'center',
			},
		},

		Card_respondent: {
			flex: {
				grow: 1,
			},
			font: {
				weight: 'bold',
			},
		},

		Card_status: {
			font: {
				size: '.8rem',
			},
			opacity: .6,
		},

		Card_date: {
			font: {
				size: '.8rem',
			},
			opacity: .5,
		},

	})

}
