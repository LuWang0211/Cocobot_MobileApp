import React from "react";
import { ChatWorkflowNode, ResponseNodeLogic } from "../common";
import { StyleSheet, View, Text, Image } from 'react-native';
import { color } from '../../../assets/constant';

function generateDogsAndCats(size) {
  const dd = ["🐈", "🐕", "🐎", "🐼"];

  let out = "";

  for (let i = 0; i < size; i++) {
    const a = dd[Math.floor(Math.random() * dd.length)];
    out += a;
  }

  return out;
}

const contentChoices = [
  '3-day streak!',
  'Keep up the good work!',
  '4 more days to complete this week’s plan and unlock more resources!'
];

const gifs = [
  'https://media.giphy.com/media/cKoHrJDJq0RSof5PIV/giphy.gif',
  'https://media.giphy.com/media/Y0nfCLTb1T5C4XvE54/giphy.gif'
];

export class PopupNode extends ResponseNodeLogic {
  control: string;

  constructor() {
    super();
    this.control = 'start';
  }

  async step(): Promise<boolean> {

    if (this.control == 'start') {
      const content = contentChoices[Math.floor(Math.random() * contentChoices.length)]
      const gif = gifs[Math.floor(Math.random() * gifs.length)];
      const title = "Exercise session ended";

      const modelContent =
        (<>
            <Image
              source={{ uri: gif }}
              style={{ width: 100, height: 100 }}
            />
            <Text style={styles.modalContentBody}>{content}</Text>
            <Text style={styles.modalContentMaoGouMa}>{generateDogsAndCats(10)}</Text>
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
