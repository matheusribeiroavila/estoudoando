import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";

export const About = (): JSX.Element => {
  return (
    <div className="flex flex-col justify-between w-full min-h-[100vh] gap-8">
      <Header />
      <div className=" w-full flex items-center flex-col gap-8 h-full p-4">
        <div className="grid md:grid-cols-3 grid-cols-1 gap-8 items-center max-w-[80rem]">
          <div className="col-span-2 flex flex-col gap-4">
            <p className="bg-gradient-to-r from-[#e470b6] to-[#fd8e93] inline-block text-transparent text-center md:text-start bg-clip-text font-bold text-xl">Sobre nós</p>
            <h1 className="text-center md:text-start font-bold text-5xl ">A esperança se <b className="bg-gradient-to-r from-[#e470b6] to-[#fd8e93] inline-block text-transparent bg-clip-text">veste</b> de <b className="bg-gradient-to-r from-[#e470b6] to-[#fd8e93] inline-block text-transparent bg-clip-text">Doações.</b></h1>
            <p className="text-lg md:text-start text-center">O <b className="bg-gradient-to-r from-[#e470b6] to-[#fd8e93] inline-block text-transparent bg-clip-text">Rio Grande do Sul</b> se encontra em estado de calamidade, com mais de <b className="bg-gradient-to-r from-[#e470b6] to-[#fd8e93] inline-block text-transparent bg-clip-text">400 cidades submersas</b> pelas inundações. Diante dessa situação, sentimos a necessidade de <b className="bg-gradient-to-r from-[#e470b6] to-[#fd8e93] inline-block text-transparent bg-clip-text">agir.</b> Queríamos conectar pessoas que desejam ajudar com aquelas que precisam, de forma rápida e eficiente.
              Assim nasceu o <b className="bg-gradient-to-r from-[#e470b6] to-[#fd8e93] inline-block text-transparent bg-clip-text">estoudoando,</b> um mecanismo de busca de doações de roupas que utiliza a tecnologia <b className="bg-gradient-to-r from-[#e470b6] to-[#fd8e93] inline-block text-transparent bg-clip-text">Gemini</b> para <b className="bg-gradient-to-r from-[#e470b6] to-[#fd8e93] inline-block text-transparent bg-clip-text">facilitar a conexão entre doadores e necessitados.</b></p>

          </div>
          <div className="col-span-1">
            <img src="/logo.svg" alt="" />
          </div>
          <div className="md:col-span-1 col-span-2">
            <img src="/photo.svg" alt="" className="md:w-auto w-full h-80 object-cover" />
          </div>
          <div className="col-span-2 flex flex-col md:items-end items-center gap-4">
            <h1 className=" text-center md:text-end font-bold text-5xl "><b className="bg-gradient-to-r from-[#e470b6] to-[#fd8e93] inline-block text-transparent bg-clip-text">A força da comunidade em ação</b></h1>
            <p className="text-lg text-center md:text-start">Através do nosso sistema integrado ao Telegram, as pessoas podem compartilhar fotos das doações que desejam oferecer, e o <b className="bg-gradient-to-r from-[#e470b6] to-[#fd8e93] inline-block text-transparent bg-clip-text">Gemini</b>  identifica os materiais e gera informações em um banco de dados.
              Isso permite que os usuários do site  <b className="bg-gradient-to-r from-[#e470b6] to-[#fd8e93] inline-block text-transparent bg-clip-text">pesquisem facilmente por doações específicas </b> e entrem em contato com os doadores diretamente. </p>
            <div className="">

              <a
                href="/home"
                className={`p-2 px-8 bg-gradient-to-r  text-xl from-[#e470b6] to-[#fd8e93] rounded-xl text-white`}
                aria-label="About"
              >
                Fazer pesquisa
              </a>
            </div>
            <p className="bg-gradient-to-r from-[#e470b6] to-[#fd8e93] inline-block text-transparent bg-clip-text font-bold text-xl mr-2">Ou</p>
            <a target="_blank" href='https://t.me/estoudoando_bot' className="bg-gradient-to-r from-[#e470b6] to-[#fd8e93] inline-block text-transparent bg-clip-text font-bold text-xl mr-2">Quero ser doador</a>



          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
