// src/data/sampleJournalData.js

// Import sample images (adjust paths as needed)
import HappyIMG from "../assets/bgtheme/Happy.png";
import SadIMG from "../assets/bgtheme/Sad.png";
import AngryIMG from "../assets/bgtheme/Angry.png";
import StressedIMG from "../assets/bgtheme/Stressed.png";
import JoyfulIMG from "../assets/bgtheme/Joyful.png";
import NeutralIMG from "../assets/bgtheme/Neutral.png";
import TiredIMG from "../assets/bgtheme/Tired.png";
import DefaultIMG from "../assets/bgtheme/resj-logo.png"; // Fallback

export const defaultMoodImages = {
	"😊": HappyIMG,
	"😔": SadIMG,
	"😠": AngryIMG,
	"😴": TiredIMG,
	"😄": JoyfulIMG,
	"😐": NeutralIMG,
	"😩": StressedIMG,
	default: DefaultIMG,
};

// export const sampleJournalEntries = [];

// --- Utility to get simplified media type ---
// (You might have a better way to handle this based on actual data/uploads)
const getMediaType = (mimeType) => {
	if (!mimeType) return "unknown";
	if (mimeType.startsWith("image/")) return "image";
	if (mimeType.startsWith("video/")) return "video";
	if (mimeType.startsWith("audio/")) return "audio";
	return "unknown";
};

export const sampleJournalEntries = [
	{
		id: 1,
		title: "Great Day at the Park",
		body: "Spent the afternoon at the park with friends. The weather was perfect, and we had a lot of fun playing frisbee.",
		date: "2023-10-26",
		mood: "😊", // Happy
		goal: "Spend more time outdoors",
		affirmation: "I embrace joy and connection with others.",
		reflection: {
			question: "What moment today brought the most happiness?",
			answer:
				"Definitely playing frisbee. It felt great to be active and laughing with friends in the sunshine.",
		},
		weather: {
			temperatureC: 22,
			temperatureF: 72,
			condition: "Sunny",
			location: "Central Park, Anytown",
		},
		quote: {
			q: "Keep your face always toward the sunshine, and shadows will fall behind you.",
			a: "Walt Whitman",
		},
		media: [],
	},
	{
		id: 2,
		title: "Productive Work Session",
		body: "Managed to finish the big report ahead of schedule. Feeling accomplished and relieved. Rewarded myself with some nice coffee.",
		date: "2023-10-25",
		mood: "😄", // Joyful
		goal: null,
		affirmation: "I am capable and productive.",
		reflection: {
			question: "How did accomplishing this task make me feel?",
			answer:
				"Really proud and relieved. It took a lot of focus, but getting it done early feels like a weight lifted.",
		},
		weather: {
			temperatureC: 18,
			temperatureF: 64,
			condition: "Partly Cloudy",
			location: "Work Office, Downtown",
		},
		quote: {
			q: "The key is not to prioritize what's on your schedule, but to schedule your priorities.",
			a: "Stephen Covey",
		},
		media: [
			{ type: "image", url: JoyfulIMG, alt: "Feeling Accomplished - Coffee" },
		],
	},
	{
		id: 3,
		title: "Feeling a Bit Down",
		body: "Woke up feeling tired and unmotivated. Tried to push through but struggled. Maybe need some rest.",
		date: "2023-10-24",
		mood: "😔", // Sad
		goal: "Prioritize sleep tonight",
		affirmation: "It's okay to rest and recharge.",
		reflection: {
			question: "What can I do tomorrow to be kinder to myself?",
			answer:
				"Allow myself to sleep in a little, maybe have a quiet morning with tea instead of rushing.",
		},
		weather: {
			temperatureC: 15,
			temperatureF: 59,
			condition: "Rainy",
			location: "Home",
		},
		quote: {
			q: "Tough times never last, but tough people do.",
			a: "Robert H. Schuller",
		},
		media: [],
	},
	{
		id: 4,
		title: "Frustrating Commute",
		body: "Traffic was terrible today, got stuck for over an hour. Made me late for my morning meeting. Need to find a better route or leave earlier.",
		date: "2023-10-23",
		mood: "😠", // Angry
		goal: "Check traffic app before leaving",
		affirmation: "I can handle frustrating situations calmly.",
		reflection: {
			question: "What is within my control regarding my commute?",
			answer:
				"Leaving earlier, checking traffic apps, trying a different route, or maybe even listening to a calming podcast during the drive.",
		},
		weather: {
			temperatureC: 19,
			temperatureF: 66,
			condition: "Overcast",
			location: "Highway 101",
		},
		quote: {
			q: "For every minute you remain angry, you give up sixty seconds of peace of mind.",
			a: "Ralph Waldo Emerson",
		},
		media: [{ type: "image", url: AngryIMG, alt: "Traffic Jam Frustration" }],
	},
	{
		id: 5,
		title: "Watched a Sad Movie",
		body: "The ending of that movie really got to me. Felt quite emotional afterwards. It was a good story though.",
		date: "2023-10-22",
		mood: "😩", // Stressed/Tearful
		goal: null,
		affirmation: "It's okay to feel my emotions.",
		reflection: {
			question: "What did the story make me reflect on?",
			answer:
				"It made me think about loss and the importance of cherishing moments with loved ones. Very moving.",
		},
		weather: {
			temperatureC: 16,
			temperatureF: 61,
			condition: "Showers",
			location: "Living Room",
		},
		quote: {
			q: "Tears come from the heart and not from the brain.",
			a: "Leonardo da Vinci",
		},
		media: [{ type: "image", url: StressedIMG, alt: "Emotional Movie Night" }],
	},
	{
		id: 6,
		title: "Lovely Dinner",
		body: "Tried a new restaurant downtown. The food was delicious and the ambiance was great. A perfect evening out.",
		date: "2023-10-21",
		mood: "😊", // Happy
		goal: "Explore more local restaurants",
		affirmation: "I deserve enjoyable experiences.",
		reflection: {
			question: "What made the dinner special?",
			answer:
				"The combination of amazing food, the cozy atmosphere, and good company. Just a really pleasant and relaxing time.",
		},
		weather: {
			temperatureC: 20,
			temperatureF: 68,
			condition: "Clear",
			location: "La Belle Cuisine, Downtown",
		},
		quote: {
			q: "Laughter is brightest where food is best.",
			a: "Irish Proverb",
		},
		media: [],
	},
	{
		id: 7,
		title: "Weekend Hike",
		body: "Went for a long hike in the mountains. Challenging but rewarding views!",
		date: "2023-10-20",
		mood: "😄", // Joyful
		goal: "Stay active",
		affirmation: "My body is strong and capable.",
		reflection: {
			question: "What was the most rewarding part of the hike?",
			answer:
				"Reaching the summit and seeing the incredible panoramic view. It made the tough climb totally worth it.",
		},
		weather: {
			temperatureC: 17,
			temperatureF: 63,
			condition: "Sunny intervals",
			location: "Mount Beacon Trail",
		},
		quote: {
			q: "The best view comes after the hardest climb.",
			a: "Unknown",
		},
		media: [],
	},
	{
		id: 8,
		title: "Quiet Reading Day",
		body: "Spent the day indoors reading a book. Very relaxing.",
		date: "2023-10-19",
		mood: "😊", // Happy
		goal: null,
		affirmation: "I value quiet moments of peace.",
		reflection: {
			question: "How did this quiet time benefit me?",
			answer:
				"It helped me recharge and get lost in a good story. Felt very calming.",
		},
		weather: {
			temperatureC: 14,
			temperatureF: 57,
			condition: "Cloudy",
			location: "Home Library",
		},
		quote: {
			q: "A room without books is like a body without a soul.",
			a: "Marcus Tullius Cicero",
		},
		media: [],
	},
	{
		id: 9,
		title: "Missed Opportunity",
		body: "Regretting not applying for that job sooner. Feeling a bit sad about it.",
		date: "2023-10-18",
		mood: "😔", // Sad
		goal: "Be more proactive next time",
		affirmation: "I learn from every experience.",
		reflection: {
			question: "What can I learn from this situation?",
			answer:
				"That hesitation can lead to missed chances. I need to act more decisively on opportunities I'm interested in.",
		},
		weather: {
			temperatureC: 16,
			temperatureF: 61,
			condition: "Overcast",
			location: "Home Office",
		},
		quote: {
			q: "Don't dwell on what went wrong. Instead, focus on what to do next.",
			a: "Denis Waitley",
		},
		media: [],
	},
	{
		id: 10,
		title: "Unexpected Compliment",
		body: "Received a nice compliment from a colleague today. Made my day!",
		date: "2023-10-17",
		mood: "😄", // Joyful
		goal: "Share positivity with others",
		affirmation: "I appreciate kindness, both given and received.",
		reflection: {
			question: "How did the compliment affect my mood?",
			answer:
				"It was a lovely surprise and instantly lifted my spirits. Made me feel seen and appreciated.",
		},
		weather: {
			temperatureC: 21,
			temperatureF: 70,
			condition: "Sunny",
			location: "Workplace",
		},
		quote: {
			q: "Kind words can be short and easy to speak, but their echoes are truly endless.",
			a: "Mother Teresa",
		},
		media: [],
	},
	{
		id: 11,
		title: "Planning Vacation",
		body: "Started planning the summer vacation. Exciting!",
		date: "2023-10-16",
		mood: "😊", // Happy
		goal: "Finalize travel dates",
		affirmation: "I look forward to rest and adventure.",
		reflection: {
			question: "What am I most excited about for the vacation?",
			answer:
				"Exploring a new place and disconnecting from the daily routine. Just the thought of it is refreshing.",
		},
		weather: {
			temperatureC: 19,
			temperatureF: 66,
			condition: "Clear",
			location: "Home",
		},
		quote: {
			q: "Travel is the only thing you buy that makes you richer.",
			a: "Unknown",
		},
		media: [],
	},
	{
		id: 12,
		title: "Technical Issues",
		body: "Computer crashed multiple times. Lost some work. Very frustrating.",
		date: "2023-10-15",
		mood: "😠", // Angry
		goal: "Backup work more often",
		affirmation: "I can overcome technical difficulties.",
		reflection: {
			question: "How can I prevent this frustration in the future?",
			answer:
				"Regularly saving my work and maybe looking into cloud backups or auto-save features more seriously.",
		},
		weather: {
			temperatureC: 15,
			temperatureF: 59,
			condition: "Windy",
			location: "Home Office",
		},
		quote: {
			q: "Patience is bitter, but its fruit is sweet.",
			a: "Aristotle",
		},
		media: [],
	},
	{
		id: 13,
		title: "Learned Something New",
		body: "Took an online course and learned a new skill. Feels good.",
		date: "2023-10-14",
		mood: "😄", // Joyful
		goal: "Practice the new skill",
		affirmation: "I am always growing and learning.",
		reflection: {
			question: "Why is learning this new skill important to me?",
			answer:
				"It opens up new possibilities for projects and makes me feel more capable and versatile.",
		},
		weather: {
			temperatureC: 18,
			temperatureF: 64,
			condition: "Partly Cloudy",
			location: "Study Room",
		},
		quote: {
			q: "Live as if you were to die tomorrow. Learn as if you were to live forever.",
			a: "Mahatma Gandhi",
		},
		media: [],
	},
	{
		id: 14,
		title: "Feeling Nostalgic",
		body: "Looking through old photos made me feel nostalgic and a bit tearful.",
		date: "2023-10-13",
		mood: "😩", // Stressed/Tearful
		goal: null,
		affirmation: "My memories are a precious part of me.",
		reflection: {
			question: "What specific memory brought the strongest emotion?",
			answer:
				"Seeing photos from childhood holidays. Happy memories, but also a little sad that time passes so quickly.",
		},
		weather: {
			temperatureC: 17,
			temperatureF: 63,
			condition: "Cloudy",
			location: "Home",
		},
		quote: {
			q: "Sometimes you will never know the value of a moment until it becomes a memory.",
			a: "Dr. Seuss",
		},
		media: [],
	},
	{
		id: 15,
		title: "Simple Pleasures",
		body: "Enjoyed a warm cup of tea on a rainy day. Sometimes the simple things are best.",
		date: "2023-10-12",
		mood: "😊", // Happy
		goal: "Appreciate the small things",
		affirmation: "I find joy in simple moments.",
		reflection: {
			question: "What other simple things brought comfort today?",
			answer:
				"The sound of rain, the warmth of the mug, the quiet moment to just sit and be.",
		},
		weather: {
			temperatureC: 13,
			temperatureF: 55,
			condition: "Heavy Rain",
			location: "Kitchen Nook",
		},
		quote: {
			q: "Enjoy the little things, for one day you may look back and realize they were the big things.",
			a: "Robert Brault",
		},
		media: [],
	},
	{
		id: 16,
		title: "Reached a Milestone",
		body: "Completed a major phase of my personal project. So happy!",
		date: "2023-10-11",
		mood: "😄", // Joyful
		goal: "Plan the next phase",
		affirmation: "I achieve my goals through persistence.",
		reflection: {
			question: "What was the biggest challenge in reaching this milestone?",
			answer:
				"Staying motivated during the difficult parts and troubleshooting unexpected problems. Finishing feels amazing.",
		},
		weather: {
			temperatureC: 20,
			temperatureF: 68,
			condition: "Sunny",
			location: "Workshop",
		},
		quote: {
			q: "The journey of a thousand miles begins with a single step.",
			a: "Lao Tzu",
		},
		media: [],
	},
	{
		id: 17,
		title: "Disagreement with Friend",
		body: "Had a disagreement that left me feeling sad and misunderstood.",
		date: "2023-10-10",
		mood: "😔", // Sad
		goal: "Reach out to talk things through",
		affirmation: "Clear communication fosters understanding.",
		reflection: {
			question: "What is my part in the misunderstanding?",
			answer:
				"Maybe I didn't express my feelings clearly, or perhaps I wasn't fully listening to their perspective either.",
		},
		weather: {
			temperatureC: 18,
			temperatureF: 64,
			condition: "Cloudy",
			location: "Cafe",
		},
		quote: {
			q: "The single biggest problem in communication is the illusion that it has taken place.",
			a: "George Bernard Shaw",
		},
		media: [],
	},
	{
		id: 18,
		title: "Delayed Flight",
		body: "Flight got delayed by hours. Stuck at the airport feeling angry.",
		date: "2023-10-09",
		mood: "😠", // Angry
		goal: "Practice patience",
		affirmation: "I can adapt to unexpected changes.",
		reflection: {
			question:
				"What can I do to make this waiting time more productive or pleasant?",
			answer:
				"Read a book, listen to music, catch up on emails, or just try to relax instead of fuming.",
		},
		weather: {
			temperatureC: 22,
			temperatureF: 72,
			condition: "Clear",
			location: "Airport Terminal B",
		},
		quote: {
			q: "Adopt the pace of nature: her secret is patience.",
			a: "Ralph Waldo Emerson",
		},
		media: [],
	},
	{
		id: 19,
		title: "Volunteering Experience",
		body: "Volunteered at the local shelter today. Rewarding and made me happy.",
		date: "2023-10-08",
		mood: "😊", // Happy
		goal: "Volunteer again next month",
		affirmation: "Helping others brings me joy.",
		reflection: {
			question: "What impact did I feel I made today?",
			answer:
				"Even small tasks seemed appreciated. Connecting with the people there and feeling like I contributed positively was very rewarding.",
		},
		weather: {
			temperatureC: 19,
			temperatureF: 66,
			condition: "Sunny",
			location: "Community Shelter",
		},
		quote: {
			q: "The best way to find yourself is to lose yourself in the service of others.",
			a: "Mahatma Gandhi",
		},
		media: [],
	},
	{
		id: 20,
		title: "Finished a Good Series",
		body: "Just finished watching a fantastic TV series. A bit sad it's over.",
		date: "2023-10-07",
		mood: "😩", // Stressed/Tearful
		goal: "Find a new series to watch",
		affirmation: "I appreciate great storytelling.",
		reflection: {
			question: "What made the series so engaging?",
			answer:
				"The characters were so well-developed, and the plot kept me hooked. It's always a bit sad when a good story ends.",
		},
		weather: {
			temperatureC: 16,
			temperatureF: 61,
			condition: "Evening Clear",
			location: "Living Room",
		},
		quote: {
			q: "That's the thing about books. They let you travel without moving your feet.",
			a: "Jhumpa Lahiri",
		},
		media: [],
	},
	{
		id: 21,
		title: "Celebrated Anniversary",
		body: "Celebrated our anniversary with a special dinner. Felt very joyful.",
		date: "2023-10-06",
		mood: "😄", // Joyful
		goal: null,
		affirmation: "I cherish my relationships.",
		reflection: {
			question: "What am I grateful for in this relationship?",
			answer:
				"The shared memories, the support, the laughter, and the journey we've been on together.",
		},
		weather: {
			temperatureC: 20,
			temperatureF: 68,
			condition: "Clear Night",
			location: "Fancy Restaurant",
		},
		quote: {
			q: "Love does not consist of gazing at each other, but in looking outward together in the same direction.",
			a: "Antoine de Saint-Exupéry",
		},
		media: [{ type: "image", url: HappyIMG, alt: "Anniversary Celebration" }],
	},
	{
		id: 22,
		title: "Tried Meditation",
		body: "Tried a guided meditation for the first time. Found it difficult to quiet my mind, but felt slightly calmer afterwards.",
		date: "2023-10-05",
		mood: "😐", // Neutral
		goal: "Try meditating for 5 minutes daily",
		affirmation: "I am patient with myself as I learn new practices.",
		reflection: {
			question: "What was the biggest challenge during meditation?",
			answer:
				"My mind kept wandering to my to-do list. It was hard to just focus on my breath.",
		},
		weather: {
			temperatureC: 17,
			temperatureF: 63,
			condition: "Partly Cloudy",
			location: "Bedroom",
		},
		quote: {
			q: "The quieter you become, the more you are able to hear.",
			a: "Rumi",
		},
		media: [],
	},
	{
		id: 23,
		title: "Long Work Day",
		body: "Worked late to meet a deadline. Feeling exhausted but glad it's done.",
		date: "2023-10-04",
		mood: "😴", // Tired (Using StressedIMG placeholder for now)
		goal: "Get a full night's sleep",
		affirmation: "I work hard and deserve rest.",
		reflection: {
			question: "Was the extra effort today worth it?",
			answer:
				"Yes, meeting the deadline was important. But I need to balance it with rest moving forward.",
		},
		weather: {
			temperatureC: 19,
			temperatureF: 66,
			condition: "Clear Night",
			location: "Office",
		},
		quote: {
			q: "Rest is not idleness, and to lie sometimes on the grass under trees on a summer's day... is by no means a waste of time.",
			a: "John Lubbock",
		},
		media: [],
	},
	{
		id: 24,
		title: "Caught Up With Old Friend",
		body: "Had a long phone call with a friend I haven't spoken to in ages. It was wonderful to reconnect.",
		date: "2023-10-03",
		mood: "😄", // Joyful
		goal: "Maintain connections with friends",
		affirmation: "My friendships enrich my life.",
		reflection: {
			question: "What did I enjoy most about the conversation?",
			answer:
				"Remembering shared experiences and just catching up on each other's lives. It felt like no time had passed.",
		},
		weather: {
			temperatureC: 21,
			temperatureF: 70,
			condition: "Sunny",
			location: "Home",
		},
		quote: {
			q: "Friendship is born at that moment when one person says to another, ‘What! You too? I thought I was the only one.’",
			a: "C.S. Lewis",
		},
		media: [],
	},
	{
		id: 25,
		title: "Minor Setback",
		body: "Ran into a small problem with a project I'm working on. Felt a bit discouraged.",
		date: "2023-10-02",
		mood: "😔", // Sad
		goal: "Find a solution tomorrow",
		affirmation: "Setbacks are opportunities to learn and adapt.",
		reflection: {
			question: "How can I approach this problem differently?",
			answer:
				"Maybe take a break and come back with fresh eyes, or ask a colleague for their perspective.",
		},
		weather: {
			temperatureC: 18,
			temperatureF: 64,
			condition: "Cloudy",
			location: "Workshop",
		},
		quote: {
			q: "Obstacles don't have to stop you. If you run into a wall, don't turn around and give up. Figure out how to climb it, go through it, or work around it.",
			a: "Michael Jordan",
		},
		media: [],
	},
	{
		id: 26,
		title: "Baking Success",
		body: "Tried a new bread recipe and it turned out perfectly! Smelled amazing.",
		date: "2023-10-01",
		mood: "😊", // Happy
		goal: "Bake again soon",
		affirmation: "I enjoy creating things with my hands.",
		reflection: {
			question: "What made this baking attempt successful?",
			answer:
				"Following the recipe carefully and being patient during the rising time. The smell of fresh bread is just the best.",
		},
		weather: {
			temperatureC: 16,
			temperatureF: 61,
			condition: "Rainy Day",
			location: "Kitchen",
		},
		quote: {
			q: "Cooking and baking is both physical and mental therapy.",
			a: "Mary Berry",
		},
		media: [
			// You could add an image of bread here if available
		],
	},
	{
		id: 27,
		title: "Feeling Overwhelmed",
		body: "Too many things on my plate right now. Feeling stressed and overwhelmed.",
		date: "2023-09-30",
		mood: "😩", // Stressed/Tearful
		goal: "Prioritize tasks and ask for help if needed",
		affirmation: "I can manage my responsibilities one step at a time.",
		reflection: {
			question: "What is the most pressing task I need to focus on first?",
			answer:
				"The report deadline for tomorrow. I should focus solely on that and then reassess the other tasks.",
		},
		weather: {
			temperatureC: 19,
			temperatureF: 66,
			condition: "Overcast",
			location: "Office Desk",
		},
		quote: {
			q: "It's not the load that breaks you down, it's the way you carry it.",
			a: "Lou Holtz",
		},
		media: [],
	},
	{
		id: 28,
		title: "Visited a Museum",
		body: "Spent the afternoon at the art museum. Saw some inspiring pieces.",
		date: "2023-09-29",
		mood: "😊", // Happy
		goal: "Seek out more cultural experiences",
		affirmation: "Art and culture enrich my perspective.",
		reflection: {
			question: "Which artwork resonated with me the most and why?",
			answer:
				"There was a landscape painting that captured the light perfectly. It felt peaceful and reminded me of a place I visited.",
		},
		weather: {
			temperatureC: 20,
			temperatureF: 68,
			condition: "Sunny",
			location: "City Art Museum",
		},
		quote: {
			q: "Art washes away from the soul the dust of everyday life.",
			a: "Pablo Picasso",
		},
		media: [],
	},
	{
		id: 29,
		title: "Unproductive Day",
		body: "Struggled to focus today, didn't get much done. Feeling a bit annoyed with myself.",
		date: "2023-09-28",
		mood: "😠", // Angry/Frustrated
		goal: "Start fresh tomorrow",
		affirmation: "It's okay to have off days. Tomorrow is a new opportunity.",
		reflection: {
			question: "What factors might have contributed to my lack of focus?",
			answer:
				"Maybe not enough sleep, or perhaps too many distractions. I need to be more mindful of my environment.",
		},
		weather: {
			temperatureC: 17,
			temperatureF: 63,
			condition: "Cloudy",
			location: "Home Office",
		},
		quote: {
			q: "Don't judge each day by the harvest you reap but by the seeds that you plant.",
			a: "Robert Louis Stevenson",
		},
		media: [],
	},
	{
		id: 30,
		title: "Early Morning Walk",
		body: "Woke up early and went for a walk as the sun was rising. Peaceful and invigorating start to the day.",
		date: "2023-09-27",
		mood: "😄", // Joyful
		goal: "Continue morning walks",
		affirmation: "I start my day with positive energy.",
		reflection: {
			question: "How did the early walk affect the rest of my day?",
			answer:
				"It put me in a great mood and I felt more focused and energized throughout the morning.",
		},
		weather: {
			temperatureC: 15,
			temperatureF: 59,
			condition: "Clear Sunrise",
			location: "Neighborhood Park",
		},
		quote: {
			q: "An early-morning walk is a blessing for the whole day.",
			a: "Henry David Thoreau",
		},
		media: [],
	},
	{
		id: 31,
		title: "Just a Regular Day",
		body: "Nothing particularly noteworthy happened today. Just a standard Tuesday.",
		date: "2023-09-26",
		mood: "😐", // Neutral
		goal: null,
		affirmation: "I find peace in the rhythm of ordinary days.",
		reflection: {
			question: "Was there anything small today that I appreciated?",
			answer:
				"My morning coffee was good. Sometimes the routine itself is comforting.",
		},
		weather: {
			temperatureC: 19,
			temperatureF: 66,
			condition: "Partly Cloudy",
			location: "Various",
		},
		quote: {
			q: "The ordinary arts we practice every day at home are of more importance to the soul than their simplicity might suggest.",
			a: "Thomas Moore",
		},
		media: [],
	},
];

export const moodNameMap = {
	"😊": "Happy",
	"😔": "Sad",
	"😠": "Angry",
	"😴": "Tired",
	"😄": "Joyful",
	"😐": "Neutral",
	"😩": "Overwhelmed", // Simplified from Stressed/Tearful
};

// Basic English stop words for word cloud
export const stopWords = new Set([
	"i",
	"me",
	"my",
	"myself",
	"we",
	"our",
	"ours",
	"ourselves",
	"you",
	"your",
	"yours",
	"yourself",
	"yourselves",
	"he",
	"him",
	"his",
	"himself",
	"she",
	"her",
	"hers",
	"herself",
	"it",
	"its",
	"itself",
	"they",
	"them",
	"their",
	"theirs",
	"themselves",
	"what",
	"which",
	"who",
	"whom",
	"this",
	"that",
	"these",
	"those",
	"am",
	"is",
	"are",
	"was",
	"were",
	"be",
	"been",
	"being",
	"have",
	"has",
	"had",
	"having",
	"do",
	"does",
	"did",
	"doing",
	"a",
	"an",
	"the",
	"and",
	"but",
	"if",
	"or",
	"because",
	"as",
	"until",
	"while",
	"of",
	"at",
	"by",
	"for",
	"with",
	"about",
	"against",
	"between",
	"into",
	"through",
	"during",
	"before",
	"after",
	"above",
	"below",
	"to",
	"from",
	"up",
	"down",
	"in",
	"out",
	"on",
	"off",
	"over",
	"under",
	"again",
	"further",
	"then",
	"once",
	"here",
	"there",
	"when",
	"where",
	"why",
	"how",
	"all",
	"any",
	"both",
	"each",
	"few",
	"more",
	"most",
	"other",
	"some",
	"such",
	"no",
	"nor",
	"not",
	"only",
	"own",
	"same",
	"so",
	"than",
	"too",
	"very",
	"s",
	"t",
	"can",
	"will",
	"just",
	"don",
	"should",
	"now",
	"it's",
	"that's",
	"im",
	"ive",
	"id",
	"youre",
	"youve",
	"youll",
	"youd",
	"hes",
	"hell",
	"hed",
	"shes",
	"shell",
	"shed",
	"its",
	"were",
	"weve",
	"well",
	"wed",
	"theyre",
	"theyve",
	"theyll",
	"theyd",
]);
