// Utilisez CustomBrowserRouter dans votre application
import { Helmet } from "react-helmet";
import { Button } from "./components/ui/button";
import CardProduct from "@/components/CardProduct";
import { Product } from "./types/Product";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./hook";
import { RootState } from "./@redux/store";
import ErrorPage from "./error-page";
import { readAllProducts } from "./@redux/action/products.action";
import { Link } from "react-router-dom";

export default function root() {
  const iconUrl = "/vite.svg";
  const categories = [
    {
      src: "./images/ski-alpin.jpg",
      alt: "Ski alpin",
      name: "Ski alpin",
      slug: "ski-alpin",
    },
    {
      src: "./images/snowboard.jpg",
      alt: "Snowboard",
      name: "Snowboard",
      slug: "snowboard",
    },
    {
      src: "./images/batons.jpg",
      alt: "Bâton",
      name: "Bâtons de skis",
      slug: "baton",
    },
    {
      src: "./images/shoes.jpg",
      alt: "Chaussures",
      name: "Chaussures de skis",
      slug: "chaussure",
    },
    {
      src: "./images/sac-a-dos.jpg",
      alt: "Sac à dos",
      name: "Sac à dos",
      slug: "sac-a-dos",
    },
    { src: "./images/velos.jpg", alt: "velo", name: "Vélos", slug: "velos" },
  ];
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useAppDispatch();
  const { products, loading, error } = useAppSelector(
    (state: RootState) => state.products
  );

  if (error) {
    return <ErrorPage />;
  }

  useEffect(() => {
    if (!products.length && !loading && !error) {
      dispatch(readAllProducts());
    }
  }, [dispatch, products]);

  useEffect(() => {
    if (products.length && !loading) {
      setIsLoading(false);
    }
  }, [products]);

  const valueProducts = products.filter(
    (product: Product) => product.value === true || product.value === 1
  ) as Product[];

  return (
    <>
      <Helmet>
        <title>Accueil - e-commerce</title>
        <meta
          name="description"
          content="Ceci est la meta-description de mon site e-commerce"
        />
        <meta name="keywords" content="Mots-clés par défaut" />
        {iconUrl && <link rel="icon" href={iconUrl} type="image/svg+xml" />}
      </Helmet>

      <div className="space-y-2">
        <section className="relative">
          <figure className="z-10 absolute md:left-10 md:top-5">
            <img
              src="./images/snowboard.png"
              alt=""
              className="h-[10rem] md:h-[15rem] xl:h-[20rem]"
            />
          </figure>
          <figure className="z-10 absolute right-60 top-0">
            <img
              src="./images/telesiege.png"
              alt=""
              className="hidden xl:block xl:h-[15rem]"
            />
          </figure>
        </section>
        <section className="relative flex justify-center md:justify-end py-8">
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {categories.map((category, index) => (
              <li key={index} className="space-y-2">
                <figure className="relative h-[16rem] xl:h-[20rem] w-[18rem] xl:w-[22rem]">
                  <img
                    src={category.src}
                    alt={category.alt}
                    className="h-full w-full object-cover rounded-tl-lg rounded-br-lg"
                  />
                </figure>
                <Button>
                  <Link to={`/products/${category.slug}`}>{category.name}</Link>
                </Button>
              </li>
            ))}
          </ul>
          <figure className="z-10 absolute left-0 -bottom-28 md:bottom-0">
            <img
              src="./images/telepherique.png"
              alt=""
              className="h-[10rem] md:h-[22rem]"
            />
          </figure>
        </section>

        <section className="relative px-12 space-y-2 pt-4">
          {valueProducts.length > 0 && (
            <>
              <figure className="z-10 absolute right-0 md:right-5 top-0">
                <img
                  src="./images/masque.png"
                  alt=""
                  className="h-[4rem] md:h-[8rem] xl: h-[10rem]"
                />
              </figure>
              <h2 className="w-full text-xl flex justify-center">
                En ce moment
              </h2>
              <ul className="w-full flex overflow-x-auto">
                {valueProducts &&
                  valueProducts.map((product, index) => (
                    <CardProduct
                      key={index}
                      isLoading={false}
                      product={product}
                      categorySlug={product.name}
                    />
                  ))}
              </ul>
            </>
          )}
        </section>
      </div>
    </>
  );
}
