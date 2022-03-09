import '../css/ContainerSelector.css';
import * as categorias from "./Categorias";
import { ReactElement, Component } from 'react';

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
    <div className="centrado-flex">
      <h1 className='titulo-central'>{name}</h1>
    </div>
  );

};
