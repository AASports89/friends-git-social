//********************* FORMAT DATE/TIME STAMP **********************//
	module.exports = {
		formatDate: (date) => {
			return date.toLocaleDateString("en-US", {
				year: "numeric",
				month: "long",
				day: "numeric",
				hour: "numeric",
				minute: "numeric",
			});
		},
	};