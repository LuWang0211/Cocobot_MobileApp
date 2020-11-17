# Cocobot_App_GIX Branch Version

Working with a research team from the school of nursing, we are designing a solution to support the delivery of virtual therapies for caregivers. There will be two parts of the solution: a mobile app and an Alexa skill. 

* Alexa skill see [git](https://github.com/LuWang0211/CocobotAlexaSkill) * 

## Main Function

The mobile app is developed by the research team, and it focuses on educating the caregivers on the problem-solving therapy framework, and our team focuses on developing a set of supporting features (including video/audio, etc) both on the mobile app and on Alexa skill to better engage and remind users to practice self-care techniques. 

<!-- ![map](./images/map.JPG) -->

## Implement

1. Third-Party Components
This app uses some third-party components to implement part functions, please make sure you have integrated them in your app before started integration of this repo.
- react-native-vector-icons [link](https://www.npmjs.com/package/react-native-vector-icons) 
- react-native-push-notification [link](https://www.npmjs.com/package/react-native-push-notification) (more details see part 2)
<!-- - react-native-sound [link](https://www.npmjs.com/package/react-native-sound) -->
- react-native-track-player [link](https://react-native-track-player.js.org/getting-started/)(installation details see official doc )
  * Need to install react-native-swift to configure iOS project
- @react-native-async-storage/async-storage[link](https://react-native-async-storage.github.io/async-storage/)
- react-native-animatable
- react-native-gifted-chat


2. Others

Because some code files involve secret information, did not upload to this repo. please make sure you add these files before you build this app.

- AndroidManifest.xml
  Edit this file under  "android/app/src/main". In this file, you should add the push notification permission, related detailed please read "react-native-push-notification"

## Reference
The UI of the mobile App bases on the design from Cocobot Design team. At the same time, app code structure leverage part coding of the core development team.
