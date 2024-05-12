import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
export const Header = (): JSX.Element => {
  const path = window.location.pathname;
  const [menu, setMenu] = useState(false)
  return (
    <section className="flex md:justify-center justify-between w-full items-center h-12 bg-[#1D1D1F]">
      <nav className="md:flex hidden">
        <ul className="flex items-center space-x-4 gap-8">
          <li>
            <a
              href="/home"
              className={`${path === '/home' ? 'bg-gradient-to-r from-[#e470b6] to-[#fd8e93] inline-block text-transparent bg-clip-text font-500' : ' text-white hover:text-gray-300'} text-sm  uppercase`}
              aria-label="Home"
            >
              Início
            </a>
          </li>
          <li>
            <a
              href="/about"
              className={`${path === '/about' ? 'bg-gradient-to-r from-[#e470b6] to-[#fd8e93] inline-block text-transparent bg-clip-text font-500' : ' text-white hover:text-gray-300'} text-sm uppercase`}
              aria-label="About"
            >
              Sobre nós
            </a>
          </li>
          <li>
            <a
              href="/terms"
              className={`${path === '/terms' ? 'bg-gradient-to-r from-[#e470b6] to-[#fd8e93] inline-block text-transparent bg-clip-text font-500' : ' text-white hover:text-gray-300'} text-sm uppercase`}
              aria-label="About"
            >
              Termos de uso
            </a>
          </li>
          <li>
            <a
              href="https://t.me/estoudoando_bot"
              target="_blank"
              className={`p-2 bg-gradient-to-r from-[#e470b6] to-[#fd8e93] rounded text-white text-sm uppercase`}
              aria-label="About"
            >
              Quero ser doador
            </a>
          </li>
        </ul>
      </nav>

      <div className="flex md:hidden w-full items-center justify-between space-x-4 gap-8">
        <div className="relative w-full ">
          <button onClick={() => setMenu(!menu)}>
          <GiHamburgerMenu className="text-white ml-4" />
          </button>
          {menu &&
            <div className="absolute -bottom-[11rem] bg-[#1D1D1F] p-1 flex flex-col gap-4 w-80 py-8 z-20">

              <li>
                <a
                  href="/home"
                  className={`${path === '/home' ? 'bg-gradient-to-r from-[#e470b6] to-[#fd8e93] inline-block text-transparent bg-clip-text font-500' : ' text-white hover:text-gray-300'} text-sm  uppercase`}
                  aria-label="Home"
                >
                  Início
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className={`${path === '/about' ? 'bg-gradient-to-r from-[#e470b6] to-[#fd8e93] inline-block text-transparent bg-clip-text font-500' : ' text-white hover:text-gray-300'} text-sm uppercase`}
                  aria-label="About"
                >
                  Sobre nós
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  className={`${path === '/terms' ? 'bg-gradient-to-r from-[#e470b6] to-[#fd8e93] inline-block text-transparent bg-clip-text font-500' : ' text-white hover:text-gray-300'} text-sm uppercase`}
                  aria-label="About"
                >
                  Termos de uso
                </a>
              </li>
            </div>
          }
        </div>


        <a
          href="https://t.me/estoudoando_bot"
          target="_blank"
          className={`p-2 text-nowrap bg-gradient-to-r from-[#e470b6] to-[#fd8e93] rounded text-white text-sm uppercase`}
          aria-label="About"
        >
          Quero ser doador
        </a>

      </div>

    </section>
  );
};
