export const color = {
    sosRed: '#FF796E',
    secondRed: '#FFD5D0',
    brandPurple: '#3E41A8',
    chatPurple: '#D8DEFF',
    bckgrdPurple: '#F1F3FE',
    primaryBlue: '#95DDED',
    secondBlue: '#D4F2F9',
    categoryGreen: '#D4F7DA',
    categoryYellow: '#FAEFB4',
    categoryPink: '#FDDCEC',
    bodyTextGrey: '#454545',
    chatBubbleGrey: '#F5F5F5',
    secondGrey: '#737373',
    white: '#FFFFFF',
    black: '#000000',
    checkmarkGreen: '#6FCF97',
    settingsBorderColor: 'rgba(62, 65, 168, 0.2)',
    shadowColor: 'rgb(199, 199, 199)',
    settingsTitleColor: '#979797',
    childCardShadow: '#C7C7C7',
};

export const labelBackground = {
  Symptoms: "#D4F2F9",
  SymptomManagement: "#D4F7DA",
  ChildCondition: "#D4F2F9",
  Other: "#FCE4EC"
};

export const categories = [
  {
    id: 0,
    type:"Meditation",
    title: "Mindfulness Guided Exercise",
    name:"Relaxation for Caregivers: Mindfulness Meditation",
    author: "Family Caregiver Alliance", 
    duration:"7 mins 35 s", 
    category: "ChildCondition",
    about: "Stress",
    image: "https://cocobotpracticeaudio.s3-us-west-2.amazonaws.com/img/StressExercise.png",
    audiouri:"https://cocobotpracticeaudio.s3-us-west-2.amazonaws.com/final_resources/RelaxationForCaregiversMindfulnesaMeditation.mp3", 
    pictureuri:"https://cocobotpracticeaudio.s3-us-west-2.amazonaws.com/img/1.jpg",
    favored: false,
  },
  {
    id: 1,
    type:"Meditation",
    title: "Mindfulness Guided Exercise",
    name:"3 mins Stress Relief Exercise",  // "Breathing"
    author: "Cocobot", 
    duration:"3 mins", 
    category: "ChildCondition",
    about: "Stress",
    image: "https://cocobotpracticeaudio.s3-us-west-2.amazonaws.com/img/breathing.png",
    audiouri:"https://cocobotpracticeaudio.s3-us-west-2.amazonaws.com/final_resources/3min_meditation.mp3", 
    pictureuri:"https://cocobotpracticeaudio.s3-us-west-2.amazonaws.com/img/2.jpg",
    favored: false,
  },
  {
    id: 2,
    type:"Meditation",
    title: "Mindfulness Guided Exercise",
    name:"4 min Mindfulness Meditation",  //Human speaking
    author: "Cocobot", 
    duration:"4 mins", 
    category: "ChildCondition",
    about: "Stress",
    image: "https://cocobotpracticeaudio.s3-us-west-2.amazonaws.com/img/humanspeaking.png",
    audiouri:"https://cocobotpracticeaudio.s3-us-west-2.amazonaws.com/final_resources/4min_meditation.mp3", 
    pictureuri:"https://cocobotpracticeaudio.s3-us-west-2.amazonaws.com/img/3.jpg",
    favored: false,
  },
  {
    id: 3,
    type:"Meditation",
    title: "Mindfulness Guided Exercise",
    name:"6 mins Body Scan",
    author: "cocbot", 
    duration:"6 mins", 
    category: "ChildCondition",
    about: "Stress",
    image: "https://cocobotpracticeaudio.s3-us-west-2.amazonaws.com/img/bodyscan.png",
    audiouri:"https://cocobotpracticeaudio.s3-us-west-2.amazonaws.com/final_resources/6min_meditation.mp3", 
    pictureuri:"https://cocobotpracticeaudio.s3-us-west-2.amazonaws.com/img/4.jpg",
    favored: false,
  },
  {
    id: 4,
    type:"Audio Story",
    title: "Audio Story",
    name:"Ten Things That Worked for Me in 2020",
    author: "Sandra Peoples", 
    duration:"16 min", 
    category: "Other",
    about: "Health",
    image: "https://cocobotpracticeaudio.s3-us-west-2.amazonaws.com/img/AnxietyAudio.png",
    audiouri: "https://cocobotpracticeaudio.s3-us-west-2.amazonaws.com/final_resources/TenThingsThatWorkedForMeIn2020.mp3", 
    pictureuri: "https://cocobotpracticeaudio.s3-us-west-2.amazonaws.com/img/5.jpg",
    favored: false,
  },
  {
    id: 5,
    type:"Music",
    title: "Music",
    name:"Soul Soothing Sound Track",
    author: "Bensound", 
    duration:"5 min", 
    category: "SymptomManagement",
    about: "Anxiety",
    image: "https://cocobotpracticeaudio.s3-us-west-2.amazonaws.com/img/StressMusic.png",
    audiouri:"https://cocobotpracticeaudio.s3-us-west-2.amazonaws.com/final_resources/BensoundRelaxing.mp3", 
    pictureuri:"https://cocobotpracticeaudio.s3-us-west-2.amazonaws.com/img/6.jpg",
    favored: false,
  },
  // {
  //   id: 6,
  //   type:"Article",
  //   title: "Article",
  //   name:"Tips for sleep-deprived family caregivers",
  //   author: "Bayshore", 
  //   duration:"5 min", 
  //   category: "SymptomManagement",
  //   about: "Sleep",
  //   image: "https://cocobotpracticeaudio.s3-us-west-2.amazonaws.com/img/SleepArticle.png",
  //   audiouri:"https://cocobotpracticeaudio.s3-us-west-2.amazonaws.com/elevatording.wav", 
  //   pictureuri:"https://cocobotpracticeaudio.s3-us-west-2.amazonaws.com/img/7.png",
  //   favored: false,
  // },
  // {
  //   id: 7,
  //   type:"Testing",
  //   title: "Testing",
  //   name:"Ding Test",
  //   author: "coco bot author", 
  //   duration:"1 min", 
  //   category: "Other",
  //   about: "Health",
  //   image: "https://cocobotpracticeaudio.s3-us-west-2.amazonaws.com/img/DrinkWater.png",
  //   audiouri:"https://cocobotpracticeaudio.s3-us-west-2.amazonaws.com/elevatording.wav", 
  //   pictureuri:"https://cocobotpracticeaudio.s3-us-west-2.amazonaws.com/img/7.png",
  //   favored: false,
  // },
  // {
  //   id: 8,
  //   type:"Ending",
  //   title: "Ending",
  //   name:"Ending",
  //   author: "coco bot author", 
  //   duration:"1 min", 
  //   category: "Other",
  //   about: "Health",
  //   image: "https://cocobotpracticeaudio.s3-us-west-2.amazonaws.com/img/DrinkWater.png",
  //   audiouri:"https://cocobotpracticeaudio.s3-us-west-2.amazonaws.com/final_resources/ending_prompt.mp3", 
  //   pictureuri:"https://cocobotpracticeaudio.s3-us-west-2.amazonaws.com/img/7.png",
  //   favored: false,
  // },
];


export const testing_categories = [
  {
    id: 0,
    type:"Meditation",
    title: "Want to Stay Hydrated? Drink Before You’re Thirsty",
    name:"Breathing Meditation",
    author: "?author", 
    duration:"5 min", 
    category: "ChildCondition",
    about: ["ANXIOUS"],
    image: "https://images.unsplash.com/photo-1584444262846-e2716db1294b",
    audiouri: "https://cocobotpracticeaudio.s3-us-west-2.amazonaws.com/01_Breathing_Meditation.mp3", 
    pictureuri: "https://i.pinimg.com/originals/fd/8d/bf/fd8dbf3f0b8ceed5c2fbd37ab512d901.jpg",
    favored: false,
  },
  {
    id: 1,
    type:"Breathing Meditation",
    title: "4-min Meditation",
    name:"4-min Meditation",
    author: "?author", 
    duration:"4 min", 
    category: ["Symptoms", "ChildCondition"],
    about: ["TIRED", "testing"],
    image: "https://images.unsplash.com/photo-1584444262846-e2716db1294b",
    audiouri:"https://cocobotpracticeaudio.s3-us-west-2.amazonaws.com/LifeHappens5MinuteBreathing.mp3", 
    pictureuri:"https://s1.1zoom.me/b6756/963/Stones_Closeup_Equilibrium_Balance_511958_640x960.jpg",
    favored: false,
  },
  {
    id: 2,
    type:"Testing",
    title: "Want to Stay Hydrated? Drink Before You’re Thirsty",
    name:"Ding Test",
    author: "coco bot author", 
    duration:"1 min", 
    category: "Other",
    about: "Health",
    image: "https://images.unsplash.com/photo-1584444262846-e2716db1294b",
    audiouri:"https://cocobotpracticeaudio.s3-us-west-2.amazonaws.com/elevatording.wav", 
    pictureuri:"https://images.ctfassets.net/v3n26e09qg2r/60rE9vaE6cMIIgiYuYSuoi/6a489ad7611102d432deaa5ba3a45f1a/SXSW_Meditating_Character_with_Headphones_1.png",
    favored: false,
  },
  {
    id: 3,
    type:"Testing",
    title: "Want to Stay Hydrated? Drink Before You’re Thirsty",
    name:"Youtube",
    author: "?author", 
    duration:"5 min", 
    category: "SymptomManagement",
    about: "Health",
    image: "https://images.unsplash.com/photo-1584444262846-e2716db1294b",
    audiouri: "https://www.youtube-nocookie.com/embed/47xfSnzp6j4?controls=0", 
    pictureuri: "https://i.pinimg.com/originals/fd/8d/bf/fd8dbf3f0b8ceed5c2fbd37ab512d901.jpg",
    favored: false,
  },
];