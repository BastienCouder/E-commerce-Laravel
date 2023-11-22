// Utilisez CustomBrowserRouter dans votre application
import { Helmet } from "react-helmet";
import { Button } from "./components/ui/button";
import CardProduct from "@/components/CardProduct";
import { Product } from "./types/Product";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hook";
import { RootState } from "./@redux/store";
import ErrorPage from "./error-page";
import { readAllProducts } from "./@redux/action/products.action";
import { Link } from "react-router-dom";
import { ShieldCheck, TrendingUp, CheckSquare, LineChart } from "lucide-react";
import { Separator } from "./components/ui/separator";
import ScrollVelocity from "@/components/ScrollVelocity";

export default function root() {
  const iconUrl = "/vite.svg";

  const data = [
    {
      id: 1,
      title: "Performances de Pointe",
      icon: <TrendingUp size={55} strokeWidth={1} color="#fff" />,
    },
    {
      id: 2,
      title: "Style et Confort",
      icon: <CheckSquare size={55} strokeWidth={1} color="#fff" />,
    },
    {
      id: 3,
      title: "Sécurité Avant Tout",
      icon: <ShieldCheck size={55} strokeWidth={1} color="#fff" />,
    },
    {
      id: 4,
      title: "Expérience Hivernale Complète",
      icon: <LineChart size={55} strokeWidth={1} color="#fff" />,
    },
  ];

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
      slug: "chaussures",
    },
    {
      src: "./images/sac-a-dos.jpg",
      alt: "Sac à dos",
      name: "Sac à dos",
      slug: "sac-a-dos",
    },
    { src: "./images/velos.jpg", alt: "velo", name: "Vélos", slug: "velos" },
  ];
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
        <section className="flex flex-col lg:flex-row lg:h-[30rem] relative">
          <div className="relative lg:w-2/3 h-full">
            <figure className="relative w-full h-full">
              <img
                src="./images/accueil.jpg"
                alt="banniere"
                className="h-full w-full object-cover brightness-50 grayscale-[50%]"
              />
              <h1 className="text-white text-2xl md:text-4xl absolute top-5 md:top-20 left-5 md:left-32 pr-10">
                Nouvelle collection !!
              </h1>
              <h2 className="text-white text-sm md:text-lg absolute top-14 left-5 md:top-36 md:left-32 pr-10">
                Équipez-vous pour l'aventure hivernale, où style, performance et
                sécurité se rencontrent sur chaque piste
              </h2>
            </figure>
            <div className="absolute bottom-0 right-0 w-[20rem] h-10 md:h-20 bg-primary"></div>
          </div>
          <div className="hidden lg:flex lg:w-1/3 bg-primary items-center justify-center h-full p-4 text-white">
            <ul className="flex lg:flex-col justify-center h-full space-y-8">
              {data.map((item) => (
                <li key={item.id} className="flex flex-col">
                  <div className="flex items-start text-sm space-x-8">
                    <p>{item.icon}</p>
                    <h3 className="uppercase">
                      {item.title}
                      <Separator className="mt-2 h-1" />
                    </h3>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
        <section className="relative">
          <figure className="z-10 absolute md:left-10 md:top-5">
            <img
              src="./images/snowboard.png"
              alt="snowboard"
              className="scale h-[10rem] md:h-[15rem] xl:h-[20rem]"
            />
          </figure>
          <figure className="z-10 absolute right-60 top-0">
            <img
              src="./images/telesiege.png"
              alt="telesiege"
              className="scale hidden xl:block xl:h-[15rem]"
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
              alt="telepherique"
              className="scale h-[10rem] md:h-[22rem]"
            />
          </figure>
        </section>
        <div>
          <ScrollVelocity />
        </div>
        <section className="relative px-12 space-y-2 py-4">
          {valueProducts.length > 0 && (
            <>
              <figure className="z-10 absolute right-0 md:right-5 top-0">
                <img
                  src="./images/masque.png"
                  alt="masque"
                  className="scale h-[4rem] md:h-[7rem]"
                />
              </figure>
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
