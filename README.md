

# A personal voice bot for learning purpose
In this project, I made use of Watson SDKS together with React JS to develop a voice bot that can be customize to your needs.


## Included components

* [IBM Watson Assistant](https://www.ibm.com/watson/developercloud/conversation.html): Build, test and deploy a bot or virtual agent across mobile devices, messaging platforms, or even on a physical robot.
* [IBM Watson Speech to Text](https://console.bluemix.net/catalog/services/speech-to-text): The Speech to Text service converts the human voice into the written word
* [IBM Watson Text to Speech](https://console.bluemix.net/catalog/services/text-to-speech): The Text to Speech service processes text and natural language to generate synthesized audio output complete with appropriate cadence and intonation.

## Featured technologies
* [Node.js](https://nodejs.org/): An asynchronous event driven JavaScript runtime, designed to build scalable applications.
* [React.js](https://reactjs.org/): A JavaScript library for building user interfaces



## Run locally

1. [Clone the repo](#1-clone-the-repo)
2. [generate all css](#2-generate-css-files)
3. [Create Watson services with IBM Cloud](#2-create-watson-services-with-ibm-cloud)
4. [Import the Watson Assistant workspace](#3-import-the-watson-assistant-workspace)
5. [Configure credentials](#4-configure-credentials)
6. [Run the application](#5-run-the-application)

### 1. Clone the repo

Clone the repo locally. In a terminal, run:

```
$ git clone https://github.com/samcyn/bot_me.git
```

### 2. Generate CSS Files

SASS/SCSS is used for this project and due to some personal reason css files are not added to version control. you can generate all the required css files by running from the root directory

```
 yarn run gen-css
```
### 3. Create Watson services with IBM Cloud

Create the following services:

* [**Watson Assistant**](https://console.ng.bluemix.net/catalog/services/conversation)
* [**Watson Speech To Text**](https://console.bluemix.net/catalog/services/speech-to-text)
* [**Watson Tone Text to Speech**](https://console.bluemix.net/catalog/services/text-to-speech)

### 4. Set up your Watson Assistant workspace
for more info regarding this visit [**Watson Assistant**](https://console.bluemix.net/catalog/services/conversation)


### 5. Configure credentials

The credentials for IBM Cloud services (Assistant, Speech to text, Text to speech), can be found in the ``Services`` menu in IBM Cloud,
by selecting the ``Service Credentials`` option for each service.


Copy the [`env.sample`](env.sample) to `.env`.

```
$ cp env.sample .env
```
Edit the `.env` file with the necessary settings.

#### `.envexample:`

```
# Copy this file to .env and replace the credentials with 
# your own before starting the app.

# Watson Assistant
WORKSPACE_ID=<add_assistant_workspace>
## Un-comment and use either username+password .
# ASSISTANT_USERNAME=<add_assistant_username>
# ASSISTANT_PASSWORD=<add_assistant_password>


# Watson Speech To Text
## use either username+passowrd.
#SPEECH_TO_TEXT_USERNAME=<add_speech_to_text_username>
#SPEECH_TO_TEXT_PASSWORD=<add_speech_to_text_password>
#SPEECH_TO_TEXT_URL=<add_speech_to_text_url>


# Watson Text To Speech
## use either username+passowrd.
TEXT_TO_SPEECH_USERNAME=<add_text_to_speech_username>
TEXT_TO_SPEECH_PASSWORD=<add_text_to_speech_password>
TEXT_TO_SPEECH_URL=<add_text_to_speech_url>


### 6. Run the application
1. Install [Node.js](https://nodejs.org/en/) runtime or NPM.
1. Start the app by running `npm install`, followed by `npm dev`.
1. Use the bot at `localhost:3000`.

