;(function(factory) {
  // checking for exports avalible
  if (typeof module !== 'undefined' && module.exports) {
    // export Collection
    module.exports = factory()
  } else {
    // else add to root variable
    window['cryptJs'] = factory()
  }
})(function(){
    return {
        cesar: {
            /**
             * --------------------
             * ENCRIPTACIÓN CESAR |
             * --------------------
             * s = String/Char a encriptar
             * n = Entero positivo o negativo que define el desplazamiento
             * l = Arreglo de caracteres validos ['a', 'b']
             * nCase = Entero que:
             * * 1-> Cambia el case a mayusculas
             * * 2-> Cambia el case a minusculas
             * * Omision -> No cambia el case
             */
            encrypt: (s, n, l, nCase) =>
                s.split('').map((e) =>
                    (l.includes((
                        nCase == 1
                            ? e.toUpperCase()
                            : (nCase == 2 ? e.toLowerCase() : e)
                    ))) ?
                        l[(l.indexOf(
                            nCase == 1 ? e.toUpperCase() :
                                (nCase == 2 ? e.toLowerCase() : e)
                        ) + (n < 0 ? (n % l.length + l.length) : n)) % l.length]
                        : e
                ).join(''),
            /**
             * --------------------------------------------
             * DESENCRIPTACIÓN CESAR POR PARAMETROS FIJOS |
             * --------------------------------------------
             * s = String/Char a desencriptar
             * n = Entero positivo o negativo que define el desplazamiento original
             * l = Arreglo de caracteres validos ['a', 'b']
             * nCase = Entero que:
             * * 1-> Define si solo se consideraron mayusculas
             * * 2-> Define si solo se consideraron minusculas
             * * Omision -> No cambia el case
             */
            decrypt: (s, n, l, nCase) =>
                s.split('').map((e) =>
                    (l.includes((
                        nCase == 1
                            ? e.toUpperCase()
                            : (nCase == 2 ? e.toLowerCase() : e)
                    ))) ?
                        l[(l.indexOf(
                            nCase == 1
                                ? e.toUpperCase()
                                : (nCase == 2 ? e.toLowerCase() : e)
                        ) + (n < 0 ? (-n) : ((-n % l.length) + l.length))) % l.length]
                        : e
                ).join('')
        },
        /**
         * --------------------------
         * ENCRIPTACIÓN POR BLOQUES |
         * --------------------------
         * str = Entrada de texto a encriptar
         * bloque = Tamaño del bloque definido
         * sustitución = Movimiento en caracteres
         * intercambio = Numero 
         * caracteres = Arreglod  lettras validas a encriptar
         * ulCase = Entero que:
         * * 1-> Cambia el case a mayusculas
         * * 2-> Cambia el case a minusculas
         * * Omision -> No cambia el case
         */
        bloque: {
            encrypt: (str, bloque, sustitucion, intercambio, caracteres, ulCase) => {
                /* Separar en bloques */
                var inter = []
                var b = str.split('').join('').match(new RegExp(".{1," + bloque + "}", "g")).map((e) => {
                    return cryptJs.cesar.encrypt(((bloque - e.length == 0
                        ? e
                        : (bloque - e.length == 1 ? e + " " : e + "  ")
                    )), sustitucion, caracteres, ulCase)
                }).map((e, i, l) =>
                    inter[(i + (intercambio < 0 ? (intercambio % l.length + l.length) : intercambio)) % l.length] = e
                )
                return inter.join('')
            },
            decrypt: (str, bloque, sustitucion, intercambio, caracteres, ulCase) => {
                var inter = []
                var b = str.split('').join('').match(new RegExp(".{1," + bloque + "}", "g")).map((e) => {
                    return cryptJs.cesar.decrypt(e, sustitucion, caracteres, ulCase)
                }).map((e, i, l) =>
                    inter[(i + (intercambio < 0 ? (-intercambio) : ((-intercambio % l.length) + l.length))) % l.length] = e
                )
                return inter.join('')
            }
        }
    } 
})