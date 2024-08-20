#include <iostream>
#include <sys/socket.h>
#include <stdio.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <unistd.h>
#include <string.h>
#include <thread>

using namespace std;

thread threads[100];

void handleThread(void *);

/* message type that will be sent by the client through TCP connection */
struct msg
{
    char filename[100];
    char file[2048];
};

/* Structure to hold the necessary parameters to pass into the threaded function */
struct req
{
    int des;
    socklen_t addlen;
    sockaddr_in clientaddr;
};

int main()
{
    const int server_port = 5555;
    int sock = socket(AF_INET, SOCK_STREAM, 0);
    if (sock < 0)
    {
        perror("error creating socket");
    }
    struct sockaddr_in sin;
    memset(&sin, 0, sizeof(sin));
    sin.sin_family = AF_INET;
    sin.sin_addr.s_addr = INADDR_ANY;
    sin.sin_port = htons(server_port);
    if (::bind(sock, (struct sockaddr *)&sin, sizeof(sin)) < 0)
    {
        perror("error binding socket");
    }
    if (listen(sock, 5) < 0)
    {
        perror("error listening to a socket");
    }

    int i = 0;

    while (1)
    {
        struct sockaddr_in client_sin;
        unsigned int addr_len = sizeof(client_sin);
        int connfd = accept(sock, (struct sockaddr *)&client_sin, &addr_len);

        /* Filling the parameter values of the threaded function */
        req *r = new req;          // allocate memory
        memset(r, 0, sizeof(req)); // Clear memory
        r->addlen = addr_len;
        r->clientaddr = client_sin;
        r->des = connfd;

        threads[i++] = thread(handleThread, r);
        if (i >= 50)
        {
            for (int j = 0; j < i; ++j)
            {
                threads[j].join();
            }
            i = 0;
        }
    }

    return 0;
}

void handleThread(void *param)
{
    // Changed return type to void
    unique_ptr<req> sock(static_cast<req *>(param)); // Use unique_ptr for automatic memory management
    char buffer[4096];
    int expected_data_len = sizeof(buffer);
    int read_bytes = recv(sock->des, buffer, expected_data_len, 0);
    if (read_bytes == 0)
    {
        cout << "Connection closed by client" << endl;
    }
    else if (read_bytes < 0)
    {
        perror("Error reading from client");
    }
    else
    {
        cout << buffer;
        int sent_bytes = send(sock->des, buffer, read_bytes, 0);
        if (sent_bytes < 0)
        {
            perror("error sending to client");
        }
    }
    close(sock->des);
}