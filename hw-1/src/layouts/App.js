import './App.css'
import searchBtn from './img/search.png'
import Avatar1 from './img/Avatar.png'
import Avatar2 from './img/Avatar2.png'
import favStar from './img/favStar.png'

function App() {
    return (
        <div className='body__search-form__card-blocks'>

            <div className='search-form'>
                <input className='search-form__input' placeholder={"Введите название организации"}/>
                <button className="search-form__btn">
                    <img src={searchBtn} alt="" className="search-form__btn__img"/>
                </button>
            </div>


            <div className="card-block">
                <div className="card-flex-row">
                    <img className="avatar-icon" src={Avatar1} alt="" />
                    <div className="card-flex-column">
                        <a className="repo-name">kts-school-frontend</a>
                        <a className='org-name'>ktsstudio</a>
                        <div className="card-flex-row">
                            <div className="num-fav"><img className="fav-star" src={favStar} alt=""/> 123</div>
                            <a className="update-data">Updated 21 Jul</a>
                        </div>
                    </div>
                </div>

            </div>

            <div className="card-block2">
                <div className="card-flex-row">
                    <img className="avatar-icon" src={Avatar1} alt="" />
                    <div className="card-flex-column">
                        <a className="repo-name">very-long-repository-name-and...</a>
                        <a className='org-name'>ktsstudio</a>
                        <div className="card-flex-row">
                            <div className="num-fav"><img className="fav-star" src={favStar} alt=""/> 123</div>
                            <a className="update-data">Updated 21 Jul</a>
                        </div>
                    </div>
                </div>

            </div>

            <div className="card-block3">
                <div className="card-flex-row">
                    <img className="avatar-icon" src={Avatar2} alt="" />
                    <div className="card-flex-column">
                        <a className="repo-name">very-long-repository-name-and...</a>
                        <a className='org-name'>ktsstudio</a>
                        <div className="card-flex-row">
                            <div className="num-fav"><img className="fav-star" src={favStar} alt=""/> 123</div>
                            <a className="update-data">Updated 21 Jul</a>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <a href="https://github.com/login/oauth/authorize?client_id=a77163e503a46430ed55&scope=public_repo">
                    Войти
                </a>
            </div>

        </div>


    )
}

export default App;