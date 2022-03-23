import '../css/ContainerSelector.css';
import * as categorias from "./Categorias";
import imagenLogoVuelaCar from "../images/logo_vuelacar.png"
import { ReactElement, Component } from 'react';
import { titulosCategorias } from "../datos/listadoCategorias"


const routesContainer = categorias.FillAllRoutes();

interface ContainerProps {
  name: string;
}

interface ContainerState {
  borrado: boolean;
}


let currentContent: ReactElement;
let currentTitle: ReactElement;

export class ContainerSelector extends Component<ContainerProps, ContainerState>
{

  render()
  {
    currentContent = routesContainer[this.props.name.toLowerCase()];
    return (
      <>
        {currentContent}
      </>
    );

  }
}

export const TitleSelector: React.FC<ContainerProps> = ({ name }) => {


  return (
    <>

    {
        (name === titulosCategorias.Dashboard.toString()) ? 
      <div className="centrado-flex">
            <img src={ imagenLogoVuelaCar } alt="logo " />
          <h1 className='titulo-central'>{name}</h1>
        </div>
      :
      <div className="centrado-flex">
          <h1 className='titulo-central'>{name}</h1>
        </div>
    }

    </>
  );

};
