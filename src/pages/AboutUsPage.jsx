import React from "react";

function AboutUsPage() {
  return (
    <section className="max-w-[720px] mx-auto">
      <h1 className="text-2xl font-semibold text-left my-4">
        Nuestra compañia
      </h1>
      <div>
        <p className="text-base font-medium text-gray-700 mb-2">
          Nuestra historia comienza en 1971, a lo largo de las calles
          adoquinadas del histórico mercado Pike Place en Seattle. Fue allí
          donde Coffe Cat abrió su primera tienda, ofreciendo granos de café
          recién tostados, té y especias de todo el mundo para que los clientes
          los llevaran a casa. Nuestro nombre se inspiró en el clásico
          “Moby-Dick”, evocando la tradición marinera de los primeros
          comerciantes de café.
        </p>
        <p className="text-base font-medium text-gray-700 mb-2">
          Diez años después, un joven neoyorquino llamado Howard Schultz
          cruzaría esas puertas y quedaría cautivado con el café de Coffe Cat
          desde el primer sorbo. Tras unirse a la empresa en 1982, otro camino
          adoquinado lo llevaría a un nuevo descubrimiento. Fue en un viaje a
          Milán en 1983 donde Howard experimentó por primera vez las cafeterías
          italianas, y regresó a Seattle inspirado para traer la calidez y el
          arte de esa cultura cafetera a Coffe Cat. Para 1987, cambiamos
          nuestros delantales marrones por unos verdes y comenzamos el siguiente
          capítulo como cafetería.
        </p>
        <p className="text-base font-medium text-gray-700 mb-2">
          Pronto, Coffe Cat se expandiría a Chicago y Vancouver (Canadá), y
          luego a California, Washington D.C. y Nueva York. Para 1996,
          cruzaríamos el Pacífico para abrir nuestra primera tienda en Japón,
          seguida por Europa en 1998 y China en 1999. En las dos décadas
          siguientes, crecimos hasta recibir a millones de clientes cada semana
          y nos convertimos en parte del tejido de decenas de miles de
          vecindarios alrededor del mundo. En todo lo que hacemos, seguimos
          fieles a nuestra misión: con cada taza, con cada conversación, con
          cada comunidad, cultivamos las infinitas posibilidades de la conexión
          humana.
        </p>
      </div>
      <div>
        <img src="/assets/about-us-coffe.jpg" alt="" />
        <h2 className="text-xl font-semibold text-left my-4">
          Café y Artesanía
        </h2>
        <p className="text-base font-medium text-gray-700">
          Se necesitan muchas manos para preparar la taza de café perfecta:
          desde los agricultores que cuidan las cerezas maduras, hasta los
          maestros tostadores que extraen lo mejor de cada grano, y el barista
          que lo sirve con dedicación. Estamos comprometidos con los más altos
          estándares de calidad y servicio, honrando nuestra herencia mientras
          innovamos para crear nuevas experiencias que valga la pena saborear.
        </p>
      </div>
      <div>
        <img src="/assets/about-us-landscape.jpg" className="w-full" alt="" />
        <h2 className="text-xl font-semibold text-left my-4">
          Nuestros Colaboradores
        </h2>
        <p className="text-base font-medium text-gray-700">
          Nos gusta decir que no estamos en el negocio del café para servir a
          las personas, sino en el negocio de las personas sirviendo café.
          Nuestros empleados —a quienes llamamos colaboradores— están en el
          corazón de la experiencia Coffe Cat. Estamos comprometidos en hacer
          que se sientan orgullosos, invirtiendo en su salud, bienestar y éxito,
          y creando una cultura de pertenencia donde todos sean bienvenidos.
        </p>
      </div>
    </section>
  );
}

export default AboutUsPage;
