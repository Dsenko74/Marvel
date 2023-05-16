class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=d3f924374717a87a645e47e2bd9e64bb'
    getResource = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Cold not fetch $(url), status: ${res.status}`);
        }

        return await res.json();
    }
    // метод для рендерінга 9 персонажів
    getAllCharacters = async () => {
        const res =  await this.getResource(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`);
        return res.data.results.map(this._transformCharacter);
    }
        //метод для рендерінга одного персонажу по id
    getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBase}characters/${id}?&${this._apiKey}`);
     
        return this._transformCharacter(res.data.results[0]);
    }
    // getCharacter отримує з Марвела великий масив даних по персонажу, потім викликає метод _transformCharacter(res), який мінімізує дані(зверни увагу запит асінхронний !!!char===res.data.results[0]), а потім вже це метод викликається в компоненті RandomChar
    _transformCharacter = (char) => {
        return {
            name: char.name,
            description: char.description.length > 10 ? char.description.slice(0, 5) : 
            char.description = '' ? char.description : "Something wrong",
            thumbnail: char.thumbnail.path +'.'+ char.thumbnail.extension,
            homepage: char.urls[0].url,
            wikki: char.urls[1].url
        }
    }
}



export default MarvelService;