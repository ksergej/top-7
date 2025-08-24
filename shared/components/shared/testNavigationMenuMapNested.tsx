"use client";

import * as React from "react"
import Link from "next/link"
import {CircleCheckIcon, CircleHelpIcon, CircleIcon} from "lucide-react"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/shared/components/ui/navigation-menu"
import {useState} from "react";
import ExampleMapComponent from "@/shared/components/shared/exampleMapComponent";
import {cn} from "@/shared/lib/utils";

type CategoryMap = Map<string, Map<string, string[]>>;

const TestNavigationMenuMapNested = () => {

  const [dataMap, setDataMap] = useState<CategoryMap>(() => {
    // инициализация вложенного Map
    return new Map([
      [
        "Elektroartikel",
        new Map([
          ["Computer",
            ["Access Points"
              , "All in One PCs"
              , "Audiosoftware"
              , "Backup-Medien"
              , "Backup-Software"
              , "Betriebssysteme"
            ]
          ],
          ["Fotografie",
            [
              "Action-Cams"
              , "Analoge Fotografie"
              , "Augenmuscheln"
              , "Batteriegriffe"
              , "Bilderrahmen"
            ]
          ],
        ]),
      ],
      [
        "Sport & Outdoor",
        new Map([
          ["Sonstiges",
            [
              "E-Scooter"
              , "Sportnahrung"
            ]
          ],
          ["Camping",
            [
              "Camping-Kochgeschirr"
              , "Camping-Toiletten"
              , "Campinggeschirr"
              , "Campingkocher"
              , "Campinglampen"
              , "Campingmatten"
              , "Campingmöbel"
              , "Dutch Ovens"
              , "Schlafsäcke"
              , "Zelte"
              , "Zeltzubehör"
            ]
          ],
          ["Caravaning",
            [
              "Vorzelte"
              , "Wohnmobil Fenster-Zubehör"
              , "Wohnmobil Markisen-Zubehör"
              , "Wohnmobil-Ausrüstung"
              , "Wohnmobil-Fenster"
              , "Wohnmobil-Innenausstattung"
              , "Wohnmobil-Markisen"
              , "Wohnmobil-Sanitäreinrichtung"
              , "Wohnmobil-Wetterschutz"
            ]
          ],
        ]),
      ],
    ]);
  });

  return (

    <div className="inline-flex gap-1 bg-gray-50 p-1 rounded-2xl">
      <NavigationMenu className="relative " viewport={false}>
        <NavigationMenuList className='flex gap-2 '>
          {[...dataMap.entries()].map(([category, subMap]) => (
            <NavigationMenuItem key={category}>
              <NavigationMenuTrigger
                className="text-lg font-extrabold "
              >{category}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenu className="relative " viewport={false}>
                  <NavigationMenuList className='flex gap-2 '>
                    {[...subMap.entries()].map(([sub_category, items]) => (
                      <NavigationMenuItem key={sub_category}>
                        <NavigationMenuTrigger className="text-lg font-extrabold ">
                          {sub_category}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <div>
                            <ul className="grid w-[200px] gap-4 rounded-2xl ">
                              <li>
                                {items.map((item) => (
                                  <NavigationMenuLink key={item} asChild>
                                    <Link href="#">
                                      {item}
                                    </Link>
                                  </NavigationMenuLink>
                                ))}
                              </li>
                            </ul>
                          </div>
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                    ))}
                  </NavigationMenuList>
                </NavigationMenu>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>

  );
};

export default TestNavigationMenuMapNested;


