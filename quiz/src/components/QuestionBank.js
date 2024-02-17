// QuestionBank.js
//id 1-6 is default type
//id 7 is special type
const qBank = [
	{
		id: 1,
		question: "What is the capital of Haryana?",
		options: ["Yamunanagar", "Panipat", "Gurgaon", "Chandigarh"],
		answer: "Chandigarh",
		type: "default"
	},
	{
		id: 2,
		question: "What is the capital of Punjab?",
		options: ["Patiala", "Ludhiana", "Amritsar", "Chandigarh"],
		answer: "Chandigarh",
		type: "default"
	},
	{
		id: 3,
		question: "What is the capital of India?",
		options: ["Delhi", "Mumbai", "Kolkata", "Chennai"],
		answer: "Delhi",
		type: "default"
	},
	{
		id: 4,
		question: "What is the capital of Uttarakhad?",
		options: ["Roorkee", "Haridwar", "Dehradun", "Nanital"],
		answer: "Dehradun",
		type: "default"
	},
	{
		id: 5,
		question: "What is capital of Uttar Pradesh?",
		options: ["GB Nagar", "Lucknow", "Prayagraj", "Agra"],
		answer: "Lucknow",
		type: "default"
	},
	{
		id: 6,
		question: "minden gyógyszer teratogén ágensnek számít, károsítja a magzatot",
		options: ["Igaz", "Hamis"],
		answer: "Igaz",
		type: "default"
	},
	{
		id: 7,
		question: "A hypophysis elülső lebenyében termelődő hormonok:",
		options: ["oxytocin", "prolactin", "ADH", "ACTH"],
		specialoptions: ["Az 1,2,3 -as válasz a helyes", "Az 1 és 3-as válasz a helyes.", "A 2 és 4-es válasz a helyes", "Csak a 4-es válasz a helyes", "Mindegyik válasz helyes"],
		answer: "A 2 és 4-es válasz a helyes",
		type: "special"
	},
	{
    id: 8, // Assuming the last question in your question bank has an id of 1, so adding +1
    question: "Mikor lesz egy neurit által ellátott izom működése differenciáltabb, finomabb?",
    options: [
        "ha a neurit hosszú",
        "ha a neurit vastag",
        "ha a neurit sok ágra válik",
        "ha a neurit rövid",
        "ha a neurit kevés ágra válik"
    ],
    answer: "ha a neurit kevés ágra válik", // Left blank as per your instruction
    type: "default"
	},
	{
		id: 9,
		question: "Holnap milyen nap lesz?",
		options: ["Napsütéses", "Vasárnap", "Hétfő", "18-a"],
		answer: "Hétfő",
		type: "hamis"
	},
	
]

export default qBank;
