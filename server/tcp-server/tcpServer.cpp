#include <iostream>
#include <stdio.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <sys/socket.h>
#include <unistd.h>
#include <string.h>
#include <thread>
#include <algorithm>
#include "set.cpp"
#include "UniqueVectorManager.cpp"

using namespace std;

thread threads[100];

void handleThread(void *);

UniqueVectorManager<string> uniqueVectors;
vector<string> split(const string &, char);
string helperFunction(const string &);

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
    const int server_port = 5556;
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
    while (1)
    {
        memset(buffer, 0, sizeof(buffer));
        int read_bytes = recv(sock->des, buffer, expected_data_len, 0);
        if (read_bytes == 0)
        {
            break;
        }
        else if (read_bytes < 0)
        {
            perror("Error reading from client");
        }
        else
        {
            string output = helperFunction(buffer);
            int sent_bytes = send(sock->des, (void *)output.c_str(), output.size(), 0);
            if (sent_bytes < 0)
            {
                perror("error sending to client");
            }
        }
    }
    close(sock->des);
}

string helperFunction(const string &input)
{
    vector<string> tokens;
    tokens = split(input, '|');

    if (tokens.at(0) == "0")
    {
        vector<vector<string>> histories;
        // process the history list
        for (int i = 1; i < tokens.size(); i++)
        {
            histories.push_back(split(tokens.at(i), ','));
        }

        // create the unique vectors for each video
        for (int i = 0; i < histories.size(); i++)
        {
            for (int j = 0; j < histories.at(i).size(); j++)
            {
                if (uniqueVectors.getVectorByName(histories.at(i).at(j)) == nullptr)
                {
                    uniqueVectors.addVector(UniqueVector<string>(histories.at(i).at(j)));
                }
            }
        }

        // create the union of the unique vectors with the history list
        for (int i = 0; i < uniqueVectors.getSize(); i++)
        {
            for (int j = 0; j < histories.size(); j++)
            {
                if (std::find(histories.at(j).begin(), histories.at(j).end(), uniqueVectors.at(i)->getName()) != histories.at(j).end())
                {
                    for (auto x : histories.at(j))
                    {
                        if (x.compare(uniqueVectors.at(i)->getName()) != 0)
                        {
                            uniqueVectors.at(i)->add(x);
                        }
                    }
                }
            }
        }
        return "OK";
    }
    else if (tokens.at(0) == "1")
    {
        tokens = split(tokens.at(1), ',');
        UniqueVector<string> history("history");
        for (int i = 0; i < tokens.size(); i++)
        {
            history.add(tokens.at(i));
        }
        // add the curent watched video to the histroy list
        for (int i = 1; i < tokens.size(); i++)
        {
            auto vector = uniqueVectors.getVectorByName(tokens.at(i));
            if (vector == nullptr)
            {
                uniqueVectors.addVector(UniqueVector<string>(tokens.at(i)));
                vector = uniqueVectors.getVectorByName(tokens.at(i));
            }
            vector->add(tokens.at(0));
        }
        // add the histroy list to the curent watched video
        for (int i = 1; i < tokens.size(); i++)
        {
            auto vector = uniqueVectors.getVectorByName(tokens.at(0));
            if (vector == nullptr)
            {
                uniqueVectors.addVector(UniqueVector<string>(tokens.at(0)));
                vector = uniqueVectors.getVectorByName(tokens.at(0));
            }
            vector->add(tokens.at(i));
        }

        // create the union of the suggested videos
        UniqueVector<string> suggestedVideos("suggestedVideos");
        for (int i = 0; i < tokens.size(); i++)
        {
            auto vector = uniqueVectors.getVectorByName(tokens.at(i));
            if (vector == nullptr)
            {
                continue;
            }
            suggestedVideos.unionWith(*vector);
        }
        suggestedVideos.subtract(history);
        return suggestedVideos.toString();
    }
    else
    {
        return "Invalid input";
    }
}

vector<string> split(const string &s, char delimiter)
{
    vector<string> tokens;
    string token;
    istringstream tokenStream(s);
    while (getline(tokenStream, token, delimiter))
    {
        tokens.push_back(token);
    }
    return tokens;
}
