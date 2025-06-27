import socket
import threading

HEADER = 64
PORT = 5050
SERVER = socket.gethostbyname(socket.gethostname())
FORMAT = "utf-8"
DIS = "!DIS"
ADDR = (SERVER,PORT)


client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
client.connect(ADDR)

def send(msg):
    message = msg.encode(FORMAT)
    msg_length = len(message)
    send_length = str(msg_length).encode(FORMAT)
    send_length+= b' ' * (HEADER - len(send_length))
    client.send(send_length)
    client.send(message)

def receive():
    while True:
        try:
            msg = client.recv(2048).decode(FORMAT)
            if msg:
                print(msg)
        except:
            print("Disconnected from server.")
            break


threading.Thread(target=receive, daemon=True).start()

print("You can start typing messages (type !DIS to disconnect):")
while True:
    msg = input()
    send(msg)
    if msg == DIS:
        break

client.close()


