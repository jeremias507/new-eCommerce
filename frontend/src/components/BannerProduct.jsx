import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css'; // Asegúrate de importar los estilos CSS necesarios

import image1 from "../assest/banner/img1.webp";
import image2 from "../assest/banner/img2.webp";
import image3 from "../assest/banner/img3.jpg";
import image4 from "../assest/banner/img4.jpg";
import image5 from "../assest/banner/img5.webp";

import image1Mobile from '../assest/banner/img1_mobile.jpg';
import image2Mobile from '../assest/banner/img2_mobile.webp';
import image3Mobile from '../assest/banner/img3_mobile.jpg';
import image4Mobile from '../assest/banner/img4_mobile.jpg';
import image5Mobile from '../assest/banner/img5_mobile.png';

export const BannerProduct = () => {
  return (
    <div className="md:container md:mx-auto md:px-4 md:rounded overflow-hidden">
      <Splide
        options={{
          type: "loop",
          perPage: 1,
          autoplay: true,
          interval: 5000,
          pauseOnHover: true,
          progress: true,
          arrows: false, // Oculta las flechas en todos los tamaños de pantalla
          classes: {
            progress: "splide__progress",
            progressBar: "splide__progress__bar",
            arrow: "splide__arrow", // Clase base para las flechas
          },
          breakpoints: {
            640: {
              perPage: 1, // Mostrar solo 1 slide en dispositivos con ancho de 640px o menos
              arrows: false, // Oculta las flechas en dispositivos móviles
            },
          },
        }}
        className="w-full h-auto"
      >
        <SplideSlide>
          <img
            src={image1}
            srcSet={`${image1Mobile} 640w, ${image1} 1280w`}
            alt="Banner 1"
            className="h-80 w-full   md:object-cover "
            style={{ objectFit: 'cover' }}
          />
        </SplideSlide>
        <SplideSlide>
          <img
            src={image2}
            srcSet={`${image2Mobile} 640w, ${image2} 1280w`}
            alt="Banner 2"
            className="h-80 w-full object-cover"
            style={{ objectFit: 'cover' }}
          />
        </SplideSlide>
        <SplideSlide>
          <img
            src={image3}
            srcSet={`${image3Mobile} 640w, ${image3} 1280w`}
            alt="Banner 3"
            className="h-80 w-full object-cover"
            style={{ objectFit: 'cover' }}
          />
        </SplideSlide>
        <SplideSlide>
          <img
            src={image4}
            srcSet={`${image4Mobile} 640w, ${image4} 1280w`}
            alt="Banner 4"
            className="h-80 w-full object-cover"
            style={{ objectFit: 'cover' }}
          />
        </SplideSlide>
        <SplideSlide>
          <img
            src={image5}
            srcSet={`${image5Mobile} 640w, ${image5} 1280w`}
            alt="Banner 5"
            className="h-80 w-full object-cover"
            style={{ objectFit: 'cover' }}
          />
        </SplideSlide>
      </Splide>
    </div>
  );
};