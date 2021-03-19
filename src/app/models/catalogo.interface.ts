export interface CatalogoAll {
    ok:               boolean;
    catalogoCompleto: CatalogoCompleto[];
}

export interface CatalogoCompleto {
    estado:                  boolean;
    Codigo:                  string;
    Pais:                    Pais;
    Anio:                    number;
    Tema:                    Tema;
    Grupo:                   number;
    Nro_Estampillas:         number;
    Descripcion_de_la_serie: string;
    Valor_Facial:            string;
    Numero_de_catalogo:      string;
    Valor_del_Catalogo:      string;
    Descripcion:             string;
    Tipo:                    string;
    Foto_JPG_800x800_px:     string;
    ParaBuscar:              string;
    uid:                     string;
}





export interface Pais {
    _id:             string;
    name:            string;
    moneda_nombre:   string;
    moneda_code:     string;
    abreviatura_uno: string;
    abreviatura_dos: string;
    img:             string;
    para_buscar:     string;
    __v:             number;
}

export interface Tema {
    _id:        string;
    name:       string;
    imagen:     string;
    ParaBuscar: string;
    __v:        number;
}