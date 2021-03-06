# Cocobot_App_GIX Branch Version

Our project is sponsored by, Dr. WeIChao YunWen, from the UW school of nursing. Based on her research, we learned that there is an opportunity to support caregivers by providing online self-care assistant. We join the COCO project to develop cocobot, a virtual therapy chatbot that provides on-demand, empathetic, and tailored caregiving support. 
As the existing cocobot would teach users to identify problems and set self-care goals through problem-solving therapy, our solution's goal is to help caregivers achieve their self-care goals by raising awareness and form self-care habits. There will be two parts to our solution: a mobile app and an Alexa conversation skill. 

*Alexa Conversation Skill see [Git Repository](https://gitlab.com/LuWang0211/cocobot_gix_alexaskill.git)

## Main Function

Our team focuses on developing a set of supporting features to keep users motivated to implement their plans and achieve their goals. To help users achieve their goals, we collected and created multimedia self-care resources including guided exercises, calming music, and audio stories. Users can access these resources through either a smartphone or an Alexa-enabled smart speaker.  We also carefully designed the conversations and reminder messages so that users are motivated to stick to their plans. Coco would learn users’ behaviors and preferences based on their rating, browsing and practice history. All these data will be used to help coco provide more personalized recommendations over time.

<!-- ![map](./images/map.JPG) -->

## Implement

1. Third-Party Components
This app uses some third-party components to implement part functions. Please make sure you have them in your app before starting the integration of this repo.
  - react-native-vector-icons [link](https://www.npmjs.com/package/react-native-vector-icons) 
  - react-native-push-notification [link](https://www.npmjs.com/package/react-native-push-notification) (more details see part 2)
  - @react-native-firebase/app [link](https://rnfirebase.io/) ( installation details see official doc and more details see part 2)
  - react-native-track-player [link](https://react-native-track-player.js.org/getting-started/) (installation details see official doc )
    * need to install react-native-swift to configure IOS project
  - @react-native-async-storage/async-storage [link](https://react-native-async-storage.github.io/async-storage/)
  - react-native-animatable [link](https://github.com/oblador/react-native-animatable)
  - react-native-gifted-chat [link](https://github.com/FaridSafi/react-native-gifted-chat)
  - react-native-picker-select [link](https://www.npmjs.com/package/react-native-picker-select/v/6.3.4)
  - react-native-ratings [link](https://www.npmjs.com/package/react-native-ratings)
  - react-native-modal [link](https://www.npmjs.com/package/react-native-modal)
  
2. Others

Because some code files involve secret information, did not upload to this repo. please make sure you add these files before you build this app.

- AndroidManifest.xml
  Edit this file under "android/app/src/main". In this file, you should add the push notification permission, related detailed please read "react-native-push-notification"
- config.js
  Edit this file under "". In this files, you need to set-up firebase Config, including apiKey, appId.

## Reference
The UI of the mobile App bases on the design from Cocobot Design team. At the same time, app code structure leverages part coding of the core development team.
