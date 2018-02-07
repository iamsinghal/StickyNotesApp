using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ASSIGNMENT_1
{
    class Program
    {
        static void Main(string[] args)
        {
            Circle c;
            double radius;
            string temp;
            do
            {
                Console.Write("Enter Circle Radius: ");
                temp = Console.ReadLine();
            } while (!double.TryParse(temp, out radius) || radius < 0);
            c = new Circle(radius);
            bool flag = false;
            do
            {
                int option = 0;

                Console.WriteLine("-------------------------------------------------");
                Console.WriteLine("Please select from the following options");
                Console.WriteLine("Press 1 to Add to circle radius");
                Console.WriteLine("Press 2 to Subtract from circle radius");
                Console.WriteLine("Press 3 to Calculate circle circumference");
                Console.WriteLine("Press 4 to Calculate circle area");
                Console.WriteLine("Press 5 to Exit");
                Console.Write("Your choice: ");
                int.TryParse(Console.ReadLine(), out option);
                Console.WriteLine("-------------------------------------------------");

                switch (option)
                {
                    case 1:
                        double add;
                        string t;
                        do
                        {
                            Console.WriteLine("Enter value to be added to circle radius: ");
                            t = Console.ReadLine();
                        } while (!double.TryParse(t, out add));
                        c.AddToRadius(add);
                        break;
                    case 2:
                        double subtract;
                        string q;
                        do
                        {
                            Console.WriteLine("Enter value to be subtracted from circle radius: ");
                            q = Console.ReadLine();
                        } while (!double.TryParse(q, out subtract));
                        c.SubtractFromRadius(subtract);
                        break;
                    case 3:
                        Console.WriteLine("Circumference of circle with radius {0} is {1}", c.radius, c.GetCircumference());
                        break;
                    case 4:
                        Console.WriteLine("Area of circle with radius {0} is {1}", c.radius, c.GetArea());
                        break;
                    case 5:
                        flag = true;
                        Environment.Exit(0);
                        break;
                    default:
                        Console.WriteLine("Invalid input! Please try again.");
                        break;
                }
            } while (!flag);
        }
    }
}