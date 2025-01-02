import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";

class ChatHub {
    constructor(advertisementId, userId) {
        this.connection = new HubConnectionBuilder()
            .withUrl(`http://localhost:5327/chat/advertisement?advertisementId=${advertisementId}&userId=${userId}`)
            .configureLogging(LogLevel.Information)
            .build();
    }

    async startConnection() {
        try {
            await this.connection.start();
            console.log("SignalR Connected.");
        } catch (err) {
            console.error("Error while starting connection: " + err);
        }
    }

    onMessageReceived(callback) {
        this.connection.on("ReceiveMessage", (message) => {
            callback(message);
        });
    }

    onHistoryReceived(callback) {
        this.connection.on("ReceiveHistory", (messages) => {
            callback(messages);
        });
    }

    sendMessage(advertisementId, userId, content) {
        this.connection.invoke("SendMessageToChat", advertisementId, userId, content)
            .catch(err => console.error("Error sending message: ", err));
    }

    async connectToChat(advertisementId, userId) {
        await this.connection.invoke("ConnectToChat", advertisementId, userId);
    }
}

export default ChatHub;
