//********************* FORMAT DATE/TIME STAMP **********************//
module.exports = {
	formatDate: (date) => {
		const options = {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
			hour: 'numeric',
			minute: 'numeric',
		};
		return new Date(date).toLocaleDateString('us-en', options);
	},
};