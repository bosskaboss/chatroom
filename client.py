import socket


HEADER = 64
PORT = 5060
SERVER = "100.117.14.138"
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
    print(client.recv(2048).decode(FORMAT))


while 1 :
    textBox =  input("What to send:")
    send(textBox)

