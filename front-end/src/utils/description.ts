export function separarItens(respostas: string): string {
    // Divide a descrição em itens separados
    const itens = respostas.split('\n').map(item => item.trim());

    // Remove os dois primeiros caracteres de cada item e os coloca em um novo array
    const itensSemDoisPrimeirosCaracteres = itens.map(item => item.substring(2));

    // Concatena todos os itens em uma única string, separados por vírgula
    const resultado = itensSemDoisPrimeirosCaracteres.join(', ');

    // Adiciona 'e' antes do último item
    
    const itensSeparados = resultado.substring(0, resultado.lastIndexOf(',')) + ' e ' + resultado.substring(resultado.lastIndexOf(',') + 2);

    return itensSeparados;


}