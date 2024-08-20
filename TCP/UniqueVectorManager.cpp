#include <iostream>
#include <vector>
#include <string>
#include <algorithm>

template <typename T>
class UniqueVectorManager
{
private:
    std::vector<UniqueVector<T>> vectors;

public:
    // Add a UniqueVector to the list
    void addVector(const UniqueVector<T> &vec)
    {
        vectors.push_back(vec);
    }

    // Get a UniqueVector by name
    UniqueVector<T> *getVectorByName(const std::string &name)
    {
        for (auto &vec : vectors)
        {
            if (vec.getName() == name)
            {
                return &vec;
            }
        }
        return nullptr; // Return nullptr if not found
    }

    // Print all vectors' names
    void printVectorNames() const
    {
        for (const auto &vec : vectors)
        {
            std::cout << vec.getName() << std::endl;
        }
    }

    int getSize() const
    {
        return vectors.size();
    }

    UniqueVector<T> *at(int index)
    {
        return &vectors.at(index);
    }
};
