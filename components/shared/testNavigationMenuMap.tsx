"use client";

import * as React from "react"
import Link from "next/link"
import { CircleCheckIcon, CircleHelpIcon, CircleIcon } from "lucide-react"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {useState} from "react";
import ExampleMapComponent from "@/components/shared/exampleMapComponent";
import {cn} from "@/lib/utils";

type CategoryMap = Map<string, Map<string, string>>;

const TestNavigationMenuMap = () => {

// eslint-disable-next-line react-hooks/rules-of-hooks
  const [dataMap, setDataMap] = useState<CategoryMap>(() => {
    // инициализация вложенного Map
    return new Map([
      [
        "Electronics",
        new Map([
          ["Phone", "localhost:3000/docs/primitives/alert-dialog"],
          ["Laptop", "https://tweakcn.com/#examples"],
        ]),
      ],
      [
        "Furniture",
        new Map([
          ["Chair", "#"],
          ["Table", "#"],
        ]),
      ],
      [
        "Auto & Motorrad",
        new Map([
          ["Chair", "#"],
          ["Table", "#"],
        ]),
      ],
      [
        "Babyprodukte",
        new Map([
          ["Chair", "#"],
          ["Table", "#"],
        ]),
      ],
      [
        "Baumarkt",
        new Map([
          ["Chair", "#"],
          ["Table", "#"],
        ]),
      ],
      [
        "Beauty",
        new Map([
          ["Chair", "#"],
          ["Table", "#"],
        ]),
      ],
      [
        "Bekleidung",
        new Map([
          ["Chair", "#"],
          ["Table", "#"],
        ]),
      ],
        [
          "Beleuchtung",
          new Map([
            ["Chair", "#"],
            ["Table", "#"],
          ]),
        ],
        [
          "Bürobedarf",
          new Map([
            ["Chair", "#"],
            ["Table", "#"],
          ]),
        ],
        [
          "Computer & Zubehör",
          new Map([
            ["Chair", "#"],
            ["Table", "#"],
          ]),
        ],
        [
          "Drogerie & Körperpflege",
          new Map([
            ["Chair", "#"],
            ["Table", "#"],
          ]),
        ],
    ]);
  });

  return (

      <NavigationMenu className='px-10 py-10 h-5 ' viewport={false}>
      <NavigationMenuList className='flex gap-2 ' >
        {[...dataMap.entries()].map(([category, subMap]) => (
        <NavigationMenuItem key={category}>
          <NavigationMenuTrigger
              className="text-lg font-extrabold "
          >{category}</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[200px] gap-4 ">
              <li>
                {[...subMap.entries()].map(([key, label]) => (
                <NavigationMenuLink  key={key} asChild>
                  <Link href={label}>{key}</Link>
                </NavigationMenuLink>
                ))}
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>

  );
};

export default TestNavigationMenuMap;



