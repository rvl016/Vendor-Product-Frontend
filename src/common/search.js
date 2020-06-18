
export default class Search {

  id_to_terms = {};
  data = [];

  static set_terms( data) {
    Search.data = data;
    Search.id_to_terms = data.reduce( (terms, record) => ({
      [record.id]: Object.keys( record).reduce( (acc, key) => 
        key !== 'id' && record[key] ? 
          acc.concat( record[key].toString().toLowerCase().split( ' ')) 
          : acc, []),
      ...terms
    }), {});
  }

  static get_ordered_records( phrase) {
    const words = phrase.toLowerCase().split( ' ');
    const scores = Object.keys( Search.id_to_terms).reduce( (acc, key) => ({
      [key]: Search.calculate_score( Search.id_to_terms[key], words),
      ...acc
    }), {});
    return Search.data.sort( (x, y) => scores[y.id] - scores[x.id]);
  }

  static calculate_score( document_terms, search_terms) {
    const matches = search_terms.reduce( (acc, term) => 
      document_terms.includes( term) ? acc + 1 : acc
    , 0);
    return matches;
  }

}