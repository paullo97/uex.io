const apiKeyOpenCage = '86c8fd4e94254a7bab95480b7e8e40d4';
const baseUrlOpenCage = 'https://api.opencagedata.com/geocode/v1/json';
const baseUrlViaCEP = 'https://viacep.com.br/ws';

/**
 * Busca endereço completo a partir de um CEP.
 * @param {string} cep - O CEP a ser consultado.
 * @returns {Promise<Object>} - Retorna os dados de localização, incluindo latitude, longitude e o endereço completo.
 */
export const buscarPorCep = async (cep) => {
  try {
    const responseViaCEP = await fetch(`${baseUrlViaCEP}/${cep}/json/`);
    const dataViaCEP = await responseViaCEP.json();

    if (dataViaCEP.erro) {
      throw new Error('Endereço não encontrado para este CEP.');
    }

    const { logradouro, bairro, localidade, uf } = dataViaCEP;
    const enderecoCompleto = `${logradouro}, ${bairro}, ${localidade} - ${uf}`;

    const responseOpenCage = await fetch(`${baseUrlOpenCage}?q=${encodeURIComponent(enderecoCompleto)}&key=${apiKeyOpenCage}&pretty=1&countrycode=br`);
    const dataOpenCage = await responseOpenCage.json();

    if (dataOpenCage.results.length > 0) {
      return {
        cep: dataViaCEP.cep,
        uf: dataViaCEP.estado,
        cidade: dataViaCEP.localidade,
        endereco: enderecoCompleto,
        latitude: dataOpenCage.results[0].geometry.lat,
        longitude: dataOpenCage.results[0].geometry.lng,
      };
    } else {
      throw new Error('Latitude e longitude não encontradas para o endereço.');
    }
  } catch (error) {
    console.error('Erro ao buscar o CEP:', error);
    throw error;
  }
};

/**
 * Busca endereço a partir de um trecho de rua, cidade ou UF.
 * @param {string} query - Trecho de rua, cidade ou UF.
 * @returns {Promise<Array>} - Retorna uma lista de endereços correspondentes.
 */
export const buscarPorEndereco = async (query) => {
  const url = `${baseUrlOpenCage}?q=${encodeURIComponent(query)}&key=${apiKeyOpenCage}&pretty=1&countrycode=br`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.results.length > 0) {
      return data.results.map(result => ({
        cep: result.components.postcode,
        uf: result.components.state,
        cidade: result.components.city,
        endereco: result.formatted,
        latitude: result.geometry.lat,
        longitude: result.geometry.lng,
      }));
    } else {
      throw new Error('Endereço não encontrado.');
    }
  } catch (error) {
    console.error('Erro ao buscar o endereço:', error);
    throw error;
  }
};

/**
 * Busca endereço completo a partir de cidade e UF.
 * @param {string} cidade - Nome da cidade.
 * @param {string} uf - Sigla do estado (UF).
 * @returns {Promise<Array>} - Retorna uma lista de endereços correspondentes.
 */
export const buscarPorCidadeEUf = async (cidade, uf) => {
  const query = `${cidade}, ${uf}, Brazil`;
  return await buscarPorEndereco(query);
};
