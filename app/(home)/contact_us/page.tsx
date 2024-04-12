"use client";

import { Button, FooterIcon } from "flowbite-react";
import { useRouter } from "next/navigation";
import {
  BsLinkedin,
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsTwitter,
} from "react-icons/bs";

export default function Home() {
  const router = useRouter();
  return (
    <main>
      <p className="my-5 h-24 whitespace-nowrap text-center text-4xl font-black text-brown-900 dark:text-brown-200 sm:block">
        طراح و سازنده انواع سایتهای مختلف
      </p>
      <p className="mb-2 mt-5 h-24 whitespace-nowrap text-center text-xl font-black text-brown-900 dark:text-brown-200 sm:block">
        از طریق شبکه های اجتماعی زیر با ما در تماس باشید
      </p>

      <div className="mb-20 mt-4 flex gap-6 sm:mt-0 sm:justify-center">
        <Button
          outline
          gradientDuoTone="tealToLime"
          onClick={() => {
            window.open(
              "https://www.linkedin.com/in/kaveh-pajoohesh-9274b1212/",
              "_blank",
            );
          }}
        >
          <BsFacebook className="ml-2 h-5 w-5" />
          Facebook
        </Button>

        <Button
          outline
          gradientDuoTone="pinkToOrange"
          onClick={() => {
            window.open("https://www.instagram.com/pkaveh20/", "_blank");
          }}
        >
          <BsInstagram className="ml-2 h-5 w-5" />
          Instagram
        </Button>

        <Button
          outline
          gradientDuoTone="greenToBlue"
          onClick={() => {
            window.open("https://twitter.com/a_real_gentle", "_blank");
          }}
        >
          <BsTwitter className="ml-2 h-5 w-5" />
          Twitter
        </Button>

        <Button
          outline
          gradientDuoTone="cyanToBlue"
          onClick={() => {
            window.open(
              "https://www.linkedin.com/in/kaveh-pajoohesh-9274b1212/",
              "_blank",
            );
          }}
        >
          <BsLinkedin className="ml-2 h-5 w-5" />
          Linkedin
        </Button>

        <Button
          outline
          gradientDuoTone="purpleToBlue"
          onClick={() => {
            window.open("https://github.com/Kavehpa20", "_blank");
          }}
        >
          <BsGithub className="ml-2 h-5 w-5" />
          Github
        </Button>
      </div>
    </main>
  );
}
