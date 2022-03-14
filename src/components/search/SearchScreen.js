
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { getHeroesByName } from "../../selectors/getHeroesByName";
import { HeroCard } from "../hero/HeroCard";
import queryString from 'query-string';
import { useMemo } from "react";

export const SearchScreen = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const { q = '' } = queryString.parse(location.search);

    const initialForm = {
        searchText: q,
    };

    const [ values, handleInputChange, reset ] = useForm( initialForm );
    const { searchText } = values;

    const heroes =  useMemo(() => getHeroesByName(q), [q]);
    
    
    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`?q=${searchText}`);
    }

    return (
        <>
            <h1>Busquedas</h1>
            <hr />

            <div className="row">
                <div className="col-5">
                    <h4>buscar</h4>
                    <hr />

                    <form onSubmit={handleSearch}>
                        <input 
                            type="text"
                            placeholder="Buscar un heroe"
                            className="form-control"
                            name="searchText"
                            autoComplete="off"
                            value={searchText}
                            onChange={handleInputChange}
                        />

                        <button 
                            type="submit"
                            className="btn btn-outline-primary mt-1 w-100"
                        >
                            Buscar
                        </button>
                    </form>
                    
                </div>
                <div className="col-7">
                    <h4>Resultados</h4>
                    <hr />

                    {(q === '') && <div className="alert alert-info">Buscar un hero</div>}
                    {(q !== '' && heroes.length === 0) && <div className="alert alert-danger">No hay resultados: {q}</div>}

                    {
                        heroes.map(heroe => (
                            <HeroCard
                                key={heroe.id}
                                {...heroe}
                            />
                        ))
                    }

                </div>
            </div>
        </>
    )
}
