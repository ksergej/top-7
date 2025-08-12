import Image from "next/image";
import {Button} from "@/components/ui/button";
import {Container, SortPopup, Title, TopBar} from "@/components/shared";
import {Categories} from "@/components/shared/categories";
import {NavigationMenuDemo} from "@/components/shared/testNavigationMenu";
import NavigationMenuWithDropdown from "@/components/shared/testNavigationMenuWithDropdown";
import {ProductCard} from "@/components/shared/product-card";
import ExampleMapComponent from "@/components/shared/exampleMapComponent";
import TestNavigationMenuMap from "@/components/shared/testNavigationMenuMap";
import TestNavigationMenuMapNested from "@/components/shared/testNavigationMenuMapNested";
import {Filters} from "@/components/shared/filters";
import {ProductsGroupList} from "@/components/shared/products-group-list";

export default function Home() {
  return <>
    <Container className="mt-5">
      <Title text="Kategorien" size="lg" className="font-extrabold"/>

    </Container>

    <TopBar/>

    <Container className="mt-10 pb-14">

      <div className="flex gap-[80px]">

        {/* Фильтрация */}
        <div className="w-[250px]">
          <Filters/>
        </div>

        {/* Список товаров */}
        <div className="flex-1">
          <div className="flex flex-col gap-16">
            <ProductsGroupList title={"Пиццы"} items={[
              {
                id:1,
                name: "Salamander",
                imageUrl: 'https://media.dodostatic.net/image/r:292x292/0197d0d4283575589ff0032eadd7cb68.avif',
                price: 550,

              },
              {
                id:2,
                name: "Salamander",
                imageUrl: 'https://media.dodostatic.net/image/r:292x292/0197d0d4283575589ff0032eadd7cb68.avif',
                price: 550,

              },
              {
                id:3,
                name: "Salamander",
                imageUrl: 'https://media.dodostatic.net/image/r:292x292/0197d0d4283575589ff0032eadd7cb68.avif',
                price: 550,

              },
              {
                id:4,
                name: "Salamander",
                imageUrl: 'https://media.dodostatic.net/image/r:292x292/0197d0d4283575589ff0032eadd7cb68.avif',
                price: 550,

              },
              {
                id:5,
                name: "Salamander",
                imageUrl: 'https://media.dodostatic.net/image/r:292x292/0197d0d4283575589ff0032eadd7cb68.avif',
                price: 550,

              },
              {
                id:6,
                name: "Salamander",
                imageUrl: 'https://media.dodostatic.net/image/r:292x292/0197d0d4283575589ff0032eadd7cb68.avif',
                price: 550,

              },
             ]} categoryId={1}
            />
            <ProductsGroupList title={"Комбо"} items={[
              {
                id:1,
                name: "Salamander",
                imageUrl: 'https://media.dodostatic.net/image/r:292x292/0197d0d4283575589ff0032eadd7cb68.avif',
                price: 550,

              },
              {
                id:2,
                name: "Salamander",
                imageUrl: 'https://media.dodostatic.net/image/r:292x292/0197d0d4283575589ff0032eadd7cb68.avif',
                price: 550,

              },
              {
                id:3,
                name: "Salamander",
                imageUrl: 'https://media.dodostatic.net/image/r:292x292/0197d0d4283575589ff0032eadd7cb68.avif',
                price: 550,

              },
              {
                id:4,
                name: "Salamander",
                imageUrl: 'https://media.dodostatic.net/image/r:292x292/0197d0d4283575589ff0032eadd7cb68.avif',
                price: 550,

              },
              {
                id:5,
                name: "Salamander",
                imageUrl: 'https://media.dodostatic.net/image/r:292x292/0197d0d4283575589ff0032eadd7cb68.avif',
                price: 550,

              },
              {
                id:6,
                name: "Salamander",
                imageUrl: 'https://media.dodostatic.net/image/r:292x292/0197d0d4283575589ff0032eadd7cb68.avif',
                price: 550,

              },
             ]} categoryId={2}
            />
          </div>
        </div>

      </div>

    </Container>

  </>;
}
