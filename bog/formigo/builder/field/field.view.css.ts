namespace $.$$ {

	$mol_style_define($bog_formigo_builder_field, {

		flex: {
			direction: 'row',
		},
		align: {
			items: 'center',
		},
		padding: $mol_gap.text,
		gap: '.5rem',
		background: {
			color: $mol_theme.card,
		},
		border: {
			radius: $mol_gap.round,
		},
		margin: {
			bottom: '.25rem',
		},
		cursor: 'pointer',

		Drag_icon: {
			opacity: .4,
			cursor: 'grab',
		},

		Required_mark: {
			color: $mol_theme.special,
			font: {
				weight: 'bold',
			},
		},

		Label: {
			flex: {
				grow: 1,
			},
		},

		Type_badge: {
			opacity: .5,
			font: {
				size: '.75rem',
			},
		},

	})

}
