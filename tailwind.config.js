module.exports = {
	content: ["./public/*.html"],
	theme: {
		extend: {
			colors: {
				NeutralColor: " hsl(0, 0%, 59%)",
				PrimaryColor: " hsl(0, 0%, 17%)",
			},
			screens: {
				laptop: "1250px",
				tablet: { min: "520px", max: "767px" },
			},
			fontFamily: {
				Rubik: ["Rubik", "sans-serif"],
			},
		},
	},
	plugins: [],
};
