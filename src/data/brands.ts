export type Brand = {
  name: string;
  slug: string;
  logo: string;
  href: string;
};

export const brands: Brand[] = [
  {
    name: "Apple",
    slug: "apple",
    logo: "/brands/apple.png",
    href: "/products?brand=Apple",
  },
  {
    name: "Dell",
    slug: "dell",
    logo: "/brands/dell.png",
    href: "/products?brand=Dell",
  },
  {
    name: "ASUS",
    slug: "asus",
    logo: "/brands/asus.png",
    href: "/products?brand=ASUS",
  },
  {
    name: "Lenovo",
    slug: "lenovo",
    logo: "/brands/lenovo.png",
    href: "/products?brand=Lenovo",
  },
  {
    name: "HP",
    slug: "hp",
    logo: "/brands/hp.png",
    href: "/products?brand=HP",
  },
  {
    name: "Razer",
    slug: "razer",
    logo: "/brands/razer.png",
    href: "/products?brand=Razer",
  },
  // { name: "Microsoft", slug: "microsoft", logo: "/brands/microsoft.png", href: "/products?brand=Microsoft" },
  {
    name: "Acer",
    slug: "acer",
    logo: "/brands/acer.png",
    href: "/products?brand=Acer",
  },
];
