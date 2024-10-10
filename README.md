# This is a full-stack application built with NestJS for the backend and ReactJS for the frontend. 
## Folder Structure
``` . 
├── BE (NestJS) 
└── FE (ReactJS) 
```
## Getting Started 
### Prerequisites Make sure you have the following installed on your machine: - [Node.js](https://nodejs.org/) (version >= 14.x) - [Yarn](https://yarnpkg.com/getting-started/install) 
### Setting Up the Backend (BE) 
1. Navigate to the `BE` directory: ```cd BE ```
2. Install the dependencies using Yarn: ```yarn install ``` 
3. You may need to create a `.env` file for environment variables. You can copy the `.env.example` to `.env`: ```cp .env.example .env ``` 
4. Start the server: 

    with Yarn: ```yarn start ``` 

    or with Docker: ```docker-compose up```
5. The backend should now be running at `http://localhost:3000` and `3001` for the Socket.IO (or the port specified in your configuration). 
### Setting Up the Frontend (FE) 
1. Navigate to the `FE` directory: ```cd FE ``` 
2. Install the dependencies using Yarn: ```yarn install ``` 
3. Start the development server: ```yarn start ``` 
4. The frontend should now be running at `http://localhost:5173`. 

## Highlighted Code
Path: ```BE\src\openai\openai.service.ts```

This code is used to get the stream of responses from the OpenAI API, and we call the callback for each chunk of the stream to send it via Socket.IO to the client.

The ```isLastChunk``` will be sent at the end of the stream to stop the client's event listener.
``` . 
async generateResponse(
    prompt: string,
    model: string,
    callback: (text: string, isLastChunk?: boolean) => void,
  ) {
    try {
      const stream = await this.openai.chat.completions.create({
        model: model || 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        stream: true,
      });
      for await (const chunk of stream) {
        const val = chunk.choices[0]?.delta?.content || '';
        callback(val);
      }
      callback('lastChunk', true);
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Failed to generate response from OpenAI',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
```

Each time the client calls the API to the backend, it also attaches a UUID (a unique key) and listens for the socket event ```chat-generating-${uuid}```. Since we need to listen for the results of the stream for each request, we must provide a unique key; otherwise, we cannot handle multiple requests simultaneously.
```
    #FE side ChatItem.jsx
    const { mutate: sendMessageFnc, isLoading } = useSendMessage();
    const sendMessage = useCallback(() => {
        if (message) {
            sendMessageFnc({ message, socketId: socket.id, uuid, model });
        }
    }, [message, model, sendMessageFnc, uuid]);
    #FE side ReponseItem.jsx
    const [isGenerating, setIsGenerating] = useState(true);
    const [text, setText] = useState("");
    useEffect(() => {
        socket.on(`chat-generating-${uuid}`, (data) => {
            if (!data.isLastChunk) {
                setText((pre) => (pre += data.text));
            } else {
                setIsGenerating(false);
            }
        });
        return () => {
            socket.off(`chat-generating-${uuid}`);
        };
    }, [uuid]);


    #BE side  
    @Post()
    handleMessage(
        @Body() { socketId, message, uuid, model },
        @Res() res: Response,
    ) {
        this.openAiService.generateResponse(message, model, (text, isLastChunk) => {
            const eventName = `chat-generating-${uuid}`;
            this.chatBotsGateway.server
                .to(socketId)
                .emit(eventName, { text, isLastChunk });
        });
        return res.status(HttpStatus.CREATED).send();
    }
```

