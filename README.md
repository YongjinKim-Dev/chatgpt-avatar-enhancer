# ChatGPT Avatar Enhancer

A Chrome Extension that adds customizable avatars for user and assistant messages in ChatGPT.

## Features

- User Avatar and Assistant Avatar configuration
- File upload and base64 storage (Options page)
- Avatar images inserted via a MutationObserver in the content script
- Extensible structure for future enhancements (e.g., multiple profiles, themes)

## Installation and Usage

### 1) Install Dependencies
~~~
npm install
~~~

### 2) Run Tests
~~~
npm test
~~~

### 3) Load Unpacked Extension in Chrome

1. Enable Developer mode in your Chrome browser by going to chrome://extensions
2. Click "Load unpacked"
3. Select this project folder (chatgpt-avatar-enhancer)

### 4) Use

- Go to https://chat.openai.com
- Open Extension Options to upload your avatar images
- Send a new message and confirm the avatars are displayed alongside user and assistant messages

## Docker Environment (Optional)

- Build the Docker image
~~~
docker build -t chatgpt-avatar-dev .
~~~

- Run a container with mounted volume
~~~
docker run -it --name chatgpt-avatar-container -v "$PWD":/app chatgpt-avatar-dev
~~~

- Inside the container, install dependencies and run tests
~~~
cd /app
npm install
npm test
~~~

After that, you can load the extension from your local folder on the host machine (the container changes are synced via the volume mount).

## License

MIT License. Feel free to open issues and pull requests for collaboration.

