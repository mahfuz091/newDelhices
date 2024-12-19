import logo from "../../assets/images/logo.svg";
import info1 from "../../assets/images/info1.svg";
import info2 from "../../assets/images/info2.svg";
import info3 from "../../assets/images/info3.svg";
import info4 from "../../assets/images/info4.svg";

const widgetSocial = [
  {
    id: 1,
    icon: "fab fa-facebook-f",
    href: "https://facebook.com",
    title: "Facebook",
  },

  {
    id: 2,
    icon: "fab fa-x-twitter",
    href: "https://twitter.com",
    title: "Twitter",
  },
  {
    id: 3,
    icon: "fab fa-instagram",
    href: "https://instagram.com",
    title: "Instagram",
  },
  {
    id: 4,
    icon: "fab fa-linkedin-in",
    href: "https://www.linkedin.com/",
    title: "Twitter",
  },
];

const infos = {
  title: "INFORMATION",
  info: [
    {
      id: 1,
      image: info1,
    },
    {
      id: 2,
      image: info2,
    },
    {
      id: 3,
      image: info3,
    },
    {
      id: 4,
      image: info4,
    },
  ],
};

const footerData = {
  logo,

  infos,

  widgetText:
    "Notre travail est de remplir votre ventre de nourriture délicieuse et avec une livraison rapide et gratuite.",
  widgetInfo: {
    location: "8 RUE DES PERRIERES 21000 DIJON",
    locationIcon: "icofont-location-pin",
    tel: "099 695 695 35",
    telIcon: "icofont-phone",
    subHref: "tel",
  },
  widgetSocial,
  about: [
    { id: 1, href: "/", title: "Maison" },
    { id: 2, href: "/", title: "Menu" },
    { id: 3, href: "/", title: "Services" },
    { id: 4, href: "/", title: "Contact" },
  ],
};

export default footerData;
