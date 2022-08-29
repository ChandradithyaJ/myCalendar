#include <iostream>
#include <string>
#include <windows.h>
using namespace std;

int doomsday (int y);

int main()
{
    int y; // the year
    int t = 1; // checking if the input is correct
    string str;

    while (t)
    {
        cout << "Enter the year (1900 - 2099): ";
        cin >> y;

        cout << "Enter the name of the month: ";
        cin >> str;

        for (int i = 0; i < str.size(); i++)
        {
            if (str[i] < 97)
                str[i] += 32; // converting to lowercase
        }

        if (str == "january" || str == "february" || str == "march" || str == "april" || str == "may" || str == "june" || str == "july" || str == "august" || str == "september" || str == "october" || str == "november" || str == "december")
            t = 0;
        else
        {
            cout << "\nPlease adhere to the conditions\n\n";
            t = 1;
        }

        if (y >= 1900 && y <= 2099)
            t = 0;
        else
        {
            cout << "\nPlease adhere to the conditions\n\n";
            t = 1;
        }
    }

    // the number of days in the given month

    int n;

    if (str == "january" || str == "march" || str == "may" || str == "july" || str == "august" || str == "october" || str == "december")
        n = 31;
    else if (str == "february" && y%4 == 0)
        n = 29;
    else if (str == "february" && y%4 != 0)
        n = 28;
    else n = 30;

    // finding the first day of the month based on the doomsday
    // Sunday: 0 and Saturday: 6
    /* Doomsdays:
       Jan 3/4  Feb 28/29  March 14  April 4  May 9  June 6
       July 11  Aug 8      Sept 5    Oct 10   Nov 7  Dec 12 */

    int d;

    if (str == "january" && y%4 == 0)
    {
        d = doomsday(y) + 4;
        if (d > 6)
            d = d - 7;
    }
    else if (str == "january" && y%4 != 0)
    {
        d = doomsday(y) + 5;
        if (d > 6)
            d = d - 7;
    }
    else if (str == "february" && y%4 == 0)
    {
        d = doomsday(y);
    }
    else if (str == "february" && y%4 != 0)
    {
        d = doomsday(y) + 1;
        if (d > 6)
            d = d - 7;
    }
    else if (str == "march")
    {
        d = doomsday(y) + 1;
        if (d > 6)
            d = d - 7;
    }
    else if (str == "april")
    {
        d = doomsday(y) + 4;
        if (d > 6)
            d = d - 7;
    }
    else if (str == "may")
    {
        d = doomsday(y) - 1;
        if (d < 0)
            d = d + 7;
    }
    else if (str == "june")
    {
        d = doomsday(y) + 2;
        if (d > 6)
            d = d - 7;
    }
    else if (str == "july")
    {
        d = doomsday(y) - 3;
        if (d < 0)
            d = d + 7;
    }
    else if (str == "august")
    {
        d = doomsday(y);
    }
    else if (str == "september")
    {
        d = doomsday(y) + 3;
        if (d > 6)
            d = d - 7;
    }
    else if (str == "october")
    {
        d = doomsday(y) - 2;
        if (d < 0)
            d = d + 7;
    }
    else if (str == "november")
    {
        d = doomsday(y) + 1;
        if (d > 6)
            d = d - 7;
    }
    else if (str == "december")
    {
        d = doomsday(y) - 4;
        if (d < 0)
            d = d + 7;
    }

    for (int i = 0; i < str.size(); i++)
    {
        if (str[i] >= 97)
            str[i] -= 32; // converting to all caps
    }

    // the layout

    HANDLE h = GetStdHandle(STD_OUTPUT_HANDLE);
    SetConsoleTextAttribute(h, 14);

    cout << "\n\n             " << str << " " << y << "         \n\n";
    cout << "     S   M   T   W   T   F   S \n\n";

    cout << "     ";

    for (int i = 1; i <= d; i++)
        cout << "    "; // the position of the first day
    cout << "1   ";

    for (int j = 2; j <= n; j++)
    {
        if (j >= 10) // they take up more space
        {
            if ((d + j - 1)%7 == 0) // they go into the next line
            cout << "\n     ";

        cout << j << "  ";
        }
        else
        {
            if ((d + j - 1)%7 == 0) // they go into the next line
            cout << "\n     ";

        cout << j << "   ";
        }
    }

    cout << "\n\n";

    SetConsoleTextAttribute(h, 0);

    return 0;
}

int doomsday (int y) // John Conway's algorithm
{
    int sum = 0;

    if (y >= 2000)
    {
        int y1 = y%2000; // years after the turn of the millenium
        sum = 2 + y1/12 + y1%12 + (y1%12)/4;
    }

    else if (y < 2000 && y >= 1900)
    {
        int y1 = y%1900; // years after the turn of the millenium
        sum = 3 + y1/12 + y1%12 + (y1%12)/4;
    }

    /* doomsday number of that century + times twelve goes into it +
       remainder + times four goes into the remainder */

    return sum%7; // seven days a week
}
