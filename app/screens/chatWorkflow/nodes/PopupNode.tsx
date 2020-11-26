import React from "react";
import { ChatWorkflowNode, ResponseNodeLogic } from "../common";
import { StyleSheet, View, Text, Image } from 'react-native';
import { color } from '../../../assets/constant';
import { AnimatedCircularProgress, } from 'react-native-circular-progress';
import AsyncStorage from '@react-native-async-storage/async-storage';

function generateDogsAndCats(size) {
  const dd = ["🐈", "🐕", "🐎", "🐼"];

  let out = "";

  for (let i = 0; i < size; i++) {
    const a = dd[Math.floor(Math.random() * dd.length)];
    out += a;
  }

  return out;
}

const contentChoices_4_5 = [
  'Congratulations on a 3-day streak!',
  'You\'ve completed 3/7 of the planned practice! Good job!',
  '4 more days to complete this week\'s plan and unlock more resources!',
  'Great job taking care of yourself!',
  '4 more sessions to reach your goal!'
];

const contentChoices_1_3 = [
  'Don\'t give up! Keep exploring next time!',
  'Great job tryin out the solution. Don\'t give up!'
];

// const gifs = [
//   'https://media.giphy.com/media/cKoHrJDJq0RSof5PIV/giphy.gif',
//   'https://media.giphy.com/media/Y0nfCLTb1T5C4XvE54/giphy.gif'
// ];

export class PopupNode extends ResponseNodeLogic {
  control: string;
  content: string;

  constructor() {
    super();
    this.control = 'start';
    this.content = '';
  }

  async step(): Promise<boolean> {

    if (this.control == 'start') {
      const  lastrating  = await AsyncStorage.getItem('LastRatingScore');
      console.log('lastrating',lastrating);
      if (lastrating in ['1', '2', '3']){
        this.content = contentChoices_1_3[Math.floor(Math.random() * contentChoices_1_3.length)]
      } else {
        this.content = contentChoices_4_5[Math.floor(Math.random() * contentChoices_4_5.length)]
      }
      
      // const gif = gifs[Math.floor(Math.random() * gifs.length)];
      const title = "Exercise session ended";
      
      const modelContent =
        (<>
            {/* <Image
              source={{ uri: gif }}
              style={{ width: 100, height: 100 }}
            /> */}
            <AnimatedCircularProgress
              duration= {1500}
              size={150}
              width={10}
              fill={43}
              rotation={0}
              tintColor="#00e0ff"
              backgroundColor="#3d5875">
              {
                (fill) => (
                  <Text style={{color:"#00e0ff",fontSize:25}}>
                    { "Level 1" }
                  </Text>
                )
              }
            </AnimatedCircularProgress>
            <Text style={styles.modalContentBody}>{this.content}</Text>
            {/* <Text style={styles.modalContentMaoGouMa}>{generateDogsAndCats(10)}</Text> */}
          </>
        );

      const waitForClose = new Promise((resolve) => {
        this.abilities.showModal(modelContent, title, () => {
          resolve();
        });
      });

      await waitForClose;
      this.control = 'end';
      return false;
    } 

    return true;
  }
  getNextNode(): ChatWorkflowNode {
    return null;
  }
}

const styles = StyleSheet.create({
  modalTopStyle: {
    justifyContent: 'flex-start',
    bottom: undefined,
    top: 100
  },
  modalBottomStyle: {
    justifyContent: 'flex-end',
    bottom: 60,
    top: undefined
  },  
  modalContentTitle: {
    fontSize: 26,
    lineHeight: 39,
    marginBottom: 12,
    color: color.brandPurple
  },
  modalContentBody: {
    fontSize: 24,
    lineHeight: 28,
    marginBottom: 12,
    fontFamily: 'Poppins-Bold',
    color: color.brandPurple,
    textAlign: 'center',
  },
  modalContentMaoGouMa: {
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 12,
    color: 'black',
    textAlign: 'center',
  },
});
