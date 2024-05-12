export const Footer = (): JSX.Element => {
  const path = window.location.pathname;
  return (
    <section className="flex flex-col gap-8 justify-start items-center py-8 min-h-80 bg-[#1D1D1F] w-full">
      <img src="/logo-h-w.svg" alt="" />

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
      <h1 className=" text-center text-white font-bold text-5xl max-w-[50rem]">A esperança se <b className="bg-gradient-to-r from-[#e470b6] to-[#fd8e93] inline-block text-transparent bg-clip-text">veste</b> de <b className="bg-gradient-to-r from-[#e470b6] to-[#fd8e93] inline-block text-transparent bg-clip-text">Doações.</b></h1>
      <span className="text-white text-[8px] px-2 md:px-20">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam magna odio, viverra a dapibus sed, semper id dolor. Duis imperdiet, arcu vel porttitor tristique, felis ligula faucibus sapien, id blandit risus turpis at sapien. Maecenas accumsan ultrices rutrum. Duis auctor velit eros, eget imperdiet velit blandit sed. Curabitur ex ipsum, sagittis vitae facilisis sed, facilisis sed metus. Etiam et turpis rhoncus dolor cursus sagittis eget id leo. Nulla dapibus feugiat gravida. Etiam malesuada tincidunt dolor, non pretium velit posuere id. Nulla eu nisi lobortis, porttitor neque quis, facilisis libero. Cras auctor lorem et facilisis feugiat. Integer dictum massa leo, at egestas ipsum tristique et. Sed vitae metus ac massa finibus pellentesque in a lectus.</span>
    </section>
  );
};
