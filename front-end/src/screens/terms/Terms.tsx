import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";

export const Terms = (): JSX.Element => {
  return (
    <div className="flex flex-col justify-between w-full min-h-[100vh] gap-8">
      <Header />
      <div className=" w-full flex items-start px-8 justify-start flex-col gap-8 h-full">
        <p className="bg-gradient-to-r from-[#e470b6] to-[#fd8e93] inline-block text-transparent bg-clip-text font-bold text-2xl">Temos de uso</p>
        <h2><span>1. Termos</span></h2>
        <p><span>Ao acessar ao site <a href="http://estoudoando.com.br/">Estou Doando</a>, concorda em cumprir estes termos de serviço, todas as leis e regulamentos aplicáveis ​​e concorda que é responsável pelo cumprimento de todas as leis locais aplicáveis. Se você não concordar com algum desses termos, está proibido de usar ou acessar este site. Os materiais contidos neste site são protegidos pelas leis de direitos autorais e marcas comerciais aplicáveis.</span></p><h2><span>2. Uso de Licença</span></h2><p><span>É concedida permissão para baixar temporariamente uma cópia dos materiais (informações ou software) no site Estou Doando , apenas para visualização transitória pessoal e não comercial. Esta é a concessão de uma licença, não uma transferência de título e, sob esta licença, você não pode:&nbsp;</span></p><ol><li><span>modificar ou copiar os materiais;&nbsp;</span></li><li><span>usar os materiais para qualquer finalidade comercial ou para exibição pública (comercial ou não comercial);&nbsp;</span></li><li><span>tentar descompilar ou fazer engenharia reversa de qualquer software contido no site Estou Doando;&nbsp;</span></li><li><span>remover quaisquer direitos autorais ou outras notações de propriedade dos materiais; ou&nbsp;</span></li><li><span>transferir os materiais para outra pessoa ou 'espelhe' os materiais em qualquer outro servidor.</span></li></ol><p><span>Esta licença será automaticamente rescindida se você violar alguma dessas restrições e poderá ser rescindida por Estou Doando a qualquer momento. Ao encerrar a visualização desses materiais ou após o término desta licença, você deve apagar todos os materiais baixados em sua posse, seja em formato eletrónico ou impresso.</span></p><h2><span>3. Isenção de responsabilidade</span></h2><ol><li><span>Os materiais no site da Estou Doando são fornecidos 'como estão'. Estou Doando não oferece garantias, expressas ou implícitas, e, por este meio, isenta e nega todas as outras garantias, incluindo, sem limitação, garantias implícitas ou condições de comercialização, adequação a um fim específico ou não violação de propriedade intelectual ou outra violação de direitos.</span></li><li><span>Além disso, o Estou Doando não garante ou faz qualquer representação relativa à precisão, aos resultados prováveis ​​ou à confiabilidade do uso dos materiais em seu site ou de outra forma relacionado a esses materiais ou em sites vinculados a este site.</span></li></ol><h2><span>4. Limitações</span></h2><p><span>Em nenhum caso o Estou Doando ou seus fornecedores serão responsáveis ​​por quaisquer danos (incluindo, sem limitação, danos por perda de dados ou lucro ou devido a interrupção dos negócios) decorrentes do uso ou da incapacidade de usar os materiais em Estou Doando, mesmo que Estou Doando ou um representante autorizado da Estou Doando tenha sido notificado oralmente ou por escrito da possibilidade de tais danos. Como algumas jurisdições não permitem limitações em garantias implícitas, ou limitações de responsabilidade por danos conseqüentes ou incidentais, essas limitações podem não se aplicar a você.</span></p><h2><span>5. Precisão dos materiais</span></h2><p><span>Os materiais exibidos no site da Estou Doando podem incluir erros técnicos, tipográficos ou fotográficos. Estou Doando não garante que qualquer material em seu site seja preciso, completo ou atual. Estou Doando pode fazer alterações nos materiais contidos em seu site a qualquer momento, sem aviso prévio. No entanto, Estou Doando não se compromete a atualizar os materiais.</span></p><h2><span>6. Links</span></h2><p><span>O Estou Doando não analisou todos os sites vinculados ao seu site e não é responsável pelo conteúdo de nenhum site vinculado. A inclusão de qualquer link não implica endosso por Estou Doando do site. O uso de qualquer site vinculado é por conta e risco do usuário.</span></p><p></p><h3><span>Modificações</span></h3><p><span>O Estou Doando pode revisar estes termos de serviço do site a qualquer momento, sem aviso prévio. Ao usar este site, você concorda em ficar vinculado à versão atual desses termos de serviço.</span></p><h3><span>Lei aplicável</span></h3><p><span>Estes termos e condições são regidos e interpretados de acordo com as leis do Estou Doando e você se submete irrevogavelmente à jurisdição exclusiva dos tribunais naquele estado ou localidade.</span></p>
      </div>
      <Footer />
    </div>
  );
};
 