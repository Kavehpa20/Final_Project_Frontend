import {
  Footer,
  FooterBrand,
  FooterCopyright,
  FooterDivider,
  FooterIcon,
  FooterLink,
  FooterLinkGroup,
  FooterTitle,
} from "flowbite-react";
import {
  BsDribbble,
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsTwitter,
} from "react-icons/bs";

import type { CustomFlowbiteTheme } from "flowbite-react";
import { Flowbite } from "flowbite-react";

const FooterTheme: CustomFlowbiteTheme = {
  footer: {
    root: {
      base: "w-full bg-whit mt-2 rounded-lg dark:bg-gray-700 shadow md:flex md:items-center md:justify-between",
      container: "w-full p-6",
      bgDark: "bg-gray-700",
    },
    groupLink: {
      base: "flex flex-wrap text-center text-sm text-brown-900 hover:border-brown-200 hover:text-brown-500 dark:text-brown-200",
      link: {
        base: "last:mr-0 md:mr-6 me-4",
        href: "hover:underline",
      },
      col: "flex-col gap-4",
    },
    icon: {
      base: "text-brown-900 hover:text-brown-500 hover:dark:text-brown-100 dark:text-brown-200",
      size: "h-8 w-8",
    },
    title: {
      base: "mb-6 text-sm text-center font-semibold uppercase text-brown-900 dark:text-brown-200",
    },
    divider: {
      base: "w-full my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8",
    },
    copyright: {
      base: "text-sm text-brown-900 dark:text-brown-200 sm:text-center",
      href: "ml-1 hover:underline",
      span: "ml-1",
    },
    brand: {
      base: "mb-4 flex items-center sm:mb-0",
      img: "mx-1 h-12",
      span: "self-center whitespace-nowrap text-2xl font-semibold text-brown-900 dark:text-brown-200",
    },
  },
};

export default function FooterComponent() {
  return (
    <Flowbite theme={{ theme: FooterTheme }}>
      <Footer container>
        <div className="w-full">
          <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
            <div className="hidden dark:block">
              <FooterBrand
                href="/"
                src="/Assets/pictures/alpha-coffee-logo-dark.png"
                alt="alpha-coffee-logo"
                name="قهوه آلفا"
              />
            </div>
            <div className="block dark:hidden">
              <FooterBrand
                href="/"
                src="/Assets/pictures/alpha-coffee-logo.png"
                alt="alpha-coffee-logo"
                name="Alpha Coffee"
              />
            </div>
            <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
              <div>
                <FooterTitle title="درباره ما" />
                <FooterLinkGroup col>
                  <FooterLink href="#">Flowbite</FooterLink>
                  <FooterLink href="#">Tailwind CSS</FooterLink>
                </FooterLinkGroup>
              </div>
              <div>
                <FooterTitle title="ما را دنبال کنید" />
                <FooterLinkGroup col>
                  <FooterLink href="#">Github</FooterLink>
                  <FooterLink href="#">Discord</FooterLink>
                </FooterLinkGroup>
              </div>
              <div>
                <FooterTitle title="شرایط" />
                <FooterLinkGroup col>
                  <FooterLink href="#">Privacy Policy</FooterLink>
                  <FooterLink href="#">Terms &amp; Conditions</FooterLink>
                </FooterLinkGroup>
              </div>
            </div>
          </div>
          <FooterDivider />
          <div className="w-full sm:flex sm:items-center sm:justify-between">
            <FooterCopyright href="/" by="قهوه آلفا™" year={2024} />
            <div className="ml-4 mt-4 flex gap-6 sm:mt-0 sm:justify-center">
              <FooterIcon href="#" icon={BsFacebook} />
              <FooterIcon href="#" icon={BsInstagram} />
              <FooterIcon href="#" icon={BsTwitter} />
              <FooterIcon href="#" icon={BsGithub} />
              <FooterIcon href="#" icon={BsDribbble} />
              <FooterIcon href="#" icon={BsFacebook} />
            </div>
          </div>
        </div>
      </Footer>
    </Flowbite>
  );
}
