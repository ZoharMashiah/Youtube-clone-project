CXX = g++
CXXFLAGS = -std=c++11 -pthread
TARGET = tcpServer
SRCS = tcpServer.cpp

$(TARGET): $(SRCS)
	$(CXX) $(CXXFLAGS) -o $(TARGET) $(SRCS)

clean:
	rm -f $(TARGET)

.PHONY: clean