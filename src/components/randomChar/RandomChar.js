import { Component } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/errorMessage';
import MarvelService from '../../services/MarvelService';

import './randomChar.scss';

import mjolnir from '../../resources/img/mjolnir.png';

class RandomChar extends Component {


    state = {
        loading: true,
        error: false,
        char: {} //теж саме, що і код знизу
/*         name: null,
        description: null,
        thumbnail: null,
        homepage: null,
        wikki: null */
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateChar();
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    onCharLoaded = (char) => {
        this.setState({
            char,
            loading: false}) //спочатку loading: true, потім, коли заватнажились дані onCharLoaded   переводимо loading: false
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })

    }

    updateChar = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) +1011000 ); //метод генерацій случайного числа в діапазоні
        this.marvelService
            .getCharacter(id)
            .then(this.onCharLoaded)// в then приходить аргумент і він автоматично підставляється в this.onCharLoaded
            .catch(this.onError);
    }


    render() {
        //const {name, description, thumbnail, homepage, wikki} = this.state;
        const {char, loading, error} = this.state; // робимо дестурктуризація тому що зробили оптимизацію в state
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? <View char={char}/> : null;
           
        return (
            <div className="randomchar">
                {errorMessage}
                {spinner}
                {content}

                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main"
                            onClick={this.updateChar}>
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }
}

const View = ({char}) => {
    const  {name, description, thumbnail, homepage, wikki} = char;
    let st = 'randomchar__img';
    if (thumbnail.includes('image_not_availabl', 0)) {
        st += ' randomchar__img_abcent' ;
    }
    return (
        <div className="randomchar__block">
        <img src={thumbnail}
            alt="Random character"
            className={st} />
        <div className="randomchar__info">
            <p className="randomchar__name">{name}</p>
            <p className="randomchar__descr">
                {description}
            </p>
            <div className="randomchar__btns">
                <a href={homepage} className="button button__main">
                    <div className="inner">homepage</div>
                </a>
                <a href={wikki} className="button button__secondary">
                    <div className="inner">Wiki</div>
                </a>
            </div>
        </div>
    </div>
    )
}


export default RandomChar;