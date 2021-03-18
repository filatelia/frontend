/*export interface Catalogo{
    Anio: number;
Codigo: string;
Descripcion: string;
Descripcion_de_la_serie: string;
Foto_JPG_800x800_px: string;
Grupo: 1;
Nro_Estampillas: 2;
Numero_de_catalogo: string;
Pais: string;
Tema: string;
Tipo: string;
Valor_Facial: string;
Valor_del_Catalogo: string;
estado: string;
uid: string;
}*/
export interface CatalogoListAdmin{

Codigo: string;
Anio: number;
Numero_de_catalogo: string;
Tema: string;
Pais: string;
Valor_del_Catalogo: string;
estado: string;
}

export interface CatalogoAll {
    catalogoCompleto: CatalogoCompleto[];
}

export interface CatalogoCompleto {
    estado:                  boolean;
    Codigo:                  string; 
    Pais:                    string;
    Anio:                    number;
    Tema:                    string;
    Grupo:                   number;
    Nro_Estampillas:         number;
    Descripcion_de_la_serie: string;
    Valor_Facial:            string;
    Numero_de_catalogo:      string;
    Valor_del_Catalogo:      string;
    Descripcion:             string;
    Tipo:                    string;
    Foto_JPG_800x800_px:     string;
    BanderaPais:             string;
    uid:                     string;
}
