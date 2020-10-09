import {
  reminderTaskImg, resourceTaskImg, rescheduleTaskImg, askQuestionTaskImg
} from 'assets/icons/chatTutorialTaskIcon';

export const IMAGE_SOURCE = {
  reminder: reminderTaskImg,
  resource: resourceTaskImg,
  reschedule: rescheduleTaskImg,
  ask: askQuestionTaskImg
}

export const HEADER_TEXT = {
  reminder: 'Create and edit reminders',
  resource: 'Find resources',
  reschedule: 'Reschedule a session',
  ask: 'Ask me anything about the app'
};

export const CONTENT_TEXT = {
  reminder: ['You can type a message to me anytime to schedule a reminder. Feel free to include the time and frequency!'],
  resource: ['You can type a message to me anytime to ask for resources related to symptoms like fatigue and stress, tips to symptom management, and information to chronic illness.', 'Try clicking the SOS button on the top right corner to view emergency resources.'],
  reschedule: ['You can type a message to me anytime to rechedule a session. Try "Hey Cocobot, can I schedule my appointment for next week?"'],
  ask: ['You can type a message to me any time and I will answer your question. Try typing below to ask me anything.']
};

export const BUTTON_TEXT = {
  reminder: ['Thank you! I see.'],
  resource: ['Next', null],
  reschedule: ['Okay'],
  ask: ['Okay']
};

export const BUTTON_FUNCTION = {
  reminder: [null],
  resource: [
    {
      type: "nextTooltip",
      position: 'header',
      textInput: ""
    }, null],
  reschedule: [null],
  ask: [null]
};

export const TUTORIAL_MESSAGES = [
  {
    _id: 'task-ask',
    text: 'Ask me anything about the app',
    type: 'tutorial',
    subType: 'ask',
    createdAt: new Date(),
    user: {
      _id: 2,
      name: 'Cocobot'
    }
  },
  {
    _id: 'task-reschedule',
    text: 'Reschedule a session',
    type: 'tutorial',
    subType: 'reschedule',
    createdAt: new Date(),
    user: {
      _id: 2,
      name: 'Cocobot'
    }
  },
  {
    _id: 'task-resource',
    text: 'Find resources',
    type: 'tutorial',
    subType: 'resource',
    textInput: 'Do you have resources about sleep?',
    createdAt: new Date(),
    user: {
      _id: 2,
      name: 'Cocobot'
    }
  },
  {
    _id: 'task-reminder',
    text: 'Create and edit reminders',
    type: 'tutorial',
    subType: 'reminder',
    textInput: 'Set a reminder at 12 pm for a walk',
    createdAt: new Date(),
    user: {
      _id: 2,
      name: 'Cocobot'
    }
  },
  {
    _id: 'task-introduction',
    text: "Here're some tasks you can ask me to do. Click on them to explore.",
    type: 'text',
    createdAt: new Date(),
    user: {
      _id: 2,
      name: 'Cocobot'
    }
  }];
