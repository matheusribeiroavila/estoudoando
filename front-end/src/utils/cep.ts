export function formatarCEP(cep: string): string {
    // Remove qualquer caractere não numérico do CEP
    const cepNumerico = cep.replace(/\D/g, '');

    // Verifica se o CEP possui o formato correto
    if (cepNumerico.length !== 8) {
        throw new Error('CEP inválido');
    }

    // Formata o CEP no formato XXXXX-XXX
    return cepNumerico.slice(0, 5) + '-' + cepNumerico.slice(5);
}