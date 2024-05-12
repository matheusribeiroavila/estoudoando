import { Header } from "../../components/Header";
import { IoIosSearch } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";
import { Footer } from "../../components/Footer";
import { separarItens } from "../../utils/description";
import { FaPaperPlane } from "react-icons/fa6";
import { Donation, findAll, findAllMoreDonation, findByZipCode } from "../../services/donationService";
import { useEffect, useState } from "react";
import { formatarCEP } from "../../utils/cep";
import { AiOutlineLoading3Quarters } from "react-icons/ai";


export const Home = (): JSX.Element => {
  const [donations, setDonations] = useState<Donation[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<Donation[]>([])
  const [suggestions, setSuggestions] = useState(false)
  const [zipCode, setZipCode] = useState("")
  const [buttonLoading, setButtonLoading] = useState(false)
  const [more, setMore] = useState(true)

  const fetchDonation = async () => {
    try {
      const response = await findAll()
      setDonations(response.data)
      setFilter(response.data)
      console.log(response)
      if (response.data.length === 0 || response.data.length < 25) {
        setMore(false)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
  const fetchDonationZip = async () => {
    try {
      const response = await findByZipCode(zipCode)
      if (response.data) {
        //@ts-ignore
        setDonations(response.data)
        //@ts-ignore
        setFilter(response.data)
      } else {
        setFilter([])
      }
      console.log(response)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const fetchDonationsMore = async (id: string) => {
    try {
      const response = await findAllMoreDonation(id)
      if (response.data.length === 0 || response.data.length < 25) {
        setMore(false)
      }
      setDonations([...donations, ...response.data])
      setFilter([...donations, ...response.data])
      console.log(response)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const handleMoreDonations = async () => {
    setButtonLoading(true)
    if (donations.length > 0) {
      // Obter o último objeto do array
      const ultimoDonation = donations[donations.length - 1];

      // Verificar se o último objeto possui o campo _id
      if (ultimoDonation && ultimoDonation._id) {
        // Salvar o _id do último objeto em uma constante
        const ultimoId = ultimoDonation._id;
        fetchDonationsMore(ultimoId)
        // Agora você pode usar a constante `ultimoId` conforme necessário
      } else {
        console.log('O último Blog não possui um ID válido.');
      }
    } else {
      console.log('O array de Blogs está vazio.');
    }
    setButtonLoading(false)
  }

  useEffect(() => {

    fetchDonation()
  }
    , [])

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    if (event.target.value === "") setFilter(donations);
  };


  const handleSearchRequest = (request: string) => {
    setSuggestions(true)
    if (zipCode.length !== 8) {



      const searchWords = request.split(" ").filter((word) => word.trim() !== "");
      const filtered = donations.filter((donation) =>
        searchWords.some((word) =>
          donation.description.toLowerCase().includes(word.toLowerCase())
        )
      );
      setFilter(filtered);
    } else {
      fetchDonationZip()

    }
  };






  return (
    <div className="flex flex-col justify-between w-full min-h-[100vh] gap-8">
      <Header />
      <div className="px-2 md:px-0 w-full flex items-center flex-col gap-8 h-full">
        <img src="/logo-h.svg" alt="" />
        <h1 className=" text-center font-bold text-6xl max-w-[40rem]">Encontre <b className="bg-gradient-to-r from-[#e470b6] to-[#fd8e93] inline-block text-transparent bg-clip-text">doações</b> em <b className="bg-gradient-to-r from-[#e470b6] to-[#fd8e93] inline-block text-transparent bg-clip-text">segundos.</b></h1>
        <div className="w-full max-w-[40rem] flex gap-2 md:flex-row flex-col">
          <div className="relative w-full flex items-center">
            <IoIosSearch className="absolute left-4 text-xl opacity-40" />
            <input className="border-2 pl-10 w-full rounded-full h-12 focus:border-[#e46bb3] outline-none" type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Pesquisar por items..."
            />
          </div>
          <div className="relative w-full md:w-40 flex items-center">
            <IoLocationOutline className="absolute left-4 text-xl opacity-40" />
            <input className="border-2 pl-10 w-full md:w-40 rounded-full h-12 focus:border-[#e46bb3] outline-none" type="text"
              placeholder="00000-000"
              value={zipCode}
              maxLength={8}
              onChange={(e) => setZipCode(e.target.value)}
            />
          </div>
        </div>
        <button
          onClick={() => handleSearchRequest(searchQuery)}
          className={`p-2 px-8 bg-gradient-to-r text-xl from-[#e470b6] to-[#fd8e93] rounded-xl text-white`}
          aria-label="About"
        >
          Fazer pesquisa
        </button>
        {!suggestions ?
          <p className=" text-center text-lg max-w-[40rem]">Aqui esta algumas <b className="bg-gradient-to-r from-[#e470b6] to-[#fd8e93] inline-block text-transparent bg-clip-text">ideias</b> do que <b className="bg-gradient-to-r from-[#e470b6] to-[#fd8e93] inline-block text-transparent bg-clip-text">pesquisar.</b></p>
          :
          <p className=" text-center text-lg max-w-[40rem]">Esse foi o <b className="bg-gradient-to-r from-[#e470b6] to-[#fd8e93] inline-block text-transparent bg-clip-text">resulado</b> que <b className="bg-gradient-to-r from-[#e470b6] to-[#fd8e93] inline-block text-transparent bg-clip-text">encontramos.</b></p>
        }
        {!suggestions &&
          <div className="max-w-[50rem] w-full gap-4 grid md:grid-cols-3">
            <button onClick={() => {
              setSearchQuery('Preciso de bermuda')
              handleSearchRequest('Preciso de bermuda')
              setSuggestions(true)

            }} className="bg-white col-span-1 flex items-center p-4 h-40 rounded-xl shadow-lg shadow-black/20 relative font-bold">
              <IoIosSearch className="absolute top-4 right-4 text-2xl " />
              <p className=" text-start text-2xl max-w-[40rem]"><b className="bg-gradient-to-r from-[#e470b6] to-[#fd8e93] inline-block text-transparent bg-clip-text">Preciso de</b> bermuda.</p>
            </button>
            <button onClick={() => {
              setSearchQuery('Estou procurando sapato')
              handleSearchRequest('Estou procurando sapato')
              setSuggestions(true)
            }} className="bg-white col-span-1 items-center flex p-4 h-40 rounded-xl shadow-lg shadow-black/20 relative font-bold">
              <IoIosSearch className="absolute top-4 right-4 text-2xl " />
              <p className=" text-start text-2xl max-w-[40rem]"><b className="bg-gradient-to-r from-[#e470b6] to-[#fd8e93] inline-block text-transparent bg-clip-text">Estou procurando</b> sapato.</p>
            </button>
            <button onClick={() => {
              setSearchQuery('Alguém doando camiseta')
              handleSearchRequest('Alguém doando camiseta')
              setSuggestions(true)

            }} className="bg-white col-span-1 items-center flex p-4 h-40 rounded-xl shadow-lg shadow-black/20 relative font-bold">
              <IoIosSearch className="absolute top-4 right-4 text-2xl " />
              <p className=" text-start text-2xl max-w-[40rem]"><b className="bg-gradient-to-r from-[#e470b6] to-[#fd8e93] inline-block text-transparent bg-clip-text">Alguém doando</b> camiseta.</p>
            </button>
          </div>
        }
        {loading ? <p><AiOutlineLoading3Quarters className="text-4xl text-[#e470b6] animate-spin" /></p> :
          <div className="max-w-[50rem] w-full gap-4 grid grid-cols-1 md:grid-cols-3">
            {filter.map((result) => (
              <div className="bg-white w-full flex-col gap-4 col-span-1 flex items-center p-4 rounded-xl shadow-lg shadow-black/20 relative font-bold" key={result._id}>
                <p className=" text-start text-2xl max-w-[40rem]"><b className="bg-gradient-to-r from-[#e470b6] to-[#fd8e93] inline-block text-transparent bg-clip-text">{result.user.name}</b> esta doando {separarItens(result.description)}</p>
                <img src={result.imageUrl} alt="" className="w-full bg-gray-500 h-32 rounded-2xl object-cover" />
                <a
                  href={"https://wa.me/" + result.user.phone}
                  target="_blank"
                  className={`p-2 items-center shadow-lg shadow-black/20 justify-center w-full flex flex-row gap-2 bg-gradient-to-r text-xl from-[#e470b6] to-[#fd8e93] rounded-full text-white`}
                  aria-label="About"
                >
                  entrar em contato <FaPaperPlane />
                </a>
                <div className="flex font-extralight text-[12px] w-full justify-between">

                  <p>{result.user.address.city} - {result.user.address.uf}</p>
                  <p>{formatarCEP(result.user.address.zipCode)}</p>
                </div>
              </div>
            ))}
          </div>
        }
        {more &&
          <button onClick={() => handleMoreDonations()} className="bg-gradient-to-r from-[#e470b6] to-[#fd8e93] inline-block text-transparent bg-clip-text">{buttonLoading ? 'Buscando...' : 'Ver Mais'}</button>
        }

      </div>
      <Footer />
    </div>
  );
};
