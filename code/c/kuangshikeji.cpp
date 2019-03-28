#include <iostream>
using namespace std;
class Player {
    private:
        int id;
        static int next_id;
    public:
        int getID() { return id; }
        Player() { id = next_id++; }
};
int Player::next_id = 1;
int main() {
    Player p1;
    Player p2;
    Player p3;
    cout << p1.getID() << " ";
    cout << p2.getID() << " ";
    cout << p3.getID() << " ";
    return 0;
}
