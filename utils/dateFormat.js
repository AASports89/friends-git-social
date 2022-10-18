//********************* FORMAT DATE/TIME STAMP **********************//
	module.exports = {
		format_date: (date) => {
			return date.toLocaleDateString("en-US", {
				year: "numeric",
				month: "long",
				day: "numeric",
				hour: "numeric",
				minute: "numeric",
			});
		},
	};