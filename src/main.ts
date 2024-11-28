
import './index.css';

import { BoredAPIResponse, UnsplashImageResponse } from './interfaces';

document.addEventListener('DOMContentLoaded', () => {

  const form = document.querySelector<HTMLFormElement>('#actividad-form')!;
  const actividadContainer = document.querySelector<HTMLDivElement>('#actividad-container')!;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const tipo: string = (document.querySelector<HTMLInputElement>('#type')!).value;
    const participantes: number = Number((document.querySelector<HTMLInputElement>('#participants')!).value);

    try {
      const actividad = await fetchActividadPorTipo( tipo, participantes);

      if (actividad) { 
        const imgUrl = await fetchImagen(tipo); 

        mostrarActividad(actividad, imgUrl); 

      } else { 
        actividadContainer.innerHTML = `<p>⚠️ No se encontraron actividades para el tipo y número de participantes seleccionados.</p>`;
      }

      form.reset();
    } catch (error) {
      actividadContainer.innerHTML = `<p>⚠️ Ocurrió un error al buscar la actividad</p>`;
    }
  });

  async function fetchActividadPorTipo( tipo: string, participantes: number ) : Promise<BoredAPIResponse | null> {
    
    const apiUrl = `https://api.allorigins.win/raw?url=https://bored-api.appbrewery.com/filter?type=${tipo}`;

    try {
      const resp = await fetch(apiUrl);

      if (!resp.ok) throw new Error("Error al buscar la actividad");
    
      const contentType = resp.headers.get('content-type'); 

      if (!contentType || !contentType.includes('application/json')) throw new Error('Respuesta no es JSON'); 
      
      const actividades: BoredAPIResponse[] = await resp.json();

      for (let actividad of actividades) { 
        if (actividad.participants === participantes) {
          return actividad; 
        } 
      }
  
      return null;

    } catch (error) {
      return null;
    }

  }

  async function fetchImagen( tipo: string ): Promise<string> {
    const apiKey = '030BLgFW33LAF8vadFNHWoxpiuGxIMmyCRps4uKMWpk';
    const apiUrl = `https://api.unsplash.com/search/photos?query=${tipo}&client_id=${ apiKey }`;

    const resp = await fetch(apiUrl);

    if ( !resp.ok ) throw new Error('Error al buscar la imagen');

    const data: UnsplashImageResponse = await resp.json();

    return data.results.length > 0 ? data.results[0].urls.small : '';
  }


  function mostrarActividad(actividad: BoredAPIResponse, imgUrl: string) {
    console.log('Displaying activity:', actividad);
    actividadContainer.innerHTML = `
      <div class="bg-violet-100 p-4 rounded-lg shadow-md">
        <h2 class="text-xl font-semibold mb-2 text-gray-800">${actividad.activity}</h2>
        <img class="w-full h-auto mb-4 rounded-md" src="${imgUrl}" alt="${actividad.type}" />
        <p class="text-sm text-gray-600 mb-1">Tipo: ${actividad.type}</p>
        <p class="text-sm text-gray-600 mb-1">Participantes: ${actividad.participants}</p>
        <p class="text-sm text-gray-600 mb-1">Precio: ${actividad.price} €</p>
        <p class="text-sm text-gray-600>Accessibilidad: ${actividad.accessibility}</p>
      </div>
    `;
  }

})

