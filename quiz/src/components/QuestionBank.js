// QuestionBank.js
//id 1-6 is default type
//id 7 is special type
const qBank = [
	{
		id: 1,
		question: "Az életkor a születéstől a jelen pillanatig eltelt idő, mert az élettartam a születéstől a halálig tart.",
		options: ["Az állítás igaz és az indoklás is igaz; közöttük ok-okozati összefüggés van.", "Az állítás igaz és az indoklás is igaz, de közöttük nincs ok-okozati összefüggés.", "Az állítás igaz, de az indoklás hamis.", "Az állítás hamis, de az indoklás önmagában igaz.", "Az állítás hamis és az indoklás is hamis."],
		answer: "Az állítás igaz és az indoklás is igaz, de közöttük nincs ok-okozati összefüggés.",
		type: "default"
	},
	{
		id: 2,
		question: "a csontok növekedését biztosítja",
		options: ["periosteum", "epiphysis porckorong", "mindkettő", "egyik sem"],
		answer: "mindkettő",
		type: "default"
	},
	{
		id: 3,
		question: "minden gyógyszer teratogén ágensnek számít, károsítja a magzatot",
		options: ["Igaz", "Hamis"],
		answer: "Igaz",
		type: "default"
	},
	{
		id: 4,
		question: "A hypophysis elülső lebenyében termelődő hormonok:",
		options: ["oxytocin", "prolactin", "ADH", "ACTH"],
		specialoptions: ["Az 1,2,3 -as válasz a helyes", "Az 1 és 3-as válasz a helyes.", "A 2 és 4-es válasz a helyes", "Csak a 4-es válasz a helyes", "Mindegyik válasz helyes"],
		answer: "A 2 és 4-es válasz a helyes",
		type: "special"
	},
	{
    id: 5,
		question: "Mikor lesz egy neurit által ellátott izom működése differenciáltabb, finomabb?",
		options: [
			"ha a neurit hosszú",
			"ha a neurit vastag",
			"ha a neurit sok ágra válik",
			"ha a neurit rövid",
			"ha a neurit kevés ágra válik"
		],
		answer: "ha a neurit kevés ágra válik",
		type: "default"
	},
	{
		id: 6,
		question: "A costovertebralis és costotransversalis ízület közös mozgástengelye:",
		options: ["a borda fején és nyakán halad keresztül", "az alsó bordáknál a szagittális síkhoz közelít", "a felső bordáknál a frontális síkhoz közelít", "minden bordánál a frontális és szagittális sík között 45°-ban van"],
		answer: "minden bordánál a frontális és szagittális sík között 45°-ban van",
		type: "hamis"
	},
	
]

export default qBank;
