#include <iostream>
#include <vector>
#include <algorithm>
#include <sstream> // For std::ostringstream

template <typename T>
class UniqueVector
{
private:
    std::string name;
    std::vector<T> data;

public:
    // Constructor
    UniqueVector(const std::string &name) : name(name), data() {}
    // Add an element, ensuring no duplicates
    void add(const T &element)
    {
        if (std::find(data.begin(), data.end(), element) == data.end())
        {
            data.push_back(element);
        }
    }

    // Union with another UniqueVector
    void unionWith(const UniqueVector<T> &other)
    {
        for (const T &element : other.data)
        {
            add(element);
        }
    }

    // Get the vector as an array
    const T *asArray() const
    {
        return data.data();
    }

    // Get the size of the vector
    size_t size() const
    {
        return data.size();
    }

    // Convert the elements to a string
    std::string toString() const
    {
        std::ostringstream oss;
        for (size_t i = 0; i < data.size(); ++i)
        {
            oss << data[i];
            if (i < data.size() - 1)
            {
                oss << " "; // Add a space between elements
            }
        }
        return oss.str();
    }

    // Subtract elements of another UniqueVector from this one
    void subtract(const UniqueVector<T> &other)
    {
        for (const T &element : other.data)
        {
            auto it = std::find(data.begin(), data.end(), element);
            if (it != data.end())
            {
                data.erase(it);
            }
        }
    }

    // Get the name of the vector
    std::string getName() const
    {
        return name;
    }
};
