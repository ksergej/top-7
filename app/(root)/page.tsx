import {Container, Filters, Title, TopBar, Stories} from "@/shared/components/shared";
import {ProductsGroupList} from "@/shared/components/shared/products-group-list";
import {findPizzas, GetSearchParams} from "@/shared/lib/find-pizzas";

export default async function Home(props: { searchParams: Promise<GetSearchParams> }) {
  const searchParams = await props.searchParams;

  const categories = await findPizzas(searchParams);

  return <>
    <Container className="mt-5">
      <Title text="Kategorien" size="lg" className="font-extrabold"/>

    </Container>

    <TopBar categories={categories.filter(category => category.products.length > 0)}/>

    <Stories/>

    <Container className="mt-10 pb-14">

      <div className="flex gap-[80px]">

        {/* Фильтрация */}
        <div className="w-[250px]">
          <Filters/>
        </div>

        {/* Список товаров */}
        <div className="flex-1">
          <div className="flex flex-col gap-16">
            {
              categories.map((category) =>
                  category.products.length > 0 && (
                    <ProductsGroupList
                      key={category.id}
                      title={category.name}
                      categoryId={category.id}
                      items={category.products}
                    />
                  ),
              )}
          </div>
        </div>
      </div>

    </Container>

  </>;
}
