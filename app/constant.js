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
    name:"2 mins breathing exercise",
    author: "Cocobot", 
    duration:"2 mins", 
    category: "SymptomManagement",
    about: "Anxiety",
    image: "https://gixresources.s3-us-west-2.amazonaws.com/CardsImages/SleepArticle.png", // Transfer from "https://cocobotpracticeaudio.s3-us-west-2.amazonaws.com/img/SleepArticle.png"
    audiouri:"https://gixresources.s3-us-west-2.amazonaws.com/FinalAudioResources/2min_breathing_exercise_no_piano.mp3", // Transfer from "https://cocobotpracticeaudio.s3-us-west-2.amazonaws.com/final_resources/2min_breathing_exercise_no_piano.mp3"
    pictureuri:"https://gixresources.s3-us-west-2.amazonaws.com/BackgroundImages/2mins_meditation_img.jpg", // Transfer from "https://cocobotpracticeaudio.s3-us-west-2.amazonaws.com/img/2mins_meditation_img.jpg"
    favored: false,
  },
  {
    id: 1,
    type:"Meditation",
    title: "Mindfulness Guided Exercise",
    name:"6 mins Mindfulness Guided Exercise",
    author: "Cocobot", 
    duration:"6 mins", 
    category: "ChildCondition",
    about: "Stress",
    image: "https://gixresources.s3-us-west-2.amazonaws.com/CardsImages/6min_meditation_card.jpg", // Transfer from "https://cocobotpracticeaudio.s3-us-west-2.amazonaws.com/img/6min_meditation_card.jpg"
    audiouri:"https://gixresources.s3-us-west-2.amazonaws.com/FinalAudioResources/6min_meditation_no_piano+5.mp3", // Transfer from  "https://cocobotpracticeaudio.s3-us-west-2.amazonaws.com/final_resources/6min_meditation_no_piano+5.mp3"
    pictureuri:"https://gixresources.s3-us-west-2.amazonaws.com/BackgroundImages/6min_meditation_no_piano.jpg", // Transfer from  "https://cocobotpracticeaudio.s3-us-west-2.amazonaws.com/img/6min_meditation_no_piano.jpg"
    favored: false,
  },
  {
    id: 2,
    type:"Meditation",
    title: "Mindfulness Guided Exercise",
    name:"3 mins Stress Relief Exercise",  // "Breathing"
    author: "Cocobot", 
    duration:"3 mins", 
    category: "ChildCondition",
    about: "Stress",
    image: "https://gixresources.s3-us-west-2.amazonaws.com/CardsImages/breathing.png", // Transfer from "https://cocobotpracticeaudio.s3-us-west-2.amazonaws.com/img/breathing.png"
    audiouri:"https://gixresources.s3-us-west-2.amazonaws.com/FinalAudioResources/3min_meditation.mp3",  // Transfer from  "https://cocobotpracticeaudio.s3-us-west-2.amazonaws.com/final_resources/3min_meditation.mp3"
    pictureuri:"https://gixresources.s3-us-west-2.amazonaws.com/BackgroundImages/2.jpg", // Transfer from "https://cocobotpracticeaudio.s3-us-west-2.amazonaws.com/img/2.jpg"
    favored: false,
  },
  {
    id: 3,
    type:"Meditation",
    title: "Mindfulness Guided Exercise",
    name:"4 min Mindfulness Meditation",  //Human speaking
    author: "Cocobot", 
    duration:"4 mins", 
    category: "SymptomManagement",
    about: "Anxiety",
    image: "https://gixresources.s3-us-west-2.amazonaws.com/CardsImages/humanspeaking.png", // Transfer from "https://cocobotpracticeaudio.s3-us-west-2.amazonaws.com/img/humanspeaking.png"
    audiouri:"https://gixresources.s3-us-west-2.amazonaws.com/FinalAudioResources/4min_meditation.mp3",  // Transfer from  "https://cocobotpracticeaudio.s3-us-west-2.amazonaws.com/final_resources/4min_meditation.mp3"
    pictureuri:"https://gixresources.s3-us-west-2.amazonaws.com/BackgroundImages/3.jpg", // Transfer from "https://cocobotpracticeaudio.s3-us-west-2.amazonaws.com/img/3.jpg"
    favored: false,
  },
  {
    id: 4,
    type:"Meditation",
    title: "Mindfulness Guided Exercise",
    name:"6 mins Body Scan",       //Body Scan
    author: "Cocobot", 
    duration:"6 mins", 
    category: "ChildCondition",
    about: "Stress",
    image: "https://gixresources.s3-us-west-2.amazonaws.com/CardsImages/bodyscan.png", // Transfer from "https://cocobotpracticeaudio.s3-us-west-2.amazonaws.com/img/bodyscan.png"
    audiouri:"https://gixresources.s3-us-west-2.amazonaws.com/FinalAudioResources/6min_meditation.mp3",  // Transfer from "https://cocobotpracticeaudio.s3-us-west-2.amazonaws.com/final_resources/6min_meditation.mp3"
    pictureuri:"https://gixresources.s3-us-west-2.amazonaws.com/BackgroundImages/4.jpg", // Transfer from "https://cocobotpracticeaudio.s3-us-west-2.amazonaws.com/img/4.jpg"
    favored: false,
  },
  {
    id: 5,
    type:"Meditation",
    title: "Mindfulness Guided Exercise",
    name:"Relaxation for Caregivers: Mindfulness Meditation",
    author: "Family Caregiver Alliance", 
    duration:"7 mins 35 s", 
    category: "ChildCondition",
    about: "Stress",
    image: "https://gixresources.s3-us-west-2.amazonaws.com/CardsImages/StressExercise.png", // Transfer from "https://cocobotpracticeaudio.s3-us-west-2.amazonaws.com/img/StressExercise.png"
    audiouri:"https://gixresources.s3-us-west-2.amazonaws.com/FinalAudioResources/RelaxationForCaregiversMindfulnesaMeditation.mp3",  // Transfer from "https://cocobotpracticeaudio.s3-us-west-2.amazonaws.com/final_resources/RelaxationForCaregiversMindfulnesaMeditation.mp3"
    pictureuri:"https://gixresources.s3-us-west-2.amazonaws.com/BackgroundImages/1.jpg", // Transfer from  "https://cocobotpracticeaudio.s3-us-west-2.amazonaws.com/img/1.jpg"
    favored: false,
  },
  {
    id: 6,
    type:"Audio Story",
    title: "Audio Story",
    name:"Ten Things That Worked for Me in 2020",
    author: "Sandra Peoples", 
    duration:"16 min", 
    category: "Other",
    about: "Health",
    image: "https://gixresources.s3-us-west-2.amazonaws.com/CardsImages/AnxietyAudio.png", // Transfer from "https://cocobotpracticeaudio.s3-us-west-2.amazonaws.com/img/AnxietyAudio.png"
    audiouri: "https://gixresources.s3-us-west-2.amazonaws.com/FinalAudioResources/TenThingsThatWorkedForMeIn2020.mp3",  // Transfer from "https://cocobotpracticeaudio.s3-us-west-2.amazonaws.com/final_resources/TenThingsThatWorkedForMeIn2020.mp3"
    pictureuri: "https://gixresources.s3-us-west-2.amazonaws.com/BackgroundImages/5.jpg", // Transfer from "https://cocobotpracticeaudio.s3-us-west-2.amazonaws.com/img/5.jpg"
    favored: false,
  },
  {
    id: 7,
    type:"Music",
    title: "Music",
    name:"Soul Soothing Sound Track",
    author: "Bensound", 
    duration:"5 min", 
    category: "SymptomManagement",
    about: "Anxiety",
    image: "https://gixresources.s3-us-west-2.amazonaws.com/CardsImages/StressMusic.png", // Transfer from "https://cocobotpracticeaudio.s3-us-west-2.amazonaws.com/img/StressMusic.png"
    audiouri:"https://gixresources.s3-us-west-2.amazonaws.com/FinalAudioResources/BensoundRelaxing.mp3",  // Transfer from "https://cocobotpracticeaudio.s3-us-west-2.amazonaws.com/final_resources/BensoundRelaxing.mp3"
    pictureuri:"https://gixresources.s3-us-west-2.amazonaws.com/BackgroundImages/6.jpg", // Transfer from "https://cocobotpracticeaudio.s3-us-west-2.amazonaws.com/img/6.jpg"
    favored: false,
  },
  {
    id: 8,
    type:"Music",
    title: "Music",
    name:"Divine Love",
    author: "The Guided Meditation Sited", 
    duration:"8 min", 
    category: "SymptomManagement",
    about: "Anxiety",
    image: "https://gixresources.s3-us-west-2.amazonaws.com/CardsImages/music_card_img.jpg", // Transfer from "https://cocobotpracticeaudio.s3-us-west-2.amazonaws.com/img/music_card_img.jpg"
    audiouri:"https://gixresources.s3-us-west-2.amazonaws.com/FinalAudioResources/music_DivineLove.mp3",  // Transfer from "https://cocobotpracticeaudio.s3-us-west-2.amazonaws.com/final_resources/music_DivineLove.mp3"
    pictureuri:"https://gixresources.s3-us-west-2.amazonaws.com/BackgroundImages/music_card_background.jpg", // Transfer from "https://cocobotpracticeaudio.s3-us-west-2.amazonaws.com/img/music_card_background.jpg"
    favored: false,
  },
  // {
  //   id: 9,
  //   type:"Article",
  //   title: "Article",
  //   name:"Tips for sleep-deprived family caregivers",
  //   author: "Bayshore", 
  //   duration:"5 min", 
  //   category: "SymptomManagement",
  //   about: "Sleep",
  //   image: "https://gixresources.s3-us-west-2.amazonaws.com/CardsImages/SleepArticle.png", // Transfer from "https://cocobotpracticeaudio.s3-us-west-2.amazonaws.com/img/SleepArticle.png"
  //   audiouri:"https://gixresources.s3-us-west-2.amazonaws.com/FinalAudioResources/elevatording.wav",  // Transfer from "https://cocobotpracticeaudio.s3-us-west-2.amazonaws.com/elevatording.wav"
  //   pictureuri:"https://gixresources.s3-us-west-2.amazonaws.com/BackgroundImages/7.png",  // Transfer from "https://cocobotpracticeaudio.s3-us-west-2.amazonaws.com/img/7.png"
  //   favored: false,
  // },
  // {
  //   id: 10,
  //   type:"Testing",
  //   title: "Testing",
  //   name:"Ding Test",
  //   author: "coco bot author", 
  //   duration:"1 min", 
  //   category: "Other",
  //   about: "Health",
  //   image: "hhttps://gixresources.s3-us-west-2.amazonaws.com/CardsImages/DrinkWater.png", // Transfer from "https://cocobotpracticeaudio.s3-us-west-2.amazonaws.com/img/DrinkWater.png"
  //   audiouri:"https://gixresources.s3-us-west-2.amazonaws.com/FinalAudioResources/elevatording.wav",  // Transfer from "https://cocobotpracticeaudio.s3-us-west-2.amazonaws.com/elevatording.wav"
  //   pictureuri:"https://gixresources.s3-us-west-2.amazonaws.com/BackgroundImages/7.png", // Transfer from "https://cocobotpracticeaudio.s3-us-west-2.amazonaws.com/img/7.png"
  //   favored: false,
  // }
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