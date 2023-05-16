import { Component } from 'react';
import './charList.scss';
import abyss from '../../resources/img/abyss.jpg';
import MarvelService from '../../services/MarvelService';

class CharList extends Component {
    state = {
        loading: true,
        error: false,
        char: {}
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
/*         const id = Math.floor(Math.random() * (1011400 - 1011000) +1011000 );  *///метод генерацій случайного числа в діапазоні
        this.marvelService
            .getAllCharacters()
            .then(this.onCharLoaded)// в then приходить аргумент і він автоматично підставляється в this.onCharLoaded
            .catch(this.onError);
    }



    render() {
        const {char} = this.state;
        const el = Object.values(char).map(item => { ViewPerson {item={item}}/>});
        console.log(el);
       
        return (
            <div className="char__list">
                <ul className="char__grid">
                 {/*    {elements} */}
{/*                     <ViewPerson char={char}/>
                    <li className="char__item char__item_selected">
                        <img src={abyss} alt="abyss"/>
                        <div className="char__name">Abyss</div>
                    </li>
                    <li className="char__item">
                        <img src={abyss} alt="abyss"/>
                        <div className="char__name">Abyss</div>
                    </li>
                    <li className="char__item">
                        <img src={abyss} alt="abyss"/>
                        <div className="char__name">Abyss</div>
                    </li>
                    <li className="char__item">
                        <img src={abyss} alt="abyss"/>
                        <div className="char__name">Abyss</div>
                    </li>
                    <li className="char__item">
                        <img src={abyss} alt="abyss"/>
                        <div className="char__name">Abyss</div>
                    </li>
                    <li className="char__item">
                        <img src={abyss} alt="abyss"/>
                        <div className="char__name">Abyss</div>
                    </li>
                    <li className="char__item">
                        <img src={abyss} alt="abyss"/>
                        <div className="char__name">Abyss</div>
                    </li>
                    <li className="char__item">
                        <img src={abyss} alt="abyss"/>
                        <div className="char__name">Abyss</div>
                    </li> */}
                </ul>
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

const ViewPerson = ({char}) => {
    const {name, thumbnail} = char;
    return (
        <li className="char__item">
        <img src={thumbnail} alt="abyss22"/>
        <div className="char__name">{name}</div>
    </li>

    )
}

export default CharList;